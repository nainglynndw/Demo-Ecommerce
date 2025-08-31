import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ProductListScreen } from '../products/screens/ProductList';
import { ProductDetailScreen } from '../products/screens/ProductDetail';
import { CreateProductScreen } from '../products/screens/CreateProduct';
import { CreateOrderScreen } from '../orders/screens/CreateOrder';
import { Profile } from '../profile/screens/Profile';
import { EditProfileScreen } from '../profile/screens/EditProfile';
import { OnboardingStep1Screen } from '../auth/screens/OnboardingStep1';
import { OnboardingStep2Screen } from '../auth/screens/OnboardingStep2';
import { useThemeStore } from '../stores/themeStore';
import { useUserStore } from '../stores/userStore';

export type MainStackParamList = {
  OnboardingStep1: undefined;
  OnboardingStep2: undefined;
  ProductList: undefined;
  ProductDetail: { productId: string };
  CreateProduct: undefined;
  EditProduct: { productId: string };
  CreateOrder: { productId: string };
  Profile: undefined;
  EditProfile: undefined;
};

const Stack = createStackNavigator<MainStackParamList>();

export const MainNavigator: React.FC = () => {
  const { theme } = useThemeStore();
  const { needsOnboarding } = useUserStore();

  // Determine initial route based on onboarding status
  const getInitialRouteName = (): keyof MainStackParamList => {
    if (needsOnboarding === 'step1') {
      return 'OnboardingStep1';
    }
    if (needsOnboarding === 'step2') {
      return 'OnboardingStep2';
    }
    return 'ProductList';
  };

  return (
    <Stack.Navigator
      initialRouteName={getInitialRouteName()}
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
      <Stack.Screen
        name="ProductList"
        component={ProductListScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="CreateProduct" component={CreateProductScreen} />
      <Stack.Screen
        name="CreateOrder"
        component={CreateOrderScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};
