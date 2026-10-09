/**
 * AIHeader component – Top bar with back button, Robot Mascot profile, and online status.
 */
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AI_COLORS, AI_MASCOT_IMAGE, AI_PROFILE } from "../lib/constants";

interface AIHeaderProps {
  onBack: () => void;
  onResetChat?: () => void;
}

export default function AIHeader({ onBack, onResetChat }: AIHeaderProps) {
  return (
    <View style={styles.header}>
      {/* Back Button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={onBack}
        activeOpacity={0.7}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <Ionicons name="chevron-back" size={24} color={AI_COLORS.textPrimary} />
      </TouchableOpacity>

      {/* Mascot Profile & Identity */}
      <View style={styles.profileSection}>
        <View style={styles.avatarWrapper}>
          <Image
            source={AI_MASCOT_IMAGE}
            style={styles.avatarImage}
            resizeMode="contain"
          />
          <View style={styles.onlineBadge} />
        </View>

        <View style={styles.profileTextWrapper}>
          <View style={styles.nameRow}>
            <Text style={styles.name}>{AI_PROFILE.name}</Text>
            <View style={styles.verifiedChip}>
              <Ionicons name="sparkles" size={10} color={AI_COLORS.primaryDark} />
              <Text style={styles.verifiedText}>Legal AI</Text>
            </View>
          </View>
          <Text style={styles.statusText}>Confidential • Philippine Law</Text>
        </View>
      </View>

      {/* Reset Chat / Actions */}
      <TouchableOpacity
        style={styles.actionBtn}
        onPress={onResetChat}
        activeOpacity={0.7}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <Ionicons name="refresh-outline" size={20} color={AI_COLORS.textSecondary} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: AI_COLORS.surface,
    borderBottomWidth: 1,
    borderBottomColor: AI_COLORS.border,
  },
  backButton: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: AI_COLORS.surfaceCard,
    alignItems: "center",
    justifyContent: "center",
  },
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginLeft: 12,
  },
  avatarWrapper: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: AI_COLORS.primaryLight,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    overflow: "visible",
  },
  avatarImage: {
    width: 40,
    height: 40,
  },
  onlineBadge: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: AI_COLORS.success,
    borderWidth: 2,
    borderColor: AI_COLORS.surface,
  },
  profileTextWrapper: {
    marginLeft: 10,
    justifyContent: "center",
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  name: {
    fontSize: 16,
    fontWeight: "700",
    color: AI_COLORS.textPrimary,
  },
  verifiedChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    backgroundColor: AI_COLORS.primaryLight,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
  },
  verifiedText: {
    fontSize: 10,
    fontWeight: "700",
    color: AI_COLORS.primaryDark,
  },
  statusText: {
    fontSize: 12,
    color: AI_COLORS.textSecondary,
    marginTop: 1,
  },
  actionBtn: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: AI_COLORS.surfaceCard,
    alignItems: "center",
    justifyContent: "center",
  },
});
