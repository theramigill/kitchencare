import React from 'react';
import { Platform, UIManager, LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as PaperProvider } from 'react-native-paper';
import { FirebaseProvider } from './src/services/firebase-context';
import AppNavigator from './src/navigation/AppNavigator';
import { colors } from './src/theme/colors';

// Enable layout animations on Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

// Ignore specific warnings
LogBox.ignoreLogs([
  'Setting a timer',
  'AsyncStorage has been extracted',
]);

// Define theme for react-native-paper
const theme = {
  colors: {
    primary: colors.primary,
    accent: colors.secondary,
    background: colors.background,
    surface: colors.background,
    text: colors.textPrimary,
  },
};

// Platform-specific adjustments
const platformAdjustments = () => {
  if (Platform.OS === 'ios') {
    // iOS-specific adjustments
    return {
      // Use iOS-specific shadow style
      shadowStyle: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      // Use iOS-specific font
      fontFamily: 'System',
    };
  } else {
    // Android-specific adjustments
    return {
      // Use Android-specific elevation
      shadowStyle: {
        elevation: 4,
      },
      // Use Android-specific font
      fontFamily: 'Roboto',
    };
  }
};

export default function App() {
  const platformStyles = platformAdjustments();
  
  return (
    <SafeAreaProvider>
      <PaperProvider theme={theme}>
        <FirebaseProvider>
          <NavigationContainer>
            <AppNavigator platformStyles={platformStyles} />
          </NavigationContainer>
        </FirebaseProvider>
      </PaperProvider>
    </SafeAreaProvider>
  );
}
