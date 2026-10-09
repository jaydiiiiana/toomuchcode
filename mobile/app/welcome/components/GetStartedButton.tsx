import React from "react";
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useStaggeredEntry } from "../hooks/useStaggeredEntry";
import { COLORS, WELCOME_COPY } from "../lib/constants";

interface GetStartedButtonProps {
  onPress: () => void;
}

/**
 * Primary CTA button for the light theme with a vivid gradient/accent look and arrow.
 */
export default function GetStartedButton({ onPress }: GetStartedButtonProps) {
  const anim = useStaggeredEntry(4);

  return (
    <Animated.View style={[styles.container, anim]}>
      <TouchableOpacity
        id="get-started-btn"
        style={styles.button}
        activeOpacity={0.88}
        onPress={onPress}
      >
        <Text style={styles.buttonText}>{WELCOME_COPY.cta}</Text>
        <View style={styles.arrowContainer}>
          <Ionicons name="arrow-forward" size={18} color="#FFFFFF" />
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    backgroundColor: COLORS.primary,
    paddingVertical: 18,
    borderRadius: 18,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.28,
    shadowRadius: 14,
    elevation: 5,
  },
  buttonText: {
    fontSize: 17,
    fontWeight: "700",
    color: "#FFFFFF",
    letterSpacing: 0.2,
  },
  arrowContainer: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: "rgba(255,255,255,0.22)",
    alignItems: "center",
    justifyContent: "center",
  },
});
