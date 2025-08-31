/**
 * Jest setup file for React Native tests
 */

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);

// Mock react-native-gesture-handler
jest.mock('react-native-gesture-handler', () => {});

// Mock react-native-image-picker
jest.mock('react-native-image-picker', () => ({
  launchImageLibrary: jest.fn(),
  launchCamera: jest.fn(),
}));

// Global test timeout
jest.setTimeout(10000);

// Suppress console warnings during tests
Object.defineProperty(globalThis, 'console', {
  value: {
    ...console,
    warn: jest.fn(),
    error: jest.fn(),
  },
  writable: true,
});
