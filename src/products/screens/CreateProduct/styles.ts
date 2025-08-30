import { StyleSheet, Dimensions } from 'react-native';
import { Theme } from '../../../types/theme';

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
      fontSize: 24,
      fontWeight: 'bold',
      color: theme.colors.text,
    },
    form: {
      paddingHorizontal: 20,
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
    labelContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
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
    textArea: {
      minHeight: 100,
      textAlignVertical: 'top',
    },
    pickerContainer: {
      paddingHorizontal: 8,
      paddingVertical: 0,
    },
    picker: {
      color: theme.colors.text,
    },
    row: {
      flexDirection: 'row',
      gap: 12,
      marginBottom: 20,
    },
    halfInput: {
      flex: 1,
    },
    imagePreviewContainer: {
      marginTop: 12,
    },
    imagePreviewItem: {
      width: width * 0.7,
      backgroundColor: theme.colors.surface,
      borderRadius: 8,
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
      top: 8,
      right: 8,
      backgroundColor: theme.colors.error,
      width: 24,
      height: 24,
      borderRadius: 12,
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
      borderRadius: 8,
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
      borderRadius: 6,
    },
    addButtonText: {
      color: 'white',
      fontSize: 14,
      fontWeight: '600',
    },
    removeButtonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
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
    loadingContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    errorText: {
      color: theme.colors.error,
      fontSize: 14,
      marginTop: 4,
    },
  });
