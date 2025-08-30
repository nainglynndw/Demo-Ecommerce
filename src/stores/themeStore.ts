import {create} from 'zustand';
import {Appearance} from 'react-native';
import {Theme, ThemeMode} from '../types/theme';
import {getThemeFromMode} from '../utils/theme';
import {StorageService} from '../services/storage';

interface ThemeStore {
  theme: Theme;
  themeMode: ThemeMode;
  isLoading: boolean;
  systemColorScheme: 'light' | 'dark';
  setThemeMode: (mode: ThemeMode) => Promise<void>;
  updateSystemColorScheme: (scheme: 'light' | 'dark') => void;
  updateTheme: () => void;
  initializeTheme: () => Promise<void>;
}

export const useThemeStore = create<ThemeStore>((set, get) => ({
  theme: getThemeFromMode('system', 'light'),
  themeMode: 'system',
  isLoading: true,
  systemColorScheme: Appearance.getColorScheme() || 'light',

  setThemeMode: async (mode: ThemeMode) => {
    try {
      await StorageService.saveTheme(mode);
      set({ themeMode: mode });
      
      // Update theme based on new mode
      get().updateTheme();
    } catch (error) {
      console.warn('Failed to save theme to storage:', error);
    }
  },

  updateSystemColorScheme: (scheme: 'light' | 'dark') => {
    set({ systemColorScheme: scheme });
    // Update theme if using system mode
    const { themeMode } = get();
    if (themeMode === 'system') {
      get().updateTheme();
    }
  },

  updateTheme: () => {
    const { themeMode, systemColorScheme } = get();
    const newTheme = getThemeFromMode(themeMode, systemColorScheme);
    set({ theme: newTheme });
  },

  initializeTheme: async () => {
    try {
      const savedTheme = await StorageService.getTheme();
      const currentSystemScheme = Appearance.getColorScheme() || 'light';
      
      set({ 
        themeMode: savedTheme,
        systemColorScheme: currentSystemScheme,
        isLoading: false 
      });
      
      // Update theme based on loaded mode
      get().updateTheme();
    } catch (error) {
      console.warn('Failed to load theme from storage:', error);
      set({ isLoading: false });
    }
  },
}));