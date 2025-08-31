import React, { memo, useCallback } from 'react';
import { View, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useForm } from 'react-hook-form';
import { LoginData } from '../../types';
import { useThemeStore } from '../../../../stores/themeStore';
import { useUserStore } from '../../../../stores/userStore';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList } from '../../../../navigation/AuthNavigator';
import { Header, FormField, Button, Footer } from '../../components';
import { styles } from './styles';

type LoginScreenNavigationProp = StackNavigationProp<
  AuthStackParamList,
  'Login'
>;

interface LoginScreenProps {
  navigation: LoginScreenNavigationProp;
}

export const LoginScreen: React.FC<LoginScreenProps> = memo(
  ({ navigation }) => {
    const { theme } = useThemeStore();
    const { login } = useUserStore();
    const {
      control,
      handleSubmit,
      formState: { errors, isValid },
    } = useForm<LoginData>({
      defaultValues: {
        email: '',
        password: '',
      },
    });

    const onSubmit = useCallback(
      async (data: LoginData) => {
        try {
          await login(data);
        } catch (error) {
          const errorMessage =
            error instanceof Error
              ? error.message
              : 'Login failed. Please try again.';
          Alert.alert('Error', errorMessage);
        }
      },
      [login],
    );
    const handleSignUpPress = useCallback(() => {
      navigation.navigate('SignUp');
    }, [navigation]);

    const currentStyles = styles(theme);

    return (
      <SafeAreaView style={currentStyles.container}>
        <View style={currentStyles.content}>
          <Header title="Welcome Back" subtitle="Sign in to your account" />

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

            <Button
              onPress={handleSubmit(onSubmit)}
              disabled={!isValid}
              title="Sign In"
            />

            <Footer
              text="Don't have an account?"
              linkText="Sign Up"
              onLinkPress={handleSignUpPress}
            />
          </View>
        </View>
      </SafeAreaView>
    );
  },
);
