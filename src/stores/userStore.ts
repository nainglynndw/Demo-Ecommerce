import { create } from 'zustand';
import {
  UserProfile,
  OnboardingStep1Data,
  OnboardingStep2Data,
  LoginData,
  SignupData,
} from '../auth/types';
import { UserApi } from '../services/userApi';
import { useThemeStore } from './themeStore';

interface AuthStatus {
  isAuthenticated: boolean;
  userId?: string;
  email?: string;
  token?: string;
  lastLoginTime?: string;
}

interface OnboardingStatus {
  step1Completed: boolean;
  step2Completed: boolean;
  lastCompletedStep: 'step1' | 'step2' | null;
}

interface UserStore {
  userProfile: Partial<UserProfile> | null;
  isLoading: boolean;
  onboardingStatus: OnboardingStatus;
  authStatus: AuthStatus;

  needsOnboarding: 'step1' | 'step2' | 'none';

  login: (credentials: LoginData) => Promise<void>;
  register: (userData: SignupData) => Promise<void>;
  logout: () => void;

  saveStep1Data: (data: OnboardingStep1Data) => Promise<void>;
  saveStep2Data: (data: OnboardingStep2Data) => Promise<void>;
  updateUserProfile: (profile: Partial<UserProfile>) => Promise<void>;
}

export const useUserStore = create<UserStore>((set, get) => ({
  userProfile: null,
  isLoading: false,
  onboardingStatus: {
    step1Completed: false,
    step2Completed: false,
    lastCompletedStep: null,
  },
  authStatus: {
    isAuthenticated: false,
  },

  get needsOnboarding() {
    const { userProfile } = get();
    if (!userProfile?.onboardingCompleted?.step1) return 'step1';
    if (!userProfile?.onboardingCompleted?.step2) return 'step2';
    return 'none';
  },

  login: async (credentials: LoginData) => {
    try {
      set({ isLoading: true });
      const response = await UserApi.login(credentials);

      set({
        userProfile: response.user,
        authStatus: {
          isAuthenticated: true,
          userId: response.user.id,
          email: response.user.email,
          token: response.token,
          lastLoginTime: new Date().toISOString(),
        },
        onboardingStatus: {
          step1Completed: response.user.onboardingCompleted?.step1 || false,
          step2Completed: response.user.onboardingCompleted?.step2 || false,
          lastCompletedStep: response.user.onboardingCompleted?.step2
            ? 'step2'
            : response.user.onboardingCompleted?.step1
            ? 'step1'
            : null,
        },
        isLoading: false,
      });

      if (response.user.preferences?.theme) {
        useThemeStore.getState().updateTheme(response.user.preferences.theme);
      }
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  register: async (userData: SignupData) => {
    try {
      set({ isLoading: true });
      const response = await UserApi.register(userData);

      set({
        userProfile: response.user,
        authStatus: {
          isAuthenticated: true,
          userId: response.user.id,
          email: response.user.email,
          token: response.token,
          lastLoginTime: new Date().toISOString(),
        },
        onboardingStatus: {
          step1Completed: false,
          step2Completed: false,
          lastCompletedStep: null,
        },
        isLoading: false,
      });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  saveStep1Data: async (data: OnboardingStep1Data) => {
    try {
      const { authStatus } = get();
      if (!authStatus.userId) {
        throw new Error('User not authenticated');
      }

      const updatedUser = await UserApi.saveStep1Data(authStatus.userId, data);

      set({
        userProfile: updatedUser,
        onboardingStatus: {
          step1Completed: true,
          step2Completed: updatedUser.onboardingCompleted?.step2 || false,
          lastCompletedStep: 'step1' as const,
        },
      });

      if (data.preferences?.theme) {
        useThemeStore.getState().updateTheme(data.preferences.theme);
      }
    } catch (error) {
      console.error('Failed to save step 1 data:', error);
      throw error;
    }
  },

  saveStep2Data: async (data: OnboardingStep2Data) => {
    try {
      const { authStatus } = get();
      if (!authStatus.userId) {
        throw new Error('User not authenticated');
      }

      const updatedUser = await UserApi.saveStep2Data(authStatus.userId, data);

      set({
        userProfile: updatedUser,
        onboardingStatus: {
          step1Completed: updatedUser.onboardingCompleted?.step1 || true,
          step2Completed: true,
          lastCompletedStep: 'step2' as const,
        },
      });
    } catch (error) {
      console.error('Failed to save step 2 data:', error);
      throw error;
    }
  },

  updateUserProfile: async (profile: Partial<UserProfile>) => {
    try {
      const { authStatus } = get();
      if (!authStatus.userId) {
        throw new Error('User not authenticated');
      }

      const updatedUser = await UserApi.updateUserInfo(
        authStatus.userId,
        profile,
      );

      set({ userProfile: updatedUser });

      if (profile.preferences?.theme) {
        useThemeStore.getState().updateTheme(profile.preferences.theme);
      }
    } catch (error) {
      console.error('Failed to update user profile:', error);
      throw error;
    }
  },

  logout: () => {
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
      isLoading: false,
    });

    useThemeStore.getState().updateTheme('system');
  },
}));
