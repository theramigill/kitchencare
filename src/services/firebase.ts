// Firebase service implementation for KitchenCare+ app
import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  sendPasswordResetEmail,
  User
} from 'firebase/auth';
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  updateDoc,
  query,
  where,
  orderBy,
  Timestamp,
  addDoc,
  deleteDoc,
  increment
} from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

// Firebase configuration
// For production, these values should be stored in environment variables
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "kitchencare-plus.firebaseapp.com",
  projectId: "kitchencare-plus",
  storageBucket: "kitchencare-plus.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abc123def456ghi789jkl",
  measurementId: "G-MEASUREMENT_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const messaging = getMessaging(app);

// User types
export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  phoneNumber: string;
  address: string;
  createdAt: Date;
}

// Plan types
export interface WarrantyPlan {
  id: string;
  name: string;
  description: string;
  durationMonths: number;
  price: number;
  features: string[];
  serviceVisits: number;
  isPopular?: boolean;
}

// User's active plan
export interface UserPlan {
  id: string;
  userId: string;
  planId: string;
  planName: string;
  startDate: Date;
  endDate: Date;
  status: 'active' | 'expired' | 'cancelled';
  purchaseAmount: number;
  serviceVisitsUsed: number;
  serviceVisitsTotal: number;
  contractId: string;
}

// Kitchen details
export interface KitchenDetails {
  id: string;
  userId: string;
  kitchenType: string;
  installationDate: Date;
  size: string;
  location: string;
  imageUrls: string[];
}

// Service request
export interface ServiceRequest {
  id: string;
  userId: string;
  planId: string;
  serviceType: 'plumbing' | 'cabinet' | 'appliance' | 'chimney' | 'electrical' | 'other';
  description: string;
  imageUrls: string[];
  preferredDate: Date;
  preferredTimeSlot: string;
  status: 'pending' | 'scheduled' | 'completed' | 'cancelled';
  technicianId?: string;
  technicianName?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Digital contract
export interface DigitalContract {
  id: string;
  userId: string;
  planId: string;
  agreementNumber: string;
  issueDate: Date;
  planType: string;
  coveragePeriod: {
    start: Date;
    end: Date;
  };
  amountPaid: number;
  clientInfo: {
    name: string;
    contactNumber: string;
    email: string;
    address: string;
  };
  kitchenDetails: {
    kitchenType: string;
    installationDate: Date;
    size: string;
    imageUrl?: string;
  };
  coverageDetails: string[];
  termsAccepted: boolean;
  clientSignatureDate?: Date;
  companySignatureDate?: Date;
}

// Product
export interface Product {
  id: string;
  name: string;
  category: 'chimney' | 'hob' | 'microwave' | 'cooktop';
  price: number;
  discountPrice: number;
  rating: number;
  reviewCount: number;
  images: string[];
  description: string;
  features: string[];
  inStock: boolean;
  brand: string;
  specifications?: Record<string, string>;
  createdAt: Date;
  updatedAt: Date;
}

// Cart Item
export interface CartItem {
  id: string;
  userId: string;
  productId: string;
  name: string;
  category: string;
  price: number;
  discountPrice: number;
  quantity: number;
  image: string;
  brand: string;
  addedAt: Date;
  updatedAt: Date;
}

// Order
export interface Order {
  id: string;
  userId: string;
  orderNumber: string;
  items: {
    productId: string;
    name: string;
    price: number;
    quantity: number;
  }[];
  subtotal: number;
  discount: number;
  deliveryCharge: number;
  total: number;
  paymentMethod: string;
  paymentStatus: 'pending' | 'completed' | 'failed';
  shippingAddress: {
    name: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
  };
  status: 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
}

// Authentication services
export const authService = {
  // Register a new user
  registerUser: async (email: string, password: string, displayName: string): Promise<User> => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName });
      
      // Create user profile in Firestore
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        uid: userCredential.user.uid,
        email,
        displayName,
        phoneNumber: '',
        address: '',
        createdAt: Timestamp.now()
      });
      
      return userCredential.user;
    } catch (error) {
      console.error('Error registering user:', error);
      throw error;
    }
  },
  
  // Sign in existing user
  signIn: async (email: string, password: string): Promise<User> => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } catch (error) {
      console.error('Error signing in:', error);
      throw error;
    }
  },
  
  // Sign out user
  signOut: async (): Promise<void> => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  },
  
  // Reset password
  resetPassword: async (email: string): Promise<void> => {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      console.error('Error resetting password:', error);
      throw error;
    }
  },
  
  // Get current user
  getCurrentUser: (): User | null => {
    return auth.currentUser;
  }
};

