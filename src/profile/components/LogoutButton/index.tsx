import React, { memo } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { useThemeStore } from '../../../stores/themeStore';
import { styles } from './styles';
import { useUserStore } from '../../../stores/userStore';

interface LogoutButtonProps {}

export const LogoutButton: React.FC<LogoutButtonProps> = memo(() => {
  const { theme } = useThemeStore();
  const { logout } = useUserStore();

  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: theme.colors.primary }]}
      onPress={logout}
    >
      <Text style={[styles.buttonText, { color: theme.colors.background }]}>
        Logout
      </Text>
    </TouchableOpacity>
  );
});
