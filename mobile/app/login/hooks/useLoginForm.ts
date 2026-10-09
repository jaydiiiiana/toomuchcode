import { useState } from "react";
import { validateEmail, validatePassword } from "../lib/validation";

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

  const handleSubmit = () => {
    const emailError = validateEmail(form.email);
    const passwordError = validatePassword(form.password);

    if (emailError || passwordError) {
      setForm((prev) => ({
        ...prev,
        errors: {
          email: emailError || undefined,
          password: passwordError || undefined,
        },
      }));
      return;
    }

    setForm((prev) => ({ ...prev, loading: true }));

    // Simulate login request
    setTimeout(() => {
      setForm((prev) => ({ ...prev, loading: false }));
      if (onSuccess) {
        onSuccess(form.email);
      } else {
        console.log("Logged in with:", form.email);
      }
    }, 800);
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
