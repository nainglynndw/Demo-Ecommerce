import { Alert } from 'react-native';
import { showApiErrorAlert } from '../../src/utils/errorHandling';
import { ApiError } from '../../src/services/apiErrorHandler';

jest.mock('react-native', () => ({
  Alert: {
    alert: jest.fn(),
  },
}));

describe('errorHandling utilities', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('showApiErrorAlert', () => {
    it('should show default error alert for non-API errors', () => {
      const error = new Error('Generic error message');

      showApiErrorAlert(error);

      expect(Alert.alert).toHaveBeenCalledWith(
        'Error',
        'Generic error message',
        [{ text: 'OK' }],
      );
    });

    it('should show default error alert for errors without message', () => {
      const error = {};

      showApiErrorAlert(error);

      expect(Alert.alert).toHaveBeenCalledWith(
        'Error',
        'Something went wrong. Please try again.',
        [{ text: 'OK' }],
      );
    });

    it('should show API error alert for 400 status', () => {
      const apiError: ApiError = {
        name: 'BadRequest',
        message: 'Invalid input',
        status: 400,
      } as ApiError;

      showApiErrorAlert(apiError);

      expect(Alert.alert).toHaveBeenCalledWith(
        'Invalid Request',
        'Please check your input and try again.',
        [{ text: 'OK' }],
      );
    });

    it('should show API error alert for 401 status with logout button', () => {
      const apiError: ApiError = {
        name: 'Unauthorized',
        message: 'Token expired',
        status: 401,
      } as ApiError;

      const mockLogout = jest.fn();
      showApiErrorAlert(apiError, undefined, mockLogout);

      expect(Alert.alert).toHaveBeenCalledWith(
        'Session Expired',
        'Your session has expired. Please log in again.',
        [{ text: 'Cancel' }, { text: 'Logout', onPress: mockLogout }],
      );
    });

    it('should show API error alert for 403 status', () => {
      const apiError: ApiError = {
        name: 'Forbidden',
        message: 'Access denied',
        status: 403,
      } as ApiError;

      showApiErrorAlert(apiError);

      expect(Alert.alert).toHaveBeenCalledWith(
        'Access Denied',
        "You don't have permission to perform this action.",
        [{ text: 'OK' }],
      );
    });

    it('should show API error alert for 404 status with context', () => {
      const apiError: ApiError = {
        name: 'NotFound',
        message: 'Product not found',
        status: 404,
      } as ApiError;

      showApiErrorAlert(apiError, 'Product');

      expect(Alert.alert).toHaveBeenCalledWith(
        'Not Found',
        'Product not found.',
        [{ text: 'OK' }],
      );
    });

    it('should show API error alert for 404 status without context', () => {
      const apiError: ApiError = {
        name: 'NotFound',
        message: 'Item not found',
        status: 404,
      } as ApiError;

      showApiErrorAlert(apiError);

      expect(Alert.alert).toHaveBeenCalledWith(
        'Not Found',
        'The requested item could not be found.',
        [{ text: 'OK' }],
      );
    });

    it('should show API error alert for 422 status with validation details', () => {
      const apiError: ApiError = {
        name: 'ValidationError',
        message: 'Validation failed',
        status: 422,
        details: {
          errors: [
            { field: 'email', message: 'Invalid email format' },
            { field: 'password', message: 'Password too short' },
          ],
        },
      } as ApiError;

      showApiErrorAlert(apiError);

      expect(Alert.alert).toHaveBeenCalledWith(
        'Validation Error',
        'Please check your input and fix any errors.\n\n• email: Invalid email format\n• password: Password too short',
        [{ text: 'OK' }],
      );
    });

    it('should show API error alert for 422 status without validation details', () => {
      const apiError: ApiError = {
        name: 'ValidationError',
        message: 'Validation failed',
        status: 422,
      } as ApiError;

      showApiErrorAlert(apiError);

      expect(Alert.alert).toHaveBeenCalledWith(
        'Validation Error',
        'Please check your input and fix any errors.',
        [{ text: 'OK' }],
      );
    });

    it('should show API error alert for 429 status', () => {
      const apiError: ApiError = {
        name: 'TooManyRequests',
        message: 'Rate limit exceeded',
        status: 429,
      } as ApiError;

      showApiErrorAlert(apiError);

      expect(Alert.alert).toHaveBeenCalledWith(
        'Too Many Requests',
        "You're doing that too fast. Please wait a moment and try again.",
        [{ text: 'OK' }],
      );
    });

    it('should show API error alert for 500 status', () => {
      const apiError: ApiError = {
        name: 'InternalServerError',
        message: 'Server error',
        status: 500,
      } as ApiError;

      showApiErrorAlert(apiError);

      expect(Alert.alert).toHaveBeenCalledWith(
        'Server Error',
        'Our servers are experiencing issues. Please try again later.',
        [{ text: 'OK' }],
      );
    });

    it('should show API error alert for 502 status', () => {
      const apiError: ApiError = {
        name: 'BadGateway',
        message: 'Bad gateway',
        status: 502,
      } as ApiError;

      showApiErrorAlert(apiError);

      expect(Alert.alert).toHaveBeenCalledWith(
        'Service Unavailable',
        'The service is temporarily unavailable. Please try again later.',
        [{ text: 'OK' }],
      );
    });

    it('should show API error alert for 503 status', () => {
      const apiError: ApiError = {
        name: 'ServiceUnavailable',
        message: 'Service unavailable',
        status: 503,
      } as ApiError;

      showApiErrorAlert(apiError);

      expect(Alert.alert).toHaveBeenCalledWith(
        'Service Unavailable',
        'The service is temporarily unavailable. Please try again later.',
        [{ text: 'OK' }],
      );
    });

    it('should show API error alert for unknown status codes', () => {
      const apiError: ApiError = {
        name: 'UnknownError',
        message: 'Unknown error',
        status: 418,
      } as ApiError;

      showApiErrorAlert(apiError);

      expect(Alert.alert).toHaveBeenCalledWith('Error 418', 'Unknown error', [
        { text: 'OK' },
      ]);
    });

    it('should show API error alert for unknown status with fallback message', () => {
      const apiError: ApiError = {
        name: 'UnknownError',
        status: 418,
      } as ApiError;

      showApiErrorAlert(apiError);

      expect(Alert.alert).toHaveBeenCalledWith(
        'Error 418',
        'An unexpected error occurred.',
        [{ text: 'OK' }],
      );
    });
  });

  describe('error handling edge cases', () => {
    it('should handle null error gracefully', () => {
      showApiErrorAlert(null as any);

      expect(Alert.alert).toHaveBeenCalledWith(
        'Error',
        'Something went wrong. Please try again.',
        [{ text: 'OK' }],
      );
    });

    it('should handle undefined error gracefully', () => {
      showApiErrorAlert(undefined as any);

      expect(Alert.alert).toHaveBeenCalledWith(
        'Error',
        'Something went wrong. Please try again.',
        [{ text: 'OK' }],
      );
    });

    it('should handle error with empty message', () => {
      const error = { message: '' };

      showApiErrorAlert(error);

      expect(Alert.alert).toHaveBeenCalledWith(
        'Error',
        'Something went wrong. Please try again.',
        [{ text: 'OK' }],
      );
    });

    it('should handle error with whitespace-only message', () => {
      const error = { message: '   ' };

      showApiErrorAlert(error);

      expect(Alert.alert).toHaveBeenCalledWith('Error', '   ', [
        { text: 'OK' },
      ]);
    });
  });

  describe('logout functionality', () => {
    it('should call logout function when logout button is pressed for 401 error', () => {
      const apiError: ApiError = {
        name: 'Unauthorized',
        message: 'Token expired',
        status: 401,
      } as ApiError;

      const mockLogout = jest.fn();
      showApiErrorAlert(apiError, undefined, mockLogout);

      // Get the logout button from the alert call
      const alertCall = (Alert.alert as jest.Mock).mock.calls[0];
      const logoutButton = alertCall[2].find(
        (btn: any) => btn.text === 'Logout',
      );

      expect(logoutButton).toBeDefined();
      expect(logoutButton.onPress).toBe(mockLogout);

      // Simulate logout button press
      logoutButton.onPress();
      expect(mockLogout).toHaveBeenCalledTimes(1);
    });

    it('should not show logout button for non-401 errors', () => {
      const apiError: ApiError = {
        name: 'Forbidden',
        message: 'Access denied',
        status: 403,
      } as ApiError;

      const mockLogout = jest.fn();
      showApiErrorAlert(apiError, undefined, mockLogout);

      const alertCall = (Alert.alert as jest.Mock).mock.calls[0];
      const buttons = alertCall[2];

      expect(buttons).toHaveLength(1);
      expect(buttons[0].text).toBe('OK');
      expect(buttons[0].onPress).toBeUndefined();
    });
  });
});
