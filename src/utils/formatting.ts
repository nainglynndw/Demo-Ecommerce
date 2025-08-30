/**
 * Utility functions for formatting data
 */

/**
 * Formats a price number to display with dollar sign and 2 decimal places
 */
export const formatPrice = (price: number): string => {
  return `$${price.toFixed(2)}`;
};

/**
 * Formats a rating and review count for display
 */
export const formatRating = (rating: number, reviews: number): string => {
  return `★ ${rating.toFixed(1)} (${reviews} reviews)`;
};

/**
 * Formats a date string to a localized date format
 */
export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString();
};
