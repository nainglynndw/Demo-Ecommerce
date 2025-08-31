import { StyleSheet } from 'react-native';
import { Theme } from '../../../../../types/theme';

export const createAvatarStyles = (theme: Theme) =>
  StyleSheet.create({
    avatarSection: {
      alignItems: 'center',
      marginBottom: 20,
    },
    label: {
      fontSize: 16,
      fontWeight: '600',
      color: theme.colors.text,
      marginBottom: 8,
    },
    avatarContainer: {
      position: 'relative',
      marginTop: 8,
    },
    avatar: {
      width: 100,
      height: 100,
      borderRadius: 50,
    },
    avatarPlaceholder: {
      width: 100,
      height: 100,
      borderRadius: 50,
      backgroundColor: theme.colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
    },
    avatarText: {
      fontSize: 36,
      fontWeight: 'bold',
      color: 'white',
    },
    avatarOverlay: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      height: 30,
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      borderBottomLeftRadius: 50,
      borderBottomRightRadius: 50,
      justifyContent: 'center',
      alignItems: 'center',
    },
    avatarOverlayText: {
      color: 'white',
      fontSize: 12,
      fontWeight: '600',
    },
  });
