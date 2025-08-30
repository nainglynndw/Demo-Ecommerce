import { StyleSheet } from 'react-native';
import { Theme } from '../../../../../types/theme';

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    sectionTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: theme.colors.text,
      marginBottom: 16,
      marginTop: 8,
    },
    row: {
      flexDirection: 'row',
      gap: 12,
    },
    halfInput: {
      flex: 1,
    },
  });
