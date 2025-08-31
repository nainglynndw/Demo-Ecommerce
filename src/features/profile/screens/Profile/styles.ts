import { StyleSheet } from 'react-native';
import { Theme } from '@app-types/theme';
import { COLORS, SPACING, FONT_SIZE, FONT_WEIGHT, BORDER_RADIUS } from '@constants';

export const createStyles = (theme: Theme) => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    scrollView: {
      flex: 1,
    },
    profileCard: {
      backgroundColor: theme.colors.surface,
      marginHorizontal: SPACING.xl,
      marginTop: SPACING.xl,
      borderRadius: BORDER_RADIUS.xl,
      padding: SPACING.xxl,
      alignItems: 'center',
      shadowColor: theme.colors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 4,
    },
    avatarContainer: {
      marginBottom: SPACING.lg,
    },
    avatar: {
      width: 80,
      height: 80,
      borderRadius: 40,
    },
    avatarPlaceholder: {
      width: 80,
      height: 80,
      borderRadius: 40,
      backgroundColor: theme.colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
    },
    avatarText: {
      fontSize: FONT_SIZE.xxxxxxl,
      fontWeight: FONT_WEIGHT.bold,
      color: COLORS.white,
    },
    profileInfo: {
      alignItems: 'center',
    },
    userName: {
      fontSize: FONT_SIZE.xxxl,
      fontWeight: FONT_WEIGHT.bold,
      color: theme.colors.text,
      marginBottom: SPACING.xs,
    },
    userEmail: {
      fontSize: FONT_SIZE.lg,
      color: theme.colors.textSecondary,
      marginBottom: SPACING.xs,
    },
    userPhone: {
      fontSize: FONT_SIZE.lg,
      color: theme.colors.textSecondary,
    },
    section: {
      marginHorizontal: SPACING.xl,
      marginTop: SPACING.xxl,
    },
    sectionTitle: {
      fontSize: FONT_SIZE.xl,
      fontWeight: FONT_WEIGHT.semiBold,
      color: theme.colors.text,
      marginBottom: SPACING.md,
    },
    infoCard: {
      backgroundColor: theme.colors.surface,
      borderRadius: BORDER_RADIUS.lg,
      padding: SPACING.lg,
      shadowColor: theme.colors.shadow,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 4,
      elevation: 2,
    },
    viewAllOrdersButton: {
      marginTop: SPACING.md,
      paddingVertical: SPACING.sm,
      alignItems: 'center',
    },
    viewAllOrdersText: {
      fontSize: FONT_SIZE.lg,
      color: theme.colors.primary,
      fontWeight: FONT_WEIGHT.semiBold,
    },
    logoutButton: {
      backgroundColor: theme.colors.error,
      marginHorizontal: SPACING.xl,
      marginTop: SPACING.xxxl,
      paddingVertical: SPACING.lg,
      borderRadius: BORDER_RADIUS.lg,
      alignItems: 'center',
    },
    logoutButtonText: {
      color: COLORS.white,
      fontSize: FONT_SIZE.xl,
      fontWeight: FONT_WEIGHT.semiBold,
    },
    bottomSpace: {
      height: SPACING.xxxl,
    },
  });

  return styles;
};