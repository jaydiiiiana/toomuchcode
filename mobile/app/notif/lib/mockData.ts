/**
 * Mock data for the Notifications screen.
 */
import type { NotificationItem } from "./types";

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
