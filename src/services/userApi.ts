import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  UserProfile,
  OnboardingStep1Data,
  OnboardingStep2Data,
} from '../auth/types';
import { ApiErrorHandler } from './apiErrorHandler';

const STORAGE_KEYS = {
  USER_PROFILE: 'user_profile',
  ONBOARDING_STATUS: 'onboarding_status',
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

const delay = (ms: number) =>
  new Promise<void>(resolve => setTimeout(resolve, ms));

export class UserApi {
  // User Profile Management
  static async getUserProfile(): Promise<Partial<UserProfile> | null> {
    return ApiErrorHandler.intercept('/user/profile', async () => {
      await delay(200);
      
      try {
        const profileData = await AsyncStorage.getItem(STORAGE_KEYS.USER_PROFILE);
        return profileData ? JSON.parse(profileData) : null;
      } catch (error) {
        console.error('Error getting user profile:', error);
        return null;
      }
    });
  }

  static async saveUserProfile(profile: Partial<UserProfile>): Promise<void> {
    return ApiErrorHandler.intercept('/user/profile', async () => {
      await delay(300);
      
      try {
        const existingProfile = await this.getUserProfile();
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
        await AsyncStorage.setItem(
          STORAGE_KEYS.USER_PROFILE,
          JSON.stringify(updatedProfile),
        );
      } catch (error) {
        console.error('Error saving user profile:', error);
        throw error;
      }
    });
  }

  static async updateUserProfile(updates: Partial<UserProfile>): Promise<void> {
    return ApiErrorHandler.intercept('/user/profile', async () => {
      await delay(250);
      
      try {
        const existingProfile = await this.getUserProfile();
        const updatedProfile = {
          ...existingProfile,
          ...updates,
        };
        await AsyncStorage.setItem(
          STORAGE_KEYS.USER_PROFILE,
          JSON.stringify(updatedProfile),
        );
      } catch (error) {
        console.error('Error updating user profile:', error);
        throw error;
      }
    });
  }

  // Onboarding Management
  static async saveStep1Data(data: OnboardingStep1Data): Promise<void> {
    return ApiErrorHandler.intercept('/user/onboarding/step1', async () => {
      await delay(400);
      
      try {
        // Save user profile data
        await this.saveUserProfile({
          name: data.name,
          phone: data.phone,
          preferences: data.preferences,
        });

        // Update onboarding status
        await this.updateOnboardingStatus({
          step1Completed: true,
          lastCompletedStep: 'step1',
        });
      } catch (error) {
        console.error('Error saving step 1 data:', error);
        throw error;
      }
    });
  }

  static async saveStep2Data(data: OnboardingStep2Data): Promise<void> {
    return ApiErrorHandler.intercept('/user/onboarding/step2', async () => {
      await delay(400);
      
      try {
        // Save user profile data
        await this.saveUserProfile({
          dateOfBirth: data.dateOfBirth,
          address: data.address,
        });

        // Update onboarding status
        await this.updateOnboardingStatus({
          step2Completed: true,
          lastCompletedStep: 'step2',
        });
      } catch (error) {
        console.error('Error saving step 2 data:', error);
        throw error;
      }
    });
  }

  static async getOnboardingStatus(): Promise<OnboardingStatus> {
    await delay(150);
    
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
      console.error('Error getting onboarding status:', error);
      return {
        step1Completed: false,
        step2Completed: false,
        lastCompletedStep: null,
      };
    }
  }

  static async updateOnboardingStatus(status: Partial<OnboardingStatus>): Promise<void> {
    await delay(200);
    
    try {
      const currentStatus = await this.getOnboardingStatus();
      const updatedStatus = {
        ...currentStatus,
        ...status,
      };
      await AsyncStorage.setItem(
        STORAGE_KEYS.ONBOARDING_STATUS,
        JSON.stringify(updatedStatus),
      );
    } catch (error) {
      console.error('Error updating onboarding status:', error);
      throw error;
    }
  }

  static async needsOnboarding(): Promise<'step1' | 'step2' | 'none'> {
    const status = await this.getOnboardingStatus();
    if (!status.step1Completed) return 'step1';
    if (!status.step2Completed) return 'step2';
    return 'none';
  }

  // Auth Status Management
  static async getAuthStatus(): Promise<AuthStatus> {
    await delay(100);
    
    try {
      const statusData = await AsyncStorage.getItem(STORAGE_KEYS.AUTH_STATUS);
      return statusData
        ? JSON.parse(statusData)
        : { isAuthenticated: false };
    } catch (error) {
      console.error('Error getting auth status:', error);
      return { isAuthenticated: false };
    }
  }

  static async saveAuthStatus(status: AuthStatus): Promise<void> {
    await delay(200);
    
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.AUTH_STATUS, JSON.stringify(status));
    } catch (error) {
      console.error('Error saving auth status:', error);
      throw error;
    }
  }

  // Logout - Clear all user data
  static async clearUserData(): Promise<void> {
    await delay(300);
    
    try {
      await Promise.all([
        AsyncStorage.removeItem(STORAGE_KEYS.USER_PROFILE),
        AsyncStorage.removeItem(STORAGE_KEYS.ONBOARDING_STATUS),
        AsyncStorage.removeItem(STORAGE_KEYS.AUTH_STATUS),
      ]);
    } catch (error) {
      console.error('Error clearing user data:', error);
      throw error;
    }
  }
}