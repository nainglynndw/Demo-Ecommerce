import { getThemeFromMode } from '../../src/utils/theme';
import { lightTheme, darkTheme } from '../../src/types/theme';

describe('getThemeFromMode', () => {
  describe('light mode', () => {
    it('should return light theme when mode is light', () => {
      const result = getThemeFromMode('light', 'light');
      expect(result).toBe(lightTheme);
      expect(result.mode).toBe('light');
      expect(result.colors.background).toBe('#ffffff');
      expect(result.colors.text).toBe('#111827');
    });

    it('should return light theme when mode is light regardless of system scheme', () => {
      const result = getThemeFromMode('light', 'dark');
      expect(result).toBe(lightTheme);
      expect(result.mode).toBe('light');
    });
  });

  describe('dark mode', () => {
    it('should return dark theme when mode is dark', () => {
      const result = getThemeFromMode('dark', 'light');
      expect(result).toBe(darkTheme);
      expect(result.mode).toBe('dark');
      expect(result.colors.background).toBe('#111827');
      expect(result.colors.text).toBe('#f9fafb');
    });

    it('should return dark theme when mode is dark regardless of system scheme', () => {
      const result = getThemeFromMode('dark', 'dark');
      expect(result).toBe(darkTheme);
      expect(result.mode).toBe('dark');
    });
  });

  describe('system mode', () => {
    it('should return dark theme when mode is system and system scheme is dark', () => {
      const result = getThemeFromMode('system', 'dark');
      expect(result).toBe(darkTheme);
      expect(result.mode).toBe('dark');
      expect(result.colors.background).toBe('#111827');
    });

    it('should return light theme when mode is system and system scheme is light', () => {
      const result = getThemeFromMode('system', 'light');
      expect(result).toBe(lightTheme);
      expect(result.mode).toBe('light');
      expect(result.colors.background).toBe('#ffffff');
    });
  });

  describe('edge cases', () => {
    it('should return light theme for unknown mode', () => {
      // Test with invalid mode (TypeScript would prevent this in real usage)
      const result = getThemeFromMode('invalid' as any, 'light');
      expect(result).toBe(lightTheme);
      expect(result.mode).toBe('light');
    });

    it('should handle empty string mode gracefully', () => {
      const result = getThemeFromMode('' as any, 'dark');
      expect(result).toBe(lightTheme);
      expect(result.mode).toBe('light');
    });
  });

  describe('theme object properties', () => {
    it('should return theme with correct structure for light mode', () => {
      const result = getThemeFromMode('light', 'dark');

      expect(result).toHaveProperty('mode');
      expect(result).toHaveProperty('colors');
      expect(result.colors).toHaveProperty('primary');
      expect(result.colors).toHaveProperty('background');
      expect(result.colors).toHaveProperty('text');
      expect(result.colors).toHaveProperty('surface');
      expect(result.colors).toHaveProperty('border');
      expect(result.colors).toHaveProperty('error');
      expect(result.colors).toHaveProperty('success');
      expect(result.colors).toHaveProperty('warning');
      expect(result.colors).toHaveProperty('shadow');
    });

    it('should return theme with correct structure for dark mode', () => {
      const result = getThemeFromMode('dark', 'light');

      expect(result).toHaveProperty('mode');
      expect(result).toHaveProperty('colors');
      expect(result.colors).toHaveProperty('primary');
      expect(result.colors).toHaveProperty('background');
      expect(result.colors).toHaveProperty('text');
      expect(result.colors).toHaveProperty('surface');
      expect(result.colors).toHaveProperty('border');
      expect(result.colors).toHaveProperty('error');
      expect(result.colors).toHaveProperty('success');
      expect(result.colors).toHaveProperty('warning');
      expect(result.colors).toHaveProperty('shadow');
    });
  });

  describe('color value validation', () => {
    it('should return correct color values for light theme', () => {
      const result = getThemeFromMode('light', 'dark');

      expect(result.colors.primary).toBe('#3b82f6');
      expect(result.colors.primaryDark).toBe('#2563eb');
      expect(result.colors.background).toBe('#ffffff');
      expect(result.colors.surface).toBe('#f9fafb');
      expect(result.colors.text).toBe('#111827');
      expect(result.colors.textSecondary).toBe('#6b7280');
      expect(result.colors.border).toBe('#d1d5db');
      expect(result.colors.error).toBe('#ef4444');
      expect(result.colors.success).toBe('#10b981');
      expect(result.colors.warning).toBe('#f59e0b');
      expect(result.colors.shadow).toBe('#000000');
    });

    it('should return correct color values for dark theme', () => {
      const result = getThemeFromMode('dark', 'light');

      expect(result.colors.primary).toBe('#60a5fa');
      expect(result.colors.primaryDark).toBe('#3b82f6');
      expect(result.colors.background).toBe('#111827');
      expect(result.colors.surface).toBe('#1f2937');
      expect(result.colors.text).toBe('#f9fafb');
      expect(result.colors.textSecondary).toBe('#9ca3af');
      expect(result.colors.border).toBe('#374151');
      expect(result.colors.error).toBe('#f87171');
      expect(result.colors.success).toBe('#34d399');
      expect(result.colors.warning).toBe('#fbbf24');
      expect(result.colors.shadow).toBe('#000000');
    });
  });
});
