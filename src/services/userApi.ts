import {
  UserProfile,
  OnboardingStep1Data,
  OnboardingStep2Data,
  LoginData,
  SignupData,
} from '../auth/types';
import { ApiErrorHandler } from './apiErrorHandler';
import {
  validateCredentials,
  isEmailTaken,
  addUser,
  updateUser,
  findUserById,
  deleteUser,
} from './mockUsers';

const delay = (ms: number) =>
  new Promise<void>(resolve => setTimeout(resolve, ms));

export class UserApi {
  static async login(
    credentials: LoginData,
  ): Promise<{ user: UserProfile; token: string }> {
    return ApiErrorHandler.intercept('/auth/login', async () => {
      await delay(500);

      const user = validateCredentials(credentials.email, credentials.password);

      if (!user) {
        throw new Error('Invalid email or password');
      }

      const userProfile: UserProfile = {
        id: user.id,
        email: user.email,
        name: user.name,
        phone: user.phone,
        dateOfBirth: user.dateOfBirth,
        address: user.address,
        avatar: user.avatar,
        preferences: user.preferences,
        onboardingCompleted: user.onboardingCompleted,
      };

      const token = `mock_token_${user.id}_${Date.now()}`;

      return { user: userProfile, token };
    });
  }

  static async register(
    userData: SignupData,
  ): Promise<{ user: UserProfile; token: string }> {
    return ApiErrorHandler.intercept('/auth/register', async () => {
      await delay(600);

      if (isEmailTaken(userData.email)) {
        throw new Error('Email already registered');
      }

      const newUser = addUser({
        email: userData.email,
        password: userData.password,
        preferences: {
          theme: 'system',
        },
        onboardingCompleted: {
          step1: false,
          step2: false,
        },
      });

      const userProfile: UserProfile = {
        id: newUser.id,
        email: newUser.email,
        preferences: newUser.preferences,
        onboardingCompleted: newUser.onboardingCompleted,
      };

      const token = `mock_token_${newUser.id}_${Date.now()}`;

      return { user: userProfile, token };
    });
  }

  static async deleteUser(userId: string): Promise<boolean> {
    return ApiErrorHandler.intercept(`/user/${userId}`, async () => {
      await delay(300);

      const success = deleteUser(userId);
      return success;
    });
  }

  static async updateUserInfo(
    userId: string,
    updates: Partial<UserProfile>,
  ): Promise<UserProfile> {
    return ApiErrorHandler.intercept('/user/update', async () => {
      await delay(400);

      const updatedUser = updateUser(userId, updates);
      if (!updatedUser) {
        throw new Error('User not found');
      }

      const userProfile: UserProfile = {
        id: updatedUser.id,
        email: updatedUser.email,
        name: updatedUser.name,
        phone: updatedUser.phone,
        dateOfBirth: updatedUser.dateOfBirth,
        address: updatedUser.address,
        avatar: updatedUser.avatar,
        preferences: updatedUser.preferences,
        onboardingCompleted: updatedUser.onboardingCompleted,
      };

      return userProfile;
    });
  }

  static async getUserById(userId: string): Promise<UserProfile | null> {
    return ApiErrorHandler.intercept(`/user/${userId}`, async () => {
      await delay(200);

      const user = findUserById(userId);
      if (!user) return null;

      return {
        id: user.id,
        email: user.email,
        name: user.name,
        phone: user.phone,
        dateOfBirth: user.dateOfBirth,
        address: user.address,
        avatar: user.avatar,
        preferences: user.preferences,
        onboardingCompleted: user.onboardingCompleted,
      };
    });
  }

  static async saveStep1Data(
    userId: string,
    data: OnboardingStep1Data,
  ): Promise<UserProfile> {
    return ApiErrorHandler.intercept('/user/onboarding/step1', async () => {
      await delay(400);

      const updatedUser = updateUser(userId, {
        name: data.name,
        phone: data.phone,
        preferences: data.preferences,
        onboardingCompleted: {
          step1: true,
          step2: false,
        },
      });

      if (!updatedUser) {
        throw new Error('User not found');
      }

      return {
        id: updatedUser.id,
        email: updatedUser.email,
        name: updatedUser.name,
        phone: updatedUser.phone,
        dateOfBirth: updatedUser.dateOfBirth,
        address: updatedUser.address,
        avatar: updatedUser.avatar,
        preferences: updatedUser.preferences,
        onboardingCompleted: updatedUser.onboardingCompleted,
      };
    });
  }

  static async saveStep2Data(
    userId: string,
    data: OnboardingStep2Data,
  ): Promise<UserProfile> {
    return ApiErrorHandler.intercept('/user/onboarding/step2', async () => {
      await delay(400);

      const updatedUser = updateUser(userId, {
        dateOfBirth: data.dateOfBirth,
        address: data.address,
        onboardingCompleted: {
          step1: true,
          step2: true,
        },
      });

      if (!updatedUser) {
        throw new Error('User not found');
      }

      return {
        id: updatedUser.id,
        email: updatedUser.email,
        name: updatedUser.name,
        phone: updatedUser.phone,
        dateOfBirth: updatedUser.dateOfBirth,
        address: updatedUser.address,
        avatar: updatedUser.avatar,
        preferences: updatedUser.preferences,
        onboardingCompleted: updatedUser.onboardingCompleted,
      };
    });
  }

  static async refreshUserData(userId: string): Promise<UserProfile | null> {
    return this.getUserById(userId);
  }

  static async updateUserPreferences(
    userId: string,
    preferences: UserProfile['preferences'],
  ): Promise<UserProfile> {
    return this.updateUserInfo(userId, { preferences });
  }

  static async updateUserAvatar(
    userId: string,
    avatar: string,
  ): Promise<UserProfile> {
    return this.updateUserInfo(userId, { avatar });
  }
}
