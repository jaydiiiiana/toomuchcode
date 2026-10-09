/**
 * Mock data for the Chat screen.
 */
import type { ChatThread } from "./types";

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
