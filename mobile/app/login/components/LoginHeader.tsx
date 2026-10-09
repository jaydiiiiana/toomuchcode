import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { LOGIN_COLORS, LOGIN_COPY } from "../lib/constants";

export default function LoginHeader() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{LOGIN_COPY.title}</Text>
      <Text style={styles.subtitle}>{LOGIN_COPY.subtitle}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 24,
    marginBottom: 28,
  },
  title: {
    fontSize: 30,
    fontWeight: "800",
    color: LOGIN_COLORS.textPrimary,
    letterSpacing: -0.5,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: LOGIN_COLORS.textSecondary,
    lineHeight: 22,
  },
});
