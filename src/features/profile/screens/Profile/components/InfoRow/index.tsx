import { StyleSheet, Text, View } from 'react-native';
import { useThemeStore } from '../../../../../../stores/themeStore';
import { memo } from 'react';

interface InfoRowProps {
  label: string;
  value: string;
  isLast?: boolean;
}

const InfoRow: React.FC<InfoRowProps> = ({ label, value, isLast }) => {
  const { theme } = useThemeStore();
  const rowStyles = StyleSheet.create({
    container: {
      paddingVertical: 12,
      borderBottomWidth: isLast ? 0 : 1,
      borderBottomColor: theme.colors.border,
    },
    label: {
      fontSize: 14,
      color: theme.colors.textSecondary,
      fontWeight: '500',
      marginBottom: 4,
    },
    value: {
      fontSize: 16,
      color: theme.colors.text,
      fontWeight: '400',
    },
  });

  return (
    <View style={rowStyles.container}>
      <Text style={rowStyles.label}>{label}</Text>
      <Text style={rowStyles.value}>{value}</Text>
    </View>
  );
};

export default memo(InfoRow);
