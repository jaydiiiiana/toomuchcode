/**
 * ProfileCard component – Shows user avatar, name, email, and stats.
 */
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { PROFILE_COLORS } from "../lib/constants";
import type { UserProfile } from "../lib/types";

interface ProfileCardProps {
  user: UserProfile;
}

export default function ProfileCard({ user }: ProfileCardProps) {
  return (
    <View style={styles.profileCard}>
      <View style={styles.avatarLarge}>
        <Ionicons name="person" size={36} color={PROFILE_COLORS.primary} />
      </View>
      <Text style={styles.profileName}>{user.name}</Text>
      <Text style={styles.profileEmail}>{user.email}</Text>
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
          <Text style={styles.statLabel}>Reviews</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  profileCard: {
    alignItems: "center",
    paddingTop: 24,
    paddingBottom: 20,
    backgroundColor: PROFILE_COLORS.surface,
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
