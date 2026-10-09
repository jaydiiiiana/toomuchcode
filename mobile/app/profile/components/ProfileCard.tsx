/**
 * ProfileCard component – Shows user avatar, name, email, role badge, and stats.
 * Displays real data from Firebase + local SQLite.
 */
import React from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { PROFILE_COLORS } from "../lib/constants";
import type { UserProfile } from "../lib/types";

interface ProfileCardProps {
  user: UserProfile;
  loading?: boolean;
  isOnline?: boolean;
}

export default function ProfileCard({ user, loading, isOnline }: ProfileCardProps) {
  /** Get initials for the avatar circle */
  const getInitials = (name: string): string => {
    if (!name || name === "Loading...") return "?";
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  const roleBadgeColor =
    user.role === "attorney"
      ? "#10B981"
      : user.role === "admin"
      ? "#F59E0B"
      : PROFILE_COLORS.primary;

  return (
    <View style={styles.profileCard}>
      {/* Online/Offline indicator */}
      <View style={styles.statusRow}>
        <View
          style={[
            styles.statusDot,
            { backgroundColor: isOnline ? "#10B981" : "#94A3B8" },
          ]}
        />
        <Text style={styles.statusText}>
          {isOnline ? "Online" : "Offline"}
        </Text>
      </View>

      {/* Avatar */}
      <View style={styles.avatarLarge}>
        {loading ? (
          <ActivityIndicator size="small" color={PROFILE_COLORS.primary} />
        ) : user.avatarUrl ? (
          <Text style={styles.avatarInitials}>{getInitials(user.name)}</Text>
        ) : (
          <Text style={styles.avatarInitials}>{getInitials(user.name)}</Text>
        )}
      </View>

      {/* Name */}
      <Text style={styles.profileName}>{user.name || "—"}</Text>

      {/* Email */}
      <Text style={styles.profileEmail}>{user.email || "—"}</Text>

      {/* Phone (if available) */}
      {user.phone ? (
        <View style={styles.phoneRow}>
          <Ionicons name="call-outline" size={13} color={PROFILE_COLORS.textMuted} />
          <Text style={styles.phoneText}>{user.phone}</Text>
        </View>
      ) : null}

      {/* Role Badge */}
      <View style={[styles.roleBadge, { backgroundColor: roleBadgeColor + "20" }]}>
        <Ionicons
          name={
            user.role === "attorney"
              ? "briefcase"
              : user.role === "admin"
              ? "shield"
              : "person"
          }
          size={12}
          color={roleBadgeColor}
        />
        <Text style={[styles.roleBadgeText, { color: roleBadgeColor }]}>
          {user.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : "Client"}
        </Text>
      </View>

      {/* Stats */}
      <View style={styles.statRow}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{user.consultationsCount}</Text>
          <Text style={styles.statLabel}>Consultations</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{user.savedCount}</Text>
          <Text style={styles.statLabel}>Saved</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{user.reviewsCount}</Text>
          <Text style={styles.statLabel}>Inquiries</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  profileCard: {
    alignItems: "center",
    paddingTop: 16,
    paddingBottom: 20,
    backgroundColor: PROFILE_COLORS.surface,
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "600",
    color: PROFILE_COLORS.textMuted,
  },
  avatarLarge: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: PROFILE_COLORS.primaryLight,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  avatarInitials: {
    fontSize: 28,
    fontWeight: "700",
    color: PROFILE_COLORS.primary,
  },
  profileName: {
    fontSize: 20,
    fontWeight: "700",
    color: PROFILE_COLORS.textPrimary,
  },
  profileEmail: {
    fontSize: 14,
    color: PROFILE_COLORS.textMuted,
    marginTop: 2,
  },
  phoneRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
    gap: 4,
  },
  phoneText: {
    fontSize: 13,
    color: PROFILE_COLORS.textMuted,
  },
  roleBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginTop: 8,
  },
  roleBadgeText: {
    fontSize: 12,
    fontWeight: "700",
  },
  statRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: PROFILE_COLORS.surfaceCard,
    borderRadius: 16,
    width: "90%",
    justifyContent: "space-around",
  },
  statItem: {
    alignItems: "center",
  },
  statValue: {
    fontSize: 18,
    fontWeight: "700",
    color: PROFILE_COLORS.textPrimary,
  },
  statLabel: {
    fontSize: 12,
    color: PROFILE_COLORS.textMuted,
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: 24,
    backgroundColor: PROFILE_COLORS.border,
  },
});
