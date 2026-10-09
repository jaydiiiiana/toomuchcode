import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { LOGIN_COLORS, LOGIN_COPY } from "../lib/constants";

interface LoginFooterProps {
  onNavigateToSignUp: () => void;
}

export default function LoginFooter({ onNavigateToSignUp }: LoginFooterProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{LOGIN_COPY.footerText} </Text>
      <TouchableOpacity
        onPress={onNavigateToSignUp}
        activeOpacity={0.7}
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
      >
        <Text style={styles.link}>{LOGIN_COPY.footerLink}</Text>
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
    color: LOGIN_COLORS.textSecondary,
  },
  link: {
    fontSize: 14,
    fontWeight: "700",
    color: LOGIN_COLORS.primary,
  },
});
