import React from "react";
import { Animated, StyleSheet, Text, View } from "react-native";
import { useStaggeredEntry } from "../hooks/useStaggeredEntry";
import { COLORS, WELCOME_COPY } from "../lib/constants";

/**
 * Centered "Welcome" heading and description without badge.
 */
export default function WelcomeHero() {
  const headingAnim = useStaggeredEntry(1);
  const descAnim = useStaggeredEntry(2);

  return (
    <View style={styles.container}>
      {/* Heading */}
      <Animated.View style={headingAnim}>
        <Text style={styles.heading}>{WELCOME_COPY.heading}</Text>
      </Animated.View>

      {/* Description */}
      <Animated.View style={descAnim}>
        <Text style={styles.description}>{WELCOME_COPY.description}</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    width: "100%",
  },
  heading: {
    fontSize: 36,
    fontWeight: "800",
    color: COLORS.textPrimary,
    lineHeight: 44,
    textAlign: "center",
    marginBottom: 12,
    letterSpacing: -0.5,
  },
  description: {
    fontSize: 15,
    lineHeight: 24,
    color: COLORS.textSecondary,
    textAlign: "center",
    paddingHorizontal: 8,
    marginBottom: 28,
  },
});
