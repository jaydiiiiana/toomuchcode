/**
 * User Profile Service — Syncs user profile between Firebase and local SQLite.
 *
 * Strategy:
 * 1. On load: Try to read cached profile from SQLite (instant).
 * 2. In background: Fetch latest profile from Firestore and update local cache.
 * 3. Stats (consultations, saved, reviews) are always computed from local SQLite tables.
 * 4. Profile edits write to both Firestore (remote) and SQLite (local) simultaneously.
 */
import { doc, getDoc, updateDoc, onSnapshot, Unsubscribe } from "firebase/firestore";
import { firestore, auth } from "../database/firebase";
import { getDatabase } from "../database/db";
import type { UserProfile, FirestoreUserDoc } from "../profile/lib/types";

// ─── SQLite Local Cache ─────────────────────────────────────────────

/**
 * Ensures the local user_profile table exists in SQLite.
 */
export async function ensureProfileTable(): Promise<void> {
  const db = await getDatabase();
  if (!db) return;

  try {
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS user_profile (
        uid TEXT PRIMARY KEY NOT NULL,
        name TEXT NOT NULL DEFAULT '',
        email TEXT NOT NULL DEFAULT '',
        phone TEXT DEFAULT '',
        role TEXT NOT NULL DEFAULT 'client',
        attorney_status TEXT DEFAULT '',
        bar_roll_no TEXT DEFAULT '',
        ibp_chapter TEXT DEFAULT '',
        specialization TEXT DEFAULT '',
        office_address TEXT DEFAULT '',
        avatar_url TEXT DEFAULT '',
        created_at TEXT DEFAULT ''
      );
    `);
  } catch (err) {
    console.warn("[ProfileService] Could not create user_profile table:", err);
  }
}

/**
 * Reads the cached user profile from local SQLite.
 */
export async function getLocalProfile(uid: string): Promise<UserProfile | null> {
  const db = await getDatabase();
  if (!db) return null;

  try {
    await ensureProfileTable();
    const rows = await db.getAllAsync(
      `SELECT * FROM user_profile WHERE uid = ? LIMIT 1`,
      [uid]
    );

    if (!rows || rows.length === 0) return null;

    const row: any = rows[0];
    const stats = await getLocalStats(uid);

    return {
      uid: row.uid,
      name: row.name || "",
      email: row.email || "",
      phone: row.phone || "",
      role: row.role || "client",
      attorneyStatus: row.attorney_status || undefined,
      barRollNo: row.bar_roll_no || undefined,
      ibpChapter: row.ibp_chapter || undefined,
      specialization: row.specialization || undefined,
      officeAddress: row.office_address || undefined,
      avatarUrl: row.avatar_url || "",
      createdAt: row.created_at || "",
      consultationsCount: stats.consultations,
      savedCount: stats.saved,
      reviewsCount: stats.reviews,
    };
  } catch (err) {
    console.warn("[ProfileService] getLocalProfile error:", err);
    return null;
  }
}

/**
 * Saves or updates the user profile in local SQLite cache.
 */
export async function saveLocalProfile(profile: Partial<UserProfile> & { uid: string }): Promise<void> {
  const db = await getDatabase();
  if (!db) return;

  try {
    await ensureProfileTable();
    await db.runAsync(
      `INSERT OR REPLACE INTO user_profile (uid, name, email, phone, role, attorney_status, bar_roll_no, ibp_chapter, specialization, office_address, avatar_url, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        profile.uid,
        profile.name || "",
        profile.email || "",
        profile.phone || "",
        profile.role || "client",
        profile.attorneyStatus || "",
        profile.barRollNo || "",
        profile.ibpChapter || "",
        profile.specialization || "",
        profile.officeAddress || "",
        profile.avatarUrl || "",
        profile.createdAt || "",
      ]
    );
  } catch (err) {
    console.warn("[ProfileService] saveLocalProfile error:", err);
  }
}

// ─── Local Stats (from existing SQLite tables) ──────────────────────

/**
 * Counts consultations, saved items, and reviews from local SQLite tables.
 * These are the user's own locally-stored data.
 */
