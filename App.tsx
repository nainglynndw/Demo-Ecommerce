import React from 'react';
import {StatusBar} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import 'react-native-gesture-handler';
import {useThemeStore} from './src/stores/themeStore';
import {useUserStore} from './src/stores/userStore';
import {RootNavigator} from './src/navigation/RootNavigator';

function App() {
  const {theme, initializeTheme} = useThemeStore();
  const {initializeUserData} = useUserStore();
  
  React.useEffect(() => {
    initializeTheme();
    initializeUserData();
  }, [initializeTheme, initializeUserData]);
  
  return (
    <SafeAreaProvider>
      <StatusBar 
        barStyle={theme.mode === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={theme.colors.background}
      />
      <RootNavigator />
    </SafeAreaProvider>
  );
}

export default App;
