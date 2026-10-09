/**
 * SQLite Local Database for Lexora Mobile App.
 * Handles database creation, table schema setup, and connection management.
 * Includes defensive fallback when running in environments without native SQLite.
 */

let dbInstance: any = null;
let sqliteSupported: boolean | null = null;

export async function isSqliteSupported(): Promise<boolean> {
  if (sqliteSupported !== null) {
    return sqliteSupported;
  }

  try {
    const SQLite = await import("expo-sqlite");
    if (!SQLite || typeof SQLite.openDatabaseAsync !== "function") {
      sqliteSupported = false;
      return false;
    }

    const testDb = await SQLite.openDatabaseAsync("lexora_local.db");
    if (!testDb || typeof testDb.execAsync !== "function") {
      sqliteSupported = false;
      return false;
    }

    await initTables(testDb);
    dbInstance = testDb;
    sqliteSupported = true;
    return true;
  } catch (err) {
    sqliteSupported = false;
    return false;
  }
}

export async function getDatabase(): Promise<any | null> {
  if (dbInstance) {
    return dbInstance;
  }

  const supported = await isSqliteSupported();
  if (supported && dbInstance) {
    return dbInstance;
  }

  return null;
}

async function initTables(db: any) {
  try {
    await db.execAsync(`
      PRAGMA journal_mode = WAL;

      -- AI Legal Chat messages table
      CREATE TABLE IF NOT EXISTS ai_chat_messages (
        id TEXT PRIMARY KEY NOT NULL,
        session_id TEXT NOT NULL DEFAULT 'default',
        sender TEXT NOT NULL,
        text TEXT NOT NULL,
        legal_citations TEXT,
        suggested_action TEXT,
        timestamp TEXT NOT NULL,
        created_at INTEGER NOT NULL
      );

      -- Consultation booking requests table
      CREATE TABLE IF NOT EXISTS consultation_bookings (
        id TEXT PRIMARY KEY NOT NULL,
        attorney_id TEXT NOT NULL,
        attorney_name TEXT NOT NULL,
        attorney_address TEXT,
        mode TEXT NOT NULL,
        booking_date TEXT NOT NULL,
        time_slot TEXT NOT NULL,
        case_summary TEXT,
        status TEXT NOT NULL DEFAULT 'confirmed',
        created_at INTEGER NOT NULL
      );

      -- Saved items / bookmarks table
      CREATE TABLE IF NOT EXISTS saved_legal_items (
        id TEXT PRIMARY KEY NOT NULL,
        title TEXT NOT NULL,
        category TEXT NOT NULL,
        summary TEXT,
        saved_at INTEGER NOT NULL
      );

      -- Attorney applications table
      CREATE TABLE IF NOT EXISTS attorney_applications (
        id TEXT PRIMARY KEY NOT NULL,
        user_id TEXT NOT NULL,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT,
        bar_roll_no TEXT NOT NULL,
        ibp_chapter TEXT NOT NULL,
        specialization TEXT NOT NULL,
        office_address TEXT,
        status TEXT NOT NULL DEFAULT 'pending',
        created_at INTEGER NOT NULL
      );

      -- Persistent user auth session table
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
    console.warn("SQLite initTables notice:", err);
  }
}
