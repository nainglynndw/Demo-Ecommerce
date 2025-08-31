// File size constants
export const KILOBYTE = 1024;
export const BYTES_PER_MEGABYTE = KILOBYTE * KILOBYTE;

// Image constants
export const IMAGE_WIDTH_RATIO = 0.7;
export const IMAGE_HEIGHT_RATIO = 0.8;
export const MAX_IMAGE_SIZE = 2000;

// Image dimensions
export const IMAGE_DIMENSIONS = {
  productCard: 200,
  productDetail: 400,
  thumbnail: 60,
  avatar: 80,
} as const;

// Animation durations (milliseconds)
export const ANIMATION_DURATION = {
  fast: 150,
  normal: 300,
  slow: 500,
} as const;

// Product-specific colors
export const PRODUCT_COLORS = {
  overlay: 'rgba(0, 0, 0, 0.6)',
} as const;

// Line heights
export const LINE_HEIGHT = {
  tight: 16,
  normal: 20,
  relaxed: 24,
  loose: 28,
} as const;
