import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LOGIN_COLORS, LOGIN_COPY } from "../lib/constants";

interface LoginFormProps {
  email: string;
  password: string;
  showPassword: boolean;
  errors: { email?: string; password?: string };
  loading: boolean;
  onChangeEmail: (val: string) => void;
  onChangePassword: (val: string) => void;
  onToggleShowPassword: () => void;
  onSubmit: () => void;
  onForgotPassword?: () => void;
}

export default function LoginForm({
  email,
  password,
  showPassword,
  errors,
  loading,
  onChangeEmail,
  onChangePassword,
  onToggleShowPassword,
  onSubmit,
  onForgotPassword,
}: LoginFormProps) {
  return (
    <View style={styles.container}>
      {/* Email Input */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>{LOGIN_COPY.emailLabel}</Text>
        <View
          style={[
            styles.inputContainer,
            errors.email ? styles.inputErrorBorder : null,
          ]}
        >
          <Ionicons
            name="mail-outline"
            size={20}
            color={LOGIN_COLORS.textMuted}
            style={styles.inputIcon}
          />
          <TextInput
            value={email}
            onChangeText={onChangeEmail}
            placeholder={LOGIN_COPY.emailPlaceholder}
            placeholderTextColor={LOGIN_COLORS.textMuted}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            style={styles.textInput}
          />
        </View>
        {errors.email ? (
          <Text style={styles.errorText}>{errors.email}</Text>
        ) : null}
      </View>

      {/* Password Input */}
      <View style={styles.inputGroup}>
        <View style={styles.passwordLabelRow}>
          <Text style={styles.label}>{LOGIN_COPY.passwordLabel}</Text>
          <TouchableOpacity
            onPress={onForgotPassword}
            activeOpacity={0.7}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Text style={styles.forgotText}>{LOGIN_COPY.forgotPassword}</Text>
          </TouchableOpacity>
        </View>
        <View
          style={[
            styles.inputContainer,
            errors.password ? styles.inputErrorBorder : null,
          ]}
        >
          <Ionicons
            name="lock-closed-outline"
            size={20}
            color={LOGIN_COLORS.textMuted}
            style={styles.inputIcon}
          />
          <TextInput
            value={password}
            onChangeText={onChangePassword}
            placeholder={LOGIN_COPY.passwordPlaceholder}
            placeholderTextColor={LOGIN_COLORS.textMuted}
            secureTextEntry={!showPassword}
            autoCapitalize="none"
            autoCorrect={false}
            style={styles.textInput}
          />
          <TouchableOpacity
            onPress={onToggleShowPassword}
            activeOpacity={0.7}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Ionicons
              name={showPassword ? "eye-off-outline" : "eye-outline"}
              size={20}
              color={LOGIN_COLORS.textMuted}
            />
          </TouchableOpacity>
        </View>
        {errors.password ? (
          <Text style={styles.errorText}>{errors.password}</Text>
        ) : null}
      </View>

      {/* Submit Button */}
      <TouchableOpacity
        style={styles.submitButton}
        activeOpacity={0.88}
        onPress={onSubmit}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#FFFFFF" />
        ) : (
          <Text style={styles.submitButtonText}>{LOGIN_COPY.submitButton}</Text>
        )}
      </TouchableOpacity>

      {/* Admin Account Quick Demo Fill */}
      <TouchableOpacity
        style={styles.adminQuickBtn}
        activeOpacity={0.75}
        onPress={() => {
          onChangeEmail("admin@lexora.ph");
          onChangePassword("AdminPassword123!");
        }}
      >
        <Ionicons name="shield-checkmark-outline" size={16} color={LOGIN_COLORS.primary} />
        <Text style={styles.adminQuickText}>Fill Admin Credentials (admin@lexora.ph)</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 18,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: LOGIN_COLORS.textPrimary,
    marginBottom: 8,
  },
  passwordLabelRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  forgotText: {
    fontSize: 13,
    fontWeight: "600",
    color: LOGIN_COLORS.primary,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: LOGIN_COLORS.surfaceInput,
    borderWidth: 1.5,
    borderColor: LOGIN_COLORS.border,
    borderRadius: 16,
    paddingHorizontal: 16,
    height: 54,
  },
  inputErrorBorder: {
    borderColor: LOGIN_COLORS.error,
  },
  inputIcon: {
    marginRight: 12,
  },
  textInput: {
    flex: 1,
    fontSize: 15,
    color: LOGIN_COLORS.textPrimary,
  },
  errorText: {
    fontSize: 12,
    color: LOGIN_COLORS.error,
    marginTop: 6,
    marginLeft: 4,
  },
  submitButton: {
    backgroundColor: LOGIN_COLORS.primary,
    borderRadius: 16,
    height: 54,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
    shadowColor: LOGIN_COLORS.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.28,
    shadowRadius: 12,
    elevation: 5,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FFFFFF",
    letterSpacing: 0.3,
  },
  adminQuickBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    marginTop: 14,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 12,
    backgroundColor: LOGIN_COLORS.primaryLight || "#EEF2FF",
    borderWidth: 1,
    borderColor: "#C7D2FE",
  },
  adminQuickText: {
    fontSize: 13,
    fontWeight: "600",
    color: LOGIN_COLORS.primary,
  },
});
