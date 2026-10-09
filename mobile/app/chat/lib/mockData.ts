/**
 * Mock data for the Chat screen.
 */
import type { ChatThread } from "./types";

export const MOCK_CHATS: ChatThread[] = [
  {
    id: "c1",
    name: "Atty. Maria Santos",
    specialty: "Family & Estate Law",
    lastMessage: "I've reviewed the documents you sent. Let's discuss tomorrow.",
    time: "2:30 PM",
    unreadCount: 2,
    isOnline: true,
  },
  {
    id: "c2",
    name: "Atty. Rafael Cruz",
    specialty: "Corporate & Tax Law",
    lastMessage: "The tax filing deadline is next week. Please prepare the forms.",
    time: "11:45 AM",
    unreadCount: 0,
    isOnline: true,
  },
  {
    id: "c3",
    name: "Atty. Beatrice Tan",
    specialty: "Criminal Defense & Litigation",
    lastMessage: "Your case hearing is scheduled for November 3rd.",
    time: "Yesterday",
    unreadCount: 0,
    isOnline: false,
  },
  {
    id: "c4",
    name: "Lexora Support",
    specialty: "Customer Care & Verification",
    lastMessage: "Thank you for your feedback! We're always here to help.",
    time: "Oct 7",
    unreadCount: 0,
    isOnline: true,
  },
];

export const MOCK_THREAD_MESSAGES: Record<string, import("./types").DirectMessage[]> = {
  c1: [
    {
      id: "m1-1",
      senderId: "attorney",
      text: "Good afternoon! I have received your case files regarding the estate and family property settlement.",
      timestamp: "2:15 PM",
    },
    {
      id: "m1-2",
      senderId: "user",
      text: "Thank you Attorney Santos. Were there any missing documents from the registry of deeds?",
      timestamp: "2:20 PM",
    },
    {
      id: "m1-3",
      senderId: "attorney",
      text: "I've reviewed the documents you sent. Let's discuss tomorrow during our consultation.",
      timestamp: "2:30 PM",
    },
  ],
  c2: [
    {
      id: "m2-1",
      senderId: "attorney",
      text: "Hello, regarding your SEC business registration and BIR compliance requirements.",
      timestamp: "11:30 AM",
    },
    {
      id: "m2-2",
      senderId: "user",
      text: "Yes Atty. Cruz, should we prepare the corporate bylaws now?",
      timestamp: "11:38 AM",
    },
    {
      id: "m2-3",
      senderId: "attorney",
      text: "The tax filing deadline is next week. Please prepare the forms.",
      timestamp: "11:45 AM",
    },
  ],
  c3: [
    {
      id: "m3-1",
      senderId: "attorney",
      text: "Good day. Just a quick update on your case status at the Valenzuela Hall of Justice.",
      timestamp: "Yesterday",
    },
    {
      id: "m3-2",
      senderId: "attorney",
      text: "Your case hearing is scheduled for November 3rd.",
      timestamp: "Yesterday",
    },
  ],
  c4: [
    {
      id: "m4-1",
      senderId: "user",
      text: "Hi, I wanted to verify how consultation video calls work on the mobile app.",
      timestamp: "Oct 7",
    },
    {
      id: "m4-2",
      senderId: "attorney",
      text: "Thank you for your feedback! We're always here to help. Video calls are encrypted and launched directly through your active consultation tab.",
      timestamp: "Oct 7",
    },
  ],
};

export {
  generatePhilippineAIResponse,
  generateAttorneyCaseSummary,
} from "./philippineLegalAI";
