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
}

export default function MainPage({ onLogout }: MainPageProps) {
  const { activeTab, switchTab } = useMainNavigation("home");

  const renderTab = () => {
    switch (activeTab) {
      case "home":
        return <HomeTab />;
      case "chat":
        return <ChatPage />;
      case "notif":
        return <NotifPage />;
      case "profile":
        return <ProfilePage onLogout={onLogout} />;
      default:
        return <HomeTab />;
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
