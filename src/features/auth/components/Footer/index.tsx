import React, { memo } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useThemeStore } from '@stores/themeStore';
import { styles } from './styles';

interface FooterProps {
  text: string;
  linkText: string;
  onLinkPress: () => void;
}

export const Footer: React.FC<FooterProps> = memo(
  ({ text, linkText, onLinkPress }) => {
    const { theme } = useThemeStore();

    return (
      <View style={styles.footer}>
        <Text
          style={[styles.footerText, { color: theme.colors.textSecondary }]}
        >
          {text}{' '}
        </Text>
        <TouchableOpacity onPress={onLinkPress}>
          <Text style={[styles.link, { color: theme.colors.primary }]}>
            {linkText}
          </Text>
        </TouchableOpacity>
      </View>
    );
  },
);
