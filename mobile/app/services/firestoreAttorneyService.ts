/**
 * Firestore Attorney & Consultation Service.
 * Manages attorney listings and consultation bookings in Firestore.
 * No mock data — all data is synced with Firestore in real-time.
 */
import {
  collection,
  doc,
  setDoc,
  onSnapshot,
  Unsubscribe,
  serverTimestamp,
} from "firebase/firestore";
import { firestore } from "../database/firebase";
import type { AreaAttorney, BookingRequest } from "../consultation/lib/types";

const ATTORNEYS_COLLECTION = "attorneys";
const CONSULTATIONS_COLLECTION = "consultations";

/**
 * Subscribes to the attorneys collection in Firestore in real-time.
 */
export function subscribeToAttorneys(
  callback: (attorneys: AreaAttorney[]) => void
): Unsubscribe {
  try {
    const colRef = collection(firestore, ATTORNEYS_COLLECTION);
    return onSnapshot(
      colRef,
      (snapshot) => {
        if (!snapshot.empty) {
          const items: AreaAttorney[] = snapshot.docs.map((d) => ({
            id: d.id,
            ...(d.data() as Omit<AreaAttorney, "id">),
          }));
          callback(items);
        } else {
          callback([]);
        }
      },
      (error) => {
        console.warn("Firestore subscribeToAttorneys error:", error.message);
        callback([]);
      }
    );
  } catch (error) {
    console.warn("Failed to subscribe to attorneys:", error);
    callback([]);
    return () => {};
  }
}

/**
 * Persists a consultation booking to Firestore under the 'consultations' collection.
 */
export async function saveConsultationToFirestore(
  request: BookingRequest,
  userId?: string
): Promise<void> {
  try {
    const bookingId = `book_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const docRef = doc(firestore, CONSULTATIONS_COLLECTION, bookingId);
    await setDoc(docRef, {
      ...request,
      userId: userId || "anonymous",
      createdAt: serverTimestamp(),
      status: "confirmed",
    });
  } catch (error) {
    console.warn("Failed to save consultation booking to Firestore:", error);
    throw error;
  }
}
