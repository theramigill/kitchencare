import React, { useEffect } from 'react';
import { Platform, PermissionsAndroid, Alert } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import PushNotificationIOS from '@react-native-community/push-notification-ios';

// iOS-specific push notification setup
const setupIOSPushNotifications = async () => {
  // Request permission for iOS
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('iOS Push Notification Authorization Status:', authStatus);
    
    // Get the FCM token
    const token = await messaging().getToken();
    console.log('iOS FCM Token:', token);
    
    // Configure notification appearance for iOS
    PushNotificationIOS.setNotificationCategories([
      {
        id: 'serviceRequest',
        actions: [
          { id: 'view', title: 'View', options: { foreground: true } },
          { id: 'dismiss', title: 'Dismiss', options: { destructive: true } },
        ],
      },
      {
        id: 'renewal',
        actions: [
          { id: 'renew', title: 'Renew Now', options: { foreground: true } },
          { id: 'remind', title: 'Remind Later', options: { foreground: true } },
        ],
      },
    ]);
    
    return token;
  } else {
    console.log('iOS Push Notification permission denied');
    return null;
  }
};

// Android-specific push notification setup
const setupAndroidPushNotifications = async () => {
  // Request permission for Android (API level >= 33)
  if (Platform.Version >= 33) {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
    );
    if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
      console.log('Android Push Notification permission denied');
      return null;
    }
  }
  
  // Get the FCM token
  const token = await messaging().getToken();
  console.log('Android FCM Token:', token);
  
  return token;
};

// Cross-platform push notification hook
export const usePushNotifications = (onTokenReceived) => {
  useEffect(() => {
    const setupPushNotifications = async () => {
      try {
        let token = null;
        
        if (Platform.OS === 'ios') {
          token = await setupIOSPushNotifications();
        } else {
          token = await setupAndroidPushNotifications();
        }
        
        if (token && onTokenReceived) {
          onTokenReceived(token);
        }
        
        // Handle foreground messages
        const unsubscribeForeground = messaging().onMessage(async remoteMessage => {
          console.log('Foreground Push Notification:', remoteMessage);
          
          if (Platform.OS === 'ios') {
            // For iOS, we need to present the notification manually in foreground
            PushNotificationIOS.addNotificationRequest({
              id: remoteMessage.messageId,
              title: remoteMessage.notification.title,
              body: remoteMessage.notification.body,
              category: remoteMessage.data?.category || 'default',
              userInfo: remoteMessage.data,
            });
          }
        });
        
        // Handle background/quit state messages
        messaging().setBackgroundMessageHandler(async remoteMessage => {
          console.log('Background Push Notification:', remoteMessage);
          return Promise.resolve();
        });
        
        // Handle notification open events
        messaging().onNotificationOpenedApp(remoteMessage => {
          console.log('Push Notification opened app from background state:', remoteMessage);
          // Navigation logic can be added here
        });
        
        // Check if app was opened from a notification when in quit state
        messaging()
          .getInitialNotification()
          .then(remoteMessage => {
            if (remoteMessage) {
              console.log('Push Notification opened app from quit state:', remoteMessage);
              // Navigation logic can be added here
            }
          });
        
        return () => {
          unsubscribeForeground();
        };
      } catch (error) {
        console.error('Error setting up push notifications:', error);
        Alert.alert(
          'Notification Error',
          'There was a problem setting up push notifications. You may miss important updates.'
        );
      }
    };
    
    setupPushNotifications();
  }, [onTokenReceived]);
};

export default {
  usePushNotifications,
};
