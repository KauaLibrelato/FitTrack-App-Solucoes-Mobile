export const VALIDATION_PATTERNS = {
  EMAIL: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
} as const;

export const VALIDATION_MESSAGES = {
  REQUIRED_FIELD: "Campo obrigatório",
  INVALID_EMAIL: "Email inválido",
  PASSWORDS_DONT_MATCH: "As senhas não correspondem",
} as const;
