/**
 * NotifHeader component – Title, unread count, and mark-all button.
 */
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { NOTIF_COLORS } from "../lib/constants";

interface NotifHeaderProps {
  unreadCount: number;
  onMarkAllRead: () => void;
}

export default function NotifHeader({ unreadCount, onMarkAllRead }: NotifHeaderProps) {
  return (
    <View style={styles.header}>
      <View>
        <Text style={styles.title}>Notifications</Text>
        {unreadCount > 0 && (
          <Text style={styles.subtitle}>
            {unreadCount} unread notification{unreadCount > 1 ? "s" : ""}
          </Text>
        )}
      </View>
      {unreadCount > 0 && (
        <TouchableOpacity onPress={onMarkAllRead} style={styles.markAllBtn}>
          <Ionicons name="checkmark-done" size={18} color={NOTIF_COLORS.primary} />
          <Text style={styles.markAllText}>Mark all read</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
  },
  title: {
    fontSize: 26,
    fontWeight: "800",
    color: NOTIF_COLORS.textPrimary,
  },
  subtitle: {
    fontSize: 13,
    color: NOTIF_COLORS.textMuted,
    marginTop: 2,
  },
  markAllBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    backgroundColor: NOTIF_COLORS.primaryLight,
  },
  markAllText: {
    fontSize: 12,
    fontWeight: "600",
    color: NOTIF_COLORS.primary,
  },
});
