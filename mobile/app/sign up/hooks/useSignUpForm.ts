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
import { saveLocalProfile } from "../../services/userProfileService";
import { saveLocalApplication } from "../../services/attorneyApplicationService";

interface SignUpFormState {
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
}

export function useSignUpForm(
  onSuccess?: (userData: { name: string; email: string; role?: "client" | "attorney" }) => void
) {
  const [form, setForm] = useState<SignUpFormState>({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    agreedToTerms: false,
    showPassword: false,
    showConfirmPassword: false,
    accountType: "client",
    barRollNo: "",
    ibpChapter: "",
    specialization: "",
    officeAddress: "",
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

  const setAccountType = (type: "client" | "attorney") => {
    setForm((prev) => ({
      ...prev,
      accountType: type,
      errors: { ...prev.errors, barRollNo: undefined, ibpChapter: undefined, specialization: undefined },
    }));
  };

  const setBarRollNo = (barRollNo: string) => {
    setForm((prev) => ({
      ...prev,
      barRollNo,
      errors: { ...prev.errors, barRollNo: undefined },
    }));
  };

  const setIbpChapter = (ibpChapter: string) => {
    setForm((prev) => ({
      ...prev,
      ibpChapter,
      errors: { ...prev.errors, ibpChapter: undefined },
    }));
  };

  const setSpecialization = (specialization: string) => {
    setForm((prev) => ({
      ...prev,
      specialization,
      errors: { ...prev.errors, specialization: undefined },
    }));
  };

  const setOfficeAddress = (officeAddress: string) => {
    setForm((prev) => ({
      ...prev,
      officeAddress,
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

    let barRollError: string | undefined;
    let ibpChapterError: string | undefined;
    let specializationError: string | undefined;

    if (form.accountType === "attorney") {
      if (!form.barRollNo.trim()) {
        barRollError = "Please enter your Roll of Attorneys number.";
      }
      if (!form.ibpChapter.trim()) {
        ibpChapterError = "Please specify your IBP Chapter.";
      }
      if (!form.specialization.trim()) {
        specializationError = "Please select or enter your primary specialization.";
      }
    }

    if (
      nameError ||
      emailError ||
      phoneError ||
      passwordError ||
      confirmPasswordError ||
      termsError ||
      barRollError ||
      ibpChapterError ||
      specializationError
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
          barRollNo: barRollError,
          ibpChapter: ibpChapterError,
          specialization: specializationError,
        },
      }));
      return;
    }

    setForm((prev) => ({ ...prev, loading: true }));

    try {
      const isAtty = form.accountType === "attorney";
      const { user, profile } = await signUpWithFirebase(
        form.name,
        form.email,
        form.phone,
        form.password,
        form.accountType,
        isAtty
          ? {
              barRollNo: form.barRollNo.trim(),
              ibpChapter: form.ibpChapter.trim(),
              specialization: form.specialization.trim(),
              officeAddress: form.officeAddress.trim(),
            }
          : undefined
      );

      // Cache profile locally for offline access
      if (profile) {
        await saveLocalProfile({
          uid: user.uid,
          name: profile.name,
          email: profile.email,
          phone: profile.phone || "",
          role: profile.role || (isAtty ? "attorney" : "client"),
          attorneyStatus: isAtty ? "pending" : undefined,
          barRollNo: form.barRollNo,
          ibpChapter: form.ibpChapter,
          specialization: form.specialization,
          officeAddress: form.officeAddress,
        });
      }

      if (isAtty) {
        await saveLocalApplication({
          id: user.uid,
          userId: user.uid,
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          barRollNo: form.barRollNo.trim(),
          ibpChapter: form.ibpChapter.trim(),
          specialization: form.specialization.trim(),
          officeAddress: form.officeAddress.trim(),
          status: "pending",
        });
      }

      setForm((prev) => ({ ...prev, loading: false }));

      if (isAtty) {
        Alert.alert(
          "Attorney Application Submitted",
          "Your Bar credentials have been received! The Legal Administrator will verify your credentials shortly. You will now be directed to your Attorney Portal.",
          [
            {
              text: "Enter Attorney Portal",
              onPress: () => {
                if (onSuccess) {
                  onSuccess({
                    name: form.name,
                    email: user.email || form.email,
                    role: "attorney",
                  });
                }
              },
            },
          ]
        );
      } else {
        if (onSuccess) {
          onSuccess({
            name: form.name,
            email: user.email || form.email,
            role: "client",
          });
        }
      }
    } catch (err: any) {
      setForm((prev) => ({ ...prev, loading: false }));
      const msg = getFriendlyAuthErrorMessage(err?.code || "");
      const isAtty = form.accountType === "attorney";

      Alert.alert(
        "Registration Notice",
        `${msg}\n\nWould you like to continue to the dashboard in Offline Mode?`,
        [
          { text: "Fix Details", style: "cancel" },
          {
            text: "Continue Offline",
            onPress: async () => {
              const fakeUid = `offline_${Date.now()}`;
              if (isAtty) {
                await saveLocalApplication({
                  id: fakeUid,
                  userId: fakeUid,
                  name: form.name.trim(),
                  email: form.email.trim(),
                  phone: form.phone.trim(),
                  barRollNo: form.barRollNo.trim(),
                  ibpChapter: form.ibpChapter.trim(),
                  specialization: form.specialization.trim(),
                  officeAddress: form.officeAddress.trim(),
                  status: "pending",
                });
              }
              await saveLocalProfile({
                uid: fakeUid,
                name: form.name.trim(),
                email: form.email.trim(),
                phone: form.phone.trim(),
                role: isAtty ? "attorney" : "client",
                attorneyStatus: isAtty ? "pending" : undefined,
                barRollNo: form.barRollNo,
                ibpChapter: form.ibpChapter,
                specialization: form.specialization,
                officeAddress: form.officeAddress,
              });

              if (onSuccess) {
                onSuccess({
                  name: form.name,
                  email: form.email,
                  role: isAtty ? "attorney" : "client",
                });
              }
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
    accountType: form.accountType,
    barRollNo: form.barRollNo,
    ibpChapter: form.ibpChapter,
    specialization: form.specialization,
    officeAddress: form.officeAddress,
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
    setAccountType,
    setBarRollNo,
    setIbpChapter,
    setSpecialization,
    setOfficeAddress,
    handleSubmit,
  };
}
