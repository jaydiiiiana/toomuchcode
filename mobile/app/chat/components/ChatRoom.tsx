/**
 * ChatRoom component – Active 1-on-1 direct conversation screen with an attorney.
 */
import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { CHAT_COLORS } from "../lib/constants";
import { MOCK_THREAD_MESSAGES } from "../lib/mockData";
import type { ChatThread, DirectMessage } from "../lib/types";

interface ChatRoomProps {
  chat: ChatThread;
  onBack: () => void;
}

export default function ChatRoom({ chat, onBack }: ChatRoomProps) {
  const [messages, setMessages] = useState<DirectMessage[]>(
    chat?.id && MOCK_THREAD_MESSAGES[chat.id]
      ? MOCK_THREAD_MESSAGES[chat.id]
      : []
  );
  const [inputText, setInputText] = useState("");
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);
    return () => clearTimeout(timer);
  }, [messages]);

  const handleSend = () => {
    const trimmed = inputText.trim();
    if (!trimmed) return;

    const newMsg: DirectMessage = {
      id: `m-${Date.now()}`,
      senderId: "user",
      text: trimmed,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, newMsg]);
    setInputText("");
  };

  return (
    <View style={styles.container}>
      {/* Chat Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={onBack}
          activeOpacity={0.7}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons name="chevron-back" size={24} color={CHAT_COLORS.textPrimary} />
        </TouchableOpacity>

        <View style={styles.avatarWrap}>
          <View style={styles.avatar}>
            <Ionicons name="person" size={20} color={CHAT_COLORS.primary} />
          </View>
          {chat.isOnline && <View style={styles.onlineDot} />}
        </View>

        <View style={styles.headerInfo}>
          <Text style={styles.headerName} numberOfLines={1}>
            {chat.name}
          </Text>
          <Text style={styles.headerSub}>
            {chat.isOnline ? "Active now" : "Offline"}
            {chat.specialty ? ` • ${chat.specialty}` : ""}
          </Text>
        </View>

        {/* Quick Call Actions */}
        <View style={styles.headerActions}>
          <TouchableOpacity
            style={styles.actionIconBtn}
            activeOpacity={0.7}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Ionicons name="call-outline" size={20} color={CHAT_COLORS.primary} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionIconBtn}
            activeOpacity={0.7}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Ionicons name="videocam-outline" size={20} color={CHAT_COLORS.primary} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Message List */}
      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            const isUser = item.senderId === "user";
            return (
              <View
                style={[
                  styles.msgRow,
                  isUser ? styles.msgRowUser : styles.msgRowOther,
                ]}
              >
                <View
                  style={[
                    styles.bubble,
                    isUser ? styles.bubbleUser : styles.bubbleOther,
                  ]}
                >
                  <Text
                    style={[
                      styles.msgText,
                      isUser ? styles.msgTextUser : styles.msgTextOther,
                    ]}
                  >
                    {item.text}
                  </Text>
                  <Text
                    style={[
                      styles.msgTime,
                      isUser ? styles.msgTimeUser : styles.msgTimeOther,
                    ]}
                  >
                    {item.timestamp}
                  </Text>
                </View>
              </View>
            );
          }}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Ionicons
                name="chatbubble-ellipses-outline"
                size={48}
                color={CHAT_COLORS.border}
              />
              <Text style={styles.emptyText}>No messages yet</Text>
              <Text style={styles.emptySub}>
                Say hello to {chat.name} to start your consultation!
              </Text>
            </View>
          }
        />

        {/* Message Input Bar */}
        <View style={styles.inputContainer}>
          <TouchableOpacity
            style={styles.attachBtn}
            activeOpacity={0.7}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Ionicons name="attach" size={22} color={CHAT_COLORS.textMuted} />
          </TouchableOpacity>

          <TextInput
            style={styles.textInput}
            placeholder={`Message ${
              chat?.name ? chat.name.split(" ")[1] || chat.name : "attorney"
            }...`}
            placeholderTextColor={CHAT_COLORS.textMuted}
            value={inputText}
            onChangeText={setInputText}
            multiline
            maxLength={1000}
          />

          <TouchableOpacity
            style={[
              styles.sendBtn,
              inputText.trim().length > 0
                ? styles.sendBtnActive
                : styles.sendBtnDisabled,
            ]}
            onPress={handleSend}
            disabled={inputText.trim().length === 0}
            activeOpacity={0.7}
          >
            <Ionicons
              name="paper-plane"
              size={17}
              color={inputText.trim().length > 0 ? "#FFFFFF" : CHAT_COLORS.textMuted}
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CHAT_COLORS.surface,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: CHAT_COLORS.border,
    backgroundColor: CHAT_COLORS.surface,
  },
  backBtn: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: CHAT_COLORS.surfaceCard,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  avatarWrap: {
    position: "relative",
    marginRight: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: CHAT_COLORS.primaryLight,
    alignItems: "center",
    justifyContent: "center",
  },
  onlineDot: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: CHAT_COLORS.primary,
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },
  headerInfo: {
    flex: 1,
  },
  headerName: {
    fontSize: 15.5,
    fontWeight: "700",
    color: CHAT_COLORS.textPrimary,
  },
  headerSub: {
    fontSize: 11.5,
    color: CHAT_COLORS.textSecondary,
    marginTop: 1,
  },
  headerActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  actionIconBtn: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: CHAT_COLORS.surfaceCard,
    alignItems: "center",
    justifyContent: "center",
  },
  keyboardContainer: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  msgRow: {
    marginVertical: 4,
    flexDirection: "row",
  },
  msgRowUser: {
    justifyContent: "flex-end",
  },
  msgRowOther: {
    justifyContent: "flex-start",
  },
  bubble: {
    maxWidth: "78%",
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  bubbleUser: {
    backgroundColor: CHAT_COLORS.primary,
    borderBottomRightRadius: 4,
  },
  bubbleOther: {
    backgroundColor: CHAT_COLORS.surfaceCard,
    borderWidth: 1,
    borderColor: CHAT_COLORS.border,
    borderBottomLeftRadius: 4,
  },
  msgText: {
    fontSize: 14,
    lineHeight: 20,
  },
  msgTextUser: {
    color: "#FFFFFF",
  },
  msgTextOther: {
    color: CHAT_COLORS.textPrimary,
  },
  msgTime: {
    fontSize: 10,
    marginTop: 4,
    alignSelf: "flex-end",
  },
  msgTimeUser: {
    color: "rgba(255,255,255,0.75)",
  },
  msgTimeOther: {
    color: CHAT_COLORS.textMuted,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 80,
    paddingHorizontal: 32,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: "700",
    color: CHAT_COLORS.textPrimary,
    marginTop: 12,
  },
  emptySub: {
    fontSize: 13,
    color: CHAT_COLORS.textMuted,
    textAlign: "center",
    marginTop: 4,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: CHAT_COLORS.border,
    backgroundColor: CHAT_COLORS.surface,
    gap: 8,
  },
  attachBtn: {
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
  },
  textInput: {
    flex: 1,
    backgroundColor: CHAT_COLORS.surfaceInput,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 7,
    fontSize: 14,
    color: CHAT_COLORS.textPrimary,
    maxHeight: 90,
    borderWidth: 1,
    borderColor: CHAT_COLORS.border,
  },
  sendBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  sendBtnActive: {
    backgroundColor: CHAT_COLORS.primary,
  },
  sendBtnDisabled: {
    backgroundColor: "transparent",
  },
});
