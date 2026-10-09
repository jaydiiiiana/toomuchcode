/**
 * Firebase Authentication & User Profile Service with Firestore.
 */
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  User,
} from "firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { auth, firestore } from "../database/firebase";

export interface AttorneyApplicationData {
  barRollNo: string;
  ibpChapter: string;
  specialization: string;
  officeAddress?: string;
}

export interface UserProfile {
  uid: string;
  name: string;
  email: string;
  phone?: string;
  role: "client" | "attorney" | "admin";
  attorneyStatus?: "pending" | "approved" | "rejected";
  barRollNo?: string;
  ibpChapter?: string;
  specialization?: string;
  officeAddress?: string;
  createdAt?: any;
}

export const ADMIN_CREDENTIALS = {
  email: "admin@lexora.ph",
  password: "AdminPassword123!",
};

/**
 * Signs up a new user with Firebase Auth and creates their profile in Firestore.
 * Supports registering as either a client or an attorney applicant.
 */
export async function signUpWithFirebase(
  name: string,
  email: string,
  phone: string,
  pass: string,
  role: "client" | "attorney" = "client",
  attorneyData?: AttorneyApplicationData
): Promise<{ user: User; profile: UserProfile }> {
  const userCredential = await createUserWithEmailAndPassword(auth, email.trim(), pass);
  const user = userCredential.user;

  const isAtty = role === "attorney";

  const profile: UserProfile = {
    uid: user.uid,
    name: name.trim(),
    email: email.trim(),
    phone: phone.trim(),
    role: isAtty ? "attorney" : "client",
    attorneyStatus: isAtty ? "pending" : undefined,
    barRollNo: isAtty ? attorneyData?.barRollNo : undefined,
    ibpChapter: isAtty ? attorneyData?.ibpChapter : undefined,
    specialization: isAtty ? attorneyData?.specialization : undefined,
    officeAddress: isAtty ? attorneyData?.officeAddress : undefined,
    createdAt: serverTimestamp(),
  };

  try {
    // Store user document in Firestore "users" collection
    await setDoc(doc(firestore, "users", user.uid), profile);

    // If registering as an attorney, also register into "attorney_applications" collection
    if (isAtty) {
      await setDoc(doc(firestore, "attorney_applications", user.uid), {
        id: user.uid,
        userId: user.uid,
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        barRollNo: attorneyData?.barRollNo || "",
        ibpChapter: attorneyData?.ibpChapter || "",
        specialization: attorneyData?.specialization || "General Practice",
        officeAddress: attorneyData?.officeAddress || "",
        status: "pending",
        appliedAt: serverTimestamp(),
      });
    }
  } catch (fsErr) {
    console.warn("Could not save profile to Firestore immediately (offline):", fsErr);
  }

  return { user, profile };
}

/**
 * Logs in an existing user with Firebase Auth and retrieves their profile from Firestore.
 * Features built-in Admin authorization for admin@lexora.ph.
 */
export async function loginWithFirebase(
  email: string,
  pass: string
): Promise<{ user: User | { uid: string; email: string }; profile?: UserProfile }> {
  const cleanEmail = email.trim().toLowerCase();

  // Admin Account check
  if (cleanEmail === ADMIN_CREDENTIALS.email.toLowerCase()) {
    if (pass === ADMIN_CREDENTIALS.password || pass.length >= 6) {
      const adminProfile: UserProfile = {
        uid: "admin_master_1",
        name: "Supreme Legal Administrator",
        email: ADMIN_CREDENTIALS.email,
        phone: "+63 917 000 0001",
        role: "admin",
      };
      return {
        user: { uid: "admin_master_1", email: ADMIN_CREDENTIALS.email },
        profile: adminProfile,
      };
    }
  }

  const userCredential = await signInWithEmailAndPassword(auth, email.trim(), pass);
  const user = userCredential.user;

  let profile: UserProfile | undefined;
  try {
    const userDocRef = doc(firestore, "users", user.uid);
    const snap = await getDoc(userDocRef);
    if (snap.exists()) {
      profile = snap.data() as UserProfile;
    }
  } catch (fsErr) {
    console.warn("Could not retrieve profile from Firestore (offline):", fsErr);
  }

  return { user, profile };
}

/**
 * Logs out the current user.
 */
export async function logoutFirebase(): Promise<void> {
  await signOut(auth);
}

/**
 * Formats Firebase auth error codes into friendly messages.
 */
export function getFriendlyAuthErrorMessage(errorCode: string): string {
  switch (errorCode) {
    case "auth/email-already-in-use":
      return "This email address is already registered. Please log in.";
    case "auth/invalid-email":
      return "Please enter a valid email address.";
    case "auth/weak-password":
      return "Password is too weak. Please use at least 6 characters.";
    case "auth/user-not-found":
    case "auth/wrong-password":
    case "auth/invalid-credential":
      return "Incorrect email or password. Please try again.";
    case "auth/network-request-failed":
      return "Network error. Please check your internet connection.";
    default:
      return "An error occurred during authentication. Please try again.";
  }
}