// User profile services
export const userService = {
  // Get user profile
  getUserProfile: async (userId: string): Promise<UserProfile | null> => {
    try {
      const userDoc = await getDoc(doc(db, 'users', userId));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        return {
          uid: userData.uid,
          email: userData.email,
          displayName: userData.displayName,
          phoneNumber: userData.phoneNumber || '',
          address: userData.address || '',
          createdAt: userData.createdAt.toDate()
        };
      }
      return null;
    } catch (error) {
      console.error('Error getting user profile:', error);
      throw error;
    }
  },
  
  // Update user profile
  updateUserProfile: async (userId: string, profileData: Partial<UserProfile>): Promise<void> => {
    try {
      await updateDoc(doc(db, 'users', userId), {
        ...profileData,
        updatedAt: Timestamp.now()
      });
    } catch (error) {
      console.error('Error updating user profile:', error);
      throw error;
    }
  }
};

// Warranty plan services
export const planService = {
  // Get all warranty plans
  getWarrantyPlans: async (): Promise<WarrantyPlan[]> => {
    try {
      const plansQuery = query(collection(db, 'warrantyPlans'), orderBy('durationMonths'));
      const plansSnapshot = await getDocs(plansQuery);
      
      return plansSnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          name: data.name,
          description: data.description,
          durationMonths: data.durationMonths,
          price: data.price,
          features: data.features,
          serviceVisits: data.serviceVisits,
          isPopular: data.isPopular || false
        };
      });
    } catch (error) {
      console.error('Error getting warranty plans:', error);
      throw error;
    }
  },
  
  // Get a specific warranty plan
  getWarrantyPlan: async (planId: string): Promise<WarrantyPlan | null> => {
    try {
      const planDoc = await getDoc(doc(db, 'warrantyPlans', planId));
      if (planDoc.exists()) {
        const data = planDoc.data();
        return {
          id: planDoc.id,
          name: data.name,
          description: data.description,
          durationMonths: data.durationMonths,
          price: data.price,
          features: data.features,
          serviceVisits: data.serviceVisits,
          isPopular: data.isPopular || false
        };
      }
      return null;
    } catch (error) {
      console.error('Error getting warranty plan:', error);
      throw error;
    }
  },
  
  // Purchase a warranty plan
  purchasePlan: async (
    userId: string, 
    planId: string,
    planName: string,
    durationMonths: number,
    price: number,
    serviceVisits: number
  ): Promise<UserPlan> => {
    try {
      const startDate = new Date();
      const endDate = new Date();
      endDate.setMonth(endDate.getMonth() + durationMonths);
      
      // Generate contract ID
      const dateStr = startDate.toISOString().slice(0, 10).replace(/-/g, '');
      const randomNum = Math.floor(1000 + Math.random() * 9000);
      const contractId = `KC-${dateStr}-${randomNum}`;
      
      // Create user plan in Firestore
      const userPlanRef = await addDoc(collection(db, 'userPlans'), {
        userId,
        planId,
        planName,
        startDate: Timestamp.fromDate(startDate),
        endDate: Timestamp.fromDate(endDate),
        status: 'active',
        purchaseAmount: price,
        serviceVisitsUsed: 0,
        serviceVisitsTotal: serviceVisits,
        contractId,
        createdAt: Timestamp.now()
      });
      
      return {
        id: userPlanRef.id,
        userId,
        planId,
        planName,
        startDate,
        endDate,
        status: 'active',
        purchaseAmount: price,
        serviceVisitsUsed: 0,
        serviceVisitsTotal: serviceVisits,
        contractId
      };
    } catch (error) {
      console.error('Error purchasing plan:', error);
      throw error;
    }
  },
  
  // Get user's active plans
  getUserActivePlans: async (userId: string): Promise<UserPlan[]> => {
    try {
      const plansQuery = query(
        collection(db, 'userPlans'),
        where('userId', '==', userId),
        where('status', '==', 'active')
      );
      
      const plansSnapshot = await getDocs(plansQuery);
      
      return plansSnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          userId: data.userId,
          planId: data.planId,
          planName: data.planName,
          startDate: data.startDate.toDate(),
          endDate: data.endDate.toDate(),
          status: data.status,
          purchaseAmount: data.purchaseAmount,
          serviceVisitsUsed: data.serviceVisitsUsed,
          serviceVisitsTotal: data.serviceVisitsTotal,
          contractId: data.contractId
        };
      });
    } catch (error) {
      console.error('Error getting user active plans:', error);
      throw error;
    }
  }
};

