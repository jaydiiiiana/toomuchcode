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
  isAvailable: boolean;
  about: string;
  education: string;
  ibpChapter: string;
  location: string;
  languages: string[];
  expertise: string[];
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
    isAvailable: true,
    about:
      "Atty. Maria Santos has over 14 years of dedicated litigation and family law practice across Philippine trial courts. She specializes in marital dissolution, child custody and support disputes, property settlement, and estate succession. Known for her compassionate and client-first counsel, she guides families through complex legal disputes with discretion and utmost professionalism.",
    education: "University of the Philippines College of Law (LL.B.)",
    ibpChapter: "IBP Makati Chapter • Roll No. 51842",
    location: "Makati City, Metro Manila",
    languages: ["English", "Filipino"],
    expertise: [
      "Family Code & Annulment",
      "Child Custody & Support",
      "Wills & Estate Planning",
      "Property Settlement",
      "Barangay Conciliation",
    ],
  },
  {
    id: "att-2",
    name: "Atty. Rafael Cruz",
    title: "Managing Partner, Cruz Legal",
    specialty: "Corporate & Tax Law",
    rating: 4.8,
    reviewsCount: 98,
    experienceYears: 11,
    isAvailable: true,
    about:
      "Atty. Rafael Cruz advises startups, MSMEs, and multinational corporations on SEC regulatory compliance, commercial contracts, tax disputes (BIR assessments), and corporate governance in the Philippines. He provides pragmatic, forward-looking counsel for entrepreneurs and growing businesses navigating Philippine business laws.",
    education: "Ateneo de Manila University School of Law (Juris Doctor)",
    ibpChapter: "IBP Pasig Chapter • Roll No. 58319",
    location: "Ortigas Center, Pasig City",
    languages: ["English", "Filipino"],
    expertise: [
      "Corporate Formation & SEC",
      "Contract Drafting & Review",
      "BIR Tax Disputes",
      "Labor & Employment Compliance",
      "Intellectual Property",
    ],
  },
  {
    id: "att-3",
    name: "Atty. Beatrice Tan",
    title: "Lead Counsel, Tan Defense Law",
    specialty: "Criminal Defense & Litigation",
    rating: 5.0,
    reviewsCount: 85,
    experienceYears: 9,
    isAvailable: false,
    about:
      "Atty. Beatrice Tan is an experienced trial attorney focused on criminal defense, cybercrime litigation, and human rights representation. With an exceptional track record before Metropolitan and Regional Trial Courts, she is fiercely dedicated to upholding the constitutional rights and due process of every client she represents.",
    education: "University of Santo Tomas Faculty of Civil Law (Juris Doctor)",
    ibpChapter: "IBP Manila Chapter • Roll No. 62450",
    location: "Ermita, City of Manila",
    languages: ["English", "Filipino", "Hiligaynon"],
    expertise: [
      "Criminal Defense & Bail",
      "Cybercrime & RA 10175",
      "Inquest & Preliminary Investigation",
      "Human Rights & VAWC",
      "Appellate Practice",
    ],
  },
];
