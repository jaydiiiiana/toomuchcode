/**
 * Hook to manage chat search state and real-time Firestore threads.
 */
import { useState, useCallback, useMemo, useEffect } from "react";
import { ChatThread } from "../lib/types";
import { MOCK_CHATS } from "../lib/mockData";
import { subscribeToChatThreads } from "../../services/firestoreChatService";

export function useChatSearch() {
  const [searchQuery, setSearchQuery] = useState("");
  const [threads, setThreads] = useState<ChatThread[]>(MOCK_CHATS);

  useEffect(() => {
    const unsubscribe = subscribeToChatThreads((updatedThreads) => {
      setThreads(updatedThreads);
    });

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  const filteredChats = useMemo(
    () =>
      threads.filter((c) =>
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (c.lastMessage && c.lastMessage.toLowerCase().includes(searchQuery.toLowerCase()))
      ),
    [threads, searchQuery]
  );

  const clearSearch = useCallback(() => setSearchQuery(""), []);

  return {
    searchQuery,
    setSearchQuery,
    clearSearch,
    filteredChats,
  };
}
