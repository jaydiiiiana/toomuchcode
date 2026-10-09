/**
 * Question page – Lexora Local AI Legal Companion.
 * Allows users to ask Philippine law questions confidentially without fear or shyness.
 */
import React, { useRef, useEffect } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AI_COLORS } from "./lib/constants";
import { useAIChat } from "./hooks/useAIChat";
import AIHeader from "./components/AIHeader";
import AIMessageBubble from "./components/AIMessageBubble";
import ThinkingIndicator from "./components/ThinkingIndicator";
import QuickPrompts from "./components/QuickPrompts";
import ChatInput from "./components/ChatInput";

interface QuestionPageProps {
  onBack: () => void;
  onNavigateAction?: (actionType: "consult" | "document" | "emergency") => void;
}

export default function QuestionPage({
  onBack,
  onNavigateAction,
}: QuestionPageProps) {
  const insets = useSafeAreaInsets();
  const flatListRef = useRef<FlatList>(null);
  const {
    messages,
    inputText,
    setInputText,
    isThinking,
    sendMessage,
    clearChat,
  } = useAIChat();

  // Auto scroll to bottom when messages update or thinking
  useEffect(() => {
    const timer = setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);
    return () => clearTimeout(timer);
  }, [messages, isThinking]);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* AI Header */}
      <AIHeader onBack={onBack} onResetChat={clearChat} />

      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        {/* Messages List */}
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <AIMessageBubble
              message={item}
              onSelectAction={onNavigateAction}
            />
          )}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={isThinking ? <ThinkingIndicator /> : null}
        />

        {/* Quick Question Prompts */}
        <QuickPrompts onSelectPrompt={(prompt) => sendMessage(prompt)} />

        {/* Chat Input Bar */}
        <ChatInput
          value={inputText}
          onChangeText={setInputText}
          onSend={() => sendMessage()}
          disabled={isThinking}
        />
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AI_COLORS.surface,
  },
  keyboardContainer: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
});
