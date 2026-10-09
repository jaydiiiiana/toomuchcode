/**
 * Hook to manage the active tab state and related navigation logic.
 */
import { useState, useCallback } from "react";
import type { NavTabId } from "../lib/constants";

export function useMainNavigation(initialTab: NavTabId = "home") {
  const [activeTab, setActiveTab] = useState<NavTabId>(initialTab);

  const switchTab = useCallback((tab: NavTabId) => {
    setActiveTab(tab);
  }, []);

  return {
    activeTab,
    switchTab,
  };
}
