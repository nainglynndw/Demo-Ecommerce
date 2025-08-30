import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useUserStore } from '../../../stores/userStore';
import { useThemeStore } from '../../../stores/themeStore';
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

  const profileSections = useMemo(
    () => [
      {
        title: 'Personal Information',
        data: [
          { label: 'Name', value: userProfile?.name || 'Not set' },
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
    ],
    [
      userProfile?.address?.city,
      userProfile?.address?.country,
      userProfile?.address?.state,
      userProfile?.address?.street,
      userProfile?.address?.zipCode,
      userProfile?.dateOfBirth,
      userProfile?.email,
      userProfile?.name,
      userProfile?.phone,
      userProfile?.preferences?.theme,
    ],
  );

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.colors.text }]}>
          Profile
        </Text>
      </View>

      <Avatar avatar={userProfile?.avatar} name={userProfile?.name} />

      {profileSections.map(section => (
        <ProfileSection
          key={section.title}
          title={section.title}
          data={section.data}
        />
      ))}

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
});
