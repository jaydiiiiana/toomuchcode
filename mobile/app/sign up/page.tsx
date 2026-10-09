import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SignUpHeader from "./components/SignUpHeader";
import SignUpForm from "./components/SignUpForm";
import SocialSignUpButtons from "./components/SocialSignUpButtons";
import SignUpFooter from "./components/SignUpFooter";
import PolicyModal, { PolicyTab } from "./components/PolicyModal";
import { useSignUpForm } from "./hooks/useSignUpForm";
import { SIGNUP_COLORS } from "./lib/constants";

interface SignUpPageProps {
  onNavigateToLogin: () => void;
  onSignUpSuccess?: (userData: { name: string; email: string }) => void;
  onGoogleSignUp?: () => void;
  onAppleSignUp?: () => void;
}

export default function SignUpPage({
  onNavigateToLogin,
  onSignUpSuccess,
  onGoogleSignUp,
  onAppleSignUp,
}: SignUpPageProps) {
  const {
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
    setName,
    setEmail,
    setPhone,
    setPassword,
    setConfirmPassword,
    toggleTerms,
    toggleShowPassword,
    toggleShowConfirmPassword,
    handleSubmit,
  } = useSignUpForm(onSignUpSuccess);

  // Policy Modal state
  const [policyModalVisible, setPolicyModalVisible] = useState(false);
  const [policyTab, setPolicyTab] = useState<PolicyTab>("terms");

  const handleOpenTerms = () => {
    setPolicyTab("terms");
    setPolicyModalVisible(true);
  };

  const handleOpenPrivacy = () => {
    setPolicyTab("privacy");
    setPolicyModalVisible(true);
  };

  const handleAcceptPolicy = () => {
    if (!agreedToTerms) {
      toggleTerms();
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header without back button */}
          <SignUpHeader />

          {/* Form */}
          <SignUpForm
            name={name}
            email={email}
            phone={phone}
            password={password}
            confirmPassword={confirmPassword}
            agreedToTerms={agreedToTerms}
            showPassword={showPassword}
            showConfirmPassword={showConfirmPassword}
            errors={errors}
            loading={loading}
            onChangeName={setName}
            onChangeEmail={setEmail}
            onChangePhone={setPhone}
            onChangePassword={setPassword}
            onChangeConfirmPassword={setConfirmPassword}
            onToggleTerms={toggleTerms}
            onToggleShowPassword={toggleShowPassword}
            onToggleShowConfirmPassword={toggleShowConfirmPassword}
            onSubmit={handleSubmit}
            onPressTerms={handleOpenTerms}
            onPressPrivacy={handleOpenPrivacy}
          />

          {/* Social Logins */}
          <SocialSignUpButtons
            onGoogleSignUp={onGoogleSignUp}
            onAppleSignUp={onAppleSignUp}
          />

          {/* Footer */}
          <SignUpFooter onNavigateToLogin={onNavigateToLogin} />
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Terms of Service and Privacy Policy Modal */}
      <PolicyModal
        visible={policyModalVisible}
        initialTab={policyTab}
        onClose={() => setPolicyModalVisible(false)}
        onAccept={handleAcceptPolicy}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: SIGNUP_COLORS.surface,
  },
  keyboardView: {
    flex: 1,
  },
  scroll: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 32,
    justifyContent: "space-between",
  },
});
