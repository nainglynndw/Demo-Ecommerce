import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  UserProfile,
  OnboardingStep1Data,
  OnboardingStep2Data,
  LoginData,
  SignupData,
} from '../auth/types';
import { UserApi } from '../services/userApi';
import { useThemeStore } from './themeStore';
interface UserStore {
  userProfile: Partial<UserProfile> | null;
  isLoading: boolean;

  initializeUser: () => Promise<void>;
  login: (credentials: LoginData) => Promise<void>;
  register: (userData: SignupData) => Promise<void>;
  logout: () => void;

  saveStep1Data: (data: OnboardingStep1Data) => Promise<void>;
  saveStep2Data: (data: OnboardingStep2Data) => Promise<void>;
  updateUserProfile: (profile: Partial<UserProfile>) => Promise<void>;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      userProfile: null,
      isLoading: true,

      initializeUser: async () => {
        const { userProfile } = get();
        set({ isLoading: true });
        if (userProfile?.id) {
          try {
            const user = await UserApi.getUserById(userProfile.id);
            set({ userProfile: user, isLoading: false });

            if (user?.preferences?.theme) {
              useThemeStore.getState().updateTheme(user.preferences.theme);
            }
          } catch (error) {
            console.error('Failed to initialize user:', error);
            set({ isLoading: false });
          }
        } else {
          set({ isLoading: false });
        }
      },

      login: async (credentials: LoginData) => {
        try {
          set({ isLoading: true });
          const response = await UserApi.login(credentials);

          set({
            userProfile: response.user,
            isLoading: false,
          });

          if (response.user.preferences?.theme) {
            useThemeStore
              .getState()
              .updateTheme(response.user.preferences.theme);
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
            isLoading: false,
          });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      saveStep1Data: async (data: OnboardingStep1Data) => {
        try {
          const { userProfile } = get();
          if (!userProfile?.id) {
            throw new Error('User not authenticated');
          }

          const updatedUser = await UserApi.saveStep1Data(userProfile.id, data);

          set({
            userProfile: updatedUser,
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
          const { userProfile } = get();
          if (!userProfile?.id) {
            throw new Error('User not authenticated');
          }

          const updatedUser = await UserApi.saveStep2Data(userProfile.id, data);

          set({
            userProfile: updatedUser,
          });
        } catch (error) {
          console.error('Failed to save step 2 data:', error);
          throw error;
        }
      },

      updateUserProfile: async (profile: Partial<UserProfile>) => {
        try {
          const { userProfile } = get();
          if (!userProfile?.id) {
            throw new Error('User not authenticated');
          }

          const updatedUser = await UserApi.updateUserInfo(
            userProfile.id,
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
          isLoading: false,
        });

        useThemeStore.getState().updateTheme('system');
      },
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: state => ({
        userProfile: state.userProfile,
      }),
    },
  ),
);
