import { StyleSheet, Dimensions } from 'react-native';
import { Theme } from '@app-types/theme';
import { IMAGE_WIDTH_RATIO, IMAGE_DIMENSIONS } from '@products/constants';
import {
  SPACING,
  COLORS,
  FONT_SIZE,
  FONT_WEIGHT,
  BORDER_RADIUS,
} from '@constants';

const { width } = Dimensions.get('window');

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    scrollView: {
      flex: 1,
    },
    screenLoadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      gap: SPACING.md,
    },
    loadingText: {
      fontSize: FONT_SIZE.lg,
      color: theme.colors.textSecondary,
    },
    errorContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: SPACING.xl,
    },
    errorText: {
      fontSize: FONT_SIZE.lg,
      color: theme.colors.error,
      textAlign: 'center',
      marginBottom: SPACING.xl,
    },
    form: {
      paddingHorizontal: SPACING.xl,
      paddingTop: SPACING.xl,
    },
    inputGroup: {
      marginBottom: SPACING.xl,
    },
    label: {
      fontSize: FONT_SIZE.lg,
      fontWeight: FONT_WEIGHT.semiBold,
      color: theme.colors.text,
      marginBottom: SPACING.sm,
    },
    labelContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
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
    textArea: {
      minHeight: 100,
      textAlignVertical: 'top',
    },
    pickerContainer: {
      paddingHorizontal: SPACING.sm,
      paddingVertical: 0,
    },
    picker: {
      color: theme.colors.text,
    },
    row: {
      flexDirection: 'row',
      gap: SPACING.md,
      marginBottom: SPACING.xl,
    },
    halfInput: {
      flex: 1,
    },
    imagePreviewContainer: {
      marginTop: SPACING.md,
    },
    imageList: {
      gap: SPACING.md,
    },
    imagePreviewItem: {
      width: width * IMAGE_WIDTH_RATIO,
      backgroundColor: theme.colors.surface,
      borderRadius: BORDER_RADIUS.md,
      overflow: 'hidden',
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    imagePreview: {
      width: '100%',
      height: IMAGE_DIMENSIONS.thumbnail * 2.67, // 160
    },
    removeImageButton: {
      position: 'absolute',
      top: 8,
      right: 8,
      backgroundColor: theme.colors.error,
      width: 24,
      height: 24,
      borderRadius: BORDER_RADIUS.lg,
      justifyContent: 'center',
      alignItems: 'center',
    },
    imageInfo: {
      padding: 8,
    },
    imageFileName: {
      fontSize: 12,
      fontWeight: '500',
      color: theme.colors.text,
      marginBottom: 2,
    },
    imageFileSize: {
      fontSize: 10,
      color: theme.colors.textSecondary,
    },
    emptyImageContainer: {
      backgroundColor: theme.colors.surface,
      borderRadius: BORDER_RADIUS.md,
      padding: 24,
      alignItems: 'center',
      borderWidth: 1,
      borderColor: theme.colors.border,
      borderStyle: 'dashed',
    },
    emptyImageText: {
      fontSize: 16,
      fontWeight: '500',
      color: theme.colors.textSecondary,
      marginBottom: 4,
    },
    emptyImageSubtext: {
      fontSize: 14,
      color: theme.colors.textSecondary,
      textAlign: 'center',
    },
    addButton: {
      backgroundColor: theme.colors.primary,
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: BORDER_RADIUS.sm,
    },
    addButtonText: {
      color: COLORS.white,
      fontSize: 14,
      fontWeight: '600',
    },
    removeButtonText: {
      color: COLORS.white,
      fontSize: 16,
      fontWeight: 'bold',
    },
    updateButton: {
      backgroundColor: theme.colors.primary,
      paddingVertical: 16,
      borderRadius: BORDER_RADIUS.lg,
      alignItems: 'center',
      marginTop: 20,
    },
    updateButtonDisabled: {
      backgroundColor: theme.colors.textSecondary,
    },
    updateButtonText: {
      color: COLORS.white,
      fontSize: 18,
      fontWeight: '600',
    },
    loadingContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
  });
