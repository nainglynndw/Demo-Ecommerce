import React, { memo } from 'react';
import { View, Text } from 'react-native';
import { useThemeStore } from '@stores/themeStore';
import { styles } from './styles';

interface HeaderProps {
  title: string;
  subtitle: string;
}

export const Header: React.FC<HeaderProps> = memo(({ title, subtitle }) => {
  const { theme } = useThemeStore();

  return (
    <View style={styles.header}>
      <Text style={[styles.title, { color: theme.colors.text }]}>{title}</Text>
      <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
        {subtitle}
      </Text>
    </View>
  );
});
