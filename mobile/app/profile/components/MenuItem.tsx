/**
 * MenuItem component – An interactive row in settings/profile sections.
 */
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { PROFILE_COLORS } from "../lib/constants";
import type { MenuItemData } from "../lib/types";

interface MenuItemProps {
  item: MenuItemData;
}

export default function MenuItem({ item }: MenuItemProps) {
  return (
    <TouchableOpacity
      style={styles.menuItem}
      activeOpacity={0.6}
      onPress={item.onPress}
    >
      <View style={styles.menuItemLeft}>
        <View style={styles.menuIconBox}>
          <Ionicons
            name={item.icon as any}
            size={20}
            color={item.color || PROFILE_COLORS.primary}
          />
        </View>
        <View>
          <Text style={styles.menuLabel}>{item.label}</Text>
          {item.subtitle && (
            <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
          )}
        </View>
      </View>
      <Ionicons
        name="chevron-forward"
        size={18}
        color={PROFILE_COLORS.textMuted}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  menuItemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  menuIconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: PROFILE_COLORS.primaryLight,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  menuLabel: {
    fontSize: 15,
    fontWeight: "600",
    color: PROFILE_COLORS.textPrimary,
  },
  menuSubtitle: {
    fontSize: 12,
    color: PROFILE_COLORS.textMuted,
    marginTop: 1,
  },
});
