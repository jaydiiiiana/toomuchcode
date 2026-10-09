/**
 * ChatRoom component – 1-on-1 direct conversation with attorney.
 * Supports auto-switch to Offline Mode with Local Philippine Legal AI,
 * and automatic Case Intake Summary generation when returning online.
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
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { CHAT_COLORS } from "../lib/constants";
import {
  MOCK_THREAD_MESSAGES,
  generatePhilippineAIResponse,
  generateAttorneyCaseSummary,
} from "../lib/mockData";
import type { ChatThread, DirectMessage } from "../lib/types";
import {
  subscribeToChatMessages,
  sendMessageToFirestore,
} from "../../services/firestoreChatService";

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
  const [isOffline, setIsOffline] = useState(false);
  const [isAiThinking, setIsAiThinking] = useState(false);
  const [hasPendingOfflineSession, setHasPendingOfflineSession] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  // Subscribe to Firestore messages in real-time
  useEffect(() => {
    if (!chat?.id) return;
    const unsubscribe = subscribeToChatMessages(chat.id, (firestoreMsgs) => {
      if (firestoreMsgs && firestoreMsgs.length > 0) {
        setMessages(firestoreMsgs);
      }
    });

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [chat?.id]);

  useEffect(() => {
    const timer = setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);
    return () => clearTimeout(timer);
  }, [messages, isAiThinking]);

  // Toggle between Online & Offline mode
  const handleToggleOnlineOffline = () => {
    if (isOffline) {
      // Switching back ONLINE
      setIsOffline(false);

      // If user consulted while offline, trigger the AI Case Intake Summary and sync to Firestore!
      if (hasPendingOfflineSession) {
        setHasPendingOfflineSession(false);

        // Get offline messages
        const offlineMsgs = messages.filter((m) => m.isOffline);
        const { summaryText, attorneyReply } = generateAttorneyCaseSummary(
          offlineMsgs,
          chat.name
        );

        setTimeout(async () => {
          const summaryMsg: DirectMessage = {
            id: `summary-${Date.now()}`,
            senderId: "ai",
            text: summaryText,
            timestamp: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
            isCaseSummary: true,
          };

          const attorneyReplyMsg: DirectMessage = {
            id: `atty-reply-${Date.now() + 1}`,
            senderId: "attorney",
            text: attorneyReply,
            timestamp: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
          };

          setMessages((prev) => [...prev, summaryMsg, attorneyReplyMsg]);

          // Sync to Firestore
          if (chat?.id) {
            await sendMessageToFirestore(chat.id, summaryMsg);
            await sendMessageToFirestore(chat.id, attorneyReplyMsg);
          }
        }, 600);
      }
    } else {
      // Switching to OFFLINE mode
      setIsOffline(true);
    }
  };

  const handleSend = async () => {
    const trimmed = inputText.trim();
    if (!trimmed) return;

    const userMsg: DirectMessage = {
      id: `m-${Date.now()}`,
      senderId: "user",
      text: trimmed,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      isOffline: isOffline,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText("");

    // Sync to Firestore if online
    if (!isOffline && chat?.id) {
      await sendMessageToFirestore(chat.id, userMsg);
    }

    if (isOffline) {
      // Offline mode: Trigger Local Philippine Legal AI
      setHasPendingOfflineSession(true);
      setIsAiThinking(true);

      setTimeout(async () => {
        const aiResponse = generatePhilippineAIResponse(trimmed, [...messages, userMsg]);

        const aiMsg: DirectMessage = {
          id: `ai-${Date.now()}`,
          senderId: "ai",
          text: aiResponse.text,
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          isOffline: true,
          citations: aiResponse.citations,
        };

        setIsAiThinking(false);
        setMessages((prev) => [...prev, aiMsg]);
      }, 750);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
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
            <Ionicons
              name={isOffline ? "hardware-chip-outline" : "person"}
              size={20}
              color={CHAT_COLORS.primary}
            />
          </View>
          <View
            style={[
              styles.onlineDot,
              isOffline && { backgroundColor: "#F59E0B" },
            ]}
          />
        </View>

        <View style={styles.headerInfo}>
          <Text style={styles.headerName} numberOfLines={1}>
            {chat.name}
          </Text>
          <Text style={styles.headerSub}>
            {isOffline
              ? "⚡ Offline • Local Legal AI Active"
              : chat.isOnline
              ? "Online • Ready for Consult"
              : "Offline"}
            {chat.specialty ? ` • ${chat.specialty}` : ""}
          </Text>
        </View>

        {/* Online / Offline Mode Toggle Button */}
        <TouchableOpacity
          style={[
            styles.modeTogglePill,
            isOffline ? styles.modeToggleOffline : styles.modeToggleOnline,
          ]}
          onPress={handleToggleOnlineOffline}
          activeOpacity={0.8}
        >
          <Ionicons
            name={isOffline ? "cloud-offline" : "cloud-done"}
            size={14}
            color={isOffline ? "#B45309" : "#2B6CB0"}
          />
          <Text
            style={[
              styles.modeToggleText,
              isOffline ? styles.modeToggleTextOffline : styles.modeToggleTextOnline,
            ]}
          >
            {isOffline ? "Offline" : "Online"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Offline Mode Active Banner */}
      {isOffline && (
        <View style={styles.offlineBanner}>
          <Ionicons name="flash" size={15} color="#B45309" />
          <Text style={styles.offlineBannerText}>
            Offline Mode Active: Lexora Philippine Legal AI is answering your questions. Messages will be summarized for {chat.name} once you go back online.
          </Text>
        </View>
      )}

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
            const isAI = item.senderId === "ai";
            const isCaseSummary = item.isCaseSummary;

            // Render Case Summary Card
            if (isCaseSummary) {
              return (
                <View style={styles.caseSummaryCard}>
                  <View style={styles.caseSummaryHeader}>
                    <Ionicons name="clipboard-outline" size={18} color="#2B6CB0" />
                    <Text style={styles.caseSummaryHeaderTitle}>
                      AI Intake Summary for Attorney
                    </Text>
                    <View style={styles.syncedBadge}>
                      <Text style={styles.syncedBadgeText}>Synced Online</Text>
                    </View>
                  </View>
                  <Text style={styles.caseSummaryBody}>{item.text}</Text>
                  <Text style={styles.caseSummaryTime}>{item.timestamp}</Text>
                </View>
              );
            }

            // Render AI Message
            if (isAI) {
              return (
                <View style={styles.aiMessageWrap}>
                  <View style={styles.aiHeaderRow}>
                    <View style={styles.aiBadge}>
                      <Ionicons name="sparkles" size={12} color="#FFFFFF" />
                      <Text style={styles.aiBadgeText}>Lexora Legal AI</Text>
                    </View>
                    <Text style={styles.aiOfflineTag}>Offline Assistant</Text>
                    <Text style={styles.msgTimeAi}>{item.timestamp}</Text>
                  </View>

                  <View style={styles.aiBubble}>
                    <Text style={styles.aiText}>{item.text}</Text>

                    {item.citations && item.citations.length > 0 && (
                      <View style={styles.citationsContainer}>
                        <Text style={styles.citationsTitle}>Philippine Legal Citations:</Text>
                        <View style={styles.citationPillsRow}>
                          {item.citations.map((cite: string, cIdx: number) => (
                            <View key={cIdx} style={styles.citationPill}>
                              <Ionicons name="book-outline" size={11} color="#2B6CB0" />
                              <Text style={styles.citationPillText}>{cite}</Text>
                            </View>
                          ))}
                        </View>
                      </View>
                    )}
                  </View>
                </View>
              );
            }

            // Render Standard User / Attorney Message
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
                  <View style={styles.bubbleFooter}>
                    {item.isOffline && (
                      <View style={styles.offlineMsgBadge}>
                        <Text style={styles.offlineMsgBadgeText}>Offline Draft</Text>
                      </View>
                    )}
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
              </View>
            );
          }}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={
            isAiThinking ? (
              <View style={styles.aiThinkingBox}>
                <ActivityIndicator size="small" color="#5B9BD5" />
                <Text style={styles.aiThinkingText}>
                  Lexora Legal AI is analyzing Philippine statutes...
                </Text>
              </View>
            ) : null
          }
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Ionicons
                name="chatbubble-ellipses-outline"
                size={48}
                color={CHAT_COLORS.border}
              />
              <Text style={styles.emptyText}>No messages yet</Text>
              <Text style={styles.emptySub}>
                Ask legal questions anytime. Even while offline, our local AI assists you!
              </Text>
            </View>
          }
        />

        {/* Input Bar */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder={
              isOffline
                ? "Ask Philippine Law AI (e.g. cyberbullying, libel)..."
                : `Message ${chat?.name ? chat.name.split(" ")[1] || chat.name : "attorney"}...`
            }
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
    fontSize: 15,
    fontWeight: "700",
    color: CHAT_COLORS.textPrimary,
  },
  headerSub: {
    fontSize: 11,
    color: CHAT_COLORS.textSecondary,
    marginTop: 1,
  },
  modeTogglePill: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    gap: 4,
    borderWidth: 1,
  },
  modeToggleOnline: {
    backgroundColor: "#EBF3FA",
    borderColor: "#D8E6F5",
  },
  modeToggleOffline: {
    backgroundColor: "#FEF3C7",
    borderColor: "#FDE68A",
  },
  modeToggleText: {
    fontSize: 12,
    fontWeight: "700",
  },
  modeToggleTextOnline: {
    color: "#2B6CB0",
  },
  modeToggleTextOffline: {
    color: "#B45309",
  },
  offlineBanner: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#FFFBEB",
    borderBottomWidth: 1,
    borderBottomColor: "#FDE68A",
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  offlineBannerText: {
    flex: 1,
    fontSize: 11.5,
    color: "#92400E",
    lineHeight: 16,
  },
  keyboardContainer: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 12,
  },
  msgRow: {
    marginVertical: 2,
    flexDirection: "row",
  },
  msgRowUser: {
    justifyContent: "flex-end",
  },
  msgRowOther: {
    justifyContent: "flex-start",
  },
  bubble: {
    maxWidth: "80%",
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
  bubbleFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 6,
    marginTop: 4,
  },
  offlineMsgBadge: {
    backgroundColor: "rgba(0,0,0,0.15)",
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 4,
  },
  offlineMsgBadgeText: {
    fontSize: 9,
    color: "#FFFFFF",
    fontWeight: "600",
  },
  msgTime: {
    fontSize: 10,
  },
  msgTimeUser: {
    color: "rgba(255,255,255,0.75)",
  },
  msgTimeOther: {
    color: CHAT_COLORS.textMuted,
  },
  aiMessageWrap: {
    marginVertical: 4,
    maxWidth: "92%",
    alignSelf: "flex-start",
  },
  aiHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 6,
  },
  aiBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#5B9BD5",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    gap: 4,
  },
  aiBadgeText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  aiOfflineTag: {
    fontSize: 11,
    color: "#B45309",
    fontWeight: "600",
  },
  msgTimeAi: {
    fontSize: 10,
    color: "#94A3B8",
    marginLeft: "auto",
  },
  aiBubble: {
    backgroundColor: "#F4F8FC",
    borderWidth: 1,
    borderColor: "#D8E6F5",
    borderRadius: 16,
    borderTopLeftRadius: 4,
    padding: 14,
    gap: 10,
  },
  aiText: {
    fontSize: 13.5,
    lineHeight: 21,
    color: "#1E293B",
  },
  citationsContainer: {
    borderTopWidth: 1,
    borderTopColor: "#E2E8F0",
    paddingTop: 8,
    gap: 6,
  },
  citationsTitle: {
    fontSize: 11,
    fontWeight: "700",
    color: "#2B6CB0",
    textTransform: "uppercase",
  },
  citationPillsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
  },
  citationPill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EBF3FA",
    borderWidth: 1,
    borderColor: "#D8E6F5",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 4,
  },
  citationPillText: {
    fontSize: 11,
    color: "#2B6CB0",
    fontWeight: "600",
  },
  caseSummaryCard: {
    backgroundColor: "#F0F5FA",
    borderWidth: 1.5,
    borderColor: "#5B9BD5",
    borderRadius: 16,
    padding: 14,
    marginVertical: 8,
    gap: 8,
  },
  caseSummaryHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  caseSummaryHeaderTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: "#0F172A",
    flex: 1,
  },
  syncedBadge: {
    backgroundColor: "#EBF3FA",
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 6,
  },
  syncedBadgeText: {
    fontSize: 10,
    fontWeight: "700",
    color: "#2B6CB0",
  },
  caseSummaryBody: {
    fontSize: 12.5,
    lineHeight: 18,
    color: "#334155",
  },
  caseSummaryTime: {
    fontSize: 10,
    color: "#64748B",
    alignSelf: "flex-end",
  },
  aiThinkingBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingVertical: 10,
    paddingHorizontal: 14,
    backgroundColor: "#F4F8FC",
    borderRadius: 12,
    alignSelf: "flex-start",
  },
  aiThinkingText: {
    fontSize: 12,
    color: "#64748B",
    fontStyle: "italic",
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
    lineHeight: 18,
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
  textInput: {
    flex: 1,
    backgroundColor: CHAT_COLORS.surfaceInput,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
    fontSize: 13.5,
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
