/**
 * Hook to manage Profile state.
 *
 * Flow:
 * 1. Immediately loads cached profile from local SQLite (fast, works offline).
 * 2. Subscribes to real-time Firestore updates for the current user.
 * 3. Any remote change auto-updates the UI and local cache.
 * 4. Stats (consultations, saved, reviews) are always from local data.
 */
import { useState, useEffect, useCallback } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../../database/firebase";
import {
  getLocalProfile,
  fetchRemoteProfile,
  subscribeToProfile,
} from "../../services/userProfileService";
import { MENU_SECTIONS } from "../lib/mockData";
import type { UserProfile, MenuSection } from "../lib/types";

/** Default empty profile shown during loading. */
const EMPTY_PROFILE: UserProfile = {
  uid: "",
  name: "Loading...",
  email: "",
  consultationsCount: 0,
  savedCount: 0,
  reviewsCount: 0,
  role: "client",
};

export function useProfile() {
  const [user, setUser] = useState<UserProfile>(EMPTY_PROFILE);
  const [sections] = useState<MenuSection[]>(MENU_SECTIONS);
  const [loading, setLoading] = useState(true);
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    let unsubProfile: (() => void) | null = null;

    const unsubAuth = onAuthStateChanged(auth, async (firebaseUser: User | null) => {
      // Clean up previous profile subscription
      if (unsubProfile) {
        unsubProfile();
        unsubProfile = null;
      }

      if (!firebaseUser) {
        // Not logged in — show empty
        setUser(EMPTY_PROFILE);
        setLoading(false);
        return;
      }

      const uid = firebaseUser.uid;

      // Step 1: Load cached local profile first (instant, offline-safe)
      try {
        const localProfile = await getLocalProfile(uid);
        if (localProfile) {
          setUser(localProfile);
          setLoading(false);
        }
      } catch (err) {
        console.warn("[useProfile] Local load error:", err);
      }

      // Step 2: Fetch latest from Firestore (updates local cache too)
      try {
        const remoteProfile = await fetchRemoteProfile(uid);
        if (remoteProfile) {
          setUser(remoteProfile);
          setIsOnline(true);
        }
      } catch (err) {
        console.warn("[useProfile] Remote fetch error (offline?):", err);
        setIsOnline(false);
      }

      setLoading(false);

      // Step 3: Subscribe to real-time updates from Firestore
      try {
        unsubProfile = subscribeToProfile(uid, (updatedProfile) => {
          setUser(updatedProfile);
          setIsOnline(true);
        });
      } catch (err) {
        console.warn("[useProfile] Subscription error:", err);
      }
    });

    return () => {
      unsubAuth();
      if (unsubProfile) {
        unsubProfile();
      }
    };
  }, []);

  /**
   * Manually refresh the profile (pull-to-refresh).
   */
  const refreshProfile = useCallback(async () => {
    const firebaseUser = auth.currentUser;
    if (!firebaseUser) return;

    setLoading(true);
    try {
      const remoteProfile = await fetchRemoteProfile(firebaseUser.uid);
      if (remoteProfile) {
        setUser(remoteProfile);
        setIsOnline(true);
      }
    } catch {
      setIsOnline(false);
    }
    setLoading(false);
  }, []);

  return {
    user,
    setUser,
    sections,
    loading,
    isOnline,
    refreshProfile,
  };
}
