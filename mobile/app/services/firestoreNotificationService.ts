/**
 * Firestore Notification Service.
 * Syncs notifications collection in real-time with Firestore.
 */
import {
  collection,
  doc,
  getDocs,
  setDoc,
  updateDoc,
  onSnapshot,
  query,
  orderBy,
  Unsubscribe,
} from "firebase/firestore";
import { firestore } from "../database/firebase";
import { NotificationItem } from "../notif/lib/types";
import { MOCK_NOTIFICATIONS } from "../notif/lib/mockData";

const NOTIF_COLLECTION = "notifications";

/**
 * Initializes default notifications in Firestore if the collection is empty.
 */
export async function seedInitialNotificationsIfEmpty(): Promise<void> {
  try {
    const notifsRef = collection(firestore, NOTIF_COLLECTION);
    const snap = await getDocs(notifsRef);

    if (snap.empty) {
      for (const item of MOCK_NOTIFICATIONS) {
        await setDoc(doc(firestore, NOTIF_COLLECTION, item.id), item);
      }
    }
  } catch (err) {
    console.warn("Could not seed notifications to Firestore (offline or unauthenticated):", err);
  }
}

/**
 * Subscribes to notifications in Firestore with automatic real-time updates.
 */
export function subscribeToNotifications(
  onUpdate: (items: NotificationItem[]) => void
): Unsubscribe {
  const notifsRef = collection(firestore, NOTIF_COLLECTION);

  // Seed initially
  seedInitialNotificationsIfEmpty();

  const unsubscribe = onSnapshot(
    notifsRef,
    (snapshot) => {
      if (!snapshot.empty) {
        const items: NotificationItem[] = [];
        snapshot.forEach((docSnap) => {
          items.push({ id: docSnap.id, ...(docSnap.data() as any) });
        });
        onUpdate(items);
      } else {
        onUpdate(MOCK_NOTIFICATIONS);
      }
    },
    (error) => {
      console.warn("Firestore notification snapshot listener fallback to local:", error);
      onUpdate(MOCK_NOTIFICATIONS);
    }
  );

  return unsubscribe;
}

/**
 * Marks a notification as read or unread in Firestore.
 */
export async function toggleNotificationReadInFirestore(
  id: string,
  newReadState: boolean
): Promise<void> {
  try {
    const notifDocRef = doc(firestore, NOTIF_COLLECTION, id);
    await updateDoc(notifDocRef, { isRead: newReadState });
  } catch (err) {
    console.warn("Error updating notification in Firestore:", err);
  }
}

/**
 * Marks all notifications as read in Firestore.
 */
export async function markAllNotificationsReadInFirestore(
  notifications: NotificationItem[]
): Promise<void> {
  try {
    const promises = notifications.map((n) =>
      updateDoc(doc(firestore, NOTIF_COLLECTION, n.id), { isRead: true })
    );
    await Promise.all(promises);
  } catch (err) {
    console.warn("Error marking all notifications read in Firestore:", err);
  }
}
