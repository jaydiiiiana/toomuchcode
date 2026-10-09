/**
 * Types for the Profile screen.
 * Unified type that works with both Firebase (remote) and SQLite (local).
 */

export interface MenuItemData {
  icon: string;
  label: string;
  subtitle?: string;
  color?: string;
  showBadge?: boolean;
  onPress?: () => void;
}

export interface MenuSection {
  title: string;
  items: MenuItemData[];
}

/**
 * User profile — merged from Firebase Auth + Firestore "users" collection + local stats.
 */
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
  avatarUrl?: string;
  createdAt?: string;
  /** Stats computed from local data */
  consultationsCount: number;
  savedCount: number;
  reviewsCount: number;
}

/**
 * The raw Firestore document shape in the "users" collection.
 */
export interface FirestoreUserDoc {
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
  avatarUrl?: string;
  createdAt?: any;
}
