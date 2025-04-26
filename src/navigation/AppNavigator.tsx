import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

// Import screens
import OnboardingScreen from '../screens/Onboarding';
import LoginScreen from '../screens/auth/Login';
import RegisterScreen from '../screens/auth/Register';
import HomeScreen from '../screens/Home';
import WarrantyPlanScreen from '../screens/WarrantyPlan';
import ServiceRequestScreen from '../screens/ServiceRequest';
import DigitalContractScreen from '../screens/DigitalContract';
import ProfileScreen from '../screens/Profile';
import MyPlansScreen from '../screens/MyPlans';
import SupportScreen from '../screens/Support';

import { colors } from '../theme/colors';

// Define the stack navigator param lists
type AuthStackParamList = {
  Onboarding: undefined;
  Login: undefined;
  Register: undefined;
};

type MainStackParamList = {
  MainTabs: undefined;
  WarrantyPlan: undefined;
  ServiceRequest: undefined;
  DigitalContract: { planType: string };
};

type TabParamList = {
  Home: undefined;
  MyPlans: undefined;
  Support: undefined;
  Profile: undefined;
};

// Create the navigators
const AuthStack = createStackNavigator<AuthStackParamList>();
const MainStack = createStackNavigator<MainStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

// Auth navigator
const AuthNavigator = () => {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <AuthStack.Screen name="Onboarding" component={OnboardingScreen} />
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="Register" component={RegisterScreen} />
    </AuthStack.Navigator>
  );
};

// Tab navigator
const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: string;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'MyPlans') {
            iconName = focused ? 'shield' : 'shield-outline';
          } else if (route.name === 'Support') {
            iconName = focused ? 'chatbubble' : 'chatbubble-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          } else {
            iconName = 'help-circle';
          }

          return <Ionicons name={iconName as any} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textLight,
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen 
        name="MyPlans" 
        component={MyPlansScreen} 
        options={{ title: 'My Plans' }}
      />
      <Tab.Screen name="Support" component={SupportScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

// Main navigator
const MainNavigator = () => {
  return (
    <MainStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <MainStack.Screen name="MainTabs" component={TabNavigator} />
      <MainStack.Screen name="WarrantyPlan" component={WarrantyPlanScreen} />
      <MainStack.Screen name="ServiceRequest" component={ServiceRequestScreen} />
      <MainStack.Screen name="DigitalContract" component={DigitalContractScreen} />
    </MainStack.Navigator>
  );
};

// Root navigator
const AppNavigator = () => {
  // This would normally check for authentication state
  const isAuthenticated = false;

  return (
    <NavigationContainer>
      {isAuthenticated ? <MainNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default AppNavigator;
