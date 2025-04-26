// Context provider for Firebase services in KitchenCare+ app
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import firebaseServices, { 
  UserProfile, 
  WarrantyPlan, 
  UserPlan, 
  KitchenDetails,
  ServiceRequest,
  DigitalContract,
  Product,
  CartItem,
  Order
} from './firebase';

// Define the context type
interface FirebaseContextType {
  // Authentication
  currentUser: User | null;
  userProfile: UserProfile | null;
  isLoading: boolean;
  error: string | null;
  
  // Auth methods
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, displayName: string) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  
  // User profile methods
  updateProfile: (profileData: Partial<UserProfile>) => Promise<void>;
  
  // Warranty plans
  warrantyPlans: WarrantyPlan[];
  userPlans: UserPlan[];
  
  // Plan methods
  purchasePlan: (planId: string, planName: string, durationMonths: number, price: number, serviceVisits: number) => Promise<UserPlan>;
  
  // Kitchen details
  kitchenDetails: KitchenDetails | null;
  
  // Kitchen methods
  saveKitchenDetails: (
    kitchenType: string,
    installationDate: Date,
    size: string,
    location: string,
    images: File[]
  ) => Promise<KitchenDetails>;
  
  // Service requests
  serviceRequests: ServiceRequest[];
  
  // Service request methods
  createServiceRequest: (
    planId: string,
    serviceType: ServiceRequest['serviceType'],
    description: string,
    preferredDate: Date,
    preferredTimeSlot: string,
    images: File[]
  ) => Promise<ServiceRequest>;
  
  // Digital contracts
  contracts: DigitalContract[];
  
  // Contract methods
  generateContract: (
    planId: string,
    userPlan: UserPlan
  ) => Promise<DigitalContract>;
  
  acceptContract: (contractId: string) => Promise<void>;
  
  // Products
  products: Product[];
  
  // Product methods
  getProducts: () => Promise<Product[]>;
  getProductsByCategory: (category: string) => Promise<Product[]>;
  getProductById: (productId: string) => Promise<Product | null>;
  
  // Cart
  cartItems: CartItem[];
  
  // Cart methods
  addToCart: (productId: string, quantity?: number) => Promise<CartItem>;
  updateCartItemQuantity: (cartItemId: string, quantity: number) => Promise<void>;
  removeFromCart: (cartItemId: string) => Promise<void>;
  getCartItems: () => Promise<CartItem[]>;
  clearCart: () => Promise<void>;
  
  // Orders
  orders: Order[];
  
  // Order methods
  createOrder: (
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
  ) => Promise<Order>;
  getUserOrders: () => Promise<Order[]>;
  getOrderById: (orderId: string) => Promise<Order | null>;
}

// Create the context with default values
const FirebaseContext = createContext<FirebaseContextType>({
  currentUser: null,
  userProfile: null,
  isLoading: true,
  error: null,
  
  signIn: async () => {},
  signUp: async () => {},
  signOut: async () => {},
  resetPassword: async () => {},
  
  updateProfile: async () => {},
  
  warrantyPlans: [],
  userPlans: [],
  
  purchasePlan: async () => ({} as UserPlan),
  
  kitchenDetails: null,
  
  saveKitchenDetails: async () => ({} as KitchenDetails),
  
  serviceRequests: [],
  
  createServiceRequest: async () => ({} as ServiceRequest),
  
  contracts: [],
  
  generateContract: async () => ({} as DigitalContract),
  
  acceptContract: async () => {},
  
  products: [],
  
  getProducts: async () => [],
  getProductsByCategory: async () => [],
  getProductById: async () => null,
  
  cartItems: [],
  
  addToCart: async () => ({} as CartItem),
  updateCartItemQuantity: async () => {},
  removeFromCart: async () => {},
  getCartItems: async () => [],
  clearCart: async () => {},
  
  orders: [],
  
  createOrder: async () => ({} as Order),
  getUserOrders: async () => [],
  getOrderById: async () => null,
});

