import React, { memo } from 'react';
import { View, Text, Image } from 'react-native';
import { useThemeStore } from '../../../stores/themeStore';
import { styles } from './styles';

interface AvatarProps {
  avatar?: string;
  name?: string;
}

export const Avatar: React.FC<AvatarProps> = memo(({ avatar, name }) => {
  const { theme } = useThemeStore();

  return (
    <View style={styles.avatarSection}>
      <View
        style={[styles.avatarContainer, { borderColor: theme.colors.primary }]}
      >
        {avatar ? (
          <Image source={{ uri: avatar }} style={styles.avatar} />
        ) : (
          <View
            style={[
              styles.avatarPlaceholder,
              { backgroundColor: theme.colors.primary },
            ]}
          >
            <Text
              style={[styles.avatarText, { color: theme.colors.background }]}
            >
              {name?.charAt(0)?.toUpperCase() || 'U'}
            </Text>
          </View>
        )}
      </View>
      <Text style={[styles.userName, { color: theme.colors.text }]}>
        {name || 'User'}
      </Text>
    </View>
  );
});
