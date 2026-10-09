/**
 * Hook to manage chat search state.
 */
import { useState, useCallback, useMemo } from "react";
import { MOCK_CHATS } from "../lib/mockData";

export function useChatSearch() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredChats = useMemo(
    () =>
      MOCK_CHATS.filter((c) =>
        c.name.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    [searchQuery]
  );

  const clearSearch = useCallback(() => setSearchQuery(""), []);

  return {
    searchQuery,
    setSearchQuery,
    clearSearch,
    filteredChats,
  };
}
