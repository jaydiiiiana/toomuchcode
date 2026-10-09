/**
 * Chat tab – List of chat threads with attorneys and support.
 * Synced with Firestore in real-time.
 */
import React, { useState, useEffect, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MAIN_COLORS } from "../lib/constants";
import type { ChatThread } from "../lib/types";
import { subscribeToChatThreads } from "../../services/firestoreChatService";

export default function ChatTab() {
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState("");
  const [threads, setThreads] = useState<ChatThread[]>([]);

  useEffect(() => {
    const unsubscribe = subscribeToChatThreads((updatedThreads) => {
      setThreads(updatedThreads as unknown as ChatThread[]);
    });

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  const filteredChats = useMemo(
    () =>
      threads.filter(
        (c) =>
          c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (c.lastMessage && c.lastMessage.toLowerCase().includes(searchQuery.toLowerCase()))
      ),
    [threads, searchQuery]
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Messages</Text>
        <TouchableOpacity style={styles.composeBtn}>
          <Ionicons name="create-outline" size={22} color={MAIN_COLORS.primary} />
        </TouchableOpacity>
      </View>

      {/* Search */}
      <View style={styles.searchWrapper}>
        <View style={styles.searchBar}>
          <Ionicons name="search-outline" size={18} color={MAIN_COLORS.textMuted} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search conversations..."
            placeholderTextColor={MAIN_COLORS.textMuted}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      {/* Chat List */}
      <FlatList
        data={filteredChats}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ChatRow chat={item} />}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Ionicons name="chatbubbles-outline" size={56} color={MAIN_COLORS.border} />
            <Text style={styles.emptyTitle}>No conversations yet</Text>
            <Text style={styles.emptyBody}>
              Start a consultation to begin messaging with an attorney.
            </Text>
          </View>
        }
      />
    </View>
  );
}

function ChatRow({ chat }: { chat: ChatThread }) {
  const hasUnread = (chat.unreadCount || 0) > 0;

  return (
    <TouchableOpacity style={styles.chatRow} activeOpacity={0.6}>
      <View style={styles.avatarContainer}>
        <View style={styles.chatAvatar}>
          <Ionicons name="person" size={20} color={MAIN_COLORS.primary} />
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
  container: {
    flex: 1,
    backgroundColor: MAIN_COLORS.surface,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 8,
  },
  title: {
    fontSize: 26,
    fontWeight: "800",
    color: MAIN_COLORS.textPrimary,
  },
  composeBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: MAIN_COLORS.primaryLight,
    alignItems: "center",
    justifyContent: "center",
  },
  searchWrapper: {
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: MAIN_COLORS.surfaceInput,
    borderRadius: 12,
    paddingHorizontal: 14,
    height: 42,
    borderWidth: 1,
    borderColor: MAIN_COLORS.border,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: MAIN_COLORS.textPrimary,
    marginLeft: 8,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  separator: {
    height: 1,
    backgroundColor: MAIN_COLORS.border,
    marginLeft: 68,
  },
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
    backgroundColor: MAIN_COLORS.primaryLight,
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
    backgroundColor: "#10B981",
    borderWidth: 2,
    borderColor: MAIN_COLORS.surface,
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
    color: MAIN_COLORS.textPrimary,
  },
  chatNameUnread: {
    fontWeight: "800",
  },
  chatTime: {
    fontSize: 12,
    color: MAIN_COLORS.textMuted,
  },
  chatTimeUnread: {
    color: MAIN_COLORS.primary,
    fontWeight: "600",
  },
  chatBottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  chatMessage: {
    fontSize: 13,
    color: MAIN_COLORS.textMuted,
    flex: 1,
    marginRight: 8,
  },
  chatMessageUnread: {
    color: MAIN_COLORS.textSecondary,
    fontWeight: "500",
  },
  unreadBadge: {
    backgroundColor: MAIN_COLORS.primary,
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
