# KitchenCare+ App Documentation

## Overview
KitchenCare+ is a premium mobile application for Amaze Space's interior and modular kitchen company. The app offers kitchen warranty, service, and insurance plans to clients across India, providing a seamless experience for managing kitchen care services and purchasing kitchen appliances.

## Features
- User registration and profile management
- Kitchen warranty plans with various durations (1, 3, 5, and 10 years)
- Digital service agreements between company and client
- Service request submission and tracking
- Kitchen details management
- Plan renewal and upgrade options
- Push notifications for service updates
- E-commerce functionality for kitchen appliances (chimneys, hobs, microwaves/ovens, cooktops)
- Shopping cart and checkout process
- Cross-platform compatibility (Android and iOS)
- iOS-specific optimizations and Apple Pay integration

## Technical Architecture

### Frontend
- **Framework**: React Native with Expo
- **Language**: TypeScript
- **UI Components**: React Native Paper, React Native Vector Icons
- **Navigation**: React Navigation (Stack and Tab navigators)
- **State Management**: React Context API
- **Platform-Specific**: iOS and Android optimized components

### Backend
- **Platform**: Firebase
- **Authentication**: Firebase Authentication
- **Database**: Firestore
- **Storage**: Firebase Storage
- **Notifications**: Firebase Cloud Messaging (FCM) and Apple Push Notification service (APNs)
- **E-commerce**: Firestore for product catalog and order management

## Project Structure
```
KitchenCarePlus/
├── assets/                  # Images and static assets
├── src/
│   ├── components/          # Reusable UI components
│   ├── navigation/          # Navigation configuration
│   │   └── TestNavigator.tsx # Test navigation integration
│   ├── screens/             # Screen components
│   │   ├── auth/            # Authentication screens
│   │   ├── mockups/         # UI mockups
│   │   ├── Home.tsx         # Home screen
│   │   ├── MyPlans.tsx      # User plans screen
│   │   ├── ServiceRequest.tsx # Service request screen
│   │   ├── DigitalContract.tsx # Contract screen
│   │   ├── ProductCatalog.tsx # E-commerce product catalog
│   │   ├── ShoppingCart.tsx # Shopping cart screen
│   │   ├── WarrantyPlans.tsx # Warranty plans screen
│   │   ├── WarrantyPlanDetails.tsx # Plan details screen
│   │   ├── KitchenRegistration.tsx # Kitchen registration
│   │   ├── ServiceRequestConfirmation.tsx # Confirmation screen
│   │   └── TestResults.tsx  # Cross-platform test results
│   ├── services/            # Backend services
│   │   ├── firebase.ts      # Firebase service implementation
│   │   ├── firebase-context.tsx # Firebase context provider
│   │   ├── contract-template.ts # Digital contract generator
│   │   ├── database-schema.ts   # Firestore database schema
│   │   ├── pushNotifications.ts # Cross-platform notifications
│   │   ├── iosNotifications.tsx # iOS-specific notifications
│   │   ├── iosEcommerce.ts  # iOS-specific e-commerce features
│   │   ├── iosEcommerceIntegration.tsx # iOS e-commerce integration
│   │   ├── iosTesting.ts    # iOS testing utilities
│   │   ├── crossPlatformTesting.ts # Cross-platform testing
│   │   └── runTests.ts      # Test runner utility
│   └── theme/               # UI theme and styling
│       ├── colors.ts        # Color definitions
│       └── platformStyles.ts # Platform-specific styling
├── ios/                     # iOS-specific configuration
│   ├── Podfile              # iOS dependencies
│   ├── Info.plist           # iOS app configuration
│   ├── AppDelegate.m        # iOS app delegate
│   ├── FirebaseIOSConfig.swift # iOS Firebase configuration
│   ├── GoogleService-Info.plist # Firebase iOS config
│   ├── Assets.xcassets/     # iOS assets
│   └── DEPLOYMENT.md        # iOS deployment guide
└── App.tsx                  # Main application component
```

## Key Components

### Authentication Flow
The app provides a complete authentication flow including:
- User registration
- Login
- Password reset
- Profile management

### Warranty Plans
Four warranty plan options are available:
1. **1-Year Basic Protection** (₹4,999)
   - Essential parts coverage
   - 2 service visits
   - Phone support

2. **3-Year Standard Protection** (₹12,999)
   - Full parts coverage
   - 6 service visits
   - Priority support
   - Annual maintenance

3. **5-Year Premium Protection** (₹19,999)
   - Complete coverage
   - Unlimited service visits
   - 24/7 priority support
   - Bi-annual maintenance
   - Free upgrades

4. **10-Year Ultimate Protection** (₹34,999)
   - Lifetime parts warranty
   - Unlimited service visits
   - VIP support
   - Quarterly maintenance
   - Free upgrades & renovations
   - Transferable warranty

### Digital Contract
The app generates a comprehensive digital service agreement between Amaze Space and the client. Key features:
- Clear statement that this is a service-based coverage, not government insurance
- Detailed coverage information
- Terms and conditions
- Digital signatures
- PDF generation for saving and sharing

### Service Request System
Users can submit service requests with:
- Service type selection (plumbing, cabinet, appliance, chimney, electrical)
- Issue description
- Photo uploads
- Preferred date and time selection
- Contact information

### My Plans Screen
Users can view and manage their active plans:
- Plan details and validity
- Progress tracking
- Service usage statistics
- Kitchen details
- Renewal options

### E-commerce Functionality
The app includes a complete e-commerce system for kitchen appliances:

