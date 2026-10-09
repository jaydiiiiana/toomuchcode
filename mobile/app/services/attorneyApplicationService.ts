/**
 * Attorney Application & Verification Service.
 * Connects Attorney Registration with Admin Verification.
 * Works seamlessly with both Firestore (remote) and SQLite (local offline).
 */
import {
  collection,
  doc,
  setDoc,
  getDocs,
  updateDoc,
  onSnapshot,
  query,
  orderBy,
  Unsubscribe,
  serverTimestamp,
} from "firebase/firestore";
import { firestore } from "../database/firebase";
import { getDatabase } from "../database/db";
import { saveLocalProfile, getLocalProfile } from "./userProfileService";

export interface AttorneyApplicationItem {
  id: string;
  userId: string;
  name: string;
  email: string;
  phone?: string;
  barRollNo: string;
  ibpChapter: string;
  specialization: string;
  officeAddress?: string;
  status: "pending" | "approved" | "rejected";
  appliedAt?: any;
}

const APPLICATIONS_COLLECTION = "attorney_applications";

/**
 * Ensures SQLite attorney_applications table exists.
 */
export async function ensureApplicationsTable(): Promise<void> {
  const db = await getDatabase();
  if (!db) return;

  try {
    await db.execAsync(`
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
    `);
  } catch (err) {
    console.warn("[AttyAppService] Failed to create attorney_applications table:", err);
  }
}

/**
 * Saves an application to SQLite local cache.
 */
