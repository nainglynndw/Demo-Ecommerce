import {
  formatCardNumber,
  formatExpiry,
} from '@orders/screens/CreateOrder/utils/formatting';

describe('CreateOrder formatting utilities', () => {
  describe('formatCardNumber', () => {
    it('should format card number with spaces every 4 digits', () => {
      expect(formatCardNumber('1234567890123456')).toBe('1234 5678 9012 3456');
      expect(formatCardNumber('123456789012345')).toBe('1234 5678 9012 345');
      expect(formatCardNumber('12345678901234')).toBe('1234 5678 9012 34');
      expect(formatCardNumber('1234567890123')).toBe('1234 5678 9012 3');
    });

    it('should handle card numbers with existing spaces', () => {
      expect(formatCardNumber('1234 5678 9012 3456')).toBe(
        '1234 5678 9012 3456',
      );
      expect(formatCardNumber('1234  5678  9012  3456')).toBe(
        '1234 5678 9012 3456',
      );
      expect(formatCardNumber(' 1234 5678 9012 3456 ')).toBe(
        '1234 5678 9012 3456',
      );
    });

    it('should handle card numbers with other non-digit characters', () => {
      expect(formatCardNumber('1234-5678-9012-3456')).toBe(
        '1234 5678 9012 3456',
      );
      expect(formatCardNumber('1234.5678.9012.3456')).toBe(
        '1234 5678 9012 3456',
      );
      expect(formatCardNumber('1234_5678_9012_3456')).toBe(
        '1234 5678 9012 3456',
      );
      expect(formatCardNumber('1234/5678/9012/3456')).toBe(
        '1234 5678 9012 3456',
      );
    });

    it('should handle mixed character inputs', () => {
      expect(formatCardNumber('1234abc5678def9012ghi3456')).toBe(
        '1234 5678 9012 3456',
      );
      expect(formatCardNumber('12 34 56 78 90 12 34 56')).toBe(
        '1234 5678 9012 3456',
      );
      expect(formatCardNumber('12-34-56-78-90-12-34-56')).toBe(
        '1234 5678 9012 3456',
      );
    });

    it('should handle short card numbers', () => {
      expect(formatCardNumber('1234')).toBe('1234');
      expect(formatCardNumber('12345')).toBe('1234 5');
      expect(formatCardNumber('123456')).toBe('1234 56');
      expect(formatCardNumber('1234567')).toBe('1234 567');
    });

    it('should handle very short inputs', () => {
      expect(formatCardNumber('123')).toBe('123');
      expect(formatCardNumber('12')).toBe('12');
      expect(formatCardNumber('1')).toBe('1');
      expect(formatCardNumber('')).toBe('');
    });

    it('should handle edge cases', () => {
      expect(formatCardNumber('0000000000000000')).toBe('0000 0000 0000 0000');
      expect(formatCardNumber('9999999999999999')).toBe('9999 9999 9999 9999');
      expect(formatCardNumber('12345678901234567890')).toBe(
        '1234 5678 9012 3456 7890',
      );
    });

    it('should handle inputs with only non-digits', () => {
      expect(formatCardNumber('abc-def-ghi-jkl')).toBe('');
      expect(formatCardNumber('   -   -   -   ')).toBe('');
      expect(formatCardNumber('...')).toBe('');
      expect(formatCardNumber('   ')).toBe('');
    });

    it('should handle null and undefined inputs gracefully', () => {
      expect(() => formatCardNumber(null as any)).toThrow();
      expect(() => formatCardNumber(undefined as any)).toThrow();
    });
  });

  describe('formatExpiry', () => {
    it('should format expiry date in MM/YY format', () => {
      expect(formatExpiry('1234')).toBe('12/34');
      expect(formatExpiry('12345')).toBe('12/34');
      expect(formatExpiry('123456')).toBe('12/34');
      expect(formatExpiry('1234567')).toBe('12/34');
    });

    it('should handle partial expiry inputs', () => {
      expect(formatExpiry('1')).toBe('1');
      expect(formatExpiry('12')).toBe('12/');
      expect(formatExpiry('123')).toBe('12/3');
    });

    it('should handle expiry with existing slashes', () => {
      expect(formatExpiry('12/34')).toBe('12/34');
      expect(formatExpiry('12/3')).toBe('12/3');
      expect(formatExpiry('1/2')).toBe('12/');
    });

    it('should handle expiry with other separators', () => {
      expect(formatExpiry('12-34')).toBe('12/34');
      expect(formatExpiry('12.34')).toBe('12/34');
      expect(formatExpiry('12_34')).toBe('12/34');
      expect(formatExpiry('12 34')).toBe('12/34');
    });

    it('should handle mixed character inputs', () => {
      expect(formatExpiry('12abc34')).toBe('12/34');
      expect(formatExpiry('12-34-56')).toBe('12/34');
      expect(formatExpiry('12.34.56')).toBe('12/34');
      expect(formatExpiry('12 34 56')).toBe('12/34');
    });

    it('should handle edge cases', () => {
      expect(formatExpiry('0000')).toBe('00/00');
      expect(formatExpiry('9999')).toBe('99/99');
      expect(formatExpiry('123456789')).toBe('12/34');
    });

    it('should handle inputs with only non-digits', () => {
      expect(formatExpiry('ab-cd')).toBe('');
      expect(formatExpiry('   -   ')).toBe('');
      expect(formatExpiry('...')).toBe('');
      expect(formatExpiry('   ')).toBe('');
    });

    it('should handle empty and null inputs', () => {
      expect(formatExpiry('')).toBe('');
      expect(() => formatExpiry(null as any)).toThrow();
      expect(() => formatExpiry(undefined as any)).toThrow();
    });

    it('should handle single digit months and years', () => {
      expect(formatExpiry('1')).toBe('1');
      expect(formatExpiry('12')).toBe('12/');
      expect(formatExpiry('123')).toBe('12/3');
      expect(formatExpiry('1234')).toBe('12/34');
    });

    it('should handle leading zeros', () => {
      expect(formatExpiry('0123')).toBe('01/23');
      expect(formatExpiry('0012')).toBe('00/12');
      expect(formatExpiry('0001')).toBe('00/01');
    });
  });

  describe('integration scenarios', () => {
    it('should handle realistic credit card scenarios', () => {
      // Visa card
      expect(formatCardNumber('4111111111111111')).toBe('4111 1111 1111 1111');

      // Mastercard
      expect(formatCardNumber('5555555555554444')).toBe('5555 5555 5555 4444');

      // American Express
      expect(formatCardNumber('378282246310005')).toBe('3782 8224 6310 005');
    });

    it('should handle realistic expiry date scenarios', () => {
      // Current year formats
      expect(formatExpiry('1225')).toBe('12/25');
      expect(formatExpiry('0130')).toBe('01/30');

      // Single digit month/year
      expect(formatExpiry('125')).toBe('12/5');
      expect(formatExpiry('15')).toBe('15/');
    });

    it('should handle user input patterns', () => {
      // User typing card number
      expect(formatCardNumber('4')).toBe('4');
      expect(formatCardNumber('41')).toBe('41');
      expect(formatCardNumber('411')).toBe('411');
      expect(formatCardNumber('4111')).toBe('4111');
      expect(formatCardNumber('41111')).toBe('4111 1');
      expect(formatCardNumber('411111')).toBe('4111 11');
      expect(formatCardNumber('4111111')).toBe('4111 111');
      expect(formatCardNumber('41111111')).toBe('4111 1111');

      // User typing expiry
      expect(formatExpiry('1')).toBe('1');
      expect(formatExpiry('12')).toBe('12/');
      expect(formatExpiry('123')).toBe('12/3');
      expect(formatExpiry('1234')).toBe('12/34');
    });
  });
});
