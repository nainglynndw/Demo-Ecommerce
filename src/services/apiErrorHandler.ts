export interface ApiError extends Error {
  status: number;
  code?: string;
  details?: any;
}

export class ApiErrorHandler {
  private static errorRates = {
    '401': 0, // Unauthorized - 0% by default
    '403': 0, // Forbidden - 0% by default
    '404': 0, // Not Found - 0% by default
    '400': 0, // Bad Request - 0% by default
    '422': 0, // Unprocessable Entity - 0% by default
    '429': 0, // Too Many Requests - 0% by default
    '500': 0, // Internal Server Error - 0% by default
    '502': 0, // Bad Gateway - 0% by default
    '503': 0, // Service Unavailable - 0% by default
  };

  private static enabled = false;

  // Enable/disable error simulation
  static setEnabled(enabled: boolean) {
    this.enabled = enabled;
    console.log(`API Error Simulation ${enabled ? 'enabled' : 'disabled'}`);
  }

  // Set error rates (0-100 percentage)
  static setErrorRates(rates: Partial<typeof ApiErrorHandler.errorRates>) {
    Object.assign(this.errorRates, rates);
    console.log('API Error Rates updated:', this.errorRates);
  }

  // Reset all error rates to 0
  static resetErrorRates() {
    Object.keys(this.errorRates).forEach(key => {
      this.errorRates[key as keyof typeof this.errorRates] = 0;
    });
    console.log('API Error Rates reset to 0');
  }

  // Create predefined error scenarios
  static createErrorScenario(scenario: string) {
    this.resetErrorRates();

    switch (scenario) {
      case 'auth_failure':
        this.setErrorRates({ '401': 50, '403': 30 });
        break;
      case 'server_issues':
        this.setErrorRates({ '500': 40, '502': 20, '503': 15 });
        break;
      case 'rate_limiting':
        this.setErrorRates({ '429': 60 });
        break;
      case 'validation_errors':
        this.setErrorRates({ '400': 35, '422': 25 });
        break;
      case 'mixed_errors':
        this.setErrorRates({
          '401': 10,
          '400': 15,
          '404': 10,
          '500': 15,
          '429': 5,
        });
        break;
      default:
        console.warn(`Unknown error scenario: ${scenario}`);
    }

    this.setEnabled(true);
    console.log(`Applied error scenario: ${scenario}`);
  }

  // Check if should trigger error
  private static shouldTriggerError(): string | null {
    if (!this.enabled) return null;

    const random = Math.random() * 100;
    let cumulative = 0;

    for (const [status, rate] of Object.entries(this.errorRates)) {
      cumulative += rate;
      if (random <= cumulative) {
        return status;
      }
    }

    return null;
  }

  // Create simple API error object for testing
  private static createSimulatedError(status: string, endpoint: string): ApiError {
    const statusCode = parseInt(status);
    const error = new Error(`Simulated ${status} error for ${endpoint}`) as ApiError;
    error.status = statusCode;
    return error;
  }

  // Middleware function to intercept API calls
  static async intercept<T>(
    endpoint: string,
    apiCall: () => Promise<T>,
  ): Promise<T> {
    const errorStatus = this.shouldTriggerError();

    if (errorStatus) {
      const error = this.createSimulatedError(errorStatus, endpoint);
      console.error(
        `🔴 API Error Simulated [${errorStatus}] for ${endpoint}:`,
        error.message,
      );

      this.handleErrorGlobally(error, endpoint);

      throw error;
    }

    try {
      return await apiCall();
    } catch (error) {
      this.handleErrorGlobally(error, endpoint);
      throw error;
    }
  }

  private static handleErrorGlobally(error: any, endpoint: string) {
    import('../utils/errorHandling').then(({ showApiErrorAlert }) => {
      import('../stores/userStore').then(({ useUserStore }) => {
        const handleLogout = async () => {
          try {
            const { logout } = useUserStore.getState();
            await logout();
          } catch (logoutError) {
            console.error('Error during logout:', logoutError);
          }
        };

        showApiErrorAlert(error, `API call to ${endpoint}`, handleLogout);
      });
    });
  }

  static getCurrentConfig() {
    return {
      enabled: this.enabled,
      errorRates: { ...this.errorRates },
    };
  }

  static getErrorMessage(error: any): string {
    if (error?.status && error?.message) {
      return `${error.status}: ${error.message}`;
    }
    return error?.message || 'Unknown error occurred';
  }

  static isApiError(error: any): error is ApiError {
    return error && typeof error.status === 'number';
  }
}

export const ERROR_SCENARIOS = {
  AUTH_FAILURE: 'auth_failure',
  SERVER_ISSUES: 'server_issues',
  RATE_LIMITING: 'rate_limiting',
  VALIDATION_ERRORS: 'validation_errors',
  MIXED_ERRORS: 'mixed_errors',
} as const;
