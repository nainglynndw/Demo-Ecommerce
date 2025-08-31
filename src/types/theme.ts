export type ThemeMode = 'light' | 'dark' | 'system';

export interface ThemeColors {
  primary: string;
  primaryDark: string;
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
  border: string;
  error: string;
  success: string;
  warning: string;
  shadow: string;
}

export interface Theme {
  mode: ThemeMode;
  colors: ThemeColors;
}

export const lightTheme: Theme = {
  mode: 'light',
  colors: {
    primary: '#3b82f6',
    primaryDark: '#2563eb',
    background: '#ffffff',
    surface: '#f9fafb',
    text: '#111827',
    textSecondary: '#6b7280',
    border: '#d1d5db',
    error: '#ef4444',
    success: '#10b981',
    warning: '#f59e0b',
    shadow: '#000000',
  },
};

export const darkTheme: Theme = {
  mode: 'dark',
  colors: {
    primary: '#60a5fa',
    primaryDark: '#3b82f6',
    background: '#111827',
    surface: '#1f2937',
    text: '#f9fafb',
    textSecondary: '#9ca3af',
    border: '#374151',
    error: '#f87171',
    success: '#34d399',
    warning: '#fbbf24',
    shadow: '#000000',
  },
};
