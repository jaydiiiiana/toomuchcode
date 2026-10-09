/**
 * Types for the Chat screen.
 */

export interface ChatThread {
  id: string;
  name: string;
  lastMessage: string;
  time: string;
  unreadCount: number;
  isOnline: boolean;
  avatar?: string;
  specialty?: string;
}

export interface DirectMessage {
  id: string;
  senderId: "user" | "attorney";
  text: string;
  timestamp: string;
}
