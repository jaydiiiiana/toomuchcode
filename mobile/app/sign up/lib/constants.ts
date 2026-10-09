/**
 * Constants and copy for the Sign Up screen.
 */

export const SIGNUP_COPY = {
  title: "Create Account",
  subtitle: "Join Lexora to connect with verified legal professionals",
  nameLabel: "Full Name",
  namePlaceholder: "John Doe",
  emailLabel: "Email Address",
  emailPlaceholder: "name@example.com",
  phoneLabel: "Phone Number (PH 11-digit)",
  phonePlaceholder: "09XXXXXXXXX",
  passwordLabel: "Password",
  passwordPlaceholder: "At least 8 characters",
  confirmPasswordLabel: "Confirm Password",
  confirmPasswordPlaceholder: "Re-enter your password",
  termsLabel: "I agree to the Terms of Service and Privacy Policy",
  submitButton: "Create Account",
  dividerText: "or sign up with",
  googleButton: "Google",
  appleButton: "Apple",
  footerText: "Already have an account?",
  footerLink: "Log In",
} as const;

export const SIGNUP_COLORS = {
  surface: "#FFFFFF",
  surfaceInput: "#F8FAFC",
  border: "#E2E8F0",
  borderFocus: "#0284C7",
  primary: "#0284C7",
  primaryDark: "#0369A1",
  primaryLight: "#E0F2FE",
  textPrimary: "#0F172A",
  textSecondary: "#475569",
  textMuted: "#64748B",
  error: "#EF4444",
} as const;
