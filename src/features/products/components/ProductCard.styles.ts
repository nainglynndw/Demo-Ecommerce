import { StyleSheet } from 'react-native';
import { Theme } from '@app-types/theme';
import { SPACING, BORDER_RADIUS, FONT_SIZE, FONT_WEIGHT, SHADOW } from '@constants';

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.colors.surface,
      borderRadius: BORDER_RADIUS.lg,
      marginBottom: SPACING.lg,
      padding: SPACING.lg,
      shadowColor: theme.colors.shadow,
      shadowOffset: SHADOW.offset.md,
      shadowOpacity: SHADOW.opacity.medium,
      shadowRadius: SHADOW.radius.md,
      elevation: 3,
    },
    image: {
      width: '100%',
      height: 200,
      borderRadius: BORDER_RADIUS.md,
      marginBottom: SPACING.md,
    },
    content: {
      flex: 1,
    },
    name: {
      fontSize: FONT_SIZE.xl,
      fontWeight: FONT_WEIGHT.semiBold,
      color: theme.colors.text,
      marginBottom: 4,
    },
    category: {
      fontSize: FONT_SIZE.md,
      color: theme.colors.primary,
      fontWeight: FONT_WEIGHT.medium,
      marginBottom: SPACING.sm,
    },
    description: {
      fontSize: FONT_SIZE.md,
      color: theme.colors.textSecondary,
      lineHeight: 20,
      marginBottom: SPACING.md,
    },
    footer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
    },
    priceContainer: {
      flex: 1,
    },
    price: {
      fontSize: FONT_SIZE.xxl,
      fontWeight: FONT_WEIGHT.bold,
      color: theme.colors.primary,
      marginBottom: 2,
    },
    stock: {
      fontSize: FONT_SIZE.sm,
      color: theme.colors.textSecondary,
    },
    rating: {
      fontSize: FONT_SIZE.md,
      color: theme.colors.text,
      fontWeight: FONT_WEIGHT.medium,
    },
  });
