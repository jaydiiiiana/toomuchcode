/**
 * Types for the Chat screen with Offline AI & Attorney sync.
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
  senderId: "user" | "attorney" | "ai";
  text: string;
  timestamp: string;
  isOffline?: boolean;
  citations?: string[];
  isCaseSummary?: boolean;
}