async function getLocalStats(uid: string): Promise<{
  consultations: number;
  saved: number;
  reviews: number;
}> {
  const db = await getDatabase();
  if (!db) {
    return { consultations: 0, saved: 0, reviews: 0 };
  }

  let consultations = 0;
  let saved = 0;
  let reviews = 0;

  try {
    // Count consultation bookings
    const consultResult = await db.getAllAsync(
      `SELECT COUNT(*) as count FROM consultation_bookings`
    );
    consultations = consultResult?.[0]?.count || 0;
  } catch {}

  try {
    // Count saved legal items
    const savedResult = await db.getAllAsync(
      `SELECT COUNT(*) as count FROM saved_legal_items`
    );
    saved = savedResult?.[0]?.count || 0;
  } catch {}

  try {
    // Count unique AI chat sessions as "reviews" (legal inquiries)
    const reviewResult = await db.getAllAsync(
      `SELECT COUNT(DISTINCT session_id) as count FROM ai_chat_messages WHERE sender = 'user'`
    );
    reviews = reviewResult?.[0]?.count || 0;
  } catch {}

  return { consultations, saved, reviews };
}

// ─── Firebase Remote Sync ───────────────────────────────────────────

/**
 * Fetches the user profile from Firestore "users" collection.
 * Also updates the local SQLite cache with the latest data.
 */
export async function fetchRemoteProfile(uid: string): Promise<UserProfile | null> {
  try {
    const userDocRef = doc(firestore, "users", uid);
    const snap = await getDoc(userDocRef);

    if (!snap.exists()) return null;

    const data = snap.data() as FirestoreUserDoc;
    const stats = await getLocalStats(uid);

    const profile: UserProfile = {
      uid: data.uid || uid,
      name: data.name || "",
      email: data.email || "",
      phone: data.phone || "",
      role: data.role || "client",
      attorneyStatus: data.attorneyStatus,
      barRollNo: data.barRollNo,
      ibpChapter: data.ibpChapter,
      specialization: data.specialization,
      officeAddress: data.officeAddress,
      avatarUrl: data.avatarUrl || "",
      createdAt: data.createdAt?.toDate?.()?.toISOString?.() || data.createdAt || "",
      consultationsCount: stats.consultations,
      savedCount: stats.saved,
      reviewsCount: stats.reviews,
    };

    // Cache locally
    await saveLocalProfile(profile);

    return profile;
  } catch (err) {
    console.warn("[ProfileService] fetchRemoteProfile error:", err);
    return null;
  }
}

/**
 * Subscribes to real-time changes on the user's Firestore profile document.
 * Returns an unsubscribe function.
 */
export function subscribeToProfile(
  uid: string,
  onProfileUpdate: (profile: UserProfile) => void
): Unsubscribe {
  const userDocRef = doc(firestore, "users", uid);

  return onSnapshot(
    userDocRef,
    async (snap) => {
      if (!snap.exists()) return;

      const data = snap.data() as FirestoreUserDoc;
      const stats = await getLocalStats(uid);

      const profile: UserProfile = {
        uid: data.uid || uid,
        name: data.name || "",
        email: data.email || "",
        phone: data.phone || "",
        role: data.role || "client",
        attorneyStatus: data.attorneyStatus,
        barRollNo: data.barRollNo,
        ibpChapter: data.ibpChapter,
        specialization: data.specialization,
        officeAddress: data.officeAddress,
        avatarUrl: data.avatarUrl || "",
        createdAt: data.createdAt?.toDate?.()?.toISOString?.() || data.createdAt || "",
        consultationsCount: stats.consultations,
        savedCount: stats.saved,
        reviewsCount: stats.reviews,
      };

      // Update local cache
      await saveLocalProfile(profile);

      onProfileUpdate(profile);
    },
    (error) => {
      console.warn("[ProfileService] subscribeToProfile error:", error);
    }
  );
}

/**
 * Updates user profile fields in Firestore (and local cache).
 * Only updates the provided fields, does not overwrite the entire document.
 */
export async function updateUserProfile(
  uid: string,
  updates: Partial<Pick<UserProfile, "name" | "phone" | "avatarUrl">>
): Promise<void> {
  // Update Firestore
  try {
    const userDocRef = doc(firestore, "users", uid);
    await updateDoc(userDocRef, updates);
  } catch (err) {
    console.warn("[ProfileService] Firestore updateProfile error:", err);
  }

  // Also update local cache
  try {
    const existing = await getLocalProfile(uid);
    if (existing) {
      await saveLocalProfile({ ...existing, ...updates });
    }
  } catch (err) {
    console.warn("[ProfileService] Local updateProfile error:", err);
  }
}
