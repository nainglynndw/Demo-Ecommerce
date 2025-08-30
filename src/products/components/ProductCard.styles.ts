import {StyleSheet} from 'react-native';
import {Theme} from '../../types/theme';

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.colors.surface,
      borderRadius: 12,
      marginBottom: 16,
      padding: 16,
      shadowColor: theme.colors.shadow,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    image: {
      width: '100%',
      height: 200,
      borderRadius: 8,
      marginBottom: 12,
    },
    content: {
      flex: 1,
    },
    name: {
      fontSize: 18,
      fontWeight: '600',
      color: theme.colors.text,
      marginBottom: 4,
    },
    category: {
      fontSize: 14,
      color: theme.colors.primary,
      fontWeight: '500',
      marginBottom: 8,
    },
    description: {
      fontSize: 14,
      color: theme.colors.textSecondary,
      lineHeight: 20,
      marginBottom: 12,
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
      fontSize: 20,
      fontWeight: '700',
      color: theme.colors.primary,
      marginBottom: 2,
    },
    stock: {
      fontSize: 12,
      color: theme.colors.textSecondary,
    },
    rating: {
      fontSize: 14,
      color: theme.colors.text,
      fontWeight: '500',
    },
  });