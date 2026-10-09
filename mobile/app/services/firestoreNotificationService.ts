/**
 * Firestore Notification Service.
 * Syncs notifications collection in real-time with Firestore.
 * No mock data — all notifications come from Firestore.
 */
import {
  collection,
  doc,
  updateDoc,
  onSnapshot,
  Unsubscribe,
} from "firebase/firestore";
import { firestore } from "../database/firebase";
import { NotificationItem } from "../notif/lib/types";

const NOTIF_COLLECTION = "notifications";

/**
 * Subscribes to notifications in Firestore with automatic real-time updates.
 * Returns empty array if no notifications exist yet.
 */
export function subscribeToNotifications(
  onUpdate: (items: NotificationItem[]) => void
): Unsubscribe {
  const notifsRef = collection(firestore, NOTIF_COLLECTION);

  const unsubscribe = onSnapshot(
    notifsRef,
    (snapshot) => {
      const items: NotificationItem[] = [];
      snapshot.forEach((docSnap) => {
        items.push({ id: docSnap.id, ...(docSnap.data() as any) });
      });
      onUpdate(items);
    },
    (error) => {
      console.warn("Firestore notification snapshot error:", error);
      onUpdate([]);
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
