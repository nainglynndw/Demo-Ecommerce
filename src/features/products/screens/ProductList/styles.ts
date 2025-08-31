import { StyleSheet } from 'react-native';
import { Theme } from '@app-types/theme';
import { SPACING, BORDER_RADIUS, FONT_SIZE, FONT_WEIGHT, COLORS } from '@constants';

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    errorHandlerContainer: {
      flex: 1,
      backgroundColor: theme.colors.background,
      paddingHorizontal: 16,
    },
    listContent: {
      padding: SPACING.lg,
      flexGrow: 1,
    },
    header: {
      marginBottom: SPACING.lg,
    },
    titleContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: SPACING.lg,
    },
    title: {
      fontSize: FONT_SIZE.xxxxl,
      fontWeight: FONT_WEIGHT.bold,
      color: theme.colors.text,
    },
    headerButtons: {
      flexDirection: 'row',
      gap: SPACING.sm,
    },
    profileButton: {
      backgroundColor: theme.colors.surface,
      paddingHorizontal: SPACING.lg,
      paddingVertical: SPACING.sm,
      borderRadius: BORDER_RADIUS.md,
      borderWidth: 1,
      borderColor: theme.colors.primary,
    },
    profileButtonText: {
      color: theme.colors.primary,
      fontWeight: FONT_WEIGHT.semiBold,
      fontSize: FONT_SIZE.lg,
    },
    createButton: {
      backgroundColor: theme.colors.primary,
      paddingHorizontal: SPACING.lg,
      paddingVertical: SPACING.sm,
      borderRadius: BORDER_RADIUS.md,
    },
    createButtonText: {
      color: COLORS.white,
      fontWeight: FONT_WEIGHT.semiBold,
      fontSize: FONT_SIZE.lg,
    },
    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: SPACING.lg,
      gap: SPACING.md,
    },
    searchInputContainer: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.surface,
      borderRadius: BORDER_RADIUS.lg,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    searchInput: {
      flex: 1,
      paddingHorizontal: SPACING.lg,
      paddingVertical: SPACING.md,
      fontSize: FONT_SIZE.lg,
      color: theme.colors.text,
    },
    clearButton: {
      padding: SPACING.sm,
      marginRight: SPACING.sm,
    },
    clearButtonText: {
      fontSize: FONT_SIZE.xxl,
      color: theme.colors.textSecondary,
      fontWeight: FONT_WEIGHT.bold,
    },
    searchButton: {
      backgroundColor: theme.colors.primary,
      paddingHorizontal: SPACING.xl,
      paddingVertical: SPACING.md,
      borderRadius: BORDER_RADIUS.lg,
    },
    searchButtonText: {
      color: COLORS.white,
      fontWeight: FONT_WEIGHT.semiBold,
      fontSize: FONT_SIZE.lg,
    },
    categoryContainer: {
      marginBottom: SPACING.sm,
    },
    categoryLabel: {
      fontSize: FONT_SIZE.lg,
      fontWeight: FONT_WEIGHT.semiBold,
      color: theme.colors.text,
      marginBottom: SPACING.sm,
    },
    categoryChip: {
      backgroundColor: theme.colors.surface,
      paddingHorizontal: SPACING.md,
      paddingVertical: 6,
      borderRadius: SPACING.lg,
      marginRight: SPACING.sm,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    categoryChipSelected: {
      backgroundColor: theme.colors.primary,
      borderColor: theme.colors.primary,
    },
    categoryChipText: {
      fontSize: FONT_SIZE.md,
      color: theme.colors.text,
      fontWeight: FONT_WEIGHT.medium,
    },
    categoryChipTextSelected: {
      color: COLORS.white,
    },
    emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 60,
    },
    emptyText: {
      fontSize: FONT_SIZE.xl,
      fontWeight: FONT_WEIGHT.semiBold,
      color: theme.colors.text,
      marginBottom: SPACING.sm,
    },
    emptySubtext: {
      fontSize: FONT_SIZE.md,
      color: theme.colors.textSecondary,
      textAlign: 'center',
    },
    errorContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 60,
    },
    errorText: {
      fontSize: FONT_SIZE.xl,
      fontWeight: FONT_WEIGHT.semiBold,
      color: theme.colors.error,
      marginBottom: SPACING.lg,
      textAlign: 'center',
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
    loadingContainer: {
      paddingVertical: SPACING.xl,
      alignItems: 'center',
    },
    loadingMoreText: {
      fontSize: FONT_SIZE.md,
      color: theme.colors.textSecondary,
      marginTop: SPACING.sm,
    },
  });
