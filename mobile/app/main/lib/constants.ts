/**
 * Constants, mock data, and configuration for the Main app screen.
 */

export const MAIN_COLORS = {
  surface: "#FFFFFF",
  surfaceCard: "#F8FAFC",
  surfaceInput: "#F1F5F9",
  border: "#E2E8F0",
  primary: "#0284C7",
  primaryDark: "#0369A1",
  primaryLight: "#E0F2FE",
  accent: "#F59E0B",
  accentLight: "#FEF3C7",
  textPrimary: "#0F172A",
  textSecondary: "#475569",
  textMuted: "#64748B",
  success: "#10B981",
  badgeBg: "#EF4444",
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
    badge: 2,
  },
  {
    id: "notif",
    label: "Notif",
    iconOutline: "notifications-outline",
    iconFilled: "notifications",
    badge: 3,
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
  hourlyRate: string;
  isAvailable: boolean;
}

export const FEATURED_ATTORNEYS: AttorneyItem[] = [
  {
    id: "att-1",
    name: "Atty. Maria Santos",
    title: "Senior Partner, Santos & Associates",
    specialty: "Family & Estate Law",
    rating: 4.9,
    reviewsCount: 124,
    experienceYears: 14,
    hourlyRate: "₱2,500/hr",
    isAvailable: true,
  },
  {
    id: "att-2",
    name: "Atty. Rafael Cruz",
    title: "Managing Partner, Cruz Legal",
    specialty: "Corporate & Tax Law",
    rating: 4.8,
    reviewsCount: 98,
    experienceYears: 11,
    hourlyRate: "₱3,200/hr",
    isAvailable: true,
  },
  {
    id: "att-3",
    name: "Atty. Beatrice Tan",
    title: "Lead Counsel, Tan Defense Law",
    specialty: "Criminal Defense & Litigation",
    rating: 5.0,
    reviewsCount: 85,
    experienceYears: 9,
    hourlyRate: "₱2,800/hr",
    isAvailable: false,
  },
];
