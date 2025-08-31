import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useForm, Controller } from 'react-hook-form';
import { OnboardingStep2Data } from '../../types';
import { useThemeStore } from '@stores/themeStore';
import { useUserStore } from '@stores/userStore';
import { StackNavigationProp } from '@react-navigation/stack';
import { MainStackParamList } from '@navigation/MainNavigator';
import { createStyles } from './styles';

type OnboardingStep2NavigationProp = StackNavigationProp<
  MainStackParamList,
  'OnboardingStep2'
>;

interface OnboardingStep2Props {
  navigation: OnboardingStep2NavigationProp;
}

export const OnboardingStep2Screen: React.FC<OnboardingStep2Props> = ({
  navigation,
}) => {
  const { theme } = useThemeStore();
  const { saveStep2Data } = useUserStore();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<OnboardingStep2Data>({
    defaultValues: {
      dateOfBirth: '',
      address: {
        street: '',
        city: '',
        state: '',
        zipCode: '',
        country: 'US',
      },
    },
  });

  const onSubmit = async (step2Data: OnboardingStep2Data) => {
    try {
      await saveStep2Data(step2Data);
      navigation.reset({
        index: 0,
        routes: [{ name: 'ProductList' }],
      });
    } catch (error) {
      console.error('Failed to save step 2 data:', error);
    }
  };

  const onSkip = () => {
    Alert.alert(
      'Profile Saved',
      'You can add your address later when making your first purchase.',
      [
        {
          text: 'Continue',
          onPress: () => {
            navigation.reset({
              index: 0,
              routes: [{ name: 'ProductList' }],
            });
          },
        },
      ],
    );
  };

  const styles = createStyles(theme);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: '100%' }]} />
            </View>
            <Text style={styles.progressText}>Step 2 of 2</Text>
          </View>
          <Text style={styles.title}>Shipping Details</Text>
          <Text style={styles.subtitle}>
            Where should we deliver your orders?
          </Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Date of Birth</Text>
            <Controller
              control={control}
              name="dateOfBirth"
              rules={{
                pattern: {
                  value: /^\d{4}-\d{2}-\d{2}$/,
                  message: 'Please enter date in YYYY-MM-DD format',
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={[
                    styles.input,
                    errors.dateOfBirth && styles.inputError,
                  ]}
                  placeholder="YYYY-MM-DD (optional)"
                  placeholderTextColor={theme.colors.textSecondary}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  keyboardType="numeric"
                />
              )}
            />
            {errors.dateOfBirth && (
              <Text style={styles.errorText}>{errors.dateOfBirth.message}</Text>
            )}
          </View>

          <View style={styles.addressSection}>
            <Text style={styles.sectionTitle}>Shipping Address *</Text>

            <View style={styles.inputGroup}>
              <Controller
                control={control}
                name="address.street"
                rules={{
                  required: 'Street address is required',
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={[
                      styles.input,
                      errors.address?.street && styles.inputError,
                    ]}
                    placeholder="Street address"
                    placeholderTextColor={theme.colors.textSecondary}
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                  />
                )}
              />
              {errors.address?.street && (
                <Text style={styles.errorText}>
                  {errors.address.street.message}
                </Text>
              )}
            </View>

            <View style={styles.row}>
              <View style={styles.halfInput}>
                <Controller
                  control={control}
                  name="address.city"
                  rules={{
                    required: 'City is required',
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      style={[
                        styles.input,
                        errors.address?.city && styles.inputError,
                      ]}
                      placeholder="City"
                      placeholderTextColor={theme.colors.textSecondary}
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                    />
                  )}
                />
                {errors.address?.city && (
                  <Text style={styles.errorText}>
                    {errors.address.city.message}
                  </Text>
                )}
              </View>

              <View style={styles.halfInput}>
                <Controller
                  control={control}
                  name="address.state"
                  rules={{
                    required: 'State is required',
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      style={[
                        styles.input,
                        errors.address?.state && styles.inputError,
                      ]}
                      placeholder="State"
                      placeholderTextColor={theme.colors.textSecondary}
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                    />
                  )}
                />
                {errors.address?.state && (
                  <Text style={styles.errorText}>
                    {errors.address.state.message}
                  </Text>
                )}
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Controller
                control={control}
                name="address.zipCode"
                rules={{
                  required: 'ZIP code is required',
                  pattern: {
                    value: /^\d{5}(-\d{4})?$/,
                    message: 'Please enter a valid ZIP code',
                  },
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={[
                      styles.input,
                      errors.address?.zipCode && styles.inputError,
                    ]}
                    placeholder="ZIP Code"
                    placeholderTextColor={theme.colors.textSecondary}
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    keyboardType="numeric"
                  />
                )}
              />
              {errors.address?.zipCode && (
                <Text style={styles.errorText}>
                  {errors.address.zipCode.message}
                </Text>
              )}
            </View>
          </View>

          <TouchableOpacity
            style={[styles.button, !isValid && styles.buttonDisabled]}
            onPress={handleSubmit(onSubmit)}
            disabled={!isValid}
          >
            <Text style={styles.buttonText}>Complete Setup</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.skipButton} onPress={onSkip}>
            <Text style={styles.skipButtonText}>Add address later</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>← Back</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};
