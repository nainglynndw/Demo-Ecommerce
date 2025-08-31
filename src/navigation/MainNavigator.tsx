import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ProductListScreen } from '../features/products/screens/ProductList';
import { ProductDetailScreen } from '../features/products/screens/ProductDetail';
import { CreateProductScreen } from '../features/products/screens/CreateProduct';
import { Profile } from '../features/profile/screens/Profile';
import { EditProfileScreen } from '../features/profile/screens/EditProfile';

import { useThemeStore } from '../stores/themeStore';
import { useUserStore } from '../stores/userStore';
import { OnboardingStep1Screen } from '../features/auth/screens/OnboardingStep1';
import { OnboardingStep2Screen } from '../features/auth/screens/OnboardingStep2';
import { CreateOrderScreen } from '../features/orders/screens/CreateOrder';
import { EditProductScreen } from '../features/products/screens/EditProduct';

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
  const { userProfile } = useUserStore();

  const getInitialRouteName = (): keyof MainStackParamList => {
    if (!userProfile?.onboardingCompleted?.step1) {
      return 'OnboardingStep1';
    }
    if (!userProfile?.onboardingCompleted?.step2) {
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
      <Stack.Screen 
        name="EditProduct" 
        component={EditProductScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};
