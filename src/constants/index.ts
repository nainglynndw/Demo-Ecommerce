// Common spacing constants used across the application
export const SPACING = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
} as const;

// Common font sizes used across the application
export const FONT_SIZE = {
  xs: 10,
  sm: 12,
  md: 14,
  lg: 16,
  xl: 18,
  xxl: 20,
  xxxl: 24,
  xxxxl: 28,
  xxxxxl: 30,
  xxxxxxl: 32,
  xxxxxxxl: 36,
} as const;

// Common font weights used across the application
export const FONT_WEIGHT = {
  normal: '400',
  medium: '500',
  semiBold: '600',
  bold: '700',
} as const;

// Common colors used across the application
export const COLORS = {
  white: '#FFFFFF',
  black: '#000000',
  transparent: 'transparent',
} as const;

// Common percentages used across the application
export const PERCENTAGE = {
  full: '100%',
  half: '50%',
  third: '33.33%',
  quarter: '25%',
} as const;

// Common border radius values used across the application
export const BORDER_RADIUS = {
  sm: 6,
  md: 8,
  lg: 12,
  xl: 16,
} as const;

// Common shadow constants used across the application
export const SHADOW = {
  opacity: {
    light: 0.05,
    medium: 0.1,
    dark: 0.2,
  },
  offset: {
    sm: { width: 0, height: 1 },
    md: { width: 0, height: 2 },
    lg: { width: 0, height: 4 },
  },
  radius: {
    sm: 2,
    md: 4,
    lg: 8,
  },
} as const;

// Common elevation values for Android
export const ELEVATION = {
  sm: 2,
  md: 4,
  lg: 8,
} as const;