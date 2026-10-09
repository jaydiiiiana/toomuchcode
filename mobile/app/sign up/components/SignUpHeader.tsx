import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SIGNUP_COLORS, SIGNUP_COPY } from "../lib/constants";

export default function SignUpHeader() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{SIGNUP_COPY.title}</Text>
      <Text style={styles.subtitle}>{SIGNUP_COPY.subtitle}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 24,
    marginBottom: 24,
  },
  title: {
    fontSize: 30,
    fontWeight: "800",
    color: SIGNUP_COLORS.textPrimary,
    letterSpacing: -0.5,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: SIGNUP_COLORS.textSecondary,
    lineHeight: 22,
  },
});
