import { StyleSheet } from 'react-native';
import { Theme } from '../../../types/theme';

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
      paddingHorizontal: 20,
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    backButton: {
      marginRight: 16,
    },
    backButtonText: {
      fontSize: 16,
      color: theme.colors.primary,
      fontWeight: '600',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: theme.colors.text,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    loadingText: {
      marginTop: 16,
      fontSize: 16,
      color: theme.colors.textSecondary,
    },
    errorContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    retryButton: {
      backgroundColor: theme.colors.primary,
      paddingHorizontal: 24,
      paddingVertical: 12,
      borderRadius: 8,
    },
    retryButtonText: {
      color: 'white',
      fontWeight: '600',
      fontSize: 16,
    },
    productSummary: {
      flexDirection: 'row',
      padding: 20,
      backgroundColor: theme.colors.surface,
      margin: 20,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: theme.colors.border,
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
    form: {
      paddingHorizontal: 20,
      paddingBottom: 20,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: theme.colors.text,
      marginBottom: 16,
      marginTop: 8,
    },
    inputGroup: {
      marginBottom: 20,
    },
    label: {
      fontSize: 16,
      fontWeight: '600',
      color: theme.colors.text,
      marginBottom: 8,
    },
    input: {
      backgroundColor: theme.colors.surface,
      borderRadius: 8,
      paddingHorizontal: 16,
      paddingVertical: 12,
      fontSize: 16,
      color: theme.colors.text,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    inputError: {
      borderColor: theme.colors.error,
    },
    row: {
      flexDirection: 'row',
      gap: 12,
      marginBottom: 20,
    },
    halfInput: {
      flex: 1,
    },
    submitButton: {
      backgroundColor: theme.colors.primary,
      paddingVertical: 16,
      borderRadius: 12,
      alignItems: 'center',
      marginTop: 20,
    },
    submitButtonDisabled: {
      backgroundColor: theme.colors.textSecondary,
    },
    submitButtonText: {
      color: 'white',
      fontSize: 18,
      fontWeight: '600',
    },
    errorText: {
      color: theme.colors.error,
      fontSize: 14,
      marginTop: 4,
    },
  });