import React, { useEffect, useState } from 'react';
import { Platform, View, Text, StyleSheet, Alert } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import { usePushNotifications } from './pushNotifications';
import { useFirebase } from './firebase-context';
import { colors, typography, spacing } from '../theme/colors';

// Component to handle iOS notification permissions and display status
export const NotificationPermissionManager = ({ onPermissionGranted }) => {
  const [permissionStatus, setPermissionStatus] = useState('checking');
  const { currentUser, updateUserProfile } = useFirebase();

  // Handle FCM token updates
  const handleTokenReceived = async (token) => {
    if (currentUser && token) {
      try {
        // Update user profile with the new FCM token
        await updateUserProfile({
          fcmToken: token,
          platform: Platform.OS,
          deviceModel: Platform.OS === 'ios' ? 'iOS Device' : 'Android Device',
          lastTokenUpdate: new Date().toISOString(),
        });
        console.log('FCM token updated in user profile');
      } catch (error) {
        console.error('Error updating FCM token in profile:', error);
      }
    }
  };

  // Use the push notification hook
  usePushNotifications(handleTokenReceived);

  // Check notification permission status on component mount
  useEffect(() => {
    const checkPermissions = async () => {
      if (Platform.OS === 'ios') {
        const authStatus = await messaging().hasPermission();
        const enabled =
          authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
          authStatus === messaging.AuthorizationStatus.PROVISIONAL;

        setPermissionStatus(enabled ? 'granted' : 'denied');
        
        if (enabled && onPermissionGranted) {
          onPermissionGranted();
        } else if (!enabled) {
          // Request permission if not granted
          try {
            const requestStatus = await messaging().requestPermission();
            const newEnabled =
              requestStatus === messaging.AuthorizationStatus.AUTHORIZED ||
              requestStatus === messaging.AuthorizationStatus.PROVISIONAL;
            
            setPermissionStatus(newEnabled ? 'granted' : 'denied');
            
            if (newEnabled && onPermissionGranted) {
              onPermissionGranted();
            }
          } catch (error) {
            console.log('Permission request error:', error);
            setPermissionStatus('denied');
          }
        }
      } else {
        // For Android, we assume permissions are granted through the main hook
        setPermissionStatus('granted');
        if (onPermissionGranted) {
          onPermissionGranted();
        }
      }
    };

    checkPermissions();
  }, [onPermissionGranted]);

  // Only show permission UI for iOS
  if (Platform.OS !== 'ios' || permissionStatus === 'granted' || permissionStatus === 'checking') {
    return null;
  }

  // Show permission denied message for iOS
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notifications Disabled</Text>
      <Text style={styles.message}>
        Push notifications are disabled. You may miss important updates about your service requests and warranty plan.
      </Text>
      <Text style={styles.instruction}>
        To enable notifications, go to your device Settings → Notifications → KitchenCare+ and turn on Allow Notifications.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: spacing.lg,
    backgroundColor: colors.background,
    borderRadius: 8,
    marginHorizontal: spacing.md,
    marginVertical: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  title: {
    fontSize: typography.fontSize.lg,
    fontWeight: 'bold',
    color: colors.error,
    marginBottom: spacing.sm,
  },
  message: {
    fontSize: typography.fontSize.md,
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  instruction: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
  },
});

export default {
  NotificationPermissionManager,
};
