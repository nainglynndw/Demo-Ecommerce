import React, { memo } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { useThemeStore } from '../../../stores/themeStore';
import { styles } from './styles';

interface LogoutButtonProps {
  onPress: () => void;
}

export const LogoutButton: React.FC<LogoutButtonProps> = memo(({ onPress }) => {
  const { theme } = useThemeStore();

  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: theme.colors.primary }]}
      onPress={onPress}
    >
      <Text style={[styles.buttonText, { color: theme.colors.background }]}>
        Logout
      </Text>
    </TouchableOpacity>
  );
});
