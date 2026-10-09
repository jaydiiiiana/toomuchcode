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
import { SIGNUP_COLORS, SIGNUP_COPY } from "../lib/constants";

interface SignUpFormProps {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  agreedToTerms: boolean;
  showPassword: boolean;
  showConfirmPassword: boolean;
  errors: {
    name?: string;
    email?: string;
    phone?: string;
    password?: string;
    confirmPassword?: string;
    agreedToTerms?: string;
  };
  loading: boolean;
  onChangeName: (val: string) => void;
  onChangeEmail: (val: string) => void;
  onChangePhone: (val: string) => void;
  onChangePassword: (val: string) => void;
  onChangeConfirmPassword: (val: string) => void;
  onToggleTerms: () => void;
  onToggleShowPassword: () => void;
  onToggleShowConfirmPassword: () => void;
  onSubmit: () => void;
  onPressTerms: () => void;
  onPressPrivacy: () => void;
}

export default function SignUpForm({
  name,
  email,
  phone,
  password,
  confirmPassword,
  agreedToTerms,
  showPassword,
  showConfirmPassword,
  errors,
  loading,
  onChangeName,
  onChangeEmail,
  onChangePhone,
  onChangePassword,
  onChangeConfirmPassword,
  onToggleTerms,
  onToggleShowPassword,
  onToggleShowConfirmPassword,
  onSubmit,
  onPressTerms,
  onPressPrivacy,
}: SignUpFormProps) {
  return (
    <View style={styles.container}>
      {/* Full Name */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>{SIGNUP_COPY.nameLabel}</Text>
        <View
          style={[
            styles.inputContainer,
            errors.name ? styles.inputErrorBorder : null,
          ]}
        >
          <Ionicons
            name="person-outline"
            size={20}
            color={SIGNUP_COLORS.textMuted}
            style={styles.inputIcon}
          />
          <TextInput
            value={name}
            onChangeText={onChangeName}
            placeholder={SIGNUP_COPY.namePlaceholder}
            placeholderTextColor={SIGNUP_COLORS.textMuted}
            autoCapitalize="words"
            style={styles.textInput}
          />
        </View>
        {errors.name ? (
          <Text style={styles.errorText}>{errors.name}</Text>
        ) : null}
      </View>

      {/* Email */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>{SIGNUP_COPY.emailLabel}</Text>
        <View
          style={[
            styles.inputContainer,
            errors.email ? styles.inputErrorBorder : null,
          ]}
        >
          <Ionicons
            name="mail-outline"
            size={20}
            color={SIGNUP_COLORS.textMuted}
            style={styles.inputIcon}
          />
          <TextInput
            value={email}
            onChangeText={onChangeEmail}
            placeholder={SIGNUP_COPY.emailPlaceholder}
            placeholderTextColor={SIGNUP_COLORS.textMuted}
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

      {/* 11-Digit PH Phone Number */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>{SIGNUP_COPY.phoneLabel}</Text>
        <View
          style={[
            styles.inputContainer,
            errors.phone ? styles.inputErrorBorder : null,
          ]}
        >
          <Ionicons
            name="call-outline"
            size={20}
            color={SIGNUP_COLORS.textMuted}
            style={styles.inputIcon}
          />
          <TextInput
            value={phone}
            onChangeText={onChangePhone}
            placeholder={SIGNUP_COPY.phonePlaceholder}
            placeholderTextColor={SIGNUP_COLORS.textMuted}
            keyboardType="phone-pad"
            maxLength={11}
            style={styles.textInput}
          />
          {phone.length > 0 ? (
            <Text style={styles.phoneCounter}>{phone.length}/11</Text>
          ) : null}
        </View>
        {errors.phone ? (
          <Text style={styles.errorText}>{errors.phone}</Text>
        ) : null}
      </View>

      {/* Password */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>{SIGNUP_COPY.passwordLabel}</Text>
        <View
          style={[
            styles.inputContainer,
            errors.password ? styles.inputErrorBorder : null,
          ]}
        >
          <Ionicons
            name="lock-closed-outline"
            size={20}
            color={SIGNUP_COLORS.textMuted}
            style={styles.inputIcon}
          />
          <TextInput
            value={password}
            onChangeText={onChangePassword}
            placeholder={SIGNUP_COPY.passwordPlaceholder}
            placeholderTextColor={SIGNUP_COLORS.textMuted}
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
              color={SIGNUP_COLORS.textMuted}
            />
          </TouchableOpacity>
        </View>
        {errors.password ? (
          <Text style={styles.errorText}>{errors.password}</Text>
        ) : null}
      </View>

      {/* Confirm Password */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>{SIGNUP_COPY.confirmPasswordLabel}</Text>
        <View
          style={[
            styles.inputContainer,
            errors.confirmPassword ? styles.inputErrorBorder : null,
          ]}
        >
          <Ionicons
            name="shield-checkmark-outline"
            size={20}
            color={SIGNUP_COLORS.textMuted}
            style={styles.inputIcon}
          />
          <TextInput
            value={confirmPassword}
            onChangeText={onChangeConfirmPassword}
            placeholder={SIGNUP_COPY.confirmPasswordPlaceholder}
            placeholderTextColor={SIGNUP_COLORS.textMuted}
            secureTextEntry={!showConfirmPassword}
            autoCapitalize="none"
            autoCorrect={false}
            style={styles.textInput}
          />
          <TouchableOpacity
            onPress={onToggleShowConfirmPassword}
            activeOpacity={0.7}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Ionicons
              name={showConfirmPassword ? "eye-off-outline" : "eye-outline"}
              size={20}
              color={SIGNUP_COLORS.textMuted}
            />
          </TouchableOpacity>
        </View>
        {errors.confirmPassword ? (
          <Text style={styles.errorText}>{errors.confirmPassword}</Text>
        ) : null}
      </View>

      {/* Terms Checkbox and Links */}
      <View style={styles.termsWrapper}>
        <TouchableOpacity
          style={styles.checkboxTouch}
          activeOpacity={0.8}
          onPress={onToggleTerms}
        >
          <View
            style={[
              styles.checkbox,
              agreedToTerms ? styles.checkboxActive : null,
              errors.agreedToTerms ? styles.checkboxError : null,
            ]}
          >
            {agreedToTerms ? (
              <Ionicons name="checkmark" size={14} color="#FFFFFF" />
            ) : null}
          </View>
        </TouchableOpacity>

        <Text style={styles.termsText}>
          I agree to the{" "}
          <Text style={styles.termsLink} onPress={onPressTerms}>
            Terms of Service
          </Text>{" "}
          and{" "}
          <Text style={styles.termsLink} onPress={onPressPrivacy}>
            Privacy Policy
          </Text>
        </Text>
      </View>
      {errors.agreedToTerms ? (
        <Text style={styles.termsErrorText}>{errors.agreedToTerms}</Text>
      ) : null}

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
          <Text style={styles.submitButtonText}>{SIGNUP_COPY.submitButton}</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: SIGNUP_COLORS.textPrimary,
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: SIGNUP_COLORS.surfaceInput,
    borderWidth: 1.5,
    borderColor: SIGNUP_COLORS.border,
    borderRadius: 16,
    paddingHorizontal: 16,
    height: 52,
  },
  inputErrorBorder: {
    borderColor: SIGNUP_COLORS.error,
  },
  inputIcon: {
    marginRight: 12,
  },
  textInput: {
    flex: 1,
    fontSize: 15,
    color: SIGNUP_COLORS.textPrimary,
  },
  phoneCounter: {
    fontSize: 12,
    fontWeight: "600",
    color: SIGNUP_COLORS.textMuted,
    marginLeft: 6,
  },
  errorText: {
    fontSize: 12,
    color: SIGNUP_COLORS.error,
    marginTop: 6,
    marginLeft: 4,
  },
  termsWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
    marginBottom: 6,
  },
  checkboxTouch: {
    paddingRight: 8,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: SIGNUP_COLORS.border,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxActive: {
    backgroundColor: SIGNUP_COLORS.primary,
    borderColor: SIGNUP_COLORS.primary,
  },
  checkboxError: {
    borderColor: SIGNUP_COLORS.error,
  },
  termsText: {
    flex: 1,
    fontSize: 13,
    color: SIGNUP_COLORS.textSecondary,
    lineHeight: 18,
  },
  termsLink: {
    color: SIGNUP_COLORS.primary,
    fontWeight: "700",
    textDecorationLine: "underline",
  },
  termsErrorText: {
    fontSize: 12,
    color: SIGNUP_COLORS.error,
    marginBottom: 12,
    marginLeft: 4,
  },
  submitButton: {
    backgroundColor: SIGNUP_COLORS.primary,
    borderRadius: 16,
    height: 54,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 12,
    shadowColor: SIGNUP_COLORS.primary,
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
});
