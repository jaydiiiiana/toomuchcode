/**
 * Types for the Notifications screen.
 */

export interface NotificationItem {
  id: string;
  title: string;
  body: string;
  time: string;
  isRead: boolean;
  type: "appointment" | "message" | "system" | "promo";
  icon: string;
  fullMessage?: string;
  senderOrSource?: string;
  referenceNumber?: string;
  actionLabel?: string;
  metadata?: {
    date?: string;
    timeSlot?: string;
    location?: string;
    attorneyName?: string;
  };
}
