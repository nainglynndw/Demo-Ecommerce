// Validation constants
export const VALIDATION = {
  phone: {
    minLength: 10,
    maxLength: 15,
    pattern: /^\(\d{3}\) \d{3}-\d{4}$/,
  },
  password: {
    minLength: 6,
  },
  name: {
    minLength: 2,
  },
} as const;

