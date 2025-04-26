# KitchenCare+ App Setup and Deployment Guide

## Local Development Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- Firebase account
- Xcode (for iOS development)
- Android Studio (for Android development)
- CocoaPods (for iOS dependencies)

### Installation Steps

1. Clone the repository:
```bash
git clone https://github.com/your-organization/kitchencare-plus.git
cd kitchencare-plus
```

2. Install dependencies:
```bash
cd kitchencare-app
npm install
```

3. Firebase Configuration:
   - Create a new Firebase project at [https://console.firebase.google.com/](https://console.firebase.google.com/)
   - Enable the following services:
     - Authentication (Email/Password)
     - Firestore Database
     - Storage
     - Cloud Messaging
   - Create a web app in your Firebase project
   - Copy the Firebase configuration object
   - Update the configuration in `src/services/firebase.ts`
   - For iOS, download the GoogleService-Info.plist and add it to the iOS folder

4. iOS-specific setup:
   - Navigate to the iOS folder and install CocoaPods dependencies:
   ```bash
   cd ios
   pod install
   ```
   - Open the Xcode workspace:
   ```bash
   open KitchenCarePlus.xcworkspace
   ```
   - Configure your Apple Developer account in Xcode
   - Update the bundle identifier if needed
   - Configure APNs in Apple Developer Portal for push notifications

5. Start the development server:
```bash
npm start
```

6. Run on a device or emulator:
   - Scan the QR code with the Expo Go app on your device
   - Press 'a' to run on an Android emulator
   - Press 'i' to run on an iOS simulator

## Database Setup

1. Create the following collections in Firestore:
   - users
   - warrantyPlans
   - userPlans
   - kitchenDetails
   - serviceRequests
   - digitalContracts
   - serviceTechnicians
   - userTokens
   - notifications
   - maintenanceTips
   - products
   - cartItems
   - orders

2. Add initial warranty plans:

```javascript
// Add this data to the warrantyPlans collection
[
  {
    "name": "1-Year Basic",
    "description": "Basic Protection",
    "durationMonths": 12,
    "price": 4999,
    "features": [
      "Essential parts coverage",
      "2 service visits",
      "Phone support"
    ],
    "serviceVisits": 2,
    "isPopular": false
  },
  {
    "name": "3-Year Standard",
    "description": "Standard Protection",
    "durationMonths": 36,
    "price": 12999,
    "features": [
      "Full parts coverage",
      "6 service visits",
      "Priority support",
      "Annual maintenance"
    ],
    "serviceVisits": 6,
    "isPopular": true
  },
  {
    "name": "5-Year Premium",
    "description": "Premium Protection",
    "durationMonths": 60,
    "price": 19999,
    "features": [
      "Complete coverage",
      "Unlimited service visits",
      "24/7 priority support",
      "Bi-annual maintenance",
      "Free upgrades"
    ],
    "serviceVisits": 999,
    "isPopular": false
  },
  {
    "name": "10-Year Ultimate",
    "description": "Ultimate Protection",
    "durationMonths": 120,
    "price": 34999,
    "features": [
      "Lifetime parts warranty",
      "Unlimited service visits",
      "VIP support",
      "Quarterly maintenance",
      "Free upgrades & renovations",
      "Transferable warranty"
    ],
    "serviceVisits": 999,
    "isPopular": false
  }
]
```

3. Add sample products for e-commerce:

```javascript
// Add this data to the products collection
[
  {
    "name": "Premium Auto-Clean Chimney",
    "category": "chimney",
    "price": 24999,
    "discountPrice": 19999,
    "rating": 4.7,
    "reviewCount": 128,
    "images": [
      "https://example.com/images/chimney1.jpg",
      "https://example.com/images/chimney1_side.jpg",
      "https://example.com/images/chimney1_front.jpg"
    ],
    "description": "Premium auto-clean chimney with touch control and motion sensor. Powerful suction with low noise operation.",
    "features": [
      "Auto-clean technology",
      "Touch & motion sensor control",
      "1200 m³/hr suction power",
      "Filterless operation",
      "LED lights",
      "Low noise (58dB)"
    ],
    "inStock": true,
    "brand": "Amaze Space",
    "specifications": {
      "Size": "90 cm",
      "Color": "Black",
      "Material": "Stainless Steel",
      "Motor": "BLDC Motor",
      "Warranty": "5 Years",
      "PowerConsumption": "180W"
    },
    "createdAt": "2025-01-15T10:30:00.000Z",
    "updatedAt": "2025-01-15T10:30:00.000Z"
  },
  {
    "name": "4 Burner Built-in Gas Hob",
    "category": "hob",
    "price": 18999,
    "discountPrice": 15999,
    "rating": 4.5,
    "reviewCount": 86,
    "images": [
      "https://example.com/images/hob1.jpg",
      "https://example.com/images/hob1_top.jpg",
      "https://example.com/images/hob1_installed.jpg"
    ],
    "description": "Premium 4 burner built-in gas hob with auto-ignition and flame failure safety device.",
    "features": [
      "Auto-ignition",
      "Flame failure safety device",
      "Cast iron pan supports",
      "Brass burners",
      "Tempered glass top",
      "Easy installation"
    ],
    "inStock": true,
    "brand": "Amaze Space",
    "specifications": {
      "Size": "60 cm x 51 cm",
      "Color": "Black",
      "Material": "Tempered Glass",
      "Burners": "4 (1 Triple, 1 Rapid, 2 Semi-Rapid)",
      "Warranty": "2 Years",
      "PowerType": "LPG (Convertible to PNG)"
    },
    "createdAt": "2025-01-20T14:45:00.000Z",
    "updatedAt": "2025-01-20T14:45:00.000Z"
  }
]
```

## Production Deployment

### Android Deployment

1. Configure app.json:
```json
{
  "expo": {
    "name": "KitchenCare+",
    "slug": "kitchencare-plus",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "updates": {
      "fallbackToCacheTimeout": 0
    },
    "assetBundlePatterns": [
      "**/*"
    ],
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "com.amazespace.kitchencareplus",
      "infoPlist": {
        "NSCameraUsageDescription": "KitchenCare+ needs access to your camera to take photos of your kitchen and service issues",
        "NSPhotoLibraryUsageDescription": "KitchenCare+ needs access to your photo library to upload photos of your kitchen and service issues",
        "NSLocationWhenInUseUsageDescription": "KitchenCare+ needs access to your location to provide better service in your area",
        "UIBackgroundModes": ["remote-notification"]
      }
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#FFFFFF"
      },
      "package": "com.amazespace.kitchencareplus",
      "permissions": [
        "CAMERA",
        "READ_EXTERNAL_STORAGE",
        "WRITE_EXTERNAL_STORAGE",
        "ACCESS_FINE_LOCATION"
      ],
      "googleServicesFile": "./google-services.json"
    },
    "web": {
      "favicon": "./assets/favicon.png"
    }
  }
}
```

2. Build the Android app:
```bash
expo build:android -t apk  # For APK file
# OR
expo build:android -t app-bundle  # For Google Play Store
```

3. Submit to Google Play Store:
   - Create a Google Play Developer account
   - Create a new application
   - Upload the AAB file generated by Expo
   - Fill in the store listing details
   - Submit for review

### iOS Deployment

1. Configure Apple Developer Account:
   - Register for an Apple Developer account if you don't have one
   - Create an App ID in the Apple Developer Portal
   - Configure push notification capabilities
   - Create provisioning profiles for development and distribution

2. Configure Apple Pay (if using):
   - Register a merchant ID in the Apple Developer Portal
   - Create a payment processing certificate
   - Configure the merchant ID in your app

3. Build the iOS app:
```bash
expo build:ios -t archive  # For App Store
# OR
expo build:ios -t simulator  # For testing on simulator
```

4. Submit to App Store:
   - Create a new app in App Store Connect
   - Upload the IPA file using Transporter or Xcode
   - Fill in the store listing details
   - Configure in-app purchases (if applicable)
   - Submit for review

5. For detailed iOS deployment instructions, refer to the iOS-specific deployment guide in `ios/DEPLOYMENT.md`.

## E-commerce Setup

1. Configure Products:
   - Add products to the `products` collection in Firestore
   - Upload product images to Firebase Storage
   - Update product URLs in the Firestore documents

2. Configure Payment Processing:
   - For Android: Integrate with payment gateways like Razorpay, Paytm, or Google Pay
   - For iOS: Configure Apple Pay as described in the iOS deployment section

3. Order Management:
   - Set up Firebase Cloud Functions for order processing (optional)
   - Configure email notifications for new orders
   - Set up admin dashboard for order management (optional)

## Maintenance and Updates

### Updating the App

1. Make changes to the codebase
2. Update the version in app.json
3. Build new versions for Android and iOS
4. Submit updates to the respective app stores

### Backend Maintenance

1. Monitor Firebase usage and quotas
2. Set up Firebase backups for Firestore data
3. Implement Firebase Security Rules to secure your data
4. Monitor app performance using Firebase Performance Monitoring

### E-commerce Maintenance

1. Regularly update product inventory and pricing
2. Monitor order processing and fulfillment
3. Update product images and descriptions as needed
4. Monitor payment processing success rates

## Cross-Platform Testing

1. Run the built-in testing utilities:
```bash
# In your app code
import { runAllTests } from './src/services/runTests';
runAllTests().then(results => console.log(results));
```

2. Test on multiple devices:
   - Test on various Android device sizes and OS versions
   - Test on different iOS devices (iPhone and iPad) and iOS versions
   - Pay special attention to platform-specific features:
     - Push notifications
     - Camera and photo library access
     - Payment processing
     - UI rendering

3. Use the TestResults screen in the app to view detailed test results.

## Troubleshooting

### Common Issues

1. **Firebase Connection Issues**
   - Check internet connectivity
   - Verify Firebase configuration
   - Ensure Firebase services are enabled

2. **Build Errors**
   - Clear npm cache: `npm cache clean --force`
   - Delete node_modules and reinstall: `rm -rf node_modules && npm install`
   - Update Expo CLI: `npm install -g expo-cli`

3. **Authentication Problems**
   - Verify Firebase Authentication is properly configured
   - Check if the user exists in Firebase Authentication console
   - Ensure email verification settings match your requirements

4. **Image Upload Issues**
   - Check Firebase Storage rules
   - Verify file size limits
   - Ensure proper permissions are set

5. **iOS-Specific Issues**
   - Verify APNs configuration for push notifications
   - Check Apple Developer account permissions
   - Ensure proper provisioning profiles are installed
   - Verify Apple Pay merchant configuration

6. **E-commerce Issues**
   - Check product data in Firestore
   - Verify payment gateway integration
   - Test checkout process on both platforms
   - Verify order creation in the database

## Support

For any issues or questions, please contact:
- Technical Support: tech@amazespace.com
- Customer Service: support@amazespace.com
