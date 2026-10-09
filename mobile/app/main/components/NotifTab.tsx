/**
 * Notifications tab – Grouped notifications with read/unread states.
 */
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MAIN_COLORS } from "../lib/constants";
import { MOCK_NOTIFICATIONS } from "../lib/mockData";
import type { NotificationItem } from "../lib/types";

const NOTIF_TYPE_COLORS: Record<string, string> = {
  appointment: "#0284C7",
  message: "#7C3AED",
  system: "#059669",
  promo: "#F59E0B",
};

export default function NotifTab() {
  const insets = useSafeAreaInsets();
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const toggleRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: !n.isRead } : n))
    );
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
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
          <TouchableOpacity onPress={markAllRead} style={styles.markAllBtn}>
            <Ionicons name="checkmark-done" size={18} color={MAIN_COLORS.primary} />
            <Text style={styles.markAllText}>Mark all read</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* List */}
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <NotifRow item={item} onPress={() => toggleRead(item.id)} />
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Ionicons name="notifications-off-outline" size={56} color={MAIN_COLORS.border} />
            <Text style={styles.emptyTitle}>All caught up!</Text>
            <Text style={styles.emptyBody}>
              You have no new notifications right now.
            </Text>
          </View>
        }
      />
    </View>
  );
}

function NotifRow({
  item,
  onPress,
}: {
  item: NotificationItem;
  onPress: () => void;
}) {
  const typeColor = NOTIF_TYPE_COLORS[item.type] || MAIN_COLORS.primary;

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
  container: {
    flex: 1,
    backgroundColor: MAIN_COLORS.surface,
  },
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
    color: MAIN_COLORS.textPrimary,
  },
  subtitle: {
    fontSize: 13,
    color: MAIN_COLORS.textMuted,
    marginTop: 2,
  },
  markAllBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    backgroundColor: MAIN_COLORS.primaryLight,
  },
  markAllText: {
    fontSize: 12,
    fontWeight: "600",
    color: MAIN_COLORS.primary,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  notifRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 14,
    marginBottom: 6,
  },
  notifRowUnread: {
    backgroundColor: MAIN_COLORS.primaryLight,
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
    color: MAIN_COLORS.textPrimary,
    flex: 1,
  },
  notifTitleUnread: {
    fontWeight: "800",
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: MAIN_COLORS.primary,
    marginLeft: 8,
  },
  notifBody: {
    fontSize: 13,
    color: MAIN_COLORS.textMuted,
    marginTop: 3,
    lineHeight: 18,
  },
  notifTime: {
    fontSize: 11,
    color: MAIN_COLORS.textMuted,
    marginTop: 6,
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 80,
    paddingHorizontal: 32,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: MAIN_COLORS.textPrimary,
    marginTop: 16,
  },
  emptyBody: {
    fontSize: 14,
    color: MAIN_COLORS.textMuted,
    textAlign: "center",
    marginTop: 6,
    lineHeight: 20,
  },
});
