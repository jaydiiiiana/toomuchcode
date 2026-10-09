/**
 * Profile tab – User profile, settings, and account management.
 */
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MAIN_COLORS } from "../lib/constants";

interface ProfileTabProps {
  onLogout: () => void;
}

interface MenuItemProps {
  icon: string;
  label: string;
  subtitle?: string;
  color?: string;
  showBadge?: boolean;
  onPress?: () => void;
}

const MENU_SECTIONS = [
  {
    title: "Account",
    items: [
      { icon: "person-outline", label: "Edit Profile", subtitle: "Name, photo, contact info" },
      { icon: "shield-checkmark-outline", label: "Verification", subtitle: "Identity verification status" },
      { icon: "card-outline", label: "Payment Methods", subtitle: "Manage your payment options" },
    ],
  },
  {
    title: "Preferences",
    items: [
      { icon: "notifications-outline", label: "Notifications", subtitle: "Push, email & SMS settings" },
      { icon: "lock-closed-outline", label: "Privacy & Security", subtitle: "Password, 2FA, data" },
      { icon: "language-outline", label: "Language", subtitle: "English" },
    ],
  },
  {
    title: "Support",
    items: [
      { icon: "help-circle-outline", label: "Help Center", subtitle: "FAQs and guides" },
      { icon: "chatbubble-outline", label: "Contact Support", subtitle: "Get in touch with us" },
      { icon: "document-text-outline", label: "Terms & Policies", subtitle: "Legal documents" },
    ],
  },
];

export default function ProfileTab({ onLogout }: ProfileTabProps) {
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      style={[styles.container, { paddingTop: insets.top }]}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      {/* Profile Card */}
      <View style={styles.profileCard}>
        <View style={styles.avatarLarge}>
          <Ionicons name="person" size={36} color={MAIN_COLORS.primary} />
        </View>
        <Text style={styles.profileName}>Lexora User</Text>
        <Text style={styles.profileEmail}>user@example.com</Text>
        <View style={styles.statRow}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>0</Text>
            <Text style={styles.statLabel}>Consultations</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>0</Text>
            <Text style={styles.statLabel}>Saved</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>0</Text>
            <Text style={styles.statLabel}>Reviews</Text>
          </View>
        </View>
      </View>

      {/* Menu Sections */}
      {MENU_SECTIONS.map((section) => (
        <View key={section.title} style={styles.menuSection}>
          <Text style={styles.menuSectionTitle}>{section.title}</Text>
          <View style={styles.menuCard}>
            {section.items.map((item, idx) => (
              <React.Fragment key={item.label}>
                <MenuItem
                  icon={item.icon}
                  label={item.label}
                  subtitle={item.subtitle}
                />
                {idx < section.items.length - 1 && (
                  <View style={styles.menuDivider} />
                )}
              </React.Fragment>
            ))}
          </View>
        </View>
      ))}

      {/* Logout */}
      <TouchableOpacity style={styles.logoutBtn} onPress={onLogout} activeOpacity={0.7}>
        <Ionicons name="log-out-outline" size={20} color="#DC2626" />
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>

      <Text style={styles.versionText}>Lexora v1.0.0</Text>
    </ScrollView>
  );
}

function MenuItem({ icon, label, subtitle, color, onPress }: MenuItemProps) {
  return (
    <TouchableOpacity style={styles.menuItem} activeOpacity={0.6} onPress={onPress}>
      <View style={styles.menuItemLeft}>
        <View style={styles.menuIconBox}>
          <Ionicons name={icon as any} size={20} color={color || MAIN_COLORS.primary} />
        </View>
        <View>
          <Text style={styles.menuLabel}>{label}</Text>
          {subtitle && <Text style={styles.menuSubtitle}>{subtitle}</Text>}
        </View>
      </View>
      <Ionicons name="chevron-forward" size={18} color={MAIN_COLORS.textMuted} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: MAIN_COLORS.surface,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  profileCard: {
    alignItems: "center",
    paddingTop: 24,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: MAIN_COLORS.border,
  },
  avatarLarge: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: MAIN_COLORS.primaryLight,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: MAIN_COLORS.primary,
    marginBottom: 12,
  },
  profileName: {
    fontSize: 20,
    fontWeight: "800",
    color: MAIN_COLORS.textPrimary,
  },
  profileEmail: {
    fontSize: 14,
    color: MAIN_COLORS.textMuted,
    marginTop: 2,
  },
  statRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    gap: 0,
  },
  statItem: {
    alignItems: "center",
    paddingHorizontal: 24,
  },
  statValue: {
    fontSize: 18,
    fontWeight: "800",
    color: MAIN_COLORS.textPrimary,
  },
  statLabel: {
    fontSize: 11,
    color: MAIN_COLORS.textMuted,
    marginTop: 2,
    fontWeight: "500",
  },
  statDivider: {
    width: 1,
    height: 28,
    backgroundColor: MAIN_COLORS.border,
  },
  menuSection: {
    marginTop: 24,
    paddingHorizontal: 20,
  },
  menuSectionTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: MAIN_COLORS.textMuted,
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  menuCard: {
    backgroundColor: MAIN_COLORS.surfaceCard,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: MAIN_COLORS.border,
    overflow: "hidden",
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
    paddingHorizontal: 14,
  },
  menuItemLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  menuIconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: MAIN_COLORS.primaryLight,
    alignItems: "center",
    justifyContent: "center",
  },
  menuLabel: {
    fontSize: 15,
    fontWeight: "600",
    color: MAIN_COLORS.textPrimary,
  },
  menuSubtitle: {
    fontSize: 12,
    color: MAIN_COLORS.textMuted,
    marginTop: 1,
  },
  menuDivider: {
    height: 1,
    backgroundColor: MAIN_COLORS.border,
    marginLeft: 62,
  },
  logoutBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginTop: 32,
    marginHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#FEE2E2",
    backgroundColor: "#FFF5F5",
  },
  logoutText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#DC2626",
  },
  versionText: {
    textAlign: "center",
    fontSize: 12,
    color: MAIN_COLORS.textMuted,
    marginTop: 16,
  },
});
