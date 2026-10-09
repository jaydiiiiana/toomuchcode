/**
 * NotifRow component – A single notification row.
 */
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { NOTIF_COLORS, NOTIF_TYPE_COLORS } from "../lib/constants";
import type { NotificationItem } from "../lib/types";

interface NotifRowProps {
  item: NotificationItem;
  onPress: () => void;
}

export default function NotifRow({ item, onPress }: NotifRowProps) {
  const typeColor = NOTIF_TYPE_COLORS[item.type] || NOTIF_COLORS.primary;

  return (
    <TouchableOpacity
      style={[styles.notifRow, !item.isRead && styles.notifRowUnread]}
      onPress={onPress}
      activeOpacity={0.6}
    >
      <View style={[styles.notifIcon, { backgroundColor: typeColor + "1A" }]}>
        <Ionicons name={item.icon as any} size={20} color={typeColor} />
      </View>
      <View style={styles.notifContent}>
        <View style={styles.notifTopRow}>
          <Text
            style={[styles.notifTitle, !item.isRead && styles.notifTitleUnread]}
            numberOfLines={1}
          >
            {item.title}
          </Text>
          {!item.isRead && <View style={styles.unreadDot} />}
        </View>
        <Text style={styles.notifBody} numberOfLines={2}>
          {item.body}
        </Text>
        <Text style={styles.notifTime}>{item.time}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  notifRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 14,
    marginBottom: 6,
  },
  notifRowUnread: {
    backgroundColor: NOTIF_COLORS.primaryLight,
  },
  notifIcon: {
    width: 42,
    height: 42,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  notifContent: {
    flex: 1,
    marginLeft: 12,
  },
  notifTopRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  notifTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: NOTIF_COLORS.textPrimary,
    flex: 1,
  },
  notifTitleUnread: {
    fontWeight: "800",
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: NOTIF_COLORS.primary,
    marginLeft: 8,
  },
  notifBody: {
    fontSize: 13,
    color: NOTIF_COLORS.textMuted,
    marginTop: 3,
    lineHeight: 18,
  },
  notifTime: {
    fontSize: 11,
    color: NOTIF_COLORS.textMuted,
    marginTop: 6,
  },
});
