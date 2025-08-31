import { StyleSheet } from 'react-native';
import { Theme } from '@app-types/theme';
import { SPACING } from '@constants';

export const styles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    content: {
      flex: 1,
      paddingHorizontal: SPACING.xxl,
      justifyContent: 'center',
    },
    form: {
      gap: SPACING.lg,
    },
  });
