import { StyleSheet, Dimensions } from 'react-native';
import { Theme } from '../../../types/theme';

const { width: screenWidth } = Dimensions.get('window');

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    backButton: {
      position: 'absolute',
      top: 16,
      left: 16,
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      borderRadius: 8,
      paddingHorizontal: 12,
      paddingVertical: 8,
      zIndex: 1,
    },
    backButtonText: {
      fontSize: 16,
      color: 'white',
      fontWeight: '600',
    },
    scrollView: {
      flex: 1,
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
    errorText: {
      fontSize: 18,
      fontWeight: '600',
      color: theme.colors.error,
      marginBottom: 16,
      textAlign: 'center',
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
    imageContainer: {
      backgroundColor: theme.colors.surface,
    },
    mainImage: {
      width: screenWidth,
      height: screenWidth * 0.8,
    },
    thumbnailContainer: {
      paddingVertical: 12,
    },
    thumbnailContent: {
      paddingHorizontal: 16,
    },
    thumbnail: {
      width: 60,
      height: 60,
      borderRadius: 8,
      marginRight: 8,
    },
    content: {
      padding: 20,
    },
    contentHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: 16,
    },
    titleContainer: {
      flex: 1,
      marginRight: 16,
    },
    name: {
      fontSize: 24,
      fontWeight: 'bold',
      color: theme.colors.text,
      marginBottom: 4,
    },
    category: {
      fontSize: 16,
      color: theme.colors.primary,
      fontWeight: '600',
    },
    price: {
      fontSize: 28,
      fontWeight: 'bold',
      color: theme.colors.primary,
    },
    ratingContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 24,
      paddingBottom: 16,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    rating: {
      fontSize: 16,
      color: theme.colors.text,
      fontWeight: '500',
    },
    stock: {
      fontSize: 14,
      color: theme.colors.textSecondary,
      fontWeight: '500',
    },
    section: {
      marginBottom: 24,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: theme.colors.text,
      marginBottom: 12,
    },
    description: {
      fontSize: 16,
      lineHeight: 24,
      color: theme.colors.text,
    },
    detailRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 8,
    },
    detailLabel: {
      fontSize: 14,
      color: theme.colors.textSecondary,
      fontWeight: '500',
    },
    detailValue: {
      fontSize: 14,
      color: theme.colors.text,
      fontWeight: '500',
    },
    actionButtons: {
      marginTop: 20,
    },
    orderButton: {
      backgroundColor: theme.colors.primary,
      paddingVertical: 16,
      borderRadius: 12,
      alignItems: 'center',
      marginBottom: 16,
    },
    orderButtonDisabled: {
      backgroundColor: theme.colors.textSecondary,
    },
    orderButtonText: {
      color: 'white',
      fontSize: 18,
      fontWeight: '600',
    },
    productActions: {
      flexDirection: 'row',
      gap: 12,
      width: '100%',
    },
    editButton: {
      flex: 1,
      backgroundColor: theme.colors.surface,
      paddingVertical: 12,
      borderRadius: 8,
      alignItems: 'center',
      borderWidth: 1,
      borderColor: theme.colors.primary,
    },
    editButtonText: {
      color: theme.colors.primary,
      fontSize: 16,
      fontWeight: '600',
    },
    deleteButton: {
      flex: 1,
      backgroundColor: theme.colors.error,
      paddingVertical: 12,
      borderRadius: 8,
      alignItems: 'center',
    },
    deleteButtonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: '600',
    },
  });
