import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ProductListScreen } from '../products/screens/ProductList';
import { ProductDetailScreen } from '../products/screens/ProductDetail';
import { CreateProductScreen } from '../products/screens/CreateProduct';
import { CreateOrderScreen } from '../orders/screens/CreateOrder';
import { Profile } from '../profile/screens/Profile';
import { useThemeStore } from '../stores/themeStore';

export type MainStackParamList = {
  ProductList: undefined;
  ProductDetail: { productId: string };
  CreateProduct: undefined;
  EditProduct: { productId: string };
  CreateOrder: { productId: string };
  Profile: undefined;
};

const Stack = createStackNavigator<MainStackParamList>();

export const MainNavigator: React.FC = () => {
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
          headerShown: true,
          title: 'Profile',
        }}
      />
    </Stack.Navigator>
  );
};