// Kitchen details services
export const kitchenService = {
  // Save kitchen details
  saveKitchenDetails: async (
    userId: string,
    kitchenType: string,
    installationDate: Date,
    size: string,
    location: string,
    images: File[]
  ): Promise<KitchenDetails> => {
    try {
      // Upload images to storage
      const imageUrls: string[] = [];
      
      for (const image of images) {
        const storageRef = ref(storage, `kitchens/${userId}/${Date.now()}_${image.name}`);
        await uploadBytes(storageRef, image);
        const imageUrl = await getDownloadURL(storageRef);
        imageUrls.push(imageUrl);
      }
      
      // Save kitchen details to Firestore
      const kitchenRef = await addDoc(collection(db, 'kitchenDetails'), {
        userId,
        kitchenType,
        installationDate: Timestamp.fromDate(installationDate),
        size,
        location,
        imageUrls,
        createdAt: Timestamp.now()
      });
      
      return {
        id: kitchenRef.id,
        userId,
        kitchenType,
        installationDate,
        size,
        location,
        imageUrls
      };
    } catch (error) {
      console.error('Error saving kitchen details:', error);
      throw error;
    }
  },
  
  // Get kitchen details for a user
  getUserKitchenDetails: async (userId: string): Promise<KitchenDetails | null> => {
    try {
      const kitchenQuery = query(
        collection(db, 'kitchenDetails'),
        where('userId', '==', userId)
      );
      
      const kitchenSnapshot = await getDocs(kitchenQuery);
      
      if (!kitchenSnapshot.empty) {
        const doc = kitchenSnapshot.docs[0];
        const data = doc.data();
        
        return {
          id: doc.id,
          userId: data.userId,
          kitchenType: data.kitchenType,
          installationDate: data.installationDate.toDate(),
          size: data.size,
          location: data.location,
          imageUrls: data.imageUrls
        };
      }
      
      return null;
    } catch (error) {
      console.error('Error getting kitchen details:', error);
      throw error;
    }
  }
};

// Service request services
export const serviceRequestService = {
  // Create a service request
  createServiceRequest: async (
    userId: string,
    planId: string,
    serviceType: ServiceRequest['serviceType'],
    description: string,
    preferredDate: Date,
    preferredTimeSlot: string,
    images: File[]
  ): Promise<ServiceRequest> => {
    try {
      // Upload images to storage
      const imageUrls: string[] = [];
      
      for (const image of images) {
        const storageRef = ref(storage, `serviceRequests/${userId}/${Date.now()}_${image.name}`);
        await uploadBytes(storageRef, image);
        const imageUrl = await getDownloadURL(storageRef);
        imageUrls.push(imageUrl);
      }
      
      const now = new Date();
      
      // Create service request in Firestore
      const requestRef = await addDoc(collection(db, 'serviceRequests'), {
        userId,
        planId,
        serviceType,
        description,
        imageUrls,
        preferredDate: Timestamp.fromDate(preferredDate),
        preferredTimeSlot,
        status: 'pending',
        createdAt: Timestamp.fromDate(now),
        updatedAt: Timestamp.fromDate(now)
      });
      
      // Update service visits used count
      const planQuery = query(
        collection(db, 'userPlans'),
        where('id', '==', planId),
        where('userId', '==', userId)
      );
      
      const planSnapshot = await getDocs(planQuery);
      
      if (!planSnapshot.empty) {
        const planDoc = planSnapshot.docs[0];
        const planData = planDoc.data();
        
        await updateDoc(doc(db, 'userPlans', planDoc.id), {
          serviceVisitsUsed: planData.serviceVisitsUsed + 1,
          updatedAt: Timestamp.now()
        });
      }
      
      return {
        id: requestRef.id,
        userId,
        planId,
        serviceType,
        description,
        imageUrls,
        preferredDate,
        preferredTimeSlot,
        status: 'pending',
        createdAt: now,
        updatedAt: now
      };
    } catch (error) {
      console.error('Error creating service request:', error);
      throw error;
    }
  },
  
  // Get user's service requests
  getUserServiceRequests: async (userId: string): Promise<ServiceRequest[]> => {
    try {
      const requestsQuery = query(
        collection(db, 'serviceRequests'),
        where('userId', '==', userId),
        orderBy('createdAt', 'desc')
      );
      
      const requestsSnapshot = await getDocs(requestsQuery);
      
      return requestsSnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          userId: data.userId,
          planId: data.planId,
          serviceType: data.serviceType,
          description: data.description,
          imageUrls: data.imageUrls,
          preferredDate: data.preferredDate.toDate(),
          preferredTimeSlot: data.preferredTimeSlot,
          status: data.status,
          technicianId: data.technicianId,
          technicianName: data.technicianName,
          createdAt: data.createdAt.toDate(),
          updatedAt: data.updatedAt.toDate()
        };
      });
    } catch (error) {
      console.error('Error getting user service requests:', error);
      throw error;
    }
  }
};

