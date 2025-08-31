import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import { useThemeStore } from '../../../../../stores/themeStore';
import { createStyles } from '../styles';

export const SubmitButton: React.FC<{
  isValid: boolean;
  isPending: boolean;
  onSubmit: () => void;
}> = ({ isValid, isPending, onSubmit }) => {
  const { theme } = useThemeStore();
  const styles = createStyles(theme);
  return (
    <TouchableOpacity
      style={[
        styles.submitButton,
        (!isValid || isPending) && styles.submitButtonDisabled,
      ]}
      onPress={onSubmit}
      disabled={!isValid || isPending}
    >
      {isPending ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator color="white" size="small" />
          <Text style={styles.submitButtonText}>Creating...</Text>
        </View>
      ) : (
        <Text style={styles.submitButtonText}>Create Product</Text>
      )}
    </TouchableOpacity>
  );
};
