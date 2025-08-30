import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen } from '../auth/screens/Login';
import { SignUpScreen } from '../auth/screens/SignUp';
import { OnboardingStep1Screen } from '../auth/screens/OnboardingStep1';
import { OnboardingStep2Screen } from '../auth/screens/OnboardingStep2';
import { useThemeStore } from '../stores/themeStore';

export type AuthStackParamList = {
  Login: undefined;
  SignUp: undefined;
  OnboardingStep1: undefined;
  OnboardingStep2: {
    step1Data: {
      name: string;
      phone: string;
      preferences: {
        theme: 'light' | 'dark' | 'system';
      };
    };
  };
};

const Stack = createStackNavigator<AuthStackParamList>();

export const AuthNavigator: React.FC = () => {
  const { theme } = useThemeStore();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.background,
        },
        headerTintColor: theme.colors.text,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        cardStyle: {
          backgroundColor: theme.colors.background,
        },
      }}
    >
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="OnboardingStep1"
        component={OnboardingStep1Screen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="OnboardingStep2"
        component={OnboardingStep2Screen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};
