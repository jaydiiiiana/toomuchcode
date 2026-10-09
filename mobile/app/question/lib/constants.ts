/**
 * Constants for the AI Legal Question screen.
 */

export const AI_COLORS = {
  surface: "#FFFFFF",
  surfaceCard: "#F8FAFC",
  surfaceInput: "#F1F5F9",
  border: "#E2E8F0",
  primary: "#0284C7",
  primaryDark: "#0369A1",
  primaryLight: "#E0F2FE",
  aiBubble: "#F0F9FF",
  aiBorder: "#BAE6FD",
  userBubble: "#0284C7",
  userText: "#FFFFFF",
  textPrimary: "#0F172A",
  textSecondary: "#475569",
  textMuted: "#94A3B8",
  accent: "#7C3AED",
  accentLight: "#EDE9FE",
  success: "#10B981",
  successLight: "#D1FAE5",
  warning: "#F59E0B",
  warningLight: "#FEF3C7",
};

export const AI_MASCOT_IMAGE = require("../../../assets/Glossy Cyan-Eyed Robot Mascot.png");

export const AI_PROFILE = {
  name: "Lexora AI",
  badge: "Local Legal Companion",
  tagline: "Confidential Philippine Law Assistant",
  welcomeMessage:
    "Kumusta! I'm Lexora AI, your personal and confidential Philippine legal companion. 🤖✨\n\nIf you're unsure about a legal issue or shy to consult an attorney right away, you can freely ask me anything about Philippine laws, labor rights, tenancy, cyberlibel, and more!",
};

export const SUGGESTED_QUESTIONS = [
  {
    id: "q1",
    label: "Tenant Rights",
    prompt: "Can my landlord immediately evict me if I am late on rent?",
  },
  {
    id: "q2",
    label: "13th Month Pay",
    prompt: "Am I entitled to 13th month pay if I resigned before December?",
  },
  {
    id: "q3",
    label: "Cyberlibel",
    prompt: "What is cyberlibel in the Philippines and what makes a post illegal?",
  },
  {
    id: "q4",
    label: "Small Claims",
    prompt: "How does the Small Claims Court work in the Philippines?",
  },
  {
    id: "q5",
    label: "Illegal Dismissal",
    prompt: "What should I do if my employer fired me without due process?",
  },
];
