// Integration of cross-platform testing with app navigation
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Button, Platform, Text } from 'react-native';
import TestResultsScreen from '../screens/TestResults';
import { colors } from '../theme/colors';

const Stack = createStackNavigator();

// Test navigator component
export const TestNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.primary,
        },
        headerTintColor: colors.white,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen 
        name="TestResults" 
        component={TestResultsScreen} 
        options={{
          title: 'Cross-Platform Tests',
          headerRight: () => (
            <Button
              onPress={() => console.log('Export test results')}
              title="Export"
              color={Platform.OS === 'ios' ? colors.white : colors.secondary}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
};

export default TestNavigator;
