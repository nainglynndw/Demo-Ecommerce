import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Modal,
} from 'react-native';
import { ApiErrorHandler, ERROR_SCENARIOS } from '../services/apiErrorHandler';

interface DeveloperUtilsProps {
  visible: boolean;
  onClose: () => void;
}

export const DeveloperUtils: React.FC<DeveloperUtilsProps> = ({
  visible,
  onClose,
}) => {
  const [currentConfig, setCurrentConfig] = useState(
    ApiErrorHandler.getCurrentConfig(),
  );

  const refreshConfig = () => {
    setCurrentConfig(ApiErrorHandler.getCurrentConfig());
  };

  const toggleErrorSimulation = () => {
    ApiErrorHandler.setEnabled(!currentConfig.enabled);
    refreshConfig();
  };

  const resetErrors = () => {
    ApiErrorHandler.resetErrorRates();
    ApiErrorHandler.setEnabled(false);
    refreshConfig();
    Alert.alert(
      'Reset Complete',
      'All error rates reset to 0% and simulation disabled',
    );
  };

  const applyScenario = (scenario: string, description: string) => {
    Alert.alert(
      'Apply Error Scenario',
      `Apply "${description}" scenario?\n\nThis will enable error simulation with predefined error rates.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Apply',
          onPress: () => {
            ApiErrorHandler.createErrorScenario(scenario);
            refreshConfig();
            Alert.alert(
              'Scenario Applied',
              `"${description}" scenario is now active.\n\nAPI calls will now simulate errors based on the configured rates.`,
            );
          },
        },
      ],
    );
  };

  const setCustomErrorRate = (errorCode: string, errorName: string) => {
    Alert.prompt(
      `Set ${errorName} Rate`,
      `Enter error rate percentage (0-100) for ${errorCode} errors:`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Set',
          onPress: (value: string | undefined) => {
            const rate = parseInt(value || '0');
            if (isNaN(rate) || rate < 0 || rate > 100) {
              Alert.alert(
                'Invalid Input',
                'Please enter a number between 0 and 100',
              );
              return;
            }
            ApiErrorHandler.setErrorRates({ [errorCode]: rate });
            ApiErrorHandler.setEnabled(true);
            refreshConfig();
          },
        },
      ],
      'plain-text',
      '0',
    );
  };

  const errorScenarios = [
    {
      key: ERROR_SCENARIOS.AUTH_FAILURE,
      name: 'Authentication Failures',
      description: '50% 401, 30% 403 errors',
    },
    {
      key: ERROR_SCENARIOS.SERVER_ISSUES,
      name: 'Server Problems',
      description: '40% 500, 20% 502, 15% 503 errors',
    },
    {
      key: ERROR_SCENARIOS.RATE_LIMITING,
      name: 'Rate Limiting',
      description: '60% 429 errors',
    },
    {
      key: ERROR_SCENARIOS.VALIDATION_ERRORS,
      name: 'Validation Issues',
      description: '35% 400, 25% 422 errors',
    },
    {
      key: ERROR_SCENARIOS.MIXED_ERRORS,
      name: 'Mixed Errors',
      description: 'Light mix of various error types',
    },
  ];

  const customErrors = [
    { code: '400', name: 'Bad Request' },
    { code: '401', name: 'Unauthorized' },
    { code: '403', name: 'Forbidden' },
    { code: '404', name: 'Not Found' },
    { code: '422', name: 'Validation Error' },
    { code: '429', name: 'Rate Limited' },
    { code: '500', name: 'Server Error' },
    { code: '502', name: 'Bad Gateway' },
    { code: '503', name: 'Service Unavailable' },
  ];

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>API Error Simulator</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>✕</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          {/* Status Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Current Status</Text>
            <View style={styles.statusRow}>
              <Text style={styles.statusLabel}>Error Simulation:</Text>
              <View
                style={[
                  styles.statusBadge,
                  {
                    backgroundColor: currentConfig.enabled
                      ? '#e74c3c'
                      : '#27ae60',
                  },
                ]}
              >
                <Text style={styles.statusBadgeText}>
                  {currentConfig.enabled ? 'ENABLED' : 'DISABLED'}
                </Text>
              </View>
            </View>
          </View>

          {/* Toggle Section */}
          <View style={styles.section}>
            <TouchableOpacity
              style={[styles.button, styles.toggleButton]}
              onPress={toggleErrorSimulation}
            >
              <Text style={styles.buttonText}>
                {currentConfig.enabled
                  ? 'Disable Error Simulation'
                  : 'Enable Error Simulation'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Predefined Scenarios */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Quick Scenarios</Text>
            {errorScenarios.map(scenario => (
              <TouchableOpacity
                key={scenario.key}
                style={styles.scenarioButton}
                onPress={() => applyScenario(scenario.key, scenario.name)}
              >
                <Text style={styles.scenarioName}>{scenario.name}</Text>
                <Text style={styles.scenarioDescription}>
                  {scenario.description}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Custom Error Rates */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Custom Error Rates</Text>
            <View style={styles.errorGrid}>
              {customErrors.map(error => {
                const currentRate =
                  currentConfig.errorRates[
                    error.code as keyof typeof currentConfig.errorRates
                  ] || 0;
                return (
                  <TouchableOpacity
                    key={error.code}
                    style={[
                      styles.errorButton,
                      currentRate > 0 && styles.errorButtonActive,
                    ]}
                    onPress={() => setCustomErrorRate(error.code, error.name)}
                  >
                    <Text style={styles.errorCode}>{error.code}</Text>
                    <Text style={styles.errorName}>{error.name}</Text>
                    <Text style={styles.errorRate}>{currentRate}%</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* Reset Section */}
          <View style={styles.section}>
            <TouchableOpacity
              style={[styles.button, styles.resetButton]}
              onPress={resetErrors}
            >
              <Text style={styles.buttonText}>Reset All Error Rates</Text>
            </TouchableOpacity>
          </View>

          {/* Instructions */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Instructions</Text>
            <Text style={styles.instructions}>
              • Enable error simulation to test error handling{'\n'}• Use quick
              scenarios for common error patterns{'\n'}• Set custom rates for
              specific error codes{'\n'}• Check console logs to see simulated
              errors{'\n'}• Reset to disable all error simulation
            </Text>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#2c3e50',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#2c3e50',
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  statusLabel: {
    fontSize: 14,
    color: '#7f8c8d',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusBadgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#3498db',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  toggleButton: {
    backgroundColor: '#e67e22',
  },
  resetButton: {
    backgroundColor: '#e74c3c',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  scenarioButton: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#ecf0f1',
  },
  scenarioName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 4,
  },
  scenarioDescription: {
    fontSize: 12,
    color: '#7f8c8d',
  },
  errorGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  errorButton: {
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ecf0f1',
    minWidth: '30%',
    alignItems: 'center',
  },
  errorButtonActive: {
    borderColor: '#e74c3c',
    backgroundColor: '#fdf2f2',
  },
  errorCode: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#e74c3c',
    marginBottom: 2,
  },
  errorName: {
    fontSize: 10,
    color: '#7f8c8d',
    textAlign: 'center',
    marginBottom: 2,
  },
  errorRate: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  instructions: {
    fontSize: 12,
    color: '#7f8c8d',
    lineHeight: 18,
  },
});