// Digital contract services
export const contractService = {
  // Generate digital contract
  generateContract: async (
    userId: string,
    planId: string,
    userPlan: UserPlan,
    userProfile: UserProfile,
    kitchenDetails: KitchenDetails
  ): Promise<DigitalContract> => {
    try {
      const now = new Date();
      
      // Create contract in Firestore
      const contractRef = await addDoc(collection(db, 'digitalContracts'), {
        userId,
        planId,
        agreementNumber: userPlan.contractId,
        issueDate: Timestamp.fromDate(now),
        planType: userPlan.planName,
        coveragePeriod: {
          start: Timestamp.fromDate(userPlan.startDate),
          end: Timestamp.fromDate(userPlan.endDate)
        },
        amountPaid: userPlan.purchaseAmount,
        clientInfo: {
          name: userProfile.displayName,
          contactNumber: userProfile.phoneNumber,
          email: userProfile.email,
          address: userProfile.address
        },
        kitchenDetails: {
          kitchenType: kitchenDetails.kitchenType,
          installationDate: Timestamp.fromDate(kitchenDetails.installationDate),
          size: kitchenDetails.size,
          imageUrl: kitchenDetails.imageUrls.length > 0 ? kitchenDetails.imageUrls[0] : undefined
        },
        coverageDetails: [
          'Regular maintenance and service checks',
          'Repair or replacement of defective parts',
          'Labor costs for repairs',
          'Emergency service support',
          'Technical assistance and troubleshooting'
        ],
        termsAccepted: false,
        createdAt: Timestamp.now()
      });
      
      return {
        id: contractRef.id,
        userId,
        planId,
        agreementNumber: userPlan.contractId,
        issueDate: now,
        planType: userPlan.planName,
        coveragePeriod: {
          start: userPlan.startDate,
          end: userPlan.endDate
        },
        amountPaid: userPlan.purchaseAmount,
        clientInfo: {
          name: userProfile.displayName,
          contactNumber: userProfile.phoneNumber,
          email: userProfile.email,
          address: userProfile.address
        },
        kitchenDetails: {
          kitchenType: kitchenDetails.kitchenType,
          installationDate: kitchenDetails.installationDate,
          size: kitchenDetails.size,
          imageUrl: kitchenDetails.imageUrls.length > 0 ? kitchenDetails.imageUrls[0] : undefined
        },
        coverageDetails: [
          'Regular maintenance and service checks',
          'Repair or replacement of defective parts',
          'Labor costs for repairs',
          'Emergency service support',
          'Technical assistance and troubleshooting'
        ],
        termsAccepted: false
      };
    } catch (error) {
      console.error('Error generating contract:', error);
      throw error;
    }
  },
  
  // Accept contract
  acceptContract: async (contractId: string): Promise<void> => {
    try {
      const now = new Date();
      
      await updateDoc(doc(db, 'digitalContracts', contractId), {
        termsAccepted: true,
        clientSignatureDate: Timestamp.fromDate(now),
        companySignatureDate: Timestamp.fromDate(now),
        updatedAt: Timestamp.now()
      });
    } catch (error) {
      console.error('Error accepting contract:', error);
      throw error;
    }
  },
  
  // Get user's contracts
  getUserContracts: async (userId: string): Promise<DigitalContract[]> => {
    try {
      const contractsQuery = query(
        collection(db, 'digitalContracts'),
        where('userId', '==', userId)
      );
      
      const contractsSnapshot = await getDocs(contractsQuery);
      
      return contractsSnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          userId: data.userId,
          planId: data.planId,
          agreementNumber: data.agreementNumber,
          issueDate: data.issueDate.toDate(),
          planType: data.planType,
          coveragePeriod: {
            start: data.coveragePeriod.start.toDate(),
            end: data.coveragePeriod.end.toDate()
          },
          amountPaid: data.amountPaid,
          clientInfo: data.clientInfo,
          kitchenDetails: {
            kitchenType: data.kitchenDetails.kitchenType,
            installationDate: data.kitchenDetails.installationDate.toDate(),
            size: data.kitchenDetails.size,
            imageUrl: data.kitchenDetails.imageUrl
          },
          coverageDetails: data.coverageDetails,
          termsAccepted: data.termsAccepted,
          clientSignatureDate: data.clientSignatureDate ? data.clientSignatureDate.toDate() : undefined,
          companySignatureDate: data.companySignatureDate ? data.companySignatureDate.toDate() : undefined
        };
      });
    } catch (error) {
      console.error('Error getting user contracts:', error);
      throw error;
    }
  }
};

