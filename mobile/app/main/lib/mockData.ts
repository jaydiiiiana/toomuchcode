/**
 * Quick actions and UI configurations for the Main app screen.
 * All chat and notification data now comes exclusively from Firestore.
 */
import type { QuickAction, NotificationItem, ChatThread } from "./types";

export const QUICK_ACTIONS: QuickAction[] = [
  {
    id: "consult",
    label: "Book a\nConsultation",
    icon: "calendar-outline",
    color: "#2B6CB0",
    bgColor: "#EBF3FA",
  },
  {
    id: "ask",
    label: "Ask a\nQuestion",
    icon: "chatbubble-outline",
    color: "#2B6CB0",
    bgColor: "#EBF3FA",
  },
  {
    id: "docs",
    label: "Document\nReview",
    icon: "document-text-outline",
    color: "#2B6CB0",
    bgColor: "#EBF3FA",
  },
  {
    id: "emergency",
    label: "Emergency\nHelp",
    icon: "shield-checkmark-outline",
    color: "#2B6CB0",
    bgColor: "#EBF3FA",
  },
];

export const MOCK_NOTIFICATIONS: NotificationItem[] = [];
export const MOCK_CHATS: ChatThread[] = [];
