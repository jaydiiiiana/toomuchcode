/**
 * Chat page – Main entry point for the Chat screen.
 */
import React from "react";
import { View, StyleSheet, FlatList, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { CHAT_COLORS } from "./lib/constants";
import { useChatSearch } from "./hooks/useChatSearch";
import ChatHeader from "./components/ChatHeader";
import ChatRow from "./components/ChatRow";

export default function ChatPage() {
  const insets = useSafeAreaInsets();
  const { searchQuery, setSearchQuery, filteredChats } = useChatSearch();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ChatHeader searchQuery={searchQuery} onChangeSearch={setSearchQuery} />

      <FlatList
        data={filteredChats}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ChatRow chat={item} />}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Ionicons name="chatbubbles-outline" size={56} color={CHAT_COLORS.border} />
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CHAT_COLORS.surface,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  separator: {
    height: 1,
    backgroundColor: CHAT_COLORS.border,
    marginLeft: 68,
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
    color: CHAT_COLORS.textPrimary,
    marginTop: 16,
  },
  emptyBody: {
    fontSize: 14,
    color: CHAT_COLORS.textMuted,
    textAlign: "center",
    marginTop: 6,
    lineHeight: 20,
  },
});
