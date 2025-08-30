import React, { useMemo } from 'react';
import { Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useUserStore } from '../../../stores/userStore';
import { useThemeStore } from '../../../stores/themeStore';
import { useOrders } from '../../../hooks/useOrders';
import { StackNavigationProp } from '@react-navigation/stack';
import { MainStackParamList } from '../../../navigation/MainNavigator';
import { Avatar, ProfileSection, LogoutButton } from '../../components';

type ProfileScreenNavigationProp = StackNavigationProp<
  MainStackParamList,
  'Profile'
>;

type Props = {
  navigation: ProfileScreenNavigationProp;
};

export const Profile: React.FC<Props> = () => {
  const { userProfile } = useUserStore();
  const { theme } = useThemeStore();
  const { data: orders = [], isLoading: ordersLoading } = useOrders(
    userProfile?.email || '',
  );

  const profileSections = useMemo(
    () => [
      {
        title: 'Personal Information',
        data: [
          { label: 'Email', value: userProfile?.email || 'Not set' },
          { label: 'Phone', value: userProfile?.phone || 'Not set' },
          {
            label: 'Date of Birth',
            value: userProfile?.dateOfBirth || 'Not set',
          },
        ],
      },
      {
        title: 'Address',
        data: [
          { label: 'Street', value: userProfile?.address?.street || 'Not set' },
          { label: 'City', value: userProfile?.address?.city || 'Not set' },
          { label: 'State', value: userProfile?.address?.state || 'Not set' },
          {
            label: 'ZIP Code',
            value: userProfile?.address?.zipCode || 'Not set',
          },
          {
            label: 'Country',
            value: userProfile?.address?.country || 'Not set',
          },
        ],
      },
      {
        title: 'Preferences',
        data: [
          {
            label: 'Theme',
            value: userProfile?.preferences?.theme
              ? userProfile.preferences.theme.charAt(0).toUpperCase() +
                userProfile.preferences.theme.slice(1)
              : 'Not set',
          },
        ],
      },
      {
        title: 'Order History',
        data: ordersLoading
          ? [{ label: 'Loading...', value: '' }]
          : orders.length > 0
          ? orders.slice(0, 3).map(order => ({
              label: `#${order.id.slice(-6)} - ${order.productName}`,
              value: `$${order.totalAmount.toFixed(2)} - ${order.status}`,
            }))
          : [{ label: 'No orders yet', value: 'Place your first order!' }],
      },
    ],
    [
      orders,
      ordersLoading,
      userProfile?.address?.city,
      userProfile?.address?.country,
      userProfile?.address?.state,
      userProfile?.address?.street,
      userProfile?.address?.zipCode,
      userProfile?.dateOfBirth,
      userProfile?.email,
      userProfile?.phone,
      userProfile?.preferences?.theme,
    ],
  );

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <Avatar avatar={userProfile?.avatar} name={userProfile?.name} />

      {profileSections.map(section => (
        <ProfileSection
          key={section.title}
          title={section.title}
          data={section.data}
        />
      ))}

      {orders.length > 3 && (
        <TouchableOpacity
          style={[
            styles.viewAllButton,
            { backgroundColor: theme.colors.primary },
          ]}
        >
          <Text style={styles.viewAllButtonText}>
            View All Orders ({orders.length})
          </Text>
        </TouchableOpacity>
      )}

      <LogoutButton />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  viewAllButton: {
    marginHorizontal: 20,
    marginVertical: 10,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  viewAllButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
