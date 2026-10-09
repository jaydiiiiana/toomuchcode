/**
 * Shared constants for the Welcome screen (Plain White Theme).
 */

export const COLORS = {
  surface: "#FFFFFF",
  surfaceCard: "#FFFFFF",
  surfaceBorder: "#D8E6F5",
  primary: "#5B9BD5",
  primaryDark: "#2B6CB0",
  primaryLight: "#EBF3FA",
  accent: "#5B9BD5",
  accentLight: "#EBF3FA",
  textPrimary: "#1E293B",
  textSecondary: "#475569",
  textMuted: "#88A3C0",
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
