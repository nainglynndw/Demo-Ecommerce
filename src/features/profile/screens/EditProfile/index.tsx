import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useForm } from 'react-hook-form';
import { StackNavigationProp } from '@react-navigation/stack';
import { useUserStore } from '@stores/userStore';
import { useThemeStore } from '@stores/themeStore';
import { MainStackParamList } from '@navigation/MainNavigator';
import { createStyles } from './styles';
import { AvatarSection, FormInput, ThemeSelector } from './components';
import { EditProfileFormData } from './types';

type EditProfileNavigationProp = StackNavigationProp<
  MainStackParamList,
  'EditProfile'
>;

interface EditProfileScreenProps {
  navigation: EditProfileNavigationProp;
}

export const EditProfileScreen: React.FC<EditProfileScreenProps> = ({
  navigation,
}) => {
  const { theme, setThemeMode } = useThemeStore();
  const { userProfile, updateUserProfile } = useUserStore();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [selectedAvatar, setSelectedAvatar] = React.useState<string | null>(
    userProfile?.avatar || null,
  );

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<EditProfileFormData>({
    defaultValues: {
      name: userProfile?.name || '',
      phone: userProfile?.phone || '',
      dateOfBirth: userProfile?.dateOfBirth || '',
      street: userProfile?.address?.street || '',
      city: userProfile?.address?.city || '',
      state: userProfile?.address?.state || '',
      zipCode: userProfile?.address?.zipCode || '',
      country: userProfile?.address?.country || '',
      theme: userProfile?.preferences?.theme || 'system',
    },
  });

  const styles = createStyles(theme);

  const onSubmit = async (data: EditProfileFormData) => {
    try {
      setIsSubmitting(true);

      // Update profile
      await updateUserProfile({
        ...userProfile,
        name: data.name,
        phone: data.phone,
        dateOfBirth: data.dateOfBirth,
        avatar: selectedAvatar || userProfile?.avatar,
        address: {
          street: data.street,
          city: data.city,
          state: data.state,
          zipCode: data.zipCode,
          country: data.country,
        },
        preferences: {
          ...userProfile?.preferences,
          theme: data.theme,
        },
      });

      // Update theme
      await setThemeMode(data.theme);
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Failed to update profile. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>← Cancel</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Profile</Text>
        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleSubmit(onSubmit)}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <ActivityIndicator size="small" color={theme.colors.primary} />
          ) : (
            <Text style={styles.saveButtonText}>Save</Text>
          )}
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Personal Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Personal Information</Text>

          <AvatarSection
            avatar={selectedAvatar}
            userName={userProfile?.name}
            onAvatarChange={setSelectedAvatar}
            theme={theme}
          />

          <FormInput
            name="name"
            label="Full Name"
            placeholder="Enter your full name"
            control={control}
            errors={errors}
            theme={theme}
            rules={{
              required: 'Name is required',
              minLength: {
                value: 2,
                message: 'Name must be at least 2 characters',
              },
            }}
            autoCapitalize="words"
            required
          />

          <FormInput
            name="phone"
            label="Phone Number"
            placeholder="Enter your phone number"
            control={control}
            errors={errors}
            theme={theme}
            rules={{
              pattern: {
                value: /^[+]?[\d\s\-\(\)]{10,}$/,
                message: 'Please enter a valid phone number',
              },
            }}
            keyboardType="phone-pad"
          />

          <FormInput
            name="dateOfBirth"
            label="Date of Birth"
            placeholder="YYYY-MM-DD"
            control={control}
            errors={errors}
            theme={theme}
          />
        </View>

        {/* Address */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Address</Text>

          <FormInput
            name="street"
            label="Street Address"
            placeholder="Enter street address"
            control={control}
            errors={errors}
            theme={theme}
          />

          <View style={styles.row}>
            <View style={styles.halfInput}>
              <FormInput
                name="city"
                label="City"
                placeholder="City"
                control={control}
                errors={errors}
                theme={theme}
              />
            </View>
            <View style={styles.halfInput}>
              <FormInput
                name="state"
                label="State"
                placeholder="State"
                control={control}
                errors={errors}
                theme={theme}
              />
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.halfInput}>
              <FormInput
                name="zipCode"
                label="ZIP Code"
                placeholder="12345"
                control={control}
                errors={errors}
                theme={theme}
                keyboardType="numeric"
              />
            </View>
            <View style={styles.halfInput}>
              <FormInput
                name="country"
                label="Country"
                placeholder="Country"
                control={control}
                errors={errors}
                theme={theme}
              />
            </View>
          </View>
        </View>

        {/* Preferences */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences</Text>

          <ThemeSelector
            control={control}
            theme={theme}
            onThemeChange={setThemeMode}
          />
        </View>

        <View style={styles.bottomSpace} />
      </ScrollView>
    </SafeAreaView>
  );
};
