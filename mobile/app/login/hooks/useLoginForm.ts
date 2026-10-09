import { useState } from "react";
import { Alert } from "react-native";
import { loginWithFirebase, getFriendlyAuthErrorMessage } from "../../services/firebaseAuthService";

interface LoginFormState {
  email: string;
  password: string;
  showPassword: boolean;
  errors: {
    email?: string;
    password?: string;
  };
  loading: boolean;
}

export function useLoginForm(onSuccess?: (email: string) => void) {
  const [form, setForm] = useState<LoginFormState>({
    email: "",
    password: "",
    showPassword: false,
    errors: {},
    loading: false,
  });

  const setEmail = (email: string) => {
    setForm((prev) => ({
      ...prev,
      email,
      errors: { ...prev.errors, email: undefined },
    }));
  };

  const setPassword = (password: string) => {
    setForm((prev) => ({
      ...prev,
      password,
      errors: { ...prev.errors, password: undefined },
    }));
  };

  const toggleShowPassword = () => {
    setForm((prev) => ({
      ...prev,
      showPassword: !prev.showPassword,
    }));
  };

  const handleSubmit = async () => {
    const emailToUse = form.email.trim();
    const passToUse = form.password;

    if (!emailToUse) {
      setForm((prev) => ({
        ...prev,
        errors: { ...prev.errors, email: "Please enter your email address." },
      }));
      return;
    }

    if (!passToUse) {
      setForm((prev) => ({
        ...prev,
        errors: { ...prev.errors, password: "Please enter your password." },
      }));
      return;
    }

    setForm((prev) => ({ ...prev, loading: true }));

    try {
      const { user } = await loginWithFirebase(emailToUse, passToUse);
      setForm((prev) => ({ ...prev, loading: false }));
      if (onSuccess) {
        onSuccess(user.email || emailToUse);
      }
    } catch (err: any) {
      setForm((prev) => ({ ...prev, loading: false }));
      const msg = getFriendlyAuthErrorMessage(err?.code || "");
      Alert.alert(
        "Login Note",
        `${msg}\n\nWould you like to proceed in Offline / Demo Mode?`,
        [
          { text: "Try Again", style: "cancel" },
          {
            text: "Continue Offline",
            onPress: () => {
              if (onSuccess) onSuccess(emailToUse);
            },
          },
        ]
      );
    }
  };

  return {
    email: form.email,
    password: form.password,
    showPassword: form.showPassword,
    errors: form.errors,
    loading: form.loading,
    setEmail,
    setPassword,
    toggleShowPassword,
    handleSubmit,
  };
}
