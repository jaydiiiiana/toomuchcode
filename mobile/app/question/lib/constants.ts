/**
 * Constants for the AI Legal Question screen.
 */

export const AI_COLORS = {
  surface: "#FFFFFF",
  surfaceCard: "#F4F8FC",
  surfaceInput: "#F0F5FA",
  border: "#D8E6F5",
  primary: "#5B9BD5",
  primaryDark: "#2B6CB0",
  primaryLight: "#EBF3FA",
  primarySoft: "#D8E8F8",
  aiBubble: "#F4F8FC",
  aiBorder: "#D8E8F8",
  userBubble: "#5B9BD5",
  userText: "#FFFFFF",
  textPrimary: "#1E293B",
  textSecondary: "#475569",
  textMuted: "#88A3C0",
  accent: "#5B9BD5",
  accentLight: "#EBF3FA",
  success: "#5B9BD5",
  successLight: "#EBF3FA",
  warning: "#5B9BD5",
  warningLight: "#EBF3FA",
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
