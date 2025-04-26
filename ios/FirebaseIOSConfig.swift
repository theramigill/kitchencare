// iOS Firebase Configuration for KitchenCare+ App

import Foundation
import Firebase
import FirebaseAuth
import FirebaseFirestore
import FirebaseStorage
import FirebaseMessaging

class FirebaseIOSConfig {
    static let shared = FirebaseIOSConfig()
    
    func configure() {
        // Initialize Firebase
        FirebaseApp.configure()
        
        // Configure Firebase Messaging
        Messaging.messaging().delegate = self
        
        // Register for remote notifications
        registerForPushNotifications()
        
        // Configure Firebase Auth
        Auth.auth().languageCode = Locale.current.languageCode
        
        print("Firebase iOS configuration completed successfully")
    }
    
    // Register for push notifications
    private func registerForPushNotifications() {
        UNUserNotificationCenter.current().delegate = self
        
        let authOptions: UNAuthorizationOptions = [.alert, .badge, .sound]
        UNUserNotificationCenter.current().requestAuthorization(
            options: authOptions,
            completionHandler: { _, _ in }
        )
        
        UIApplication.shared.registerForRemoteNotifications()
    }
    
    // Handle FCM token refresh
    func updateFCMToken(token: String) {
        guard let userId = Auth.auth().currentUser?.uid else { return }
        
        let db = Firestore.firestore()
        db.collection("users").document(userId).updateData([
            "fcmToken": token,
            "platform": "ios",
            "lastTokenUpdate": FieldValue.serverTimestamp()
        ]) { error in
            if let error = error {
                print("Error updating FCM token: \(error.localizedDescription)")
            } else {
                print("FCM token updated successfully")
            }
        }
    }
    
    // Configure APNs with FCM
    func application(_ application: UIApplication, didRegisterForRemoteNotificationsWithDeviceToken deviceToken: Data) {
        Messaging.messaging().apnsToken = deviceToken
    }
}

// MARK: - UNUserNotificationCenterDelegate
extension FirebaseIOSConfig: UNUserNotificationCenterDelegate {
    func userNotificationCenter(_ center: UNUserNotificationCenter,
                               willPresent notification: UNNotification,
                               withCompletionHandler completionHandler: @escaping (UNNotificationPresentationOptions) -> Void) {
        completionHandler([.alert, .badge, .sound])
    }
    
    func userNotificationCenter(_ center: UNUserNotificationCenter,
                               didReceive response: UNNotificationResponse,
                               withCompletionHandler completionHandler: @escaping () -> Void) {
        completionHandler()
    }
}

// MARK: - MessagingDelegate
extension FirebaseIOSConfig: MessagingDelegate {
    func messaging(_ messaging: Messaging, didReceiveRegistrationToken fcmToken: String?) {
        if let token = fcmToken {
            updateFCMToken(token: token)
        }
    }
}
