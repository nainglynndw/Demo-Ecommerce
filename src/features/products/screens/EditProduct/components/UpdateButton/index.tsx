import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import { useThemeStore } from '@stores/themeStore';
import { createStyles } from '../../styles';

export const UpdateButton: React.FC<{
  isValid: boolean;
  isPending: boolean;
  onSubmit: () => void;
}> = ({ isValid, isPending, onSubmit }) => {
  const { theme } = useThemeStore();
  const styles = createStyles(theme);
  return (
    <TouchableOpacity
      style={[
        styles.updateButton,
        (!isValid || isPending) && styles.updateButtonDisabled,
      ]}
      onPress={onSubmit}
      disabled={!isValid || isPending}
    >
      {isPending ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator color="white" size="small" />
          <Text style={styles.updateButtonText}>Updating...</Text>
        </View>
      ) : (
        <Text style={styles.updateButtonText}>Update Product</Text>
      )}
    </TouchableOpacity>
  );
};