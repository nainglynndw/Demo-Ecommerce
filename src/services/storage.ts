import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  UserProfile,
  OnboardingStep1Data,
  OnboardingStep2Data,
} from '../auth/types';
import { ThemeMode } from '../types/theme';

// Storage keys
const STORAGE_KEYS = {
  USER_PROFILE: 'user_profile',
  ONBOARDING_STATUS: 'onboarding_status',
  THEME_PREFERENCE: 'theme_preference',
  AUTH_STATUS: 'auth_status',
} as const;

export interface OnboardingStatus {
  step1Completed: boolean;
  step2Completed: boolean;
  lastCompletedStep?: 'step1' | 'step2' | null;
}

export interface AuthStatus {
  isAuthenticated: boolean;
  userId?: string;
  email?: string;
  lastLoginTime?: number;
}

// User Profile Storage
export const userStorage = {
  // Save complete user profile
  saveUserProfile: async (profile: Partial<UserProfile>): Promise<void> => {
    try {
      const existingProfile = await userStorage.getUserProfile();
      const updatedProfile = {
        ...existingProfile,
        ...profile,
        // Ensure we keep the onboarding status structure
        onboardingCompleted: {
          step1:
            profile.name && profile.phone
              ? true
              : existingProfile?.onboardingCompleted?.step1 || false,
          step2: profile.address
            ? true
            : existingProfile?.onboardingCompleted?.step2 || false,
        },
      };
      await AsyncStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(updatedProfile));
    } catch (error) {
      console.error('Failed to save user profile:', error);
    }
  },

  // Get user profile
  getUserProfile: async (): Promise<Partial<UserProfile> | null> => {
    try {
      const profileData = await AsyncStorage.getItem(STORAGE_KEYS.USER_PROFILE);
      return profileData ? JSON.parse(profileData) : null;
    } catch (error) {
      console.error('Failed to get user profile:', error);
      return null;
    }
  },

  // Update Onboarding Status
  updateOnboardingStatus: async (status: Partial<OnboardingStatus>): Promise<void> => {
    try {
      const currentStatus = await onboardingStorage.getOnboardingStatus();
      const updatedStatus = {
        ...currentStatus,
        ...status,
      };
      await AsyncStorage.setItem(
        STORAGE_KEYS.ONBOARDING_STATUS,
        JSON.stringify(updatedStatus),
      );
    } catch (error) {
      console.error('Failed to update onboarding status:', error);
    }
  },

  // Save Step 1 data
  saveStep1Data: async (data: OnboardingStep1Data): Promise<void> => {
    try {
      const profileUpdate: Partial<UserProfile> = {
        name: data.name,
        phone: data.phone,
        preferences: data.preferences,
      };
      await userStorage.saveUserProfile(profileUpdate);
      await userStorage.updateOnboardingStatus({
        step1Completed: true,
        lastCompletedStep: 'step1',
      });
    } catch (error) {
      console.error('Failed to save step 1 data:', error);
    }
  },

  // Save Step 2 data
  saveStep2Data: async (data: OnboardingStep2Data): Promise<void> => {
    try {
      const profileUpdate: Partial<UserProfile> = {
        dateOfBirth: data.dateOfBirth,
        address: data.address,
      };
      await userStorage.saveUserProfile(profileUpdate);
      await userStorage.updateOnboardingStatus({
        step2Completed: true,
        lastCompletedStep: 'step2',
      });
    } catch (error) {
      console.error('Failed to save step 2 data:', error);
    }
  },

  // Clear user data (logout)
  clearUserData: async (): Promise<void> => {
    try {
      await AsyncStorage.multiRemove([
        STORAGE_KEYS.USER_PROFILE,
        STORAGE_KEYS.ONBOARDING_STATUS,
        STORAGE_KEYS.AUTH_STATUS,
      ]);
    } catch (error) {
      console.error('Failed to clear user data:', error);
    }
  },
};

// Onboarding Status Storage
export const onboardingStorage = {
  // Get onboarding status
  getOnboardingStatus: async (): Promise<OnboardingStatus> => {
    try {
      const statusData = await AsyncStorage.getItem(STORAGE_KEYS.ONBOARDING_STATUS);
      return statusData
        ? JSON.parse(statusData)
        : {
            step1Completed: false,
            step2Completed: false,
            lastCompletedStep: null,
          };
    } catch (error) {
      console.error('Failed to get onboarding status:', error);
      return {
        step1Completed: false,
        step2Completed: false,
        lastCompletedStep: null,
      };
    }
  },

  // Update onboarding status
  updateOnboardingStatus: async (status: Partial<OnboardingStatus>): Promise<void> => {
    try {
      const currentStatus = await onboardingStorage.getOnboardingStatus();
      const updatedStatus = {
        ...currentStatus,
        ...status,
      };
      await AsyncStorage.setItem(
        STORAGE_KEYS.ONBOARDING_STATUS,
        JSON.stringify(updatedStatus),
      );
    } catch (error) {
      console.error('Failed to update onboarding status:', error);
    }
  },

  // Check if user needs onboarding
  needsOnboarding: async (): Promise<'step1' | 'step2' | 'none'> => {
    const status = await onboardingStorage.getOnboardingStatus();
    if (!status.step1Completed) return 'step1';
    if (!status.step2Completed) return 'step2';
    return 'none';
  },
};

// Theme Storage
export const themeStorage = {
  // Save theme preference
  saveTheme: async (theme: ThemeMode): Promise<void> => {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.THEME_PREFERENCE, theme);
    } catch (error) {
      console.error('Failed to save theme:', error);
    }
  },

  // Get theme preference
  getTheme: async (): Promise<ThemeMode> => {
    try {
      const theme = await AsyncStorage.getItem(STORAGE_KEYS.THEME_PREFERENCE);
      return (theme as ThemeMode) || 'system';
    } catch (error) {
      console.error('Failed to get theme:', error);
      return 'system';
    }
  },
};

// Auth Status Storage (for future login/signup logic)
export const authStorage = {
  // Save auth status
  saveAuthStatus: async (status: AuthStatus): Promise<void> => {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.AUTH_STATUS, JSON.stringify(status));
    } catch (error) {
      console.error('Failed to save auth status:', error);
    }
  },

  // Get auth status
  getAuthStatus: async (): Promise<AuthStatus> => {
    try {
      const statusData = await AsyncStorage.getItem(STORAGE_KEYS.AUTH_STATUS);
      return statusData
        ? JSON.parse(statusData)
        : {
            isAuthenticated: false,
          };
    } catch (error) {
      console.error('Failed to get auth status:', error);
      return {
        isAuthenticated: false,
      };
    }
  },

  // Clear auth status
  clearAuthStatus: async (): Promise<void> => {
    try {
      await AsyncStorage.removeItem(STORAGE_KEYS.AUTH_STATUS);
    } catch (error) {
      console.error('Failed to clear auth status:', error);
    }
  },
};

// Export combined storage service
export const StorageService = {
  ...userStorage,
  ...onboardingStorage,
  ...themeStorage,
  ...authStorage,
};
