export interface MockUser {
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

export const mockUsers: MockUser[] = [
  {
    id: '1',
    email: 'demo@test.com',
    password: 'password',
    name: 'Demo User',
    phone: '+1234567890',
    dateOfBirth: '1990-01-15',
    address: {
      street: '123 Main St',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94105',
      country: 'US',
    },
    avatar:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
    preferences: {
      theme: 'system',
    },
    onboardingCompleted: {
      step1: false,
      step2: false,
    },
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '2',
    email: 'john@example.com',
    password: 'password123',
    name: 'John Smith',
    phone: '+1987654321',
    preferences: {
      theme: 'dark',
    },
    onboardingCompleted: {
      step1: true,
      step2: false,
    },
    createdAt: '2024-01-02T00:00:00Z',
    updatedAt: '2024-01-15T12:30:00Z',
  },
  {
    id: '3',
    email: 'jane@example.com',
    password: 'mypassword',
    name: 'Jane Doe',
    phone: '+1555123456',
    dateOfBirth: '1985-06-22',
    address: {
      street: '456 Oak Ave',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'US',
    },
    preferences: {
      theme: 'light',
    },
    onboardingCompleted: {
      step1: true,
      step2: true,
    },
    createdAt: '2024-01-03T00:00:00Z',
    updatedAt: '2024-01-20T15:45:00Z',
  },
  {
    id: '4',
    email: 'bob@example.com',
    password: 'securepass',
    name: 'Bob Wilson',
    phone: '+1444567890',
    preferences: {
      theme: 'system',
    },
    onboardingCompleted: {
      step1: false,
      step2: false,
    },
    createdAt: '2024-01-04T00:00:00Z',
    updatedAt: '2024-01-04T00:00:00Z',
  },
  {
    id: '5',
    email: 'alice@example.com',
    password: 'alicepass',
    name: 'Alice Johnson',
    phone: '+1777888999',
    dateOfBirth: '1992-11-08',
    address: {
      street: '789 Pine Rd',
      city: 'Los Angeles',
      state: 'CA',
      zipCode: '90210',
      country: 'US',
    },
    avatar:
      'https://images.unsplash.com/photo-1494790108755-2616b612b9e3?w=150',
    preferences: {
      theme: 'dark',
    },
    onboardingCompleted: {
      step1: true,
      step2: true,
    },
    createdAt: '2024-01-05T00:00:00Z',
    updatedAt: '2024-01-25T09:15:00Z',
  },
];

// Helper functions for user operations
export const findUserByEmail = (email: string): MockUser | undefined => {
  return mockUsers.find(
    user => user.email.toLowerCase() === email.toLowerCase(),
  );
};

export const findUserById = (id: string): MockUser | undefined => {
  return mockUsers.find(user => user.id === id);
};

export const validateCredentials = (
  email: string,
  password: string,
): MockUser | null => {
  const user = findUserByEmail(email);
  if (user && user.password === password) {
    return user;
  }
  return null;
};

export const isEmailTaken = (email: string): boolean => {
  return !!findUserByEmail(email);
};

export const addUser = (
  user: Omit<MockUser, 'id' | 'createdAt' | 'updatedAt'>,
): MockUser => {
  const newUser: MockUser = {
    ...user,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  mockUsers.push(newUser);
  return newUser;
};

export const updateUser = (
  id: string,
  updates: Partial<MockUser>,
): MockUser | null => {
  const userIndex = mockUsers.findIndex(user => user.id === id);
  if (userIndex === -1) return null;

  const updatedUser: MockUser = {
    ...mockUsers[userIndex],
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  mockUsers[userIndex] = updatedUser;
  return updatedUser;
};

export const deleteUser = (id: string): boolean => {
  const userIndex = mockUsers.findIndex(user => user.id === id);
  if (userIndex === -1) return false;

  mockUsers.splice(userIndex, 1);
  return true;
};
