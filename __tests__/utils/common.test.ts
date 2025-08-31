import { delay } from '@utils/common';

describe('common utilities', () => {
  describe('delay', () => {
    it('should delay execution for the specified time', async () => {
      const startTime = Date.now();
      const delayMs = 100;

      await delay(delayMs);

      const endTime = Date.now();
      const actualDelay = endTime - startTime;

      // Allow for some tolerance due to JavaScript timing precision
      expect(actualDelay).toBeGreaterThanOrEqual(delayMs - 10);
      expect(actualDelay).toBeLessThanOrEqual(delayMs + 50);
    });

    it('should handle zero delay', async () => {
      const startTime = Date.now();

      await delay(0);

      const endTime = Date.now();
      const actualDelay = endTime - startTime;

      // Zero delay should be very fast
      expect(actualDelay).toBeLessThan(10);
    });

    it('should handle negative delay gracefully', async () => {
      const startTime = Date.now();

      await delay(-100);

      const endTime = Date.now();
      const actualDelay = endTime - startTime;

      // Negative delay should be treated as zero
      expect(actualDelay).toBeLessThan(10);
    });

    it('should return a promise', () => {
      const result = delay(100);
      expect(result).toBeInstanceOf(Promise);
    });

    it('should resolve after delay', async () => {
      const result = await delay(50);
      expect(result).toBeUndefined();
    });
  });
});
