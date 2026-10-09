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
  accountType: "client" | "attorney";
  barRollNo: string;
  ibpChapter: string;
  specialization: string;
  officeAddress: string;
  errors: {
    name?: string;
    email?: string;
    phone?: string;
    password?: string;
    confirmPassword?: string;
    agreedToTerms?: string;
    barRollNo?: string;
    ibpChapter?: string;
    specialization?: string;
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
  onChangeAccountType: (type: "client" | "attorney") => void;
  onChangeBarRollNo: (val: string) => void;
  onChangeIbpChapter: (val: string) => void;
  onChangeSpecialization: (val: string) => void;
  onChangeOfficeAddress: (val: string) => void;
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
  accountType,
  barRollNo,
  ibpChapter,
  specialization,
  officeAddress,
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
  onChangeAccountType,
  onChangeBarRollNo,
  onChangeIbpChapter,
  onChangeSpecialization,
  onChangeOfficeAddress,
  onSubmit,
  onPressTerms,
  onPressPrivacy,
}: SignUpFormProps) {
  const isAtty = accountType === "attorney";

  return (
    <View style={styles.container}>
      {/* Account Type Selector */}
      <View style={styles.typeSelectorContainer}>
        <Text style={styles.typeLabel}>Register as / Mag-rehistro bilang:</Text>
        <View style={styles.typeToggleWrapper}>
          <TouchableOpacity
            style={[
              styles.typeTab,
              !isAtty && styles.typeTabActive,
            ]}
            activeOpacity={0.8}
            onPress={() => onChangeAccountType("client")}
          >
            <Ionicons
              name="person-outline"
              size={18}
              color={!isAtty ? "#FFFFFF" : SIGNUP_COLORS.textMuted}
            />
            <Text
              style={[
                styles.typeTabText,
                !isAtty && styles.typeTabTextActive,
              ]}
            >
              Client / Kliyente
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.typeTab,
              isAtty && styles.typeTabActive,
            ]}
            activeOpacity={0.8}
            onPress={() => onChangeAccountType("attorney")}
          >
            <Ionicons
              name="briefcase-outline"
              size={18}
              color={isAtty ? "#FFFFFF" : SIGNUP_COLORS.textMuted}
            />
            <Text
              style={[
                styles.typeTabText,
                isAtty && styles.typeTabTextActive,
              ]}
            >
              Attorney / Abogado
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Attorney Notice Banner */}
      {isAtty && (
        <View style={styles.attyBanner}>
          <Ionicons name="information-circle-outline" size={20} color="#3B82F6" />
          <Text style={styles.attyBannerText}>
            Attorney applicants will be verified by the Legal Administrator before official activation.
          </Text>
        </View>
      )}

      {/* Full Name */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>
          {isAtty ? "Full Legal Name (Atty. ...)" : SIGNUP_COPY.nameLabel}
        </Text>
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
            placeholder={isAtty ? "e.g., Atty. Maria Santos" : SIGNUP_COPY.namePlaceholder}
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

      {/* Phone Number */}
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
        </View>
        {errors.phone ? (
          <Text style={styles.errorText}>{errors.phone}</Text>
        ) : null}
      </View>

      {/* ATTORNEY FIELDS (Rendered only when Attorney is selected) */}
      {isAtty && (
        <>
          {/* Roll of Attorneys Number */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Roll of Attorneys Number *</Text>
            <View
              style={[
                styles.inputContainer,
                errors.barRollNo ? styles.inputErrorBorder : null,
              ]}
            >
              <Ionicons
                name="shield-checkmark-outline"
                size={20}
                color={SIGNUP_COLORS.textMuted}
                style={styles.inputIcon}
              />
              <TextInput
                value={barRollNo}
                onChangeText={onChangeBarRollNo}
                placeholder="e.g. 74812"
                placeholderTextColor={SIGNUP_COLORS.textMuted}
                keyboardType="numeric"
                style={styles.textInput}
              />
            </View>
            {errors.barRollNo ? (
              <Text style={styles.errorText}>{errors.barRollNo}</Text>
            ) : null}
          </View>

          {/* IBP Chapter */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>IBP Chapter *</Text>
            <View
              style={[
                styles.inputContainer,
                errors.ibpChapter ? styles.inputErrorBorder : null,
              ]}
            >
              <Ionicons
                name="business-outline"
                size={20}
                color={SIGNUP_COLORS.textMuted}
                style={styles.inputIcon}
              />
              <TextInput
                value={ibpChapter}
                onChangeText={onChangeIbpChapter}
                placeholder="e.g. IBP Manila or IBP Quezon City"
                placeholderTextColor={SIGNUP_COLORS.textMuted}
                autoCapitalize="words"
                style={styles.textInput}
              />
            </View>
            {errors.ibpChapter ? (
              <Text style={styles.errorText}>{errors.ibpChapter}</Text>
            ) : null}
          </View>

          {/* Primary Specialization */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Primary Legal Practice / Specialization *</Text>
            <View
              style={[
                styles.inputContainer,
                errors.specialization ? styles.inputErrorBorder : null,
              ]}
            >
              <Ionicons
                name="ribbon-outline"
                size={20}
                color={SIGNUP_COLORS.textMuted}
                style={styles.inputIcon}
              />
              <TextInput
                value={specialization}
                onChangeText={onChangeSpecialization}
                placeholder="e.g. Civil & Property Law, Labor Disputes"
                placeholderTextColor={SIGNUP_COLORS.textMuted}
                autoCapitalize="words"
                style={styles.textInput}
              />
            </View>
            {errors.specialization ? (
              <Text style={styles.errorText}>{errors.specialization}</Text>
            ) : null}
          </View>

          {/* Office Address (Optional) */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Law Office / Practice Address (Optional)</Text>
            <View style={styles.inputContainer}>
              <Ionicons
                name="location-outline"
                size={20}
                color={SIGNUP_COLORS.textMuted}
                style={styles.inputIcon}
              />
              <TextInput
                value={officeAddress}
                onChangeText={onChangeOfficeAddress}
                placeholder="e.g. Ortigas Center, Pasig City"
                placeholderTextColor={SIGNUP_COLORS.textMuted}
                autoCapitalize="words"
                style={styles.textInput}
              />
            </View>
          </View>
        </>
      )}

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
            name="lock-closed-outline"
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

      {/* Terms & Privacy */}
      <View style={styles.termsWrapper}>
        <TouchableOpacity
          onPress={onToggleTerms}
          activeOpacity={0.7}
          style={styles.checkboxTouch}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <View
            style={[
              styles.checkbox,
              agreedToTerms && styles.checkboxActive,
              errors.agreedToTerms ? styles.checkboxError : null,
            ]}
          >
            {agreedToTerms && (
              <Ionicons name="checkmark" size={14} color="#FFFFFF" />
            )}
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
          <Text style={styles.submitButtonText}>
            {isAtty ? "Submit Attorney Application" : SIGNUP_COPY.submitButton}
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  typeSelectorContainer: {
    marginBottom: 18,
  },
  typeLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: SIGNUP_COLORS.textMuted,
    marginBottom: 8,
  },
  typeToggleWrapper: {
    flexDirection: "row",
    backgroundColor: "#F1F5F9",
    borderRadius: 14,
    padding: 4,
    gap: 6,
  },
  typeTab: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 12,
    borderRadius: 10,
  },
  typeTabActive: {
    backgroundColor: SIGNUP_COLORS.primary,
    shadowColor: SIGNUP_COLORS.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 3,
  },
  typeTabText: {
    fontSize: 14,
    fontWeight: "600",
    color: SIGNUP_COLORS.textMuted,
  },
  typeTabTextActive: {
    color: "#FFFFFF",
    fontWeight: "700",
  },
  attyBanner: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: "#EFF6FF",
    borderWidth: 1,
    borderColor: "#BFDBFE",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginBottom: 16,
  },
  attyBannerText: {
    flex: 1,
    fontSize: 12,
    lineHeight: 17,
    color: "#1E40AF",
    fontWeight: "500",
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
    height: 54,
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
  errorText: {
    fontSize: 12,
    color: SIGNUP_COLORS.error,
    marginTop: 6,
    marginLeft: 4,
  },
  termsWrapper: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: 4,
    marginBottom: 8,
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
