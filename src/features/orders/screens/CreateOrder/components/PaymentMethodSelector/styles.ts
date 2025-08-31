import { StyleSheet } from 'react-native';
import { Theme } from '@app-types/theme';

export const createStyles = (theme: Theme) =>
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
    paymentMethodContainer: {
      gap: 12,
    },
    paymentMethod: {
      backgroundColor: theme.colors.surface,
      borderWidth: 1,
      borderColor: theme.colors.border,
      borderRadius: 12,
      paddingVertical: 16,
      paddingHorizontal: 20,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
    },
    paymentMethodSelected: {
      backgroundColor: theme.colors.primary,
      borderColor: theme.colors.primary,
    },
    paymentMethodIcon: {
      fontSize: 24,
    },
    paymentMethodText: {
      fontSize: 16,
      fontWeight: '500',
      color: theme.colors.text,
    },
    paymentMethodTextSelected: {
      color: 'white',
    },
    errorText: {
      color: theme.colors.error,
      fontSize: 14,
      marginTop: 4,
    },
  });
