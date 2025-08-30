import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useForm, Controller} from 'react-hook-form';
import {OnboardingStep1Data} from '../../types';
import {useThemeStore} from '../../../stores/themeStore';
import {useUserStore} from '../../../stores/userStore';
import {StackNavigationProp} from '@react-navigation/stack';
import {AuthStackParamList} from '../../../navigation/AuthNavigator';
import {createStyles} from './styles';

type OnboardingStep1NavigationProp = StackNavigationProp<
  AuthStackParamList,
  'OnboardingStep1'
>;

interface OnboardingStep1Props {
  navigation: OnboardingStep1NavigationProp;
}

export const OnboardingStep1Screen: React.FC<OnboardingStep1Props> = ({
  navigation,
}) => {
  const {theme, setThemeMode} = useThemeStore();
  const {saveStep1Data} = useUserStore();
  const {
    control,
    handleSubmit,
    watch,
    formState: {errors, isValid},
  } = useForm<OnboardingStep1Data>({
    defaultValues: {
      name: '',
      phone: '',
      preferences: {
        theme: 'system',
      },
    },
  });

  const selectedTheme = watch('preferences.theme');

  const onSubmit = (data: OnboardingStep1Data) => {
    // Set the selected theme immediately
    setThemeMode(data.preferences.theme);
    
    // Save step 1 data to storage
    saveStep1Data(data);
    
    // Navigate to step 2 with step 1 data
    navigation.navigate('OnboardingStep2', {
      step1Data: data,
    });
  };

  const onSkip = () => {
    // Skip step 1 - user will be prompted for missing info during purchase
    console.log('Skipping step 1 - will prompt during purchase');
    // Navigate to main app (will be implemented)
    // For now, we don't save any data
  };

  const styles = createStyles(theme);

  const themeOptions = [
    {label: 'Light', value: 'light'},
    {label: 'Dark', value: 'dark'},
    {label: 'System', value: 'system'},
  ] as const;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, {width: '50%'}]} />
            </View>
            <Text style={styles.progressText}>Step 1 of 2</Text>
          </View>
          <Text style={styles.title}>Let's Get Started</Text>
          <Text style={styles.subtitle}>
            Tell us about yourself
          </Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Full Name *</Text>
            <Controller
              control={control}
              name="name"
              rules={{
                required: 'Name is required',
                minLength: {
                  value: 2,
                  message: 'Name must be at least 2 characters',
                },
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <TextInput
                  style={[styles.input, errors.name && styles.inputError]}
                  placeholder="Enter your full name"
                  placeholderTextColor={theme.colors.textSecondary}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  autoCapitalize="words"
                />
              )}
            />
            {errors.name && (
              <Text style={styles.errorText}>{errors.name.message}</Text>
            )}
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Phone Number *</Text>
            <Controller
              control={control}
              name="phone"
              rules={{
                required: 'Phone number is required',
                pattern: {
                  value: /^[+]?[\d\s\-\(\)]{10,}$/,
                  message: 'Please enter a valid phone number',
                },
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <TextInput
                  style={[styles.input, errors.phone && styles.inputError]}
                  placeholder="Enter your phone number"
                  placeholderTextColor={theme.colors.textSecondary}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  keyboardType="phone-pad"
                />
              )}
            />
            {errors.phone && (
              <Text style={styles.errorText}>{errors.phone.message}</Text>
            )}
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Theme Preference</Text>
            <View style={styles.themeContainer}>
              {themeOptions.map(option => (
                <Controller
                  key={option.value}
                  control={control}
                  name="preferences.theme"
                  render={({field: {onChange}}) => (
                    <TouchableOpacity
                      style={[
                        styles.themeOption,
                        selectedTheme === option.value && styles.themeOptionSelected,
                      ]}
                      onPress={() => onChange(option.value)}>
                      <Text
                        style={[
                          styles.themeOptionText,
                          selectedTheme === option.value && styles.themeOptionTextSelected,
                        ]}>
                        {option.label}
                      </Text>
                    </TouchableOpacity>
                  )}
                />
              ))}
            </View>
          </View>

          <TouchableOpacity
            style={[styles.button, !isValid && styles.buttonDisabled]}
            onPress={handleSubmit(onSubmit)}
            disabled={!isValid}>
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.skipButton}
            onPress={onSkip}>
            <Text style={styles.skipButtonText}>Skip for now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};