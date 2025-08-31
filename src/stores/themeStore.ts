import { create } from 'zustand';
import { Appearance } from 'react-native';
import { Theme, ThemeMode } from '../types/theme';
import { getThemeFromMode } from '../utils/theme';

interface ThemeStore {
  theme: Theme;
  themeMode: ThemeMode;
  systemColorScheme: 'light' | 'dark';
  setThemeMode: (mode: ThemeMode) => void;
  updateSystemColorScheme: (scheme: 'light' | 'dark') => void;
  updateTheme: (mode?: ThemeMode) => void;
}

export const useThemeStore = create<ThemeStore>((set, get) => ({
  theme: getThemeFromMode('system', 'light'),
  themeMode: 'system',
  systemColorScheme: Appearance.getColorScheme() || 'light',

  setThemeMode: (mode: ThemeMode) => {
    set({ themeMode: mode });
    get().updateTheme(mode);
  },

  updateSystemColorScheme: (scheme: 'light' | 'dark') => {
    set({ systemColorScheme: scheme });
    // Update theme if using system mode
    const { themeMode } = get();
    if (themeMode === 'system') {
      get().updateTheme();
    }
  },

  updateTheme: (mode?: ThemeMode) => {
    const { themeMode, systemColorScheme } = get();
    const currentMode = mode || themeMode;
    const newTheme = getThemeFromMode(currentMode, systemColorScheme);
    set({ theme: newTheme, themeMode: currentMode });
  },
}));
