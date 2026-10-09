/**
 * AIMessageBubble component – Renders user and AI messages with legal citations.
 */
import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AI_COLORS, AI_MASCOT_IMAGE } from "../lib/constants";
import type { ChatMessage } from "../lib/types";

interface AIMessageBubbleProps {
  message: ChatMessage;
  onSelectAction?: (actionType: "consult" | "document" | "emergency") => void;
}

export default function AIMessageBubble({
  message,
  onSelectAction,
}: AIMessageBubbleProps) {
  const isAI = message.sender === "ai";

  return (
    <View
      style={[
        styles.rowContainer,
        isAI ? styles.rowAI : styles.rowUser,
      ]}
    >
      {/* AI Avatar */}
      {isAI && (
        <View style={styles.mascotThumb}>
          <Image
            source={AI_MASCOT_IMAGE}
            style={styles.mascotImage}
            resizeMode="contain"
          />
        </View>
      )}

      {/* Message Bubble Content */}
      <View
        style={[
          styles.bubble,
          isAI ? styles.bubbleAI : styles.bubbleUser,
        ]}
      >
        <Text
          style={[
            styles.messageText,
            isAI ? styles.textAI : styles.textUser,
          ]}
        >
          {message.text}
        </Text>

        {/* Legal Citations (if provided by AI) */}
        {isAI && message.legalCitations && message.legalCitations.length > 0 && (
          <View style={styles.citationsBox}>
            <View style={styles.citationsHeader}>
              <Ionicons name="book-outline" size={13} color={AI_COLORS.primaryDark} />
              <Text style={styles.citationsTitle}>Philippine Legal References:</Text>
            </View>
            <View style={styles.chipsRow}>
              {message.legalCitations.map((cite, index) => (
                <View key={index} style={styles.citeChip}>
                  <Text style={styles.citeText}>{cite}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Suggested Next Action */}
        {isAI && message.suggestedAction && (
          <TouchableOpacity
            style={styles.actionSuggestion}
            onPress={() =>
              onSelectAction?.(message.suggestedAction!.actionType)
            }
            activeOpacity={0.7}
          >
            <Ionicons name="arrow-forward-circle" size={16} color={AI_COLORS.primary} />
            <Text style={styles.actionSuggestionText}>
              {message.suggestedAction.label}
            </Text>
          </TouchableOpacity>
        )}

        {/* Timestamp */}
        <Text
          style={[
            styles.timestamp,
            isAI ? styles.timestampAI : styles.timestampUser,
          ]}
        >
          {message.timestamp}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  rowContainer: {
    marginVertical: 6,
    flexDirection: "row",
    alignItems: "flex-end",
  },
  rowAI: {
    justifyContent: "flex-start",
  },
  rowUser: {
    justifyContent: "flex-end",
  },
  mascotThumb: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: AI_COLORS.primaryLight,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
    marginBottom: 2,
    borderWidth: 1,
    borderColor: AI_COLORS.border,
  },
  mascotImage: {
    width: 28,
    height: 28,
  },
  bubble: {
    maxWidth: "80%",
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  bubbleAI: {
    backgroundColor: AI_COLORS.aiBubble,
    borderWidth: 1,
    borderColor: AI_COLORS.aiBorder,
    borderBottomLeftRadius: 4,
  },
  bubbleUser: {
    backgroundColor: AI_COLORS.userBubble,
    borderBottomRightRadius: 4,
  },
  messageText: {
    fontSize: 14.5,
    lineHeight: 21,
  },
  textAI: {
    color: AI_COLORS.textPrimary,
  },
  textUser: {
    color: AI_COLORS.userText,
  },
  citationsBox: {
    marginTop: 10,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: AI_COLORS.aiBorder,
  },
  citationsHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginBottom: 6,
  },
  citationsTitle: {
    fontSize: 11.5,
    fontWeight: "700",
    color: AI_COLORS.primaryDark,
  },
  chipsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 5,
  },
  citeChip: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: AI_COLORS.aiBorder,
  },
  citeText: {
    fontSize: 11,
    fontWeight: "600",
    color: AI_COLORS.primaryDark,
  },
  actionSuggestion: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 10,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: AI_COLORS.primaryLight,
  },
  actionSuggestionText: {
    fontSize: 12.5,
    fontWeight: "700",
    color: AI_COLORS.primary,
  },
  timestamp: {
    fontSize: 10,
    marginTop: 6,
    alignSelf: "flex-end",
  },
  timestampAI: {
    color: AI_COLORS.textMuted,
  },
  timestampUser: {
    color: "rgba(255,255,255,0.7)",
  },
});
