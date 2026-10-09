/**
 * ChatHeader component – Title and compose button.
 */
import React from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { CHAT_COLORS } from "../lib/constants";

interface ChatHeaderProps {
  searchQuery: string;
  onChangeSearch: (val: string) => void;
}

export default function ChatHeader({ searchQuery, onChangeSearch }: ChatHeaderProps) {
  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.title}>Messages</Text>
        <TouchableOpacity style={styles.composeBtn}>
          <Ionicons name="create-outline" size={22} color={CHAT_COLORS.primary} />
        </TouchableOpacity>
      </View>

      <View style={styles.searchWrapper}>
        <View style={styles.searchBar}>
          <Ionicons name="search-outline" size={18} color={CHAT_COLORS.textMuted} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search conversations..."
            placeholderTextColor={CHAT_COLORS.textMuted}
            value={searchQuery}
            onChangeText={onChangeSearch}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
    color: CHAT_COLORS.textPrimary,
  },
  composeBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: CHAT_COLORS.primaryLight,
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
    backgroundColor: CHAT_COLORS.surfaceInput,
    borderRadius: 12,
    paddingHorizontal: 14,
    height: 42,
    borderWidth: 1,
    borderColor: CHAT_COLORS.border,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: CHAT_COLORS.textPrimary,
    marginLeft: 8,
  },
});
