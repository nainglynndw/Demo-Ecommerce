import { StyleSheet } from 'react-native';
import { Theme } from '@app-types/theme';

export const createThemeSelectorStyles = (theme: Theme) =>
  StyleSheet.create({
    inputGroup: {
      marginBottom: 20,
    },
    label: {
      fontSize: 16,
      fontWeight: '600',
      color: theme.colors.text,
      marginBottom: 8,
    },
    themeContainer: {
      flexDirection: 'row',
      gap: 8,
    },
    themeOption: {
      flex: 1,
      backgroundColor: theme.colors.surface,
      borderWidth: 1,
      borderColor: theme.colors.border,
      borderRadius: 8,
      paddingVertical: 12,
      paddingHorizontal: 16,
      alignItems: 'center',
    },
    themeOptionSelected: {
      backgroundColor: theme.colors.primary,
      borderColor: theme.colors.primary,
    },
    themeOptionText: {
      fontSize: 16,
      fontWeight: '500',
      color: theme.colors.text,
    },
    themeOptionTextSelected: {
      color: 'white',
    },
  });
