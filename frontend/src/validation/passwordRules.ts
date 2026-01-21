export interface PasswordRequirement {
  id: string;
  label: string;
  validator: (password: string) => boolean;
}

export const passwordRequirements: PasswordRequirement[] = [
  {
    id: "minLength",
    label: "At least 8 characters",
    validator: (password) => password.length >= 8,
  },
  {
    id: "uppercase",
    label: "One uppercase letter",
    validator: (password) => /[A-Z]/.test(password),
  },
  {
    id: "lowercase",
    label: "One lowercase letter",
    validator: (password) => /[a-z]/.test(password),
  },
  {
    id: "number",
    label: "One number",
    validator: (password) => /\d/.test(password),
  },
  {
    id: "special",
    label: "One special character (!@#$%^&*)",
    validator: (password) => /[!@#$%^&*(),.?":{}|<>]/.test(password),
  },
];

export const validatePassword = (password: string): boolean => {
  return passwordRequirements.every((req) => req.validator(password));
};