// Product services
export const productService = {
  // Get all products
  getProducts: async (): Promise<Product[]> => {
    try {
      const productsQuery = query(collection(db, 'products'));
      const productsSnapshot = await getDocs(productsQuery);
      
      return productsSnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          name: data.name,
          category: data.category,
          price: data.price,
          discountPrice: data.discountPrice,
          rating: data.rating,
          reviewCount: data.reviewCount,
          images: data.images,
          description: data.description,
          features: data.features,
          inStock: data.inStock,
          brand: data.brand,
          specifications: data.specifications,
          createdAt: data.createdAt.toDate(),
          updatedAt: data.updatedAt.toDate()
        };
      });
    } catch (error) {
      console.error('Error getting products:', error);
      throw error;
    }
  },
  
  // Get products by category
  getProductsByCategory: async (category: string): Promise<Product[]> => {
    try {
      const productsQuery = query(
        collection(db, 'products'),
        where('category', '==', category)
      );
      
      const productsSnapshot = await getDocs(productsQuery);
      
      return productsSnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          name: data.name,
          category: data.category,
          price: data.price,
          discountPrice: data.discountPrice,
          rating: data.rating,
          reviewCount: data.reviewCount,
          images: data.images,
          description: data.description,
          features: data.features,
          inStock: data.inStock,
          brand: data.brand,
          specifications: data.specifications,
          createdAt: data.createdAt.toDate(),
          updatedAt: data.updatedAt.toDate()
        };
      });
    } catch (error) {
      console.error('Error getting products by category:', error);
      throw error;
    }
  },
  
  // Get product by ID
  getProductById: async (productId: string): Promise<Product | null> => {
    try {
      const productDoc = await getDoc(doc(db, 'products', productId));
      
      if (productDoc.exists()) {
        const data = productDoc.data();
        return {
          id: productDoc.id,
          name: data.name,
          category: data.category,
          price: data.price,
          discountPrice: data.discountPrice,
          rating: data.rating,
          reviewCount: data.reviewCount,
          images: data.images,
          description: data.description,
          features: data.features,
          inStock: data.inStock,
          brand: data.brand,
          specifications: data.specifications,
          createdAt: data.createdAt.toDate(),
          updatedAt: data.updatedAt.toDate()
        };
      }
      
      return null;
    } catch (error) {
      console.error('Error getting product by ID:', error);
      throw error;
    }
  }
};

