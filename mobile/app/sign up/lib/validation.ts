/**
 * Validation helpers for the Sign Up form.
 */

export function validateName(name: string): string | null {
  if (!name.trim()) {
    return "Full name is required.";
  }
  if (name.trim().length < 2) {
    return "Name must be at least 2 characters.";
  }
  return null;
}

export function validateEmail(email: string): string | null {
  if (!email.trim()) {
    return "Email address is required.";
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) {
    return "Please enter a valid email address.";
  }
  return null;
}

export function validatePhone(phone: string): string | null {
  const cleaned = phone.replace(/\D/g, "");
  if (!cleaned) {
    return "Phone number is required.";
  }
  if (cleaned.length !== 11) {
    return "Phone number must be exactly 11 digits (e.g. 09123456789).";
  }
  if (!cleaned.startsWith("09")) {
    return "Philippine mobile number must start with 09.";
  }
  return null;
}

export function validatePassword(password: string): string | null {
  if (!password) {
    return "Password is required.";
  }
  if (password.length < 8) {
    return "Password must be at least 8 characters.";
  }
  return null;
}

export function validateConfirmPassword(
  password: string,
  confirmPassword: string
): string | null {
  if (!confirmPassword) {
    return "Please confirm your password.";
  }
  if (password !== confirmPassword) {
    return "Passwords do not match.";
  }
  return null;
}