#### Product Catalog
- Four main categories: Chimneys, Built-in Hobs, Microwaves/Ovens, and Cooktops
- Product listings with images, descriptions, and pricing
- Filtering and sorting options
- Product details view with specifications and features

#### Shopping Cart
- Add/remove products
- Adjust quantities
- View subtotal and total
- Apply discounts
- Proceed to checkout

#### Checkout Process
- Shipping address input
- Payment method selection
- Order summary
- Order confirmation
- Receipt generation

### Cross-Platform Compatibility
The app is designed to work seamlessly on both Android and iOS platforms:

#### Platform-Specific Styling
- iOS-specific UI elements following Apple's design guidelines
- Android-specific styling following Material Design
- Responsive layouts for different screen sizes

#### iOS-Specific Features
- **Image Optimization**: Optimized product images for iOS devices
- **Apple Pay Integration**: Seamless payment processing on iOS
- **iOS Notifications**: Integration with Apple Push Notification service (APNs)
- **iOS-Specific Validation**: Cart validation for iOS transaction limits
- **iOS Receipt Generation**: Receipts compatible with Apple Wallet

## Firebase Integration
The app uses Firebase for all backend functionality:
- **Authentication**: User registration and login
- **Firestore**: Structured database for all app data including:
  - User profiles
  - Warranty plans
  - Service requests
  - Digital contracts
  - Products
  - Shopping cart items
  - Orders
- **Storage**: Image storage for kitchen photos, service request images, and product images
- **Cloud Messaging**: Push notifications for service updates and order status

## Cross-Platform Testing
The app includes comprehensive testing utilities to ensure cross-platform compatibility:

### Test Suites
- **E-commerce Tests**: Product catalog, shopping cart, checkout process
- **Service Request Tests**: Request form, service history
- **UI Rendering Tests**: Responsive layout, platform-specific styling
- **iOS-Specific Tests**: Image optimization, Apple Pay integration

### Test Runner
- Automated test execution
- Detailed test reports
- Visual test results screen

## Installation and Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Expo CLI
- Xcode (for iOS development)
- Android Studio (for Android development)

### Installation Steps
1. Clone the repository
2. Install dependencies:
   ```
   cd KitchenCarePlus/kitchencare-app
   npm install
   ```
3. Configure Firebase:
   - Create a Firebase project
   - Enable Authentication, Firestore, Storage, and Cloud Messaging
   - Update the Firebase configuration in `src/services/firebase.ts`
   - For iOS, add the GoogleService-Info.plist to the iOS folder

4. iOS-specific setup:
   - Install CocoaPods:
     ```
     cd ios
     pod install
     ```
   - Configure APNs in Apple Developer Portal
   - Update the iOS bundle identifier in Xcode

5. Start the development server:
   ```
   npm start
   ```

## Deployment

### Android
```
expo build:android
```

### iOS
See the detailed iOS deployment guide in `ios/DEPLOYMENT.md` for step-by-step instructions on:
- Configuring certificates and provisioning profiles
- Building and signing the app
- Submitting to the App Store

## E-commerce Database Schema

### Products Collection
```
products/
├── id: string
├── name: string
├── category: string (chimney, hob, microwave, cooktop)
├── price: number
├── discountPrice: number
├── rating: number
├── reviewCount: number
├── images: array of strings (URLs)
├── description: string
├── features: array of strings
├── inStock: boolean
├── brand: string
├── specifications: object (key-value pairs)
├── createdAt: timestamp
└── updatedAt: timestamp
```

### Cart Items Collection
```
cartItems/
├── id: string
├── userId: string (reference to users collection)
├── productId: string (reference to products collection)
├── name: string
├── category: string
├── price: number
├── discountPrice: number
├── quantity: number
├── image: string
├── brand: string
├── addedAt: timestamp
└── updatedAt: timestamp
```

### Orders Collection
```
orders/
├── id: string
├── userId: string (reference to users collection)
├── orderNumber: string
├── items: array of {
│   ├── productId: string
│   ├── name: string
│   ├── price: number
│   └── quantity: number
│ }
├── subtotal: number
├── discount: number
├── deliveryCharge: number
├── total: number
├── paymentMethod: string
├── paymentStatus: string (pending, completed, failed)
├── shippingAddress: {
│   ├── name: string
│   ├── phone: string
│   ├── address: string
│   ├── city: string
│   ├── state: string
│   └── pincode: string
│ }
├── status: string (processing, shipped, delivered, cancelled)
├── createdAt: timestamp
└── updatedAt: timestamp
```

## iOS-Specific Implementation

### APNs Integration
The app integrates with Apple Push Notification service (APNs) for iOS push notifications:
- Firebase Cloud Messaging (FCM) is used as a cross-platform solution
- APNs token is registered with FCM for iOS devices
- Notification categories and actions are configured for iOS
- Background notification handling is implemented

### Apple Pay Integration
For iOS devices, the app supports Apple Pay for seamless checkout:
- Merchant identifier configuration
- Supported payment networks (Visa, Mastercard, Amex)
- Payment summary items
- Shipping and billing address handling

### iOS Permissions
The app properly requests and handles iOS-specific permissions:
- Camera access for taking photos
- Photo library access for uploading images
- Push notification permissions
- Location services (when in use)

## Future Enhancements
- In-app chat support
- Service technician tracking
- Additional payment gateway integration
- Loyalty program
- Kitchen design consultation booking
- AR kitchen visualization
- Voice-controlled shopping
- Integration with smart kitchen appliances
