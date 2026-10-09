/**
 * Constants for the Notifications screen.
 */

export const NOTIF_COLORS = {
  surface: "#FFFFFF",
  surfaceCard: "#F8FAFC",
  border: "#E2E8F0",
  primary: "#0284C7",
  primaryLight: "#E0F2FE",
  textPrimary: "#0F172A",
  textSecondary: "#475569",
  textMuted: "#64748B",
} as const;

export const NOTIF_TYPE_COLORS: Record<string, string> = {
  appointment: "#0284C7",
  message: "#7C3AED",
  system: "#059669",
  promo: "#F59E0B",
};
