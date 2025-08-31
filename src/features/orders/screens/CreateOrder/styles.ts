import { StyleSheet } from 'react-native';
import { Theme } from '@app-types/theme';
import { SPACING, BORDER_RADIUS, FONT_SIZE, FONT_WEIGHT, COLORS } from '@constants';

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    scrollView: {
      flex: 1,
    },
    headerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: SPACING.xl,
      paddingVertical: SPACING.md,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    backButton: {
      marginRight: SPACING.lg,
    },
    backButtonText: {
      fontSize: FONT_SIZE.lg,
      color: theme.colors.primary,
      fontWeight: FONT_WEIGHT.semiBold,
    },
    title: {
      fontSize: FONT_SIZE.xxxl,
      fontWeight: FONT_WEIGHT.bold,
      color: theme.colors.text,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    loadingText: {
      marginTop: SPACING.lg,
      fontSize: FONT_SIZE.lg,
      color: theme.colors.textSecondary,
    },
    errorContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: SPACING.xl,
    },
    retryButton: {
      backgroundColor: theme.colors.primary,
      paddingHorizontal: SPACING.xxl,
      paddingVertical: SPACING.md,
      borderRadius: BORDER_RADIUS.md,
    },
    retryButtonText: {
      color: COLORS.white,
      fontWeight: FONT_WEIGHT.semiBold,
      fontSize: FONT_SIZE.lg,
    },
    form: {
      paddingHorizontal: SPACING.xl,
      paddingBottom: SPACING.xl,
    },
    sectionTitle: {
      fontSize: FONT_SIZE.xl,
      fontWeight: FONT_WEIGHT.semiBold,
      color: theme.colors.text,
      marginBottom: SPACING.lg,
      marginTop: SPACING.sm,
    },
    row: {
      flexDirection: 'row',
      gap: SPACING.md,
      marginBottom: SPACING.xl,
    },
    halfInput: {
      flex: 1,
    },
    submitButton: {
      backgroundColor: theme.colors.primary,
      paddingVertical: SPACING.lg,
      borderRadius: BORDER_RADIUS.lg,
      alignItems: 'center',
      marginTop: SPACING.xl,
    },
    submitButtonDisabled: {
      backgroundColor: theme.colors.textSecondary,
    },
    submitButtonText: {
      color: COLORS.white,
      fontSize: FONT_SIZE.xl,
      fontWeight: FONT_WEIGHT.semiBold,
    },
    errorText: {
      color: theme.colors.error,
      fontSize: FONT_SIZE.md,
      marginTop: SPACING.xs,
    },
  });
