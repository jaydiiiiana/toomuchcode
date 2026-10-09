/**
 * Firebase Client Configuration for Lexora Legal App.
 * Project: lexora-aac9f
 */
import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getFirestore, Firestore } from "firebase/firestore";
import { getAuth, Auth } from "firebase/auth";

export const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY || "AIzaSyA76AJ4Z_9y6f0obwsEQ4mgxqaPrV2nUA8",
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN || "lexora-aac9f.firebaseapp.com",
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID || "lexora-aac9f",
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET || "lexora-aac9f.firebasestorage.app",
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "82737307696",
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID || "1:82737307696:web:481f7c8a7dfcbb09a30df5",
};

// Initialize or retrieve existing Firebase App instance
const app: FirebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

export const firebaseApp = app;
export const firestore: Firestore = getFirestore(app);
export const auth: Auth = getAuth(app);

/**
 * Helper to check if Firebase is connected.
 */
export function isFirebaseReady(): boolean {
  return Boolean(app && firebaseConfig.apiKey);
}

export default firebaseApp;
