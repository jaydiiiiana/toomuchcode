/**
 * Hook to manage AI Legal Chat state, message queue, and natural AI replies.
 */
import { useState, useCallback, useRef } from "react";
import type { ChatMessage } from "../lib/types";
import { AI_PROFILE } from "../lib/constants";
import { getLocalAIResponse } from "../lib/knowledgeBase";

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: "welcome-1",
    sender: "ai",
    text: AI_PROFILE.welcomeMessage,
    timestamp: "Just now",
  },
];

export function useAIChat() {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [inputText, setInputText] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const sendMessage = useCallback(
    (customText?: string) => {
      const query = (customText !== undefined ? customText : inputText).trim();
      if (!query || isThinking) return;

      const userMsgId = `user-${Date.now()}`;
      const now = new Date();
      const timeStr = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

      const newUserMsg: ChatMessage = {
        id: userMsgId,
        sender: "user",
        text: query,
        timestamp: timeStr,
      };

      setMessages((prev) => [...prev, newUserMsg]);
      setInputText("");
      setIsThinking(true);

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
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          legalCitations: aiAnswer.citations,
          suggestedAction: aiAnswer.suggestedAction,
        };

        setMessages((prev) => [...prev, newAIMsg]);
        setIsThinking(false);
      }, 900);
    },
    [inputText, isThinking]
  );

  const clearChat = useCallback(() => {
    setMessages(INITIAL_MESSAGES);
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
