import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LOGIN_COLORS, LOGIN_COPY } from "../lib/constants";

interface SocialLoginButtonsProps {
  onGoogleLogin?: () => void;
  onAppleLogin?: () => void;
}

export default function SocialLoginButtons({
  onGoogleLogin,
  onAppleLogin,
}: SocialLoginButtonsProps) {
  return (
    <View style={styles.container}>
      {/* Divider */}
      <View style={styles.dividerRow}>
        <View style={styles.dividerLine} />
        <Text style={styles.dividerText}>{LOGIN_COPY.dividerText}</Text>
        <View style={styles.dividerLine} />
      </View>

      {/* Buttons */}
      <View style={styles.buttonsRow}>
        <TouchableOpacity
          style={styles.socialButton}
          activeOpacity={0.8}
          onPress={onGoogleLogin}
        >
          <Ionicons name="logo-google" size={18} color="#EA4335" />
          <Text style={styles.socialButtonText}>{LOGIN_COPY.googleButton}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.socialButton}
          activeOpacity={0.8}
          onPress={onAppleLogin}
        >
          <Ionicons name="logo-apple" size={20} color="#000000" />
          <Text style={styles.socialButtonText}>{LOGIN_COPY.appleButton}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: LOGIN_COLORS.border,
  },
  dividerText: {
    fontSize: 13,
    color: LOGIN_COLORS.textMuted,
    paddingHorizontal: 14,
    textTransform: "lowercase",
  },
  buttonsRow: {
    flexDirection: "row",
    gap: 12,
  },
  socialButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    height: 50,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: LOGIN_COLORS.border,
    backgroundColor: "#FFFFFF",
  },
  socialButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: LOGIN_COLORS.textPrimary,
  },
});
