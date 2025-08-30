import { MMKV } from 'react-native-mmkv';
import {
  UserProfile,
  OnboardingStep1Data,
  OnboardingStep2Data,
} from '../auth/types';
import { ThemeMode } from '../types/theme';

// Initialize MMKV instance
export const storage = new MMKV({
  id: 'user-storage',
  encryptionKey: 'demo-ecommerce-key', // In production, use a proper key
});

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
  saveUserProfile: (profile: Partial<UserProfile>): void => {
    try {
      const existingProfile = userStorage.getUserProfile();
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
      storage.set(STORAGE_KEYS.USER_PROFILE, JSON.stringify(updatedProfile));
    } catch (error) {
      console.error('Failed to save user profile:', error);
    }
  },

  // Get user profile
  getUserProfile: (): Partial<UserProfile> | null => {
    try {
      const profileData = storage.getString(STORAGE_KEYS.USER_PROFILE);
      return profileData ? JSON.parse(profileData) : null;
    } catch (error) {
      console.error('Failed to get user profile:', error);
      return null;
    }
  },

  // Update Oboarding Status
  updateOnboardingStatus: (status: Partial<OnboardingStatus>): void => {
    try {
      const currentStatus = onboardingStorage.getOnboardingStatus();
      const updatedStatus = {
        ...currentStatus,
        ...status,
      };
      storage.set(
        STORAGE_KEYS.ONBOARDING_STATUS,
        JSON.stringify(updatedStatus),
      );
    } catch (error) {
      console.error('Failed to update onboarding status:', error);
    }
  },

  // Save Step 1 data
  saveStep1Data: (data: OnboardingStep1Data): void => {
    try {
      const profileUpdate: Partial<UserProfile> = {
        name: data.name,
        phone: data.phone,
        preferences: data.preferences,
      };
      userStorage.saveUserProfile(profileUpdate);
      userStorage.updateOnboardingStatus({
        step1Completed: true,
        lastCompletedStep: 'step1',
      });
    } catch (error) {
      console.error('Failed to save step 1 data:', error);
    }
  },

  // Save Step 2 data
  saveStep2Data: (data: OnboardingStep2Data): void => {
    try {
      const profileUpdate: Partial<UserProfile> = {
        dateOfBirth: data.dateOfBirth,
        address: data.address,
      };
      userStorage.saveUserProfile(profileUpdate);
      userStorage.updateOnboardingStatus({
        step2Completed: true,
        lastCompletedStep: 'step2',
      });
    } catch (error) {
      console.error('Failed to save step 2 data:', error);
    }
  },

  // Clear user data (logout)
  clearUserData: (): void => {
    try {
      storage.delete(STORAGE_KEYS.USER_PROFILE);
      storage.delete(STORAGE_KEYS.ONBOARDING_STATUS);
      storage.delete(STORAGE_KEYS.AUTH_STATUS);
    } catch (error) {
      console.error('Failed to clear user data:', error);
    }
  },
};

// Onboarding Status Storage
export const onboardingStorage = {
  // Get onboarding status
  getOnboardingStatus: (): OnboardingStatus => {
    try {
      const statusData = storage.getString(STORAGE_KEYS.ONBOARDING_STATUS);
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
  updateOnboardingStatus: (status: Partial<OnboardingStatus>): void => {
    try {
      const currentStatus = onboardingStorage.getOnboardingStatus();
      const updatedStatus = {
        ...currentStatus,
        ...status,
      };
      storage.set(
        STORAGE_KEYS.ONBOARDING_STATUS,
        JSON.stringify(updatedStatus),
      );
    } catch (error) {
      console.error('Failed to update onboarding status:', error);
    }
  },

  // Check if user needs onboarding
  needsOnboarding: (): 'step1' | 'step2' | 'none' => {
    const status = onboardingStorage.getOnboardingStatus();
    if (!status.step1Completed) return 'step1';
    if (!status.step2Completed) return 'step2';
    return 'none';
  },
};

// Theme Storage
export const themeStorage = {
  // Save theme preference
  saveTheme: (theme: ThemeMode): void => {
    try {
      storage.set(STORAGE_KEYS.THEME_PREFERENCE, theme);
    } catch (error) {
      console.error('Failed to save theme:', error);
    }
  },

  // Get theme preference
  getTheme: (): ThemeMode => {
    try {
      return (
        (storage.getString(STORAGE_KEYS.THEME_PREFERENCE) as ThemeMode) ||
        'system'
      );
    } catch (error) {
      console.error('Failed to get theme:', error);
      return 'system';
    }
  },
};

// Auth Status Storage (for future login/signup logic)
export const authStorage = {
  // Save auth status
  saveAuthStatus: (status: AuthStatus): void => {
    try {
      storage.set(STORAGE_KEYS.AUTH_STATUS, JSON.stringify(status));
    } catch (error) {
      console.error('Failed to save auth status:', error);
    }
  },

  // Get auth status
  getAuthStatus: (): AuthStatus => {
    try {
      const statusData = storage.getString(STORAGE_KEYS.AUTH_STATUS);
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
  clearAuthStatus: (): void => {
    try {
      storage.delete(STORAGE_KEYS.AUTH_STATUS);
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
