/**
 * Constants, mock data, and configuration for the Main app screen.
 */

export const MAIN_COLORS = {
  surface: "#FFFFFF",
  surfaceCard: "#F4F8FC",
  surfaceInput: "#F0F5FA",
  border: "#D8E6F5",
  primary: "#5B9BD5",
  primaryDark: "#2B6CB0",
  primaryLight: "#EBF3FA",
  accent: "#5B9BD5",
  accentLight: "#EBF3FA",
  textPrimary: "#1E293B",
  textSecondary: "#475569",
  textMuted: "#88A3C0",
  success: "#5B9BD5",
  badgeBg: "#5B9BD5",
} as const;

export type NavTabId = "home" | "chat" | "notif" | "profile";

export interface NavTabItem {
  id: NavTabId;
  label: string;
  iconOutline: string;
  iconFilled: string;
  badge?: number;
}

export const NAV_TABS: NavTabItem[] = [
  {
    id: "home",
    label: "Home",
    iconOutline: "home-outline",
    iconFilled: "home",
  },
  {
    id: "chat",
    label: "Chat",
    iconOutline: "chatbubble-ellipses-outline",
    iconFilled: "chatbubble-ellipses",
  },
  {
    id: "notif",
    label: "Notif",
    iconOutline: "notifications-outline",
    iconFilled: "notifications",
  },
  {
    id: "profile",
    label: "Profile",
    iconOutline: "person-outline",
    iconFilled: "person",
  },
];

export const LEGAL_CATEGORIES = [
  { id: "all", label: "All", icon: "apps-outline" },
  { id: "family", label: "Family Law", icon: "people-outline" },
  { id: "corporate", label: "Corporate", icon: "briefcase-outline" },
  { id: "criminal", label: "Criminal", icon: "shield-checkmark-outline" },
  { id: "property", label: "Real Estate", icon: "business-outline" },
  { id: "injury", label: "Injury", icon: "medkit-outline" },
];

export interface AttorneyItem {
  id: string;
  name: string;
  title: string;
  specialty: string;
  rating: number;
  reviewsCount: number;
  experienceYears: number;
  isAvailable: boolean;
  about: string;
  education: string;
  ibpChapter: string;
  location: string;
  languages: string[];
  expertise: string[];
}

export const FEATURED_ATTORNEYS: AttorneyItem[] = [];
