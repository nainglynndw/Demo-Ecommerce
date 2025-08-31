import { Alert } from 'react-native';
import { ApiError, ApiErrorHandler } from '../services/apiErrorHandler';

export const showApiErrorAlert = (
  error: any,
  context?: string,
  onLogout?: () => void,
) => {
  let title = 'Error';
  let message = 'Something went wrong. Please try again.';
  let buttons: { text: string; onPress?: () => void }[] = [{ text: 'OK' }];

  if (ApiErrorHandler.isApiError(error)) {
    const apiError = error as ApiError;

    title = getErrorTitle(apiError.status);
    message = getErrorMessage(apiError, context);
    buttons = getErrorButtons(apiError.status, onLogout);
  } else if (error?.message) {
    message = error.message;
  }

  Alert.alert(title, message, buttons);
};

function getErrorTitle(status: number): string {
  switch (status) {
    case 400:
      return 'Invalid Request';
    case 401:
      return 'Session Expired';
    case 403:
      return 'Access Denied';
    case 404:
      return 'Not Found';
    case 422:
      return 'Validation Error';
    case 429:
      return 'Too Many Requests';
    case 500:
      return 'Server Error';
    case 502:
    case 503:
      return 'Service Unavailable';
    default:
      return `Error ${status}`;
  }
}

function getErrorMessage(error: ApiError, context?: string): string {
  switch (error.status) {
    case 400:
      return 'Please check your input and try again.';
    case 401:
      return 'Your session has expired. Please log in again.';
    case 403:
      return "You don't have permission to perform this action.";
    case 404:
      return context
        ? `${context} not found.`
        : 'The requested item could not be found.';
    case 422:
      let message = 'Please check your input and fix any errors.';
      if (error.details?.errors) {
        const fieldErrors = error.details.errors
          .map((err: any) => `• ${err.field}: ${err.message}`)
          .join('\n');
        message += '\n\n' + fieldErrors;
      }
      return message;
    case 429:
      return "You're doing that too fast. Please wait a moment and try again.";
    case 500:
      return 'Our servers are experiencing issues. Please try again later.';
    case 502:
    case 503:
      return 'The service is temporarily unavailable. Please try again later.';
    default:
      return error.message || 'An unexpected error occurred.';
  }
}

function getErrorButtons(status: number, onLogout?: () => void) {
  if (status === 401) {
    return [{ text: 'Cancel' }, { text: 'Logout', onPress: onLogout }];
  }
  return [{ text: 'OK' }];
}
