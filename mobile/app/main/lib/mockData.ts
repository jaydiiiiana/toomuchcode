/**
 * Mock data for the Main app screens.
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

export const MOCK_NOTIFICATIONS: NotificationItem[] = [
  {
    id: "n1",
    title: "Appointment Confirmed",
    body: "Your consultation with Atty. Maria Santos is scheduled for Oct 15 at 2:00 PM.",
    time: "2 min ago",
    isRead: false,
    type: "appointment",
    icon: "calendar",
  },
  {
    id: "n2",
    title: "New Message",
    body: "Atty. Rafael Cruz sent you a message about your case.",
    time: "15 min ago",
    isRead: false,
    type: "message",
    icon: "chatbubble-ellipses",
  },
  {
    id: "n3",
    title: "Document Ready",
    body: "Your contract review is complete. Tap to view the summary.",
    time: "1 hr ago",
    isRead: true,
    type: "system",
    icon: "document-text",
  },
  {
    id: "n4",
    title: "Welcome to Lexora!",
    body: "Start by exploring our featured attorneys and legal categories.",
    time: "3 hrs ago",
    isRead: true,
    type: "promo",
    icon: "sparkles",
  },
  {
    id: "n5",
    title: "Free Consultation Available",
    body: "You're eligible for a 15-minute free consultation. Book now!",
    time: "1 day ago",
    isRead: true,
    type: "promo",
    icon: "gift",
  },
];

export const MOCK_CHATS: ChatThread[] = [
  {
    id: "c1",
    name: "Atty. Maria Santos",
    lastMessage: "I've reviewed the documents you sent. Let's discuss tomorrow.",
    time: "2:30 PM",
    unreadCount: 2,
    isOnline: true,
  },
  {
    id: "c2",
    name: "Atty. Rafael Cruz",
    lastMessage: "The tax filing deadline is next week. Please prepare the forms.",
    time: "11:45 AM",
    unreadCount: 0,
    isOnline: true,
  },
  {
    id: "c3",
    name: "Atty. Beatrice Tan",
    lastMessage: "Your case hearing is scheduled for November 3rd.",
    time: "Yesterday",
    unreadCount: 0,
    isOnline: false,
  },
  {
    id: "c4",
    name: "Lexora Support",
    lastMessage: "Thank you for your feedback! We're always here to help.",
    time: "Oct 7",
    unreadCount: 0,
    isOnline: true,
  },
];
