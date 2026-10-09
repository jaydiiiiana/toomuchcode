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
  surfaceInput: "#F4F8FC",
  border: "#D8E6F5",
  borderFocus: "#5B9BD5",
  primary: "#5B9BD5",
  primaryDark: "#2B6CB0",
  primaryLight: "#EBF3FA",
  textPrimary: "#1E293B",
  textSecondary: "#475569",
  textMuted: "#88A3C0",
  error: "#DC2626",
} as const;
