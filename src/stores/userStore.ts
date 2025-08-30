import { create } from 'zustand';
import {
  UserProfile,
  OnboardingStep1Data,
  OnboardingStep2Data,
} from '../auth/types';
import {
  StorageService,
  OnboardingStatus,
  AuthStatus,
} from '../services/storage';

interface UserStore {
  userProfile: Partial<UserProfile> | null;
  isLoading: boolean;
  onboardingStatus: OnboardingStatus;
  authStatus: AuthStatus;

  // Computed values
  needsOnboarding: 'step1' | 'step2' | 'none';

  // Actions
  saveStep1Data: (data: OnboardingStep1Data) => Promise<void>;
  saveStep2Data: (data: OnboardingStep2Data) => Promise<void>;
  updateUserProfile: (profile: Partial<UserProfile>) => Promise<void>;
  setAuthStatus: (status: AuthStatus) => Promise<void>;
  logout: () => Promise<void>;
  initializeUserData: () => Promise<void>;

  // Utility functions
  hasRequiredInfoForPurchase: () => boolean;
  getMissingPurchaseInfo: () => string[];
}

export const useUserStore = create<UserStore>((set, get) => ({
  userProfile: null,
  isLoading: true,
  onboardingStatus: {
    step1Completed: false,
    step2Completed: false,
    lastCompletedStep: null,
  },
  authStatus: {
    isAuthenticated: false,
  },

  get needsOnboarding() {
    const { onboardingStatus } = get();
    if (!onboardingStatus.step1Completed) return 'step1';
    if (!onboardingStatus.step2Completed) return 'step2';
    return 'none';
  },

  saveStep1Data: async (data: OnboardingStep1Data) => {
    try {
      await StorageService.saveStep1Data(data);

      const { userProfile, onboardingStatus } = get();
      const updatedProfile = {
        ...userProfile,
        name: data.name,
        phone: data.phone,
        preferences: data.preferences,
      };

      const updatedStatus = {
        ...onboardingStatus,
        step1Completed: true,
        lastCompletedStep: 'step1' as const,
      };

      set({
        userProfile: updatedProfile,
        onboardingStatus: updatedStatus,
      });
    } catch (error) {
      console.error('Failed to save step 1 data:', error);
    }
  },

  saveStep2Data: async (data: OnboardingStep2Data) => {
    try {
      await StorageService.saveStep2Data(data);

      const { userProfile, onboardingStatus } = get();
      const updatedProfile = {
        ...userProfile,
        dateOfBirth: data.dateOfBirth,
        address: data.address,
      };

      const updatedStatus = {
        ...onboardingStatus,
        step2Completed: true,
        lastCompletedStep: 'step2' as const,
      };

      set({
        userProfile: updatedProfile,
        onboardingStatus: updatedStatus,
      });
    } catch (error) {
      console.error('Failed to save step 2 data:', error);
    }
  },

  updateUserProfile: async (profile: Partial<UserProfile>) => {
    try {
      await StorageService.saveUserProfile(profile);

      const { userProfile } = get();
      set({
        userProfile: {
          ...userProfile,
          ...profile,
        },
      });
    } catch (error) {
      console.error('Failed to update user profile:', error);
    }
  },

  setAuthStatus: async (status: AuthStatus) => {
    try {
      await StorageService.saveAuthStatus(status);
      set({ authStatus: status });
    } catch (error) {
      console.error('Failed to set auth status:', error);
    }
  },

  logout: async () => {
    try {
      await StorageService.clearUserData();

      set({
        userProfile: null,
        onboardingStatus: {
          step1Completed: false,
          step2Completed: false,
          lastCompletedStep: null,
        },
        authStatus: {
          isAuthenticated: false,
        },
      });
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  },

  initializeUserData: async () => {
    try {
      set({ isLoading: true });

      const profile = await StorageService.getUserProfile();
      const onboarding = await StorageService.getOnboardingStatus();
      const auth = await StorageService.getAuthStatus();

      set({
        userProfile: profile,
        onboardingStatus: onboarding,
        authStatus: auth,
        isLoading: false,
      });
    } catch (error) {
      console.error('Failed to load user data:', error);
      set({ isLoading: false });
    }
  },

  hasRequiredInfoForPurchase: () => {
    const { userProfile } = get();
    if (!userProfile) return false;
    return !!(
      userProfile.name &&
      userProfile.phone &&
      userProfile.address?.street &&
      userProfile.address?.city &&
      userProfile.address?.state &&
      userProfile.address?.zipCode
    );
  },

  getMissingPurchaseInfo: () => {
    const { userProfile } = get();
    const missing: string[] = [];

    if (!userProfile) {
      return ['name', 'phone', 'address'];
    }

    if (!userProfile.name) missing.push('name');
    if (!userProfile.phone) missing.push('phone');

    if (!userProfile.address) {
      missing.push('address');
    } else {
      if (!userProfile.address.street) missing.push('street address');
      if (!userProfile.address.city) missing.push('city');
      if (!userProfile.address.state) missing.push('state');
      if (!userProfile.address.zipCode) missing.push('zip code');
    }

    return missing;
  },
}));
