/**
 * Shared types for the Main app section.
 */

export type MainTab = "home" | "chat" | "notif" | "profile";

export interface QuickAction {
  id: string;
  label: string;
  icon: string;
  color: string;
  bgColor: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  body: string;
  time: string;
  isRead: boolean;
  type: "appointment" | "message" | "system" | "promo";
  icon: string;
}

export interface ChatThread {
  id: string;
  name: string;
  lastMessage: string;
  time: string;
  unreadCount: number;
  isOnline: boolean;
  avatar?: string;
}
