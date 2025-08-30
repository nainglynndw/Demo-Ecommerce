import React from 'react';
import {StatusBar} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {QueryClientProvider} from '@tanstack/react-query';
import 'react-native-gesture-handler';
import {useThemeStore} from './src/stores/themeStore';
import {useUserStore} from './src/stores/userStore';
import {RootNavigator} from './src/navigation/RootNavigator';
import {queryClient} from './src/config/queryClient';

function App() {
  const {theme, initializeTheme} = useThemeStore();
  const {initializeUserData} = useUserStore();
  
  React.useEffect(() => {
    initializeTheme();
    initializeUserData();
  }, [initializeTheme, initializeUserData]);
  
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <StatusBar 
          barStyle={theme.mode === 'dark' ? 'light-content' : 'dark-content'}
          backgroundColor={theme.colors.background}
        />
        <RootNavigator />
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}

export default App;
