export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  preferences: {
    theme: 'light' | 'dark' | 'system';
  };
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface SignupData {
  email: string;
  password: string;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface OnboardingStep1Data {
  name: string;
  phone: string;
  preferences: {
    theme: 'light' | 'dark' | 'system';
  };
}

export interface OnboardingStep2Data {
  dateOfBirth?: string; // Optional - format: YYYY-MM-DD
  address: Address;
}

export interface OnboardingData
  extends OnboardingStep1Data,
    OnboardingStep2Data {
  avatar?: string;
}

export interface UserProfile {
  id: string;
  email: string;
  password: string;
  name?: string;
  phone?: string;
  dateOfBirth?: string;
  address?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  avatar?: string;
  preferences: {
    theme: 'light' | 'dark' | 'system';
  };
  onboardingCompleted: {
    step1: boolean;
    step2: boolean;
  };
  createdAt: string;
  updatedAt: string;
}
