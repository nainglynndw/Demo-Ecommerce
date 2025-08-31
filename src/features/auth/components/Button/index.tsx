import React, { memo } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { useThemeStore } from '../../../../stores/themeStore';
import { styles } from './styles';

interface ButtonProps {
  onPress: () => void;
  disabled: boolean;
  title: string;
}

export const Button: React.FC<ButtonProps> = memo(
  ({ onPress, disabled, title }) => {
    const { theme } = useThemeStore();

    return (
      <TouchableOpacity
        style={[
          styles.button,
          { backgroundColor: theme.colors.primary },
          disabled && { backgroundColor: theme.colors.textSecondary },
        ]}
        onPress={onPress}
        disabled={disabled}
      >
        <Text style={styles.buttonText}>{title}</Text>
      </TouchableOpacity>
    );
  },
);
