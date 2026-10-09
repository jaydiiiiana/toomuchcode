/**
 * Notifications page – Main entry point for the Notif screen.
 */
import React, { useState } from "react";
import { View, StyleSheet, FlatList, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { NOTIF_COLORS } from "./lib/constants";
import { useNotifications } from "./hooks/useNotifications";
import NotifHeader from "./components/NotifHeader";
import NotifRow from "./components/NotifRow";
import NotificationDetailModal from "./components/NotificationDetailModal";
import type { NotificationItem } from "./lib/types";

export default function NotifPage() {
  const insets = useSafeAreaInsets();
  const { notifications, unreadCount, markAllRead, toggleRead } = useNotifications();
  const [selectedNotif, setSelectedNotif] = useState<NotificationItem | null>(null);

  const handlePressNotif = (item: NotificationItem) => {
    if (!item.isRead) {
      toggleRead(item.id);
    }
    setSelectedNotif(item);
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <NotifHeader unreadCount={unreadCount} onMarkAllRead={markAllRead} />

      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <NotifRow item={item} onPress={() => handlePressNotif(item)} />
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Ionicons name="notifications-off-outline" size={56} color={NOTIF_COLORS.border} />
            <Text style={styles.emptyTitle}>All caught up!</Text>
            <Text style={styles.emptyBody}>
              You have no new notifications right now.
            </Text>
          </View>
        }
      />

      {/* Full Notification Detail Modal */}
      <NotificationDetailModal
        notification={selectedNotif}
        visible={!!selectedNotif}
        onClose={() => setSelectedNotif(null)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: NOTIF_COLORS.surface,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 24,
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
    color: NOTIF_COLORS.textPrimary,
    marginTop: 16,
  },
  emptyBody: {
    fontSize: 14,
    color: NOTIF_COLORS.textMuted,
    textAlign: "center",
    marginTop: 6,
    lineHeight: 20,
  },
});
