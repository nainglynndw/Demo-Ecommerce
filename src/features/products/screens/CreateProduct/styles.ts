import { StyleSheet, Dimensions } from 'react-native';
import { Theme } from '@app-types/theme';
import { SPACING, BORDER_RADIUS, FONT_SIZE, FONT_WEIGHT, COLORS } from '@constants';

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
    title: {
      fontSize: FONT_SIZE.xxxl,
      fontWeight: FONT_WEIGHT.bold,
      color: theme.colors.text,
    },
    form: {
      paddingHorizontal: SPACING.xl,
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
    imagePreviewItem: {
      width: width * 0.7,
      backgroundColor: theme.colors.surface,
      borderRadius: BORDER_RADIUS.md,
      overflow: 'hidden',
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    imagePreview: {
      width: '100%',
      height: 160,
    },
    removeImageButton: {
      position: 'absolute',
      top: SPACING.sm,
      right: SPACING.sm,
      backgroundColor: theme.colors.error,
      width: SPACING.xxl,
      height: SPACING.xxl,
      borderRadius: SPACING.md,
      justifyContent: 'center',
      alignItems: 'center',
    },
    imageInfo: {
      padding: SPACING.sm,
    },
    imageFileName: {
      fontSize: FONT_SIZE.sm,
      fontWeight: FONT_WEIGHT.medium,
      color: theme.colors.text,
      marginBottom: 2,
    },
    imageFileSize: {
      fontSize: FONT_SIZE.xs,
      color: theme.colors.textSecondary,
    },
    emptyImageContainer: {
      backgroundColor: theme.colors.surface,
      borderRadius: BORDER_RADIUS.md,
      padding: SPACING.xxl,
      alignItems: 'center',
      borderWidth: 1,
      borderColor: theme.colors.border,
      borderStyle: 'dashed',
    },
    emptyImageText: {
      fontSize: FONT_SIZE.lg,
      fontWeight: FONT_WEIGHT.medium,
      color: theme.colors.textSecondary,
      marginBottom: SPACING.xs,
    },
    emptyImageSubtext: {
      fontSize: FONT_SIZE.md,
      color: theme.colors.textSecondary,
      textAlign: 'center',
    },
    addButton: {
      backgroundColor: theme.colors.primary,
      paddingHorizontal: SPACING.md,
      paddingVertical: SPACING.xs + 2,
      borderRadius: BORDER_RADIUS.sm,
    },
    addButtonText: {
      color: COLORS.white,
      fontSize: FONT_SIZE.md,
      fontWeight: FONT_WEIGHT.semiBold,
    },
    removeButtonText: {
      color: COLORS.white,
      fontSize: FONT_SIZE.lg,
      fontWeight: FONT_WEIGHT.bold,
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
    loadingContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: SPACING.sm,
    },
    errorText: {
      color: theme.colors.error,
      fontSize: FONT_SIZE.md,
      marginTop: SPACING.xs,
    },
  });
