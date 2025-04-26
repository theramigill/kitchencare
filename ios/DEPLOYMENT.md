# iOS Deployment Guide for KitchenCare+ App

This guide provides instructions for deploying the KitchenCare+ app to the Apple App Store.

## Prerequisites

1. **Apple Developer Account**
   - You need an Apple Developer account ($99/year)
   - Register at [developer.apple.com](https://developer.apple.com)

2. **Xcode**
   - Install the latest version of Xcode from the Mac App Store
   - Xcode 14.0 or higher is recommended

3. **Certificates and Provisioning Profiles**
   - Apple Developer Certificate
   - App Store Distribution Provisioning Profile

## Setup Steps

### 1. Register App ID

1. Log in to your Apple Developer account
2. Go to Certificates, Identifiers & Profiles
3. Register a new App ID with the bundle identifier: `com.amazespace.kitchencareplus`
4. Enable the following capabilities:
   - Push Notifications
   - Associated Domains (if using deep links)

### 2. Create Certificates

1. Create an Apple Distribution Certificate
2. Create an Apple Push Notification service (APNs) certificate
3. Download and install both certificates to your keychain

### 3. Create Provisioning Profile

1. Create an App Store Distribution provisioning profile
2. Select the App ID you created earlier
3. Select the Distribution Certificate
4. Download and install the provisioning profile

## Building the App

### 1. Configure Xcode Project

1. Open the iOS project in Xcode:
   ```
   cd KitchenCarePlus/kitchencare-app
   npx pod-install
   npx react-native run-ios
   ```

2. In Xcode, select the project in the Project Navigator
3. Update the Bundle Identifier to match your registered App ID
4. Set the Version and Build numbers
5. Select your Team in the Signing & Capabilities tab
6. Ensure the correct provisioning profile is selected

### 2. Configure Firebase for Production

1. Update the GoogleService-Info.plist with your production Firebase configuration
2. Ensure APNs authentication key is uploaded to Firebase Console

### 3. Build Archive for App Store

1. In Xcode, select the device as "Generic iOS Device"
2. Select Product > Archive from the menu
3. Wait for the archiving process to complete
4. When the Archives window appears, click "Distribute App"
5. Select "App Store Connect" and follow the prompts
6. Upload the build to App Store Connect

## App Store Submission

### 1. Prepare App Store Listing

1. Log in to App Store Connect
2. Create a new app or select your existing app
3. Fill in all required metadata:
   - App name: KitchenCare+
   - Subtitle: Premium Kitchen Warranty & Service
   - Description: [Your detailed app description]
   - Keywords: kitchen, warranty, service, repair, maintenance
   - Support URL: [Your support website]
   - Marketing URL (optional): [Your marketing website]

### 2. Upload Screenshots

1. Prepare screenshots for all required device sizes:
   - iPhone 6.5" Display (iPhone 11 Pro Max, iPhone XS Max)
   - iPhone 5.5" Display (iPhone 8 Plus, iPhone 7 Plus)
   - iPad Pro 12.9" Display
   - iPad Pro 11" Display

2. Upload screenshots for each device size

### 3. Submit for Review

1. Select the build you uploaded earlier
2. Complete the "App Review Information" section
3. Set pricing and availability
4. Answer the Content Rights questions
5. Submit for review

## Post-Submission

1. Monitor the status of your app in App Store Connect
2. Respond promptly to any issues raised by the App Review team
3. Once approved, your app will be available on the App Store

## Updating the App

For future updates:
1. Increment the version number in the Xcode project
2. Make your changes to the app
3. Follow the same build and submission process
4. Submit the new version for review

## Troubleshooting

### Common Issues

1. **Signing Issues**
   - Ensure your certificates and provisioning profiles are valid
   - Check that your Apple Developer account is active

2. **Push Notification Issues**
   - Verify APNs certificate is correctly configured in Firebase
   - Test push notifications in development environment first

3. **App Rejection**
   - Review Apple's App Store Review Guidelines
   - Address all issues mentioned in the rejection notice
   - Resubmit with detailed notes explaining the changes

For additional help, refer to Apple's developer documentation or contact Apple Developer Support.