// Cart services
export const cartService = {
  // Add item to cart
  addToCart: async (
    userId: string,
    productId: string,
    quantity: number = 1
  ): Promise<CartItem> => {
    try {
      // Check if product exists
      const product = await productService.getProductById(productId);
      
      if (!product) {
        throw new Error('Product not found');
      }
      
      // Check if item already exists in cart
      const cartQuery = query(
        collection(db, 'cartItems'),
        where('userId', '==', userId),
        where('productId', '==', productId)
      );
      
      const cartSnapshot = await getDocs(cartQuery);
      
      if (!cartSnapshot.empty) {
        // Update existing cart item
        const cartDoc = cartSnapshot.docs[0];
        const cartData = cartDoc.data();
        
        await updateDoc(doc(db, 'cartItems', cartDoc.id), {
          quantity: cartData.quantity + quantity,
          updatedAt: Timestamp.now()
        });
        
        return {
          id: cartDoc.id,
          userId,
          productId,
          name: product.name,
          category: product.category,
          price: product.price,
          discountPrice: product.discountPrice,
          quantity: cartData.quantity + quantity,
          image: product.images[0],
          brand: product.brand,
          addedAt: cartData.addedAt.toDate(),
          updatedAt: new Date()
        };
      } else {
        // Add new cart item
        const now = new Date();
        
        const cartRef = await addDoc(collection(db, 'cartItems'), {
          userId,
          productId,
          name: product.name,
          category: product.category,
          price: product.price,
          discountPrice: product.discountPrice,
          quantity,
          image: product.images[0],
          brand: product.brand,
          addedAt: Timestamp.fromDate(now),
          updatedAt: Timestamp.fromDate(now)
        });
        
        return {
          id: cartRef.id,
          userId,
          productId,
          name: product.name,
          category: product.category,
          price: product.price,
          discountPrice: product.discountPrice,
          quantity,
          image: product.images[0],
          brand: product.brand,
          addedAt: now,
          updatedAt: now
        };
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      throw error;
    }
  },
  
  // Update cart item quantity
  updateCartItemQuantity: async (
    cartItemId: string,
    quantity: number
  ): Promise<void> => {
    try {
      if (quantity < 1) {
        throw new Error('Quantity must be at least 1');
      }
      
      await updateDoc(doc(db, 'cartItems', cartItemId), {
        quantity,
        updatedAt: Timestamp.now()
      });
    } catch (error) {
      console.error('Error updating cart item quantity:', error);
      throw error;
    }
  },
  
  // Remove item from cart
  removeFromCart: async (cartItemId: string): Promise<void> => {
    try {
      await deleteDoc(doc(db, 'cartItems', cartItemId));
    } catch (error) {
      console.error('Error removing from cart:', error);
      throw error;
    }
  },
  
  // Get user's cart items
  getCartItems: async (userId: string): Promise<CartItem[]> => {
    try {
      const cartQuery = query(
        collection(db, 'cartItems'),
        where('userId', '==', userId)
      );
      
      const cartSnapshot = await getDocs(cartQuery);
      
      return cartSnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          userId: data.userId,
          productId: data.productId,
          name: data.name,
          category: data.category,
          price: data.price,
          discountPrice: data.discountPrice,
          quantity: data.quantity,
          image: data.image,
          brand: data.brand,
          addedAt: data.addedAt.toDate(),
          updatedAt: data.updatedAt.toDate()
        };
      });
    } catch (error) {
      console.error('Error getting cart items:', error);
      throw error;
    }
  },
  
  // Clear user's cart
  clearCart: async (userId: string): Promise<void> => {
    try {
      const cartQuery = query(
        collection(db, 'cartItems'),
        where('userId', '==', userId)
      );
      
      const cartSnapshot = await getDocs(cartQuery);
      
      const deletePromises = cartSnapshot.docs.map(doc => 
        deleteDoc(doc.ref)
      );
      
      await Promise.all(deletePromises);
    } catch (error) {
      console.error('Error clearing cart:', error);
      throw error;
    }
  }
};

