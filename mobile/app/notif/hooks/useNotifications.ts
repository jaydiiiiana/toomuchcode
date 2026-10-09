/**
 * Hook to manage notification state (read/unread, mark all).
 */
import { useState, useCallback } from "react";
import { MOCK_NOTIFICATIONS } from "../lib/mockData";

export function useNotifications() {
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const markAllRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  }, []);

  const toggleRead = useCallback((id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: !n.isRead } : n))
    );
  }, []);

  return {
    notifications,
    unreadCount,
    markAllRead,
    toggleRead,
  };
}
