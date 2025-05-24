import { VALIDATION_MESSAGES, VALIDATION_PATTERNS } from "./validation";

export const validateEmail = (email: string): string | undefined => {
  if (!email) return VALIDATION_MESSAGES.REQUIRED_FIELD;
  if (!VALIDATION_PATTERNS.EMAIL.test(email)) return VALIDATION_MESSAGES.INVALID_EMAIL;
  return undefined;
};

export const validateRequired = (value: string): string | undefined => {
  if (!value) return VALIDATION_MESSAGES.REQUIRED_FIELD;
  return undefined;
};

export const validatePasswordMatch = (password: string, confirmPassword: string): string | undefined => {
  if (password !== confirmPassword) return VALIDATION_MESSAGES.PASSWORDS_DONT_MATCH;
  return undefined;
};

export const createValidationRules = {
  required: { required: VALIDATION_MESSAGES.REQUIRED_FIELD },
  email: {
    required: VALIDATION_MESSAGES.REQUIRED_FIELD,
    pattern: {
      value: VALIDATION_PATTERNS.EMAIL,
      message: VALIDATION_MESSAGES.INVALID_EMAIL,
    },
  },
  passwordMatch: (watchedPassword: string) => ({
    required: VALIDATION_MESSAGES.REQUIRED_FIELD,
    validate: (value: string) => validatePasswordMatch(watchedPassword, value),
  }),
};
