/**
 * ChatRow component – A single chat thread row.
 */
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { CHAT_COLORS } from "../lib/constants";
import type { ChatThread } from "../lib/types";

interface ChatRowProps {
  chat: ChatThread;
  onPress?: () => void;
}

export default function ChatRow({ chat, onPress }: ChatRowProps) {
  const hasUnread = chat.unreadCount > 0;

  return (
    <TouchableOpacity style={styles.chatRow} activeOpacity={0.6} onPress={onPress}>
      <View style={styles.avatarContainer}>
        <View style={styles.chatAvatar}>
          <Ionicons name="person" size={20} color={CHAT_COLORS.primary} />
        </View>
        {chat.isOnline && <View style={styles.onlineDot} />}
      </View>

      <View style={styles.chatInfo}>
        <View style={styles.chatTopRow}>
          <Text style={[styles.chatName, hasUnread && styles.chatNameUnread]}>
            {chat.name}
          </Text>
          <Text style={[styles.chatTime, hasUnread && styles.chatTimeUnread]}>
            {chat.time}
          </Text>
        </View>
        <View style={styles.chatBottomRow}>
          <Text
            style={[styles.chatMessage, hasUnread && styles.chatMessageUnread]}
            numberOfLines={1}
          >
            {chat.lastMessage}
          </Text>
          {hasUnread && (
            <View style={styles.unreadBadge}>
              <Text style={styles.unreadText}>{chat.unreadCount}</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  chatRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
  },
  avatarContainer: {
    position: "relative",
  },
  chatAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: CHAT_COLORS.primaryLight,
    alignItems: "center",
    justifyContent: "center",
  },
  onlineDot: {
    position: "absolute",
    bottom: 1,
    right: 1,
    width: 13,
    height: 13,
    borderRadius: 7,
    backgroundColor: CHAT_COLORS.success,
    borderWidth: 2,
    borderColor: CHAT_COLORS.surface,
  },
  chatInfo: {
    flex: 1,
    marginLeft: 12,
  },
  chatTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  chatName: {
    fontSize: 15,
    fontWeight: "600",
    color: CHAT_COLORS.textPrimary,
  },
  chatNameUnread: {
    fontWeight: "800",
  },
  chatTime: {
    fontSize: 12,
    color: CHAT_COLORS.textMuted,
  },
  chatTimeUnread: {
    color: CHAT_COLORS.primary,
    fontWeight: "600",
  },
  chatBottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  chatMessage: {
    fontSize: 13,
    color: CHAT_COLORS.textMuted,
    flex: 1,
    marginRight: 8,
  },
  chatMessageUnread: {
    color: CHAT_COLORS.textSecondary,
    fontWeight: "500",
  },
  unreadBadge: {
    backgroundColor: CHAT_COLORS.primary,
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    paddingHorizontal: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  unreadText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "700",
  },
});
