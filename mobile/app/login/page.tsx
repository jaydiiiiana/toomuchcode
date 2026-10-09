import React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import LoginHeader from "./components/LoginHeader";
import LoginForm from "./components/LoginForm";
import SocialLoginButtons from "./components/SocialLoginButtons";
import LoginFooter from "./components/LoginFooter";
import { useLoginForm } from "./hooks/useLoginForm";
import { LOGIN_COLORS } from "./lib/constants";

interface LoginPageProps {
  onNavigateToSignUp: () => void;
  onLoginSuccess?: (email: string) => void;
  onForgotPassword?: () => void;
  onGoogleLogin?: () => void;
  onAppleLogin?: () => void;
}

export default function LoginPage({
  onNavigateToSignUp,
  onLoginSuccess,
  onForgotPassword,
  onGoogleLogin,
  onAppleLogin,
}: LoginPageProps) {
  const {
    email,
    password,
    showPassword,
    errors,
    loading,
    setEmail,
    setPassword,
    toggleShowPassword,
    handleSubmit,
  } = useLoginForm(onLoginSuccess);

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
          <LoginHeader />

          {/* Form */}
          <LoginForm
            email={email}
            password={password}
            showPassword={showPassword}
            errors={errors}
            loading={loading}
            onChangeEmail={setEmail}
            onChangePassword={setPassword}
            onToggleShowPassword={toggleShowPassword}
            onSubmit={handleSubmit}
            onForgotPassword={onForgotPassword}
          />

          {/* Social Logins */}
          <SocialLoginButtons
            onGoogleLogin={onGoogleLogin}
            onAppleLogin={onAppleLogin}
          />

          {/* Footer */}
          <LoginFooter onNavigateToSignUp={onNavigateToSignUp} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: LOGIN_COLORS.surface,
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
