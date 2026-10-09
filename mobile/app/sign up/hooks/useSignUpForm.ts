import { useState } from "react";
import { Alert } from "react-native";
import {
  validateConfirmPassword,
  validateEmail,
  validateName,
  validatePassword,
  validatePhone,
} from "../lib/validation";
import {
  signUpWithFirebase,
  getFriendlyAuthErrorMessage,
} from "../../services/firebaseAuthService";

interface SignUpFormState {
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
}

export function useSignUpForm(onSuccess?: (userData: { name: string; email: string }) => void) {
  const [form, setForm] = useState<SignUpFormState>({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    agreedToTerms: false,
    showPassword: false,
    showConfirmPassword: false,
    errors: {},
    loading: false,
  });

  const setName = (name: string) => {
    setForm((prev) => ({
      ...prev,
      name,
      errors: { ...prev.errors, name: undefined },
    }));
  };

  const setEmail = (email: string) => {
    setForm((prev) => ({
      ...prev,
      email,
      errors: { ...prev.errors, email: undefined },
    }));
  };

  const setPhone = (rawPhone: string) => {
    // Only allow numbers and limit to 11 digits
    const cleaned = rawPhone.replace(/\D/g, "").slice(0, 11);
    setForm((prev) => ({
      ...prev,
      phone: cleaned,
      errors: { ...prev.errors, phone: undefined },
    }));
  };

  const setPassword = (password: string) => {
    setForm((prev) => ({
      ...prev,
      password,
      errors: { ...prev.errors, password: undefined },
    }));
  };

  const setConfirmPassword = (confirmPassword: string) => {
    setForm((prev) => ({
      ...prev,
      confirmPassword,
      errors: { ...prev.errors, confirmPassword: undefined },
    }));
  };

  const toggleTerms = () => {
    setForm((prev) => ({
      ...prev,
      agreedToTerms: !prev.agreedToTerms,
      errors: { ...prev.errors, agreedToTerms: undefined },
    }));
  };

  const toggleShowPassword = () => {
    setForm((prev) => ({
      ...prev,
      showPassword: !prev.showPassword,
    }));
  };

  const toggleShowConfirmPassword = () => {
    setForm((prev) => ({
      ...prev,
      showConfirmPassword: !prev.showConfirmPassword,
    }));
  };

  const handleSubmit = async () => {
    const nameError = validateName(form.name);
    const emailError = validateEmail(form.email);
    const phoneError = validatePhone(form.phone);
    const passwordError = validatePassword(form.password);
    const confirmPasswordError = validateConfirmPassword(
      form.password,
      form.confirmPassword
    );
    const termsError = !form.agreedToTerms
      ? "You must agree to the terms to proceed."
      : undefined;

    if (
      nameError ||
      emailError ||
      phoneError ||
      passwordError ||
      confirmPasswordError ||
      termsError
    ) {
      setForm((prev) => ({
        ...prev,
        errors: {
          name: nameError || undefined,
          email: emailError || undefined,
          phone: phoneError || undefined,
          password: passwordError || undefined,
          confirmPassword: confirmPasswordError || undefined,
          agreedToTerms: termsError,
        },
      }));
      return;
    }

    setForm((prev) => ({ ...prev, loading: true }));

    try {
      const { user } = await signUpWithFirebase(
        form.name,
        form.email,
        form.phone,
        form.password
      );

      setForm((prev) => ({ ...prev, loading: false }));
      if (onSuccess) {
        onSuccess({ name: form.name, email: user.email || form.email });
      }
    } catch (err: any) {
      setForm((prev) => ({ ...prev, loading: false }));
      const msg = getFriendlyAuthErrorMessage(err?.code || "");
      Alert.alert(
        "Registration Notice",
        `${msg}\n\nWould you like to continue to the main dashboard in Offline Mode?`,
        [
          { text: "Fix Details", style: "cancel" },
          {
            text: "Continue Offline",
            onPress: () => {
              if (onSuccess) onSuccess({ name: form.name, email: form.email });
            },
          },
        ]
      );
    }
  };

  return {
    name: form.name,
    email: form.email,
    phone: form.phone,
    password: form.password,
    confirmPassword: form.confirmPassword,
    agreedToTerms: form.agreedToTerms,
    showPassword: form.showPassword,
    showConfirmPassword: form.showConfirmPassword,
    errors: form.errors,
    loading: form.loading,
    setName,
    setEmail,
    setPhone,
    setPassword,
    setConfirmPassword,
    toggleTerms,
    toggleShowPassword,
    toggleShowConfirmPassword,
    handleSubmit,
  };
}
