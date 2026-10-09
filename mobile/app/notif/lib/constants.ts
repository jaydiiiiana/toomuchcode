/**
 * Constants for the Notifications screen.
 */

export const NOTIF_COLORS = {
  surface: "#FFFFFF",
  surfaceCard: "#F4F8FC",
  border: "#D8E6F5",
  primary: "#5B9BD5",
  primaryDark: "#2B6CB0",
  primaryLight: "#EBF3FA",
  textPrimary: "#1E293B",
  textSecondary: "#475569",
  textMuted: "#88A3C0",
} as const;

export const NOTIF_TYPE_COLORS: Record<string, string> = {
  appointment: "#5B9BD5",
  message: "#4A88C7",
  system: "#6BA4DF",
  promo: "#3A78B7",
};
