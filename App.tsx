import React from 'react';
import { StatusBar, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClientProvider } from '@tanstack/react-query';
import 'react-native-gesture-handler';
import { useThemeStore } from './src/stores/themeStore';
import { RootNavigator } from './src/navigation/RootNavigator';
import { queryClient } from './src/config/queryClient';
import { DeveloperUtils } from './src/components/DeveloperUtils';

function App() {
  const { theme } = useThemeStore();
  const [showDeveloperUtils, setShowDeveloperUtils] = React.useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <StatusBar
          barStyle={theme.mode === 'dark' ? 'light-content' : 'dark-content'}
          backgroundColor={theme.colors.background}
        />
        <RootNavigator />

        {/* Developer Utils - Floating Button (only in development) */}
        {__DEV__ && (
          <TouchableOpacity
            style={[styles.devButton, { backgroundColor: theme.colors.error }]}
            onPress={() => setShowDeveloperUtils(true)}
          >
            <Text style={styles.devButtonText}>🔧</Text>
          </TouchableOpacity>
        )}

        <DeveloperUtils
          visible={showDeveloperUtils}
          onClose={() => setShowDeveloperUtils(false)}
        />
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  devButton: {
    position: 'absolute',
    top: 100,
    right: 20,
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 9999,
  },
  devButtonText: {
    fontSize: 20,
  },
});

export default App;