// Provider component
export const FirebaseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  const [warrantyPlans, setWarrantyPlans] = useState<WarrantyPlan[]>([]);
  const [userPlans, setUserPlans] = useState<UserPlan[]>([]);
  const [kitchenDetails, setKitchenDetails] = useState<KitchenDetails | null>(null);
  const [serviceRequests, setServiceRequests] = useState<ServiceRequest[]>([]);
  const [contracts, setContracts] = useState<DigitalContract[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  
  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = firebaseServices.auth.onAuthStateChanged(async (user) => {
      setCurrentUser(user);
      
      if (user) {
        try {
          // Load user profile
          const profile = await firebaseServices.userService.getUserProfile(user.uid);
          setUserProfile(profile);
          
          // Load user's warranty plans
          const plans = await firebaseServices.planService.getUserActivePlans(user.uid);
          setUserPlans(plans);
          
          // Load kitchen details
          const kitchen = await firebaseServices.kitchenService.getUserKitchenDetails(user.uid);
          setKitchenDetails(kitchen);
          
          // Load service requests
          const requests = await firebaseServices.serviceRequestService.getUserServiceRequests(user.uid);
          setServiceRequests(requests);
          
          // Load contracts
          const userContracts = await firebaseServices.contractService.getUserContracts(user.uid);
          setContracts(userContracts);
          
          // Load cart items
          const cart = await firebaseServices.cartService.getCartItems(user.uid);
          setCartItems(cart);
          
          // Load orders
          const userOrders = await firebaseServices.orderService.getUserOrders(user.uid);
          setOrders(userOrders);
        } catch (err) {
          setError('Error loading user data');
          console.error('Error loading user data:', err);
        }
      } else {
        // Reset user-related state when signed out
        setUserProfile(null);
        setUserPlans([]);
        setKitchenDetails(null);
        setServiceRequests([]);
        setContracts([]);
        setCartItems([]);
        setOrders([]);
      }
      
      setIsLoading(false);
    });
    
    // Load warranty plans and products (doesn't require authentication)
    const loadPublicData = async () => {
      try {
        const plans = await firebaseServices.planService.getWarrantyPlans();
        setWarrantyPlans(plans);
        
        const productsList = await firebaseServices.productService.getProducts();
        setProducts(productsList);
      } catch (err) {
        console.error('Error loading public data:', err);
      }
    };
    
    loadPublicData();
    
    return () => unsubscribe();
  }, []);
  
  // Authentication methods
  const signIn = async (email: string, password: string) => {
    try {
      setError(null);
      await firebaseServices.authService.signIn(email, password);
    } catch (err: any) {
      setError(err.message || 'Failed to sign in');
      throw err;
    }
  };
  
  const signUp = async (email: string, password: string, displayName: string) => {
    try {
      setError(null);
      await firebaseServices.authService.registerUser(email, password, displayName);
    } catch (err: any) {
      setError(err.message || 'Failed to sign up');
      throw err;
    }
  };
  
  const signOutUser = async () => {
    try {
      setError(null);
      await firebaseServices.authService.signOut();
    } catch (err: any) {
      setError(err.message || 'Failed to sign out');
      throw err;
    }
  };
  
  const resetPassword = async (email: string) => {
    try {
      setError(null);
      await firebaseServices.authService.resetPassword(email);
    } catch (err: any) {
      setError(err.message || 'Failed to reset password');
      throw err;
    }
  };
  
  // User profile methods
  const updateProfile = async (profileData: Partial<UserProfile>) => {
    if (!currentUser) {
      setError('No user is signed in');
      throw new Error('No user is signed in');
    }
    
    try {
      setError(null);
      await firebaseServices.userService.updateUserProfile(currentUser.uid, profileData);
      
      // Update local state
      if (userProfile) {
        setUserProfile({
          ...userProfile,
          ...profileData
        });
      }
    } catch (err: any) {
      setError(err.message || 'Failed to update profile');
      throw err;
    }
  };
  
  // Plan methods
  const purchasePlan = async (
    planId: string,
    planName: string,
    durationMonths: number,
    price: number,
    serviceVisits: number
  ) => {
    if (!currentUser) {
      setError('No user is signed in');
      throw new Error('No user is signed in');
    }
    
    try {
      setError(null);
      const userPlan = await firebaseServices.planService.purchasePlan(
        currentUser.uid,
        planId,
        planName,
        durationMonths,
        price,
        serviceVisits
      );
      
      // Update local state
      setUserPlans([...userPlans, userPlan]);
      
      return userPlan;
    } catch (err: any) {
      setError(err.message || 'Failed to purchase plan');
      throw err;
    }
  };
  
  // Kitchen methods
  const saveKitchenDetails = async (
    kitchenType: string,
    installationDate: Date,
    size: string,
    location: string,
    images: File[]
  ) => {
    if (!currentUser) {
      setError('No user is signed in');
      throw new Error('No user is signed in');
    }
    
    try {
      setError(null);
      const kitchen = await firebaseServices.kitchenService.saveKitchenDetails(
        currentUser.uid,
        kitchenType,
        installationDate,
        size,
        location,
        images
      );
      
      // Update local state
      setKitchenDetails(kitchen);
      
      return kitchen;
    } catch (err: any) {
      setError(err.message || 'Failed to save kitchen details');
      throw err;
    }
  };
  
  // Service request methods
  const createServiceRequest = async (
    planId: string,
    serviceType: ServiceRequest['serviceType'],
    description: string,
    preferredDate: Date,
    preferredTimeSlot: string,
    images: File[]
  ) => {
    if (!currentUser) {
      setError('No user is signed in');
      throw new Error('No user is signed in');
    }
    
    try {
      setError(null);
      const request = await firebaseServices.serviceRequestService.createServiceRequest(
        currentUser.uid,
        planId,
        serviceType,
        description,
        preferredDate,
        preferredTimeSlot,
        images
      );
      
      // Update local state
      setServiceRequests([request, ...serviceRequests]);
      
      return request;
    } catch (err: any) {
      setError(err.message || 'Failed to create service request');
      throw err;
    }
  };
  
  // Contract methods
  const generateContract = async (
    planId: string,
    userPlan: UserPlan
  ) => {
    if (!currentUser || !userProfile || !kitchenDetails) {
      setError('Missing required information');
      throw new Error('Missing required information');
    }
    
    try {
      setError(null);
      const contract = await firebaseServices.contractService.generateContract(
        currentUser.uid,
        planId,
        userPlan,
        userProfile,
        kitchenDetails
      );
      
      // Update local state
      setContracts([...contracts, contract]);
      
      return contract;
    } catch (err: any) {
      setError(err.message || 'Failed to generate contract');
      throw err;
    }
  };
  
  const acceptContract = async (contractId: string) => {
    try {
      setError(null);
      await firebaseServices.contractService.acceptContract(contractId);
      
      // Update local state
      setContracts(
        contracts.map(contract => 
          contract.id === contractId 
            ? { ...contract, termsAccepted: true, clientSignatureDate: new Date(), companySignatureDate: new Date() } 
            : contract
        )
      );
    } catch (err: any) {
      setError(err.message || 'Failed to accept contract');
      throw err;
    }
  };
  
  // Product methods
  const getProducts = async () => {
    try {
      setError(null);
      const productsList = await firebaseServices.productService.getProducts();
      setProducts(productsList);
      return productsList;
    } catch (err: any) {
      setError(err.message || 'Failed to get products');
      throw err;
    }
  };
  
  const getProductsByCategory = async (category: string) => {
    try {
      setError(null);
      return await firebaseServices.productService.getProductsByCategory(category);
    } catch (err: any) {
      setError(err.message || 'Failed to get products by category');
      throw err;
    }
  };
  
  const getProductById = async (productId: string) => {
    try {
      setError(null);
      return await firebaseServices.productService.getProductById(productId);
    } catch (err: any) {
      setError(err.message || 'Failed to get product');
      throw err;
    }
  };
  
  // Cart methods
  const addToCart = async (productId: string, quantity: number = 1) => {
    if (!currentUser) {
      setError('No user is signed in');
      throw new Error('No user is signed in');
    }
    
    try {
      setError(null);
      const cartItem = await firebaseServices.cartService.addToCart(
        currentUser.uid,
        productId,
        quantity
      );
      
      // Update local state
      const existingItemIndex = cartItems.findIndex(item => item.productId === productId);
      
      if (existingItemIndex >= 0) {
        // Update existing item
        const updatedCartItems = [...cartItems];
        updatedCartItems[existingItemIndex] = cartItem;
        setCartItems(updatedCartItems);
      } else {
        // Add new item
        setCartItems([...cartItems, cartItem]);
      }
      
      return cartItem;
    } catch (err: any) {
      setError(err.message || 'Failed to add to cart');
      throw err;
    }
  };
  
  const updateCartItemQuantity = async (cartItemId: string, quantity: number) => {
    try {
      setError(null);
      await firebaseServices.cartService.updateCartItemQuantity(cartItemId, quantity);
      
      // Update local state
      setCartItems(
        cartItems.map(item => 
          item.id === cartItemId 
            ? { ...item, quantity, updatedAt: new Date() } 
            : item
        )
      );
    } catch (err: any) {
      setError(err.message || 'Failed to update cart item quantity');
      throw err;
    }
  };
  
  const removeFromCart = async (cartItemId: string) => {
    try {
      setError(null);
      await firebaseServices.cartService.removeFromCart(cartItemId);
      
      // Update local state
      setCartItems(cartItems.filter(item => item.id !== cartItemId));
    } catch (err: any) {
      setError(err.message || 'Failed to remove from cart');
      throw err;
    }
  };
  
  const getCartItems = async () => {
    if (!currentUser) {
      setError('No user is signed in');
      throw new Error('No user is signed in');
    }
    
    try {
      setError(null);
      const items = await firebaseServices.cartService.getCartItems(currentUser.uid);
      setCartItems(items);
      return items;
    } catch (err: any) {
      setError(err.message || 'Failed to get cart items');
      throw err;
    }
  };
  
  const clearCart = async () => {
    if (!currentUser) {
      setError('No user is signed in');
      throw new Error('No user is signed in');
    }
    
    try {
      setError(null);
      await firebaseServices.cartService.clearCart(currentUser.uid);
      
      // Update local state
      setCartItems([]);
    } catch (err: any) {
      setError(err.message || 'Failed to clear cart');
      throw err;
    }
  };
  
  // Order methods
  const createOrder = async (
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
  ) => {
    if (!currentUser) {
      setError('No user is signed in');
      throw new Error('No user is signed in');
    }
    
    try {
      setError(null);
      const order = await firebaseServices.orderService.createOrder(
        currentUser.uid,
        cartItems,
        subtotal,
        discount,
        deliveryCharge,
        total,
        paymentMethod,
        shippingAddress
      );
      
      // Update local state
      setOrders([order, ...orders]);
      setCartItems([]);
      
      return order;
    } catch (err: any) {
      setError(err.message || 'Failed to create order');
      throw err;
    }
  };
  
  const getUserOrders = async () => {
    if (!currentUser) {
      setError('No user is signed in');
      throw new Error('No user is signed in');
    }
    
    try {
      setError(null);
      const userOrders = await firebaseServices.orderService.getUserOrders(currentUser.uid);
      setOrders(userOrders);
      return userOrders;
    } catch (err: any) {
      setError(err.message || 'Failed to get orders');
      throw err;
    }
  };
  
  const getOrderById = async (orderId: string) => {
    try {
      setError(null);
      return await firebaseServices.orderService.getOrderById(orderId);
    } catch (err: any) {
      setError(err.message || 'Failed to get order');
      throw err;
    }
  };
  
  const value = {
    currentUser,
    userProfile,
    isLoading,
    error,
    
    signIn,
    signUp,
    signOut: signOutUser,
    resetPassword,
    
    updateProfile,
    
    warrantyPlans,
    userPlans,
    
    purchasePlan,
    
    kitchenDetails,
    
    saveKitchenDetails,
    
    serviceRequests,
    
    createServiceRequest,
    
    contracts,
    
    generateContract,
    
    acceptContract,
    
    products,
    
    getProducts,
    getProductsByCategory,
    getProductById,
    
    cartItems,
    
    addToCart,
    updateCartItemQuantity,
    removeFromCart,
    getCartItems,
    clearCart,
    
    orders,
    
    createOrder,
    getUserOrders,
    getOrderById,
  };
  
  return (
    <FirebaseContext.Provider value={value}>
      {children}
    </FirebaseContext.Provider>
  );
};

// Custom hook to use the Firebase context
export const useFirebase = () => useContext(FirebaseContext);

export default FirebaseContext;
