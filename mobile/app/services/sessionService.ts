/**
 * Session Persistence Service.
 * Persists the logged-in user session across app closes/restarts.
 * Uses SQLite database with reliable in-memory cache fallback.
 */
import { getDatabase } from "../database/db";

export interface UserSession {
  email: string;
  role: "client" | "attorney" | "admin";
  name?: string;
  uid?: string;
  loggedInAt: number;
}

// In-memory cache
let memorySession: UserSession | null = null;

/**
 * Ensures auth_session table exists in SQLite.
 */
async function ensureSessionTable(): Promise<void> {
  const db = await getDatabase();
  if (!db) return;

  try {
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS auth_session (
        id TEXT PRIMARY KEY NOT NULL DEFAULT 'active_session',
        email TEXT NOT NULL,
        role TEXT NOT NULL DEFAULT 'client',
        name TEXT,
        uid TEXT,
        logged_in_at INTEGER NOT NULL
      );
    `);
  } catch (err) {
    console.warn("[SessionService] ensureSessionTable error:", err);
  }
}

/**
 * Saves the active session to SQLite so the user stays logged in across app restarts.
 */
export async function saveActiveSession(
  email: string,
  role: "client" | "attorney" | "admin" = "client",
  name?: string,
  uid?: string
): Promise<void> {
  const session: UserSession = {
    email: email.trim(),
    role,
    name: name?.trim(),
    uid: uid || `uid_${Date.now()}`,
    loggedInAt: Date.now(),
  };

  memorySession = session;

  try {
    await ensureSessionTable();
    const db = await getDatabase();
    if (db) {
      await db.runAsync(
        `INSERT OR REPLACE INTO auth_session (id, email, role, name, uid, logged_in_at)
         VALUES ('active_session', ?, ?, ?, ?, ?);`,
        [session.email, session.role, session.name || "", session.uid || "", session.loggedInAt]
      );
    }
  } catch (dbErr) {
    console.warn("[SessionService] Could not write session to SQLite:", dbErr);
  }
}

/**
 * Retrieves the persisted session if one exists.
 */
export async function getActiveSession(): Promise<UserSession | null> {
  if (memorySession) {
    return memorySession;
  }

  try {
    await ensureSessionTable();
    const db = await getDatabase();
    if (db) {
      const rows = await db.getAllAsync(
        `SELECT * FROM auth_session WHERE id = 'active_session' LIMIT 1;`
      );
      if (rows && rows.length > 0) {
        const row: any = rows[0];
        const session: UserSession = {
          email: row.email,
          role: (row.role as "client" | "attorney" | "admin") || "client",
          name: row.name,
          uid: row.uid,
          loggedInAt: row.logged_in_at,
        };
        memorySession = session;
        return session;
      }
    }
  } catch (dbErr) {
    console.warn("[SessionService] Could not read session from SQLite:", dbErr);
  }

  return null;
}

/**
 * Clears the active session when the user explicitly clicks Log Out.
 */
export async function clearActiveSession(): Promise<void> {
  memorySession = null;

  try {
    await ensureSessionTable();
    const db = await getDatabase();
    if (db) {
      await db.runAsync(`DELETE FROM auth_session WHERE id = 'active_session';`);
    }
  } catch (dbErr) {
    console.warn("[SessionService] Could not clear SQLite session:", dbErr);
  }
}
