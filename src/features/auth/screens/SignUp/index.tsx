import React, { memo, useCallback } from 'react';
import { View, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useForm } from 'react-hook-form';
import { SignupData } from '../../types';
import { useThemeStore } from '@stores/themeStore';
import { useUserStore } from '@stores/userStore';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList } from '@navigation/AuthNavigator';
import { Header, FormField, Button, Footer } from '../../components';
import { styles } from './styles';

type SignUpScreenNavigationProp = StackNavigationProp<
  AuthStackParamList,
  'SignUp'
>;

interface SignUpScreenProps {
  navigation: SignUpScreenNavigationProp;
}

export const SignUpScreen: React.FC<SignUpScreenProps> = memo(
  ({ navigation }) => {
    const { theme } = useThemeStore();
    const { register } = useUserStore();
    const {
      control,
      handleSubmit,
      watch,
      formState: { errors, isValid },
    } = useForm<SignupData & { confirmPassword: string }>({
      defaultValues: {
        email: '',
        password: '',
        confirmPassword: '',
      },
    });

    const password = watch('password');

    const onSubmit = useCallback(
      async (data: SignupData & { confirmPassword: string }) => {
        try {
          const signupData: SignupData = {
            email: data.email,
            password: data.password,
          };

          await register(signupData);
        } catch (error) {
          const errorMessage =
            error instanceof Error
              ? error.message
              : 'Failed to create account. Please try again.';
          Alert.alert('Error', errorMessage);
        }
      },
      [register],
    );

    const handleSignInPress = useCallback(() => {
      navigation.navigate('Login');
    }, [navigation]);

    const currentStyles = styles(theme);

    return (
      <SafeAreaView style={currentStyles.container}>
        <View style={currentStyles.content}>
          <Header title="Create Account" subtitle="Sign up to get started" />

          <View style={currentStyles.form}>
            <FormField
              control={control}
              name="email"
              label="Email"
              placeholder="Enter your email"
              rules={{
                required: 'Email is required',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Please enter a valid email',
                },
              }}
              error={errors.email}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <FormField
              control={control}
              name="password"
              label="Password"
              placeholder="Enter your password"
              rules={{
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters',
                },
              }}
              error={errors.password}
              secureTextEntry
            />

            <FormField
              control={control}
              name="confirmPassword"
              label="Confirm Password"
              placeholder="Confirm your password"
              rules={{
                required: 'Please confirm your password',
                validate: (value: string) =>
                  value === password || 'Passwords do not match',
              }}
              error={errors.confirmPassword}
              secureTextEntry
            />

            <Button
              onPress={handleSubmit(onSubmit)}
              disabled={!isValid}
              title="Create Account"
            />

            <Footer
              text="Already have an account?"
              linkText="Sign In"
              onLinkPress={handleSignInPress}
            />
          </View>
        </View>
      </SafeAreaView>
    );
  },
);