// Order services
export const orderService = {
  // Create order
  createOrder: async (
    userId: string,
    cartItems: CartItem[],
    subtotal: number,
    discount: number,
    deliveryCharge: number,
    total: number,
    paymentMethod: string,
    shippingAddress: {
      name: string,
      phone: string,
      address: string,
      city: string,
      state: string,
      pincode: string
    }
  ): Promise<Order> => {
    try {
      const now = new Date();
      
      // Generate order number
      const dateStr = now.toISOString().slice(0, 10).replace(/-/g, '');
      const randomNum = Math.floor(1000 + Math.random() * 9000);
      const orderNumber = `ORD-${dateStr}-${randomNum}`;
      
      // Create order items
      const items = cartItems.map(item => ({
        productId: item.productId,
        name: item.name,
        price: item.discountPrice,
        quantity: item.quantity
      }));
      
      // Create order in Firestore
      const orderRef = await addDoc(collection(db, 'orders'), {
        userId,
        orderNumber,
        items,
        subtotal,
        discount,
        deliveryCharge,
        total,
        paymentMethod,
        paymentStatus: 'pending',
        shippingAddress,
        status: 'processing',
        createdAt: Timestamp.fromDate(now),
        updatedAt: Timestamp.fromDate(now)
      });
      
      // Clear user's cart
      await cartService.clearCart(userId);
      
      return {
        id: orderRef.id,
        userId,
        orderNumber,
        items,
        subtotal,
        discount,
        deliveryCharge,
        total,
        paymentMethod,
        paymentStatus: 'pending',
        shippingAddress,
        status: 'processing',
        createdAt: now,
        updatedAt: now
      };
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  },
  
  // Get user's orders
  getUserOrders: async (userId: string): Promise<Order[]> => {
    try {
      const ordersQuery = query(
        collection(db, 'orders'),
        where('userId', '==', userId),
        orderBy('createdAt', 'desc')
      );
      
      const ordersSnapshot = await getDocs(ordersQuery);
      
      return ordersSnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          userId: data.userId,
          orderNumber: data.orderNumber,
          items: data.items,
          subtotal: data.subtotal,
          discount: data.discount,
          deliveryCharge: data.deliveryCharge,
          total: data.total,
          paymentMethod: data.paymentMethod,
          paymentStatus: data.paymentStatus,
          shippingAddress: data.shippingAddress,
          status: data.status,
          createdAt: data.createdAt.toDate(),
          updatedAt: data.updatedAt.toDate()
        };
      });
    } catch (error) {
      console.error('Error getting user orders:', error);
      throw error;
    }
  },
  
  // Get order by ID
  getOrderById: async (orderId: string): Promise<Order | null> => {
    try {
      const orderDoc = await getDoc(doc(db, 'orders', orderId));
      
      if (orderDoc.exists()) {
        const data = orderDoc.data();
        return {
          id: orderDoc.id,
          userId: data.userId,
          orderNumber: data.orderNumber,
          items: data.items,
          subtotal: data.subtotal,
          discount: data.discount,
          deliveryCharge: data.deliveryCharge,
          total: data.total,
          paymentMethod: data.paymentMethod,
          paymentStatus: data.paymentStatus,
          shippingAddress: data.shippingAddress,
          status: data.status,
          createdAt: data.createdAt.toDate(),
          updatedAt: data.updatedAt.toDate()
        };
      }
      
      return null;
    } catch (error) {
      console.error('Error getting order by ID:', error);
      throw error;
    }
  },
  
  // Update order status
  updateOrderStatus: async (
    orderId: string,
    status: Order['status']
  ): Promise<void> => {
    try {
      await updateDoc(doc(db, 'orders', orderId), {
        status,
        updatedAt: Timestamp.now()
      });
    } catch (error) {
      console.error('Error updating order status:', error);
      throw error;
    }
  },
  
  // Update payment status
  updatePaymentStatus: async (
    orderId: string,
    paymentStatus: Order['paymentStatus']
  ): Promise<void> => {
    try {
      await updateDoc(doc(db, 'orders', orderId), {
        paymentStatus,
        updatedAt: Timestamp.now()
      });
    } catch (error) {
      console.error('Error updating payment status:', error);
      throw error;
    }
  }
};

// Combine all services
const firebaseServices = {
  auth,
  db,
  storage,
  messaging,
  authService,
  userService,
  planService,
  kitchenService,
  serviceRequestService,
  contractService,
  productService,
  cartService,
  orderService
};

export default firebaseServices;
