import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SIGNUP_COLORS, SIGNUP_COPY } from "../lib/constants";

interface SignUpFooterProps {
  onNavigateToLogin: () => void;
}

export default function SignUpFooter({
  onNavigateToLogin,
}: SignUpFooterProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{SIGNUP_COPY.footerText} </Text>
      <TouchableOpacity
        onPress={onNavigateToLogin}
        activeOpacity={0.7}
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
      >
        <Text style={styles.link}>{SIGNUP_COPY.footerLink}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
  },
  text: {
    fontSize: 14,
    color: SIGNUP_COLORS.textSecondary,
  },
  link: {
    fontSize: 14,
    fontWeight: "700",
    color: SIGNUP_COLORS.primary,
  },
});
