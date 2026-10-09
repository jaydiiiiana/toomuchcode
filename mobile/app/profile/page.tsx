/**
 * Profile page – Main entry point for the Profile screen.
 * Fetches real user data from Firebase + local SQLite with pull-to-refresh.
 */
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { PROFILE_COLORS } from "./lib/constants";
import { useProfile } from "./hooks/useProfile";
import ProfileCard from "./components/ProfileCard";
import MenuItem from "./components/MenuItem";

interface ProfilePageProps {
  onLogout?: () => void;
}

export default function ProfilePage({ onLogout }: ProfilePageProps) {
  const insets = useSafeAreaInsets();
  const { user, sections, loading, isOnline, refreshProfile } = useProfile();

  return (
    <ScrollView
      style={[styles.container, { paddingTop: insets.top }]}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={loading}
          onRefresh={refreshProfile}
          tintColor={PROFILE_COLORS.primary}
          colors={[PROFILE_COLORS.primary]}
        />
      }
    >
      {/* Profile Card */}
      <ProfileCard user={user} loading={loading} isOnline={isOnline} />

      {/* Menu Sections */}
      {sections.map((section) => (
        <View key={section.title} style={styles.menuSection}>
          <Text style={styles.menuSectionTitle}>{section.title}</Text>
          <View style={styles.menuCard}>
            {section.items.map((item, idx) => (
              <React.Fragment key={item.label}>
                <MenuItem item={item} />
                {idx < section.items.length - 1 && (
                  <View style={styles.menuDivider} />
                )}
              </React.Fragment>
            ))}
          </View>
        </View>
      ))}

      {/* Logout */}
      <TouchableOpacity
        style={styles.logoutBtn}
        onPress={onLogout}
        activeOpacity={0.7}
      >
        <Ionicons name="log-out-outline" size={20} color={PROFILE_COLORS.danger} />
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>

      <Text style={styles.versionText}>Lexora v1.0.0</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PROFILE_COLORS.surface,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  menuSection: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  menuSectionTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: PROFILE_COLORS.textMuted,
    textTransform: "uppercase",
    letterSpacing: 0.8,
    marginBottom: 8,
    marginLeft: 4,
  },
  menuCard: {
    backgroundColor: PROFILE_COLORS.surfaceCard,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: PROFILE_COLORS.border,
    overflow: "hidden",
  },
  menuDivider: {
    height: 1,
    backgroundColor: PROFILE_COLORS.border,
    marginLeft: 66,
  },
  logoutBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginHorizontal: 20,
    marginTop: 28,
    paddingVertical: 14,
    borderRadius: 14,
    backgroundColor: PROFILE_COLORS.dangerLight,
  },
  logoutText: {
    fontSize: 15,
    fontWeight: "700",
    color: PROFILE_COLORS.danger,
  },
  versionText: {
    textAlign: "center",
    fontSize: 12,
    color: PROFILE_COLORS.textMuted,
    marginTop: 20,
  },
});
