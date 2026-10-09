/**
 * Main app page – Container for tab navigation (Home, Chat, Notif, Profile).
 */
import React from "react";
import { View, StyleSheet } from "react-native";
import { useMainNavigation } from "./hooks/useMainNavigation";
import BottomNavBar from "./components/BottomNavBar";
import HomeTab from "./components/HomeTab";
import ChatPage from "../chat/page";
import NotifPage from "../notif/page";
import ProfilePage from "../profile/page";
import { MAIN_COLORS } from "./lib/constants";

interface MainPageProps {
  onLogout: () => void;
  onOpenScreen?: (screen: "consultation" | "question" | "document" | "emergency") => void;
}

export default function MainPage({ onLogout, onOpenScreen }: MainPageProps) {
  const { activeTab, switchTab } = useMainNavigation("home");

  const handleActionNavigation = (actionId: "consult" | "ask" | "docs" | "emergency") => {
    if (actionId === "ask") onOpenScreen?.("question");
    else if (actionId === "consult") onOpenScreen?.("consultation");
    else if (actionId === "docs") onOpenScreen?.("document");
    else if (actionId === "emergency") onOpenScreen?.("emergency");
  };

  const renderTab = () => {
    switch (activeTab) {
      case "home":
        return <HomeTab onNavigateAction={handleActionNavigation} />;
      case "chat":
        return <ChatPage />;
      case "notif":
        return <NotifPage />;
      case "profile":
        return <ProfilePage onLogout={onLogout} />;
      default:
        return <HomeTab onNavigateAction={handleActionNavigation} />;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>{renderTab()}</View>
      <BottomNavBar activeTab={activeTab} onTabPress={switchTab} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: MAIN_COLORS.surface,
  },
  content: {
    flex: 1,
  },
});
