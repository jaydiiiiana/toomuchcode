/**
 * Static data for the Profile screen.
 * The MOCK_USER is no longer used — real data comes from Firebase + SQLite.
 * Menu sections remain as static UI configuration.
 */
import type { MenuSection } from "./types";

export const MENU_SECTIONS: MenuSection[] = [
  {
    title: "Account",
    items: [
      { icon: "person-outline", label: "Edit Profile", subtitle: "Name, photo, contact info" },
      { icon: "shield-checkmark-outline", label: "Verification", subtitle: "Identity verification status" },
      { icon: "card-outline", label: "Payment Methods", subtitle: "Manage your payment options" },
    ],
  },
  {
    title: "Preferences",
    items: [
      { icon: "notifications-outline", label: "Notifications", subtitle: "Push, email & SMS settings" },
      { icon: "lock-closed-outline", label: "Privacy & Security", subtitle: "Password, 2FA, data" },
      { icon: "language-outline", label: "Language", subtitle: "English" },
    ],
  },
  {
    title: "Support",
    items: [
      { icon: "help-circle-outline", label: "Help Center", subtitle: "FAQs and guides" },
      { icon: "chatbubble-outline", label: "Contact Support", subtitle: "Get in touch with us" },
      { icon: "document-text-outline", label: "Terms & Policies", subtitle: "Legal documents" },
    ],
  },
];
