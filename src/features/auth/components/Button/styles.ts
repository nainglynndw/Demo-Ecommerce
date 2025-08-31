import { StyleSheet } from 'react-native';
import { SPACING, BORDER_RADIUS, COLORS, FONT_SIZE, FONT_WEIGHT } from '@constants';

export const styles = StyleSheet.create({
  button: {
    paddingVertical: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    marginTop: SPACING.xxl,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: FONT_SIZE.xl,
    fontWeight: FONT_WEIGHT.semiBold,
    textAlign: 'center',
  },
});
