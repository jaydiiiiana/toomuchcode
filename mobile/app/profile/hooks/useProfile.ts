/**
 * Hook to manage Profile state.
 */
import { useState } from "react";
import { MOCK_USER, MENU_SECTIONS } from "../lib/mockData";
import type { UserProfile, MenuSection } from "../lib/types";

export function useProfile() {
  const [user, setUser] = useState<UserProfile>(MOCK_USER);
  const [sections] = useState<MenuSection[]>(MENU_SECTIONS);

  return {
    user,
    setUser,
    sections,
  };
}
