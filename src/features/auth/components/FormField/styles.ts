import { StyleSheet } from 'react-native';
import { SPACING, BORDER_RADIUS, FONT_SIZE, FONT_WEIGHT } from '@constants';

export const styles = StyleSheet.create({
  inputGroup: {
    marginBottom: SPACING.lg,
  },
  label: {
    fontSize: FONT_SIZE.lg,
    fontWeight: FONT_WEIGHT.medium,
    marginBottom: SPACING.sm,
  },
  input: {
    borderWidth: 1,
    borderRadius: BORDER_RADIUS.md,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    fontSize: FONT_SIZE.lg,
  },
  errorText: {
    fontSize: FONT_SIZE.md,
    marginTop: SPACING.xs,
  },
});
