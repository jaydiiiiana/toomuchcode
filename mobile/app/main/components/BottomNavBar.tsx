/**
 * Bottom navigation bar component for the Main app.
 */
import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { NAV_TABS, MAIN_COLORS } from "../lib/constants";
import type { NavTabId } from "../lib/constants";

interface BottomNavBarProps {
  activeTab: NavTabId;
  onTabPress: (tab: NavTabId) => void;
}

export default function BottomNavBar({ activeTab, onTabPress }: BottomNavBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingBottom: Math.max(insets.bottom, 8) }]}>
      {NAV_TABS.map((tab) => {
        const isActive = activeTab === tab.id;
        const iconName = isActive ? tab.iconFilled : tab.iconOutline;

        return (
          <TouchableOpacity
            key={tab.id}
            style={styles.tab}
            onPress={() => onTabPress(tab.id)}
            activeOpacity={0.7}
          >
            <View style={styles.iconContainer}>
              {isActive && <View style={styles.activeIndicator} />}
              <Ionicons
                name={iconName as any}
                size={24}
                color={isActive ? MAIN_COLORS.primary : MAIN_COLORS.textMuted}
              />
              {tab.badge !== undefined && tab.badge > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>
                    {tab.badge > 9 ? "9+" : tab.badge}
                  </Text>
                </View>
              )}
            </View>
            <Text
              style={[
                styles.label,
                { color: isActive ? MAIN_COLORS.primary : MAIN_COLORS.textMuted },
                isActive && styles.labelActive,
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: MAIN_COLORS.surface,
    borderTopWidth: 1,
    borderTopColor: MAIN_COLORS.border,
    paddingTop: 8,
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
  },
  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 2,
  },
  iconContainer: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    width: 48,
    height: 32,
  },
  activeIndicator: {
    position: "absolute",
    top: -8,
    width: 20,
    height: 3,
    borderRadius: 2,
    backgroundColor: MAIN_COLORS.primary,
  },
  badge: {
    position: "absolute",
    top: -2,
    right: 2,
    backgroundColor: MAIN_COLORS.badgeBg,
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    paddingHorizontal: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  badgeText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "700",
  },
  label: {
    fontSize: 11,
    fontWeight: "500",
    marginTop: 2,
  },
  labelActive: {
    fontWeight: "700",
  },
});