export async function saveLocalApplication(app: AttorneyApplicationItem): Promise<void> {
  const db = await getDatabase();
  if (!db) return;

  try {
    await ensureApplicationsTable();
    await db.runAsync(
      `INSERT OR REPLACE INTO attorney_applications
       (id, user_id, name, email, phone, bar_roll_no, ibp_chapter, specialization, office_address, status, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        app.id,
        app.userId,
        app.name,
        app.email,
        app.phone || "",
        app.barRollNo,
        app.ibpChapter,
        app.specialization,
        app.officeAddress || "",
        app.status,
        Date.now(),
      ]
    );
  } catch (err) {
    console.warn("[AttyAppService] saveLocalApplication error:", err);
  }
}

/**
 * Reads all applications from SQLite local cache.
 */
export async function getLocalApplications(): Promise<AttorneyApplicationItem[]> {
  const db = await getDatabase();
  if (!db) return [];

  try {
    await ensureApplicationsTable();
    const rows = await db.getAllAsync(
      `SELECT * FROM attorney_applications ORDER BY created_at DESC;`
    );

    if (!rows) return [];
    return rows.map((r: any) => ({
      id: r.id,
      userId: r.user_id,
      name: r.name,
      email: r.email,
      phone: r.phone,
      barRollNo: r.bar_roll_no,
      ibpChapter: r.ibp_chapter,
      specialization: r.specialization,
      officeAddress: r.office_address,
      status: r.status as "pending" | "approved" | "rejected",
    }));
  } catch (err) {
    console.warn("[AttyAppService] getLocalApplications error:", err);
    return [];
  }
}

/**
 * Subscribes to attorney applications in Firestore (with local SQLite backup).
 */
export function subscribeToAttorneyApplications(
  callback: (applications: AttorneyApplicationItem[]) => void
): Unsubscribe {
  try {
    const colRef = collection(firestore, APPLICATIONS_COLLECTION);
    const q = query(colRef, orderBy("appliedAt", "desc"));

    return onSnapshot(
      q,
      (snapshot) => {
        if (!snapshot.empty) {
          const apps: AttorneyApplicationItem[] = snapshot.docs.map((d) => ({
            id: d.id,
            ...(d.data() as Omit<AttorneyApplicationItem, "id">),
          }));
          apps.forEach((a) => saveLocalApplication(a));
          callback(apps);
        } else {
          // If Firestore is empty, fallback to local SQLite
          getLocalApplications().then(callback);
        }
      },
      (error) => {
        console.warn("[AttyAppService] Firestore subscribe error, using local fallback:", error);
        getLocalApplications().then(callback);
      }
    );
  } catch (err) {
    getLocalApplications().then(callback);
    return () => {};
  }
}

/**
 * Admin Action: Verify & Approve Attorney.
 * 1. Updates application status to 'approved'
 * 2. Updates users/{userId} role to 'attorney' & attorneyStatus to 'approved'
 * 3. Enrolls the attorney into the 'attorneys' public directory for consultations
 * 4. Updates local SQLite records
 */
export async function verifyAndApproveAttorney(app: AttorneyApplicationItem): Promise<void> {
  const targetId = app.id || app.userId;

  // 1. Update application in Firestore
  try {
    const appRef = doc(firestore, APPLICATIONS_COLLECTION, targetId);
    await updateDoc(appRef, {
      status: "approved",
      approvedAt: serverTimestamp(),
    });
  } catch (err) {
    console.warn("[AttyAppService] Could not update application in Firestore:", err);
  }

  // 2. Update user profile in Firestore
  try {
    const userRef = doc(firestore, "users", app.userId || targetId);
    await updateDoc(userRef, {
      role: "attorney",
      attorneyStatus: "approved",
      barRollNo: app.barRollNo,
      ibpChapter: app.ibpChapter,
      specialization: app.specialization,
      officeAddress: app.officeAddress || "",
    });
  } catch (err) {
    console.warn("[AttyAppService] Could not update user in Firestore:", err);
  }

  // 3. Add to live 'attorneys' directory for clients to book consultations
  try {
    const attyRef = doc(firestore, "attorneys", targetId);
    const cleanName = app.name.replace(/^atty\.?\s+/i, "");
    await setDoc(
      attyRef,
      {
        name: `Atty. ${cleanName}`,
        title: "Attorney-at-Law",
        officeAddress: app.officeAddress || `${app.ibpChapter}, Metro Manila`,
        barangay: "Central Legal District",
        city: app.ibpChapter.replace(/^IBP\s+/i, "") || "Metro Manila",
        distanceKm: 1.5,
        specialty: app.specialization || "General Legal Practice",
        category: "civil",
        experienceYears: 6,
        rating: 5.0,
        reviewsCount: 3,
        ibpChapter: app.ibpChapter,
        isAvailable: true,
        nextSlot: "Available Today",
        supportedModes: ["office", "video", "phone"],
        about: `Officially verified member of ${app.ibpChapter} (Roll of Attorneys No. ${app.barRollNo}). Dedicated to delivering accessible and honest legal representation.`,
        verifiedByAdmin: true,
      },
      { merge: true }
    );
  } catch (err) {
    console.warn("[AttyAppService] Could not add attorney to public directory:", err);
  }

  // 4. Update SQLite local cache
  await saveLocalApplication({ ...app, status: "approved" });
  const localProfile = await getLocalProfile(app.userId || targetId);
  if (localProfile) {
    await saveLocalProfile({
      ...localProfile,
      role: "attorney",
      attorneyStatus: "approved",
      barRollNo: app.barRollNo,
      ibpChapter: app.ibpChapter,
      specialization: app.specialization,
      officeAddress: app.officeAddress,
    });
  }
}

/**
 * Admin Action: Reject Attorney Application.
 */
export async function rejectAttorneyApplication(appId: string): Promise<void> {
  try {
    const appRef = doc(firestore, APPLICATIONS_COLLECTION, appId);
    await updateDoc(appRef, {
      status: "rejected",
      rejectedAt: serverTimestamp(),
    });
  } catch (err) {
    console.warn("[AttyAppService] Firestore reject error:", err);
  }

  const db = await getDatabase();
  if (db) {
    try {
      await db.runAsync(
        `UPDATE attorney_applications SET status = 'rejected' WHERE id = ?`,
        [appId]
      );
    } catch {}
  }
}
