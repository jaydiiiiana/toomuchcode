/**
 * QuickPrompts component – Horizontal list of suggested questions.
 */
import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AI_COLORS, SUGGESTED_QUESTIONS } from "../lib/constants";

interface QuickPromptsProps {
  onSelectPrompt: (promptText: string) => void;
}

export default function QuickPrompts({ onSelectPrompt }: QuickPromptsProps) {
  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Ionicons name="flash-outline" size={13} color={AI_COLORS.accent} />
        <Text style={styles.headerLabel}>Popular Philippine Law Topics:</Text>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {SUGGESTED_QUESTIONS.map((q) => (
          <TouchableOpacity
            key={q.id}
            style={styles.chip}
            onPress={() => onSelectPrompt(q.prompt)}
            activeOpacity={0.7}
          >
            <Text style={styles.chipText}>{q.label}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
    backgroundColor: AI_COLORS.surface,
    borderTopWidth: 1,
    borderTopColor: AI_COLORS.border,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 16,
    marginBottom: 6,
  },
  headerLabel: {
    fontSize: 11,
    fontWeight: "700",
    color: AI_COLORS.textMuted,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  scrollContent: {
    paddingHorizontal: 16,
    gap: 8,
  },
  chip: {
    backgroundColor: AI_COLORS.accentLight,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#DDD6FE",
  },
  chipText: {
    fontSize: 12,
    fontWeight: "600",
    color: AI_COLORS.accent,
  },
});
