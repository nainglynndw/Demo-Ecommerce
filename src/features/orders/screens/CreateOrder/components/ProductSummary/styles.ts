import { StyleSheet } from 'react-native';
import { Theme } from '../../../../../types/theme';

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    productSummary: {
      backgroundColor: theme.colors.surface,
      marginHorizontal: 20,
      marginTop: 20,
      borderRadius: 16,
      padding: 16,
      flexDirection: 'row',
      shadowColor: theme.colors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 4,
    },
    productImage: {
      width: 80,
      height: 80,
      borderRadius: 8,
      marginRight: 16,
    },
    productInfo: {
      flex: 1,
      justifyContent: 'center',
    },
    productName: {
      fontSize: 18,
      fontWeight: '600',
      color: theme.colors.text,
      marginBottom: 4,
    },
    productPrice: {
      fontSize: 20,
      fontWeight: 'bold',
      color: theme.colors.primary,
      marginBottom: 4,
    },
    productStock: {
      fontSize: 14,
      color: theme.colors.textSecondary,
    },
  });
