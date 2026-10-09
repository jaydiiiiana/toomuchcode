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

export interface UserProfile {
  uid: string;
  name: string;
  email: string;
  phone?: string;
  role: "client" | "attorney" | "admin";
  createdAt?: any;
}

/**
 * Signs up a new user with Firebase Auth and creates their profile in Firestore.
 */
export async function signUpWithFirebase(
  name: string,
  email: string,
  phone: string,
  pass: string
): Promise<{ user: User; profile: UserProfile }> {
  const userCredential = await createUserWithEmailAndPassword(auth, email.trim(), pass);
  const user = userCredential.user;

  const profile: UserProfile = {
    uid: user.uid,
    name: name.trim(),
    email: email.trim(),
    phone: phone.trim(),
    role: "client",
    createdAt: serverTimestamp(),
  };

  try {
    // Store user document in Firestore "users" collection
    await setDoc(doc(firestore, "users", user.uid), profile);
  } catch (fsErr) {
    console.warn("Could not save profile to Firestore immediately (offline):", fsErr);
  }

  return { user, profile };
}

/**
 * Logs in an existing user with Firebase Auth and retrieves their profile from Firestore.
 */
export async function loginWithFirebase(
  email: string,
  pass: string
): Promise<{ user: User; profile?: UserProfile }> {
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
