import { formatPrice, formatRating, formatDate } from '@utils/formatting';

describe('formatPrice', () => {
  it('should format positive numbers correctly', () => {
    expect(formatPrice(10)).toBe('$10.00');
    expect(formatPrice(10.5)).toBe('$10.50');
    expect(formatPrice(10.55)).toBe('$10.55');
    expect(formatPrice(10.555)).toBe('$10.55'); // banker's rounding
    expect(formatPrice(0)).toBe('$0.00');
  });

  it('should format negative numbers correctly', () => {
    expect(formatPrice(-10)).toBe('$-10.00');
    expect(formatPrice(-10.5)).toBe('$-10.50');
  });

  it('should handle very large numbers', () => {
    expect(formatPrice(999999.99)).toBe('$999999.99');
    expect(formatPrice(1000000)).toBe('$1000000.00');
  });

  it('should handle very small decimal numbers', () => {
    expect(formatPrice(0.001)).toBe('$0.00');
    expect(formatPrice(0.005)).toBe('$0.01'); // rounds up
    expect(formatPrice(0.004)).toBe('$0.00'); // rounds down
  });
});

describe('formatRating', () => {
  it('should format rating and reviews correctly', () => {
    expect(formatRating(4.5, 100)).toBe('★ 4.5 (100 reviews)');
    expect(formatRating(5.0, 1)).toBe('★ 5.0 (1 reviews)');
    expect(formatRating(0, 0)).toBe('★ 0.0 (0 reviews)');
  });

  it('should handle decimal ratings', () => {
    expect(formatRating(4.67, 50)).toBe('★ 4.7 (50 reviews)');
    expect(formatRating(3.33, 25)).toBe('★ 3.3 (25 reviews)');
  });

  it('should handle edge cases', () => {
    expect(formatRating(0, 1000)).toBe('★ 0.0 (1000 reviews)');
    expect(formatRating(5, 999999)).toBe('★ 5.0 (999999 reviews)');
  });
});

describe('formatDate', () => {
  it('should format valid date strings correctly', () => {
    // Test with a known date format
    const testDate = '2024-01-15';
    const result = formatDate(testDate);

    // The result will depend on the system locale, so we'll check it's a valid date string
    expect(result).toMatch(/^\d{1,2}\/\d{1,2}\/\d{4}$/);
  });

  it('should handle different date formats', () => {
    const testDate = '2024-01-15T10:30:00Z';
    const result = formatDate(testDate);

    // The result will depend on the system locale, so we'll check it's a valid date string
    expect(result).toMatch(/^\d{1,2}\/\d{1,2}\/\d{4}$/);
  });

  it('should handle invalid date strings gracefully', () => {
    // Invalid dates should not throw errors
    expect(() => formatDate('invalid-date')).not.toThrow();
    expect(() => formatDate('')).not.toThrow();
    expect(() => formatDate('2024-13-45')).not.toThrow();
  });
});

// Integration test
describe('formatting utilities integration', () => {
  it('should work together for a product display', () => {
    const price = 29.99;
    const rating = 4.5;
    const reviews = 128;
    const dateAdded = '2024-01-15';

    const formattedPrice = formatPrice(price);
    const formattedRating = formatRating(rating, reviews);
    const formattedDate = formatDate(dateAdded);

    expect(formattedPrice).toBe('$29.99');
    expect(formattedRating).toBe('★ 4.5 (128 reviews)');
    // Date format depends on locale, so just check it's a valid date string
    expect(formattedDate).toMatch(/^\d{1,2}\/\d{1,2}\/\d{4}$/);
  });
});
