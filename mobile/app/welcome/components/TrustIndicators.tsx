import React from "react";
import { Animated, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useStaggeredEntry } from "../hooks/useStaggeredEntry";
import { COLORS, TRUST_ITEMS } from "../lib/constants";

/**
 * Row of trust badges (Secure, Verified, Free) formatted for light theme.
 */
export default function TrustIndicators() {
  const anim = useStaggeredEntry(5);

  return (
    <Animated.View style={[styles.container, anim]}>
      {TRUST_ITEMS.map((item, i) => (
        <View key={item.label} style={styles.row}>
          {i > 0 && <Text style={styles.dot}>•</Text>}
          <View style={styles.item}>
            <Ionicons
              name={item.icon as any}
              size={14}
              color={COLORS.textMuted}
            />
            <Text style={styles.label}>{item.label}</Text>
          </View>
        </View>
      ))}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 22,
    flexWrap: "wrap",
    gap: 4,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  dot: {
    color: "#CBD5E1",
    fontSize: 12,
    marginHorizontal: 4,
  },
  label: {
    fontSize: 12,
    fontWeight: "500",
    color: COLORS.textMuted,
  },
});
