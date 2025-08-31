import React, { memo } from 'react';
import { View, Text } from 'react-native';
import { useThemeStore } from '../../../../stores/themeStore';
import { styles } from './styles';

interface ProfileData {
  label: string;
  value: string;
}

interface ProfileSectionProps {
  title: string;
  data: ProfileData[];
}

export const ProfileSection: React.FC<ProfileSectionProps> = memo(
  ({ title, data }) => {
    const { theme } = useThemeStore();

    const renderInfoRow = (item: ProfileData) => (
      <View key={item.label} style={styles.infoRow}>
        <Text style={[styles.label, { color: theme.colors.text }]}>
          {item.label}:
        </Text>
        <Text style={[styles.value, { color: theme.colors.text }]}>
          {item.value}
        </Text>
      </View>
    );

    return (
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
          {title}
        </Text>
        {data.map(renderInfoRow)}
      </View>
    );
  },
);
