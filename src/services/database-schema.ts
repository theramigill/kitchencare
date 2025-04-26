// Database schema for KitchenCare+ app
// This file defines the Firestore database structure

/**
 * Collection: users
 * Purpose: Stores user profile information
 * Fields:
 * - uid: string (User ID from Firebase Auth)
 * - email: string
 * - displayName: string
 * - phoneNumber: string
 * - address: string
 * - createdAt: timestamp
 * - updatedAt: timestamp
 */

/**
 * Collection: warrantyPlans
 * Purpose: Stores available warranty plan options
 * Fields:
 * - name: string (e.g., "1-Year Basic", "3-Year Standard")
 * - description: string
 * - durationMonths: number
 * - price: number
 * - features: array of strings
 * - serviceVisits: number
 * - isPopular: boolean
 */

/**
 * Collection: userPlans
 * Purpose: Stores user's purchased warranty plans
 * Fields:
 * - userId: string (reference to users collection)
 * - planId: string (reference to warrantyPlans collection)
 * - planName: string
 * - startDate: timestamp
 * - endDate: timestamp
 * - status: string (active, expired, cancelled)
 * - purchaseAmount: number
 * - serviceVisitsUsed: number
 * - serviceVisitsTotal: number
 * - contractId: string
 * - createdAt: timestamp
 * - updatedAt: timestamp
 */

/**
 * Collection: kitchenDetails
 * Purpose: Stores information about user's kitchen
 * Fields:
 * - userId: string (reference to users collection)
 * - kitchenType: string
 * - installationDate: timestamp
 * - size: string
 * - location: string
 * - imageUrls: array of strings
 * - createdAt: timestamp
 * - updatedAt: timestamp
 */

/**
 * Collection: serviceRequests
 * Purpose: Stores service requests submitted by users
 * Fields:
 * - userId: string (reference to users collection)
 * - planId: string (reference to userPlans collection)
 * - serviceType: string (plumbing, cabinet, appliance, chimney, electrical, other)
 * - description: string
 * - imageUrls: array of strings
 * - preferredDate: timestamp
 * - preferredTimeSlot: string
 * - status: string (pending, scheduled, completed, cancelled)
 * - technicianId: string (optional)
 * - technicianName: string (optional)
 * - createdAt: timestamp
 * - updatedAt: timestamp
 */

/**
 * Collection: digitalContracts
 * Purpose: Stores digital service agreements
 * Fields:
 * - userId: string (reference to users collection)
 * - planId: string (reference to userPlans collection)
 * - agreementNumber: string
 * - issueDate: timestamp
 * - planType: string
 * - coveragePeriod: {
 *     start: timestamp,
 *     end: timestamp
 *   }
 * - amountPaid: number
 * - clientInfo: {
 *     name: string,
 *     contactNumber: string,
 *     email: string,
 *     address: string
 *   }
 * - kitchenDetails: {
 *     kitchenType: string,
 *     installationDate: timestamp,
 *     size: string,
 *     imageUrl: string (optional)
 *   }
 * - coverageDetails: array of strings
 * - termsAccepted: boolean
 * - clientSignatureDate: timestamp (optional)
 * - companySignatureDate: timestamp (optional)
 * - createdAt: timestamp
 * - updatedAt: timestamp
 */

/**
 * Collection: serviceTechnicians
 * Purpose: Stores information about service technicians
 * Fields:
 * - name: string
 * - specialization: string
 * - phoneNumber: string
 * - email: string
 * - isAvailable: boolean
 * - rating: number
 * - completedServices: number
 * - createdAt: timestamp
 * - updatedAt: timestamp
 */

/**
 * Collection: userTokens
 * Purpose: Stores FCM tokens for push notifications
 * Fields:
 * - userId: string (reference to users collection)
 * - token: string
 * - device: string
 * - updatedAt: timestamp
 */

/**
 * Collection: notifications
 * Purpose: Stores user notifications
 * Fields:
 * - userId: string (reference to users collection)
 * - title: string
 * - body: string
 * - type: string (service_request, renewal, maintenance)
 * - referenceId: string (optional, reference to related document)
 * - isRead: boolean
 * - createdAt: timestamp
 */

/**
 * Collection: maintenanceTips
 * Purpose: Stores kitchen maintenance tips
 * Fields:
 * - title: string
 * - description: string
 * - imageUrl: string
 * - category: string
 * - createdAt: timestamp
 */

/**
 * Collection: products
 * Purpose: Stores kitchen appliance products for e-commerce
 * Fields:
 * - id: string
 * - name: string
 * - category: string (chimney, hob, microwave, cooktop)
 * - price: number
 * - discountPrice: number
 * - rating: number
 * - reviewCount: number
 * - images: array of strings (URLs)
 * - description: string
 * - features: array of strings
 * - inStock: boolean
 * - brand: string
 * - specifications: object (key-value pairs of specifications)
 * - createdAt: timestamp
 * - updatedAt: timestamp
 */

/**
 * Collection: cartItems
 * Purpose: Stores shopping cart items for users
 * Fields:
 * - userId: string (reference to users collection)
 * - productId: string (reference to products collection)
 * - quantity: number
 * - addedAt: timestamp
 * - updatedAt: timestamp
 */

/**
 * Collection: orders
 * Purpose: Stores user orders
 * Fields:
 * - userId: string (reference to users collection)
 * - orderNumber: string
 * - items: array of {
 *     productId: string,
 *     name: string,
 *     price: number,
 *     quantity: number
 *   }
 * - subtotal: number
 * - discount: number
 * - deliveryCharge: number
 * - total: number
 * - paymentMethod: string
 * - paymentStatus: string (pending, completed, failed)
 * - shippingAddress: {
 *     name: string,
 *     phone: string,
 *     address: string,
 *     city: string,
 *     state: string,
 *     pincode: string
 *   }
 * - status: string (processing, shipped, delivered, cancelled)
 * - createdAt: timestamp
 * - updatedAt: timestamp
 */

// Indexes required:
// 1. userPlans: userId + status (for getting active plans)
// 2. serviceRequests: userId + createdAt (for listing user's requests)
// 3. digitalContracts: userId (for listing user's contracts)
// 4. notifications: userId + isRead + createdAt (for listing unread notifications)
// 5. products: category (for filtering products by category)
// 6. cartItems: userId (for getting user's cart items)
// 7. orders: userId + createdAt (for listing user's orders)
