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
import SignUpFooter from "./components/SignUpFooter";
import PolicyModal, { PolicyTab } from "./components/PolicyModal";
import { useSignUpForm } from "./hooks/useSignUpForm";
import { SIGNUP_COLORS } from "./lib/constants";

interface SignUpPageProps {
  onNavigateToLogin: () => void;
  onSignUpSuccess?: (userData: { name: string; email: string; role?: "client" | "attorney" }) => void;
}

export default function SignUpPage({
  onNavigateToLogin,
  onSignUpSuccess,
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
    accountType,
    barRollNo,
    ibpChapter,
    specialization,
    officeAddress,
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
    setAccountType,
    setBarRollNo,
    setIbpChapter,
    setSpecialization,
    setOfficeAddress,
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
            accountType={accountType}
            barRollNo={barRollNo}
            ibpChapter={ibpChapter}
            specialization={specialization}
            officeAddress={officeAddress}
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
            onChangeAccountType={setAccountType}
            onChangeBarRollNo={setBarRollNo}
            onChangeIbpChapter={setIbpChapter}
            onChangeSpecialization={setSpecialization}
            onChangeOfficeAddress={setOfficeAddress}
            onSubmit={handleSubmit}
            onPressTerms={handleOpenTerms}
            onPressPrivacy={handleOpenPrivacy}
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
