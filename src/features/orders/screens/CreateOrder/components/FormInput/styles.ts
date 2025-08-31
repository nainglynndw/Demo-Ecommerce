import { StyleSheet } from 'react-native';
import { Theme } from '@app-types/theme';
import { SPACING, BORDER_RADIUS, FONT_SIZE, FONT_WEIGHT } from '@constants';

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    inputGroup: {
      marginBottom: SPACING.xl,
    },
    label: {
      fontSize: FONT_SIZE.lg,
      fontWeight: FONT_WEIGHT.semiBold,
      color: theme.colors.text,
      marginBottom: SPACING.sm,
    },
    input: {
      backgroundColor: theme.colors.surface,
      borderRadius: BORDER_RADIUS.md,
      paddingHorizontal: SPACING.lg,
      paddingVertical: SPACING.md,
      fontSize: FONT_SIZE.lg,
      color: theme.colors.text,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    inputError: {
      borderColor: theme.colors.error,
    },
    errorText: {
      color: theme.colors.error,
      fontSize: FONT_SIZE.md,
      marginTop: SPACING.xs,
    },
  });
