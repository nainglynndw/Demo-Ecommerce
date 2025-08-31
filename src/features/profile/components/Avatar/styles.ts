import { StyleSheet } from 'react-native';
import { SPACING, FONT_SIZE, FONT_WEIGHT } from '@constants';

export const styles = StyleSheet.create({
  avatarSection: {
    alignItems: 'center',
    padding: SPACING.xl,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.lg - 1,
    overflow: 'hidden',
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
  },
  avatarPlaceholder: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: FONT_SIZE.xxxxxxxl,
    fontWeight: FONT_WEIGHT.bold,
  },
  userName: {
    fontSize: FONT_SIZE.xxl,
    fontWeight: FONT_WEIGHT.semiBold,
  },
});
