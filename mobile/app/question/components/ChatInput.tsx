/**
 * ChatInput component – Input bar with send button and disclaimer.
 */
import React from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AI_COLORS } from "../lib/constants";

interface ChatInputProps {
  value: string;
  onChangeText: (text: string) => void;
  onSend: () => void;
  disabled?: boolean;
}

export default function ChatInput({
  value,
  onChangeText,
  onSend,
  disabled = false,
}: ChatInputProps) {
  const canSend = value.trim().length > 0 && !disabled;

  return (
    <View style={styles.container}>
      <View style={styles.inputBar}>
        <TextInput
          style={styles.input}
          placeholder="Ask anything about Philippine laws..."
          placeholderTextColor={AI_COLORS.textMuted}
          value={value}
          onChangeText={onChangeText}
          multiline
          maxLength={1000}
          editable={!disabled}
        />

        <TouchableOpacity
          style={[
            styles.sendButton,
            canSend ? styles.sendButtonActive : styles.sendButtonDisabled,
          ]}
          onPress={onSend}
          disabled={!canSend}
          activeOpacity={0.7}
        >
          <Ionicons
            name="paper-plane"
            size={18}
            color={canSend ? "#FFFFFF" : AI_COLORS.textMuted}
          />
        </TouchableOpacity>
      </View>

      <Text style={styles.disclaimerText}>
        Lexora AI provides legal information, not formal attorney advice.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: AI_COLORS.surface,
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: Platform.OS === "ios" ? 12 : 8,
    borderTopWidth: 1,
    borderTopColor: AI_COLORS.border,
  },
  inputBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: AI_COLORS.surfaceInput,
    borderRadius: 24,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: AI_COLORS.border,
  },
  input: {
    flex: 1,
    fontSize: 14.5,
    color: AI_COLORS.textPrimary,
    maxHeight: 100,
    paddingTop: 6,
    paddingBottom: 6,
  },
  sendButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 8,
  },
  sendButtonActive: {
    backgroundColor: AI_COLORS.primary,
  },
  sendButtonDisabled: {
    backgroundColor: "transparent",
  },
  disclaimerText: {
    fontSize: 10.5,
    color: AI_COLORS.textMuted,
    textAlign: "center",
    marginTop: 6,
  },
});
