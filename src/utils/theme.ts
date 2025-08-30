import { Theme, ThemeMode, lightTheme, darkTheme } from '../types/theme';

export const getThemeFromMode = (
  mode: ThemeMode,
  systemScheme: 'light' | 'dark',
): Theme => {
  switch (mode) {
    case 'light':
      return lightTheme;
    case 'dark':
      return darkTheme;
    case 'system':
      return systemScheme === 'dark' ? darkTheme : lightTheme;
    default:
      return lightTheme;
  }
};
