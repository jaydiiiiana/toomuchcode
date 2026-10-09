/**
 * Shared constants for the Welcome screen (Plain White Theme).
 */

export const COLORS = {
  surface: "#FFFFFF",
  surfaceCard: "#FFFFFF",
  surfaceBorder: "#E2E8F0",
  primary: "#0284C7",
  primaryDark: "#0369A1",
  primaryLight: "#E0F2FE",
  accent: "#D97706",
  accentLight: "#FEF3C7",
  textPrimary: "#0F172A",
  textSecondary: "#475569",
  textMuted: "#64748B",
} as const;

export const MASCOT_IMAGE = require("../../../assets/robot-mascot.png");
export const LOGO_WORDMARK = require("../../../assets/Lexora Gold and Black Wordmark.png");

export const WELCOME_COPY = {
  badge: "Your Legal Companion",
  heading: "Welcome",
  description:
    "Find the help you need and connect with trusted attorneys — all in one place. Whether you have a quick question or need full representation, Lexora is here to guide you every step of the way.",
  cta: "Get Started",
} as const;

export const AUTH_MODAL_COPY = {
  title: "Get Started",
  subtitle: "Choose how you'd like to continue to Lexora",
  loginTitle: "Log In",
  loginSubtitle: "Sign in with your existing account",
  signUpTitle: "Create Account",
  signUpSubtitle: "New to Lexora? Register in minutes",
  disclaimer: "By continuing, you agree to Lexora's Terms of Service and Privacy Policy.",
} as const;

export const TRUST_ITEMS = [
  { label: "Secure & Private", icon: "lock-closed" as const },
  { label: "Verified Attorneys", icon: "checkmark-circle" as const },
  { label: "Free to Start", icon: "bulb" as const },
] as const;
