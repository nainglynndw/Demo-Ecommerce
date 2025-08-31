// Validation constants
export const VALIDATION = {
  phone: {
    minLength: 10,
    pattern: /^[+]?[\d\s\-()]{10,}$/,
  },
  cardNumber: {
    length: 16,
    pattern: /^\d{16}$/,
  },
  cvv: {
    length: 3,
    pattern: /^\d{3}$/,
  },
  expiryDate: {
    pattern: /^(0[1-9]|1[0-2])\/\d{2}$/,
  },
} as const;

// Payment methods
export enum PaymentMethod {
  CREDIT_CARD = 'credit_card',
  PAYPAL = 'paypal',
  APPLE_PAY = 'apple_pay',
  GOOGLE_PAY = 'google_pay',
}

// Order status
export enum OrderStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  SHIPPED = 'shipped',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled',
}

