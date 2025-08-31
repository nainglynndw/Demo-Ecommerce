import { StyleSheet } from 'react-native';
import { SPACING, FONT_SIZE, FONT_WEIGHT } from '@constants';

export const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: SPACING.lg,
  },
  footerText: {
    fontSize: FONT_SIZE.lg,
  },
  link: {
    fontSize: FONT_SIZE.lg,
    fontWeight: FONT_WEIGHT.semiBold,
  },
});
