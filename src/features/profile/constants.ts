// Avatar constants
export const AVATAR = {
  size: {
    small: 60,
    medium: 80,
    large: 100,
  },
  borderRadius: {
    small: 30,
    medium: 40,
    large: 50,
  },
} as const;

// Profile constants
export const PROFILE_CONSTANTS = {
  recentOrdersLimit: 3,
  orderIdDisplayLength: -6,
} as const;

// Profile-specific colors
export const PROFILE_COLORS = {
  lightGray: '#eee',
} as const;

// Border constants
export const BORDER = {
  width: {
    thin: 1,
    medium: 2,
  },
} as const;
