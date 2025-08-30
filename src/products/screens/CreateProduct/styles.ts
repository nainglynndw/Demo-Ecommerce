import {StyleSheet} from 'react-native';
import {Theme} from '../../../types/theme';

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
    form: {
      padding: 20,
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
    imageInputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 12,
    },
    imageInput: {
      flex: 1,
      marginRight: 8,
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
    removeButton: {
      backgroundColor: theme.colors.error,
      width: 32,
      height: 32,
      borderRadius: 16,
      justifyContent: 'center',
      alignItems: 'center',
    },
    removeButtonText: {
      color: 'white',
      fontSize: 18,
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