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
    senderOrSource: "Santos & Associates Law",
    referenceNumber: "LEX-APT-84920",
    fullMessage:
      "Your consultation request has been officially approved and confirmed by Atty. Maria Santos. Please ensure you are prepared 5 minutes before your scheduled session. You may bring or upload relevant contracts, demands, or documents directly through the app.",
    actionLabel: "View Consultation Details",
    metadata: {
      date: "Wednesday, Oct 15, 2026",
      timeSlot: "2:00 PM - 2:30 PM",
      location: "Encrypted Video Call / Valenzuela Branch",
      attorneyName: "Atty. Maria Santos",
    },
  },
  {
    id: "n2",
    title: "New Message Received",
    body: "Atty. Rafael Cruz sent you a message regarding your corporate contract inquiry.",
    time: "15 min ago",
    isRead: false,
    type: "message",
    icon: "chatbubble-ellipses",
    senderOrSource: "Atty. Rafael Cruz (Cruz Legal)",
    referenceNumber: "MSG-CRZ-31902",
    fullMessage:
      "\"Hello! I've gone over the initial facts of your business partnership contract. I have marked two clauses that require minor adjustments to protect your liability under Philippine Corporation Code. Please review the updated draft when you're available.\"",
    actionLabel: "Reply in Chat",
  },
  {
    id: "n3",
    title: "Document Review Complete",
    body: "Your residential lease contract review is complete. Findings summary is ready.",
    time: "1 hr ago",
    isRead: true,
    type: "system",
    icon: "document-text",
    senderOrSource: "Lexora Automated Legal Verification",
    referenceNumber: "DOC-REV-77201",
    fullMessage:
      "The legal review for your 'Residential Lease Agreement (Valenzuela Apartment)' has been completed. All compliance items under RA 9653 (Rent Control Act of the Philippines) have been validated, with no unlawful eviction clauses detected.",
    actionLabel: "Download Review Summary",
  },
  {
    id: "n4",
    title: "Welcome to Lexora Companion!",
    body: "Your secure Philippine legal assistant account is active and verified.",
    time: "3 hrs ago",
    isRead: true,
    type: "promo",
    icon: "sparkles",
    senderOrSource: "Lexora Support Team",
    referenceNumber: "SYS-ACC-10023",
    fullMessage:
      "Welcome to Lexora! You now have direct access to verified Philippine attorneys, confidential AI legal guidance with our robot mascot Lexi, local Valenzuela attorney matching, and encrypted legal consultation records.",
    actionLabel: "Explore Features",
  },
  {
    id: "n5",
    title: "Complimentary Legal Inquiry",
    body: "You're eligible for a 15-minute introductory legal inquiry this month.",
    time: "1 day ago",
    isRead: true,
    type: "promo",
    icon: "gift",
    senderOrSource: "Lexora Community Program",
    referenceNumber: "PRM-FREE-00129",
    fullMessage:
      "As part of our commitment to accessible Philippine justice, you have 1 complimentary preliminary legal inquiry ticket. You can redeem this when consulting any participating attorney in your local area.",
    actionLabel: "Redeem Free Inquiry",
  },
];
