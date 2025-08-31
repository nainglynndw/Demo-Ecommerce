import { StyleSheet } from 'react-native';
import { SPACING, FONT_SIZE, FONT_WEIGHT } from '@constants';

export const styles = StyleSheet.create({
  header: {
    marginBottom: SPACING.xxxl,
  },
  title: {
    fontSize: FONT_SIZE.xxxxxl,
    fontWeight: FONT_WEIGHT.bold,
    textAlign: 'center',
    marginBottom: SPACING.sm,
  },
  subtitle: {
    fontSize: FONT_SIZE.lg,
    textAlign: 'center',
  },
});
