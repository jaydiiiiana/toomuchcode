/**
 * Hook to manage AI Legal Chat state, message queue, and SQLite local persistence.
 */
import { useState, useCallback, useRef, useEffect } from "react";
import type { ChatMessage } from "../lib/types";
import { AI_PROFILE } from "../lib/constants";
import { getLocalAIResponse } from "../lib/knowledgeBase";
import {
  saveChatMessage,
  getChatMessages,
  clearChatMessages,
} from "../../database";

const INITIAL_WELCOME: ChatMessage = {
  id: "welcome-1",
  sender: "ai",
  text: AI_PROFILE.welcomeMessage,
  timestamp: "Just now",
};

export function useAIChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_WELCOME]);
  const [inputText, setInputText] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Load chat history from SQLite on mount
  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const stored = await getChatMessages();
        if (isMounted) {
          if (stored.length > 0) {
            setMessages(stored);
          } else {
            // Seed initial welcome message into SQLite
            await saveChatMessage(INITIAL_WELCOME);
            setMessages([INITIAL_WELCOME]);
          }
        }
      } catch (err) {
        console.warn("Failed to load messages from SQLite:", err);
      }
    })();

    return () => {
      isMounted = false;
    };
  }, []);

  const sendMessage = useCallback(
    (customText?: string) => {
      const query = (customText !== undefined ? customText : inputText).trim();
      if (!query || isThinking) return;

      const userMsgId = `user-${Date.now()}`;
      const now = new Date();
      const timeStr = now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });

      const newUserMsg: ChatMessage = {
        id: userMsgId,
        sender: "user",
        text: query,
        timestamp: timeStr,
      };

      setMessages((prev) => [...prev, newUserMsg]);
      setInputText("");
      setIsThinking(true);

      // Persist user message to SQLite asynchronously
      saveChatMessage(newUserMsg).catch((e) =>
        console.warn("SQLite save error (user):", e)
      );

      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      // Simulate thoughtful AI reasoning delay
      timerRef.current = setTimeout(() => {
        const aiAnswer = getLocalAIResponse(query);
        const aiMsgId = `ai-${Date.now()}`;

        const newAIMsg: ChatMessage = {
          id: aiMsgId,
          sender: "ai",
          text: aiAnswer.text,
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          legalCitations: aiAnswer.citations,
          suggestedAction: aiAnswer.suggestedAction,
        };

        setMessages((prev) => [...prev, newAIMsg]);
        setIsThinking(false);

        // Persist AI message to SQLite asynchronously
        saveChatMessage(newAIMsg).catch((e) =>
          console.warn("SQLite save error (ai):", e)
        );
      }, 900);
    },
    [inputText, isThinking]
  );

  const clearChat = useCallback(async () => {
    try {
      await clearChatMessages();
      await saveChatMessage(INITIAL_WELCOME);
      setMessages([INITIAL_WELCOME]);
    } catch (err) {
      console.warn("Failed to clear chat SQLite:", err);
      setMessages([INITIAL_WELCOME]);
    }
  }, []);

  return {
    messages,
    inputText,
    setInputText,
    isThinking,
    sendMessage,
    clearChat,
  };
}
