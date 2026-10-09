/**
 * Hook to manage notification state (read/unread, mark all) synced with Firestore.
 * No mock data — starts empty and syncs with Firestore in real-time.
 */
import { useState, useEffect, useCallback } from "react";
import { NotificationItem } from "../lib/types";
import {
  subscribeToNotifications,
  toggleNotificationReadInFirestore,
  markAllNotificationsReadInFirestore,
} from "../../services/firestoreNotificationService";

export function useNotifications() {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  useEffect(() => {
    const unsubscribe = subscribeToNotifications((updatedItems) => {
      setNotifications(updatedItems);
    });

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const markAllRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    markAllNotificationsReadInFirestore(notifications);
  }, [notifications]);

  const toggleRead = useCallback(
    (id: string) => {
      const item = notifications.find((n) => n.id === id);
      const nextState = item ? !item.isRead : true;

      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, isRead: nextState } : n))
      );

      toggleNotificationReadInFirestore(id, nextState);
    },
    [notifications]
  );

  return {
    notifications,
    unreadCount,
    markAllRead,
    toggleRead,
  };
}
