// Platform-specific theme styles for KitchenCare+ app
import { Platform, StyleSheet } from 'react-native';
import { colors } from './colors';

// Common styles
const commonStyles = {
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  card: {
    borderRadius: 10,
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16,
    backgroundColor: colors.white,
  },
  button: {
    borderRadius: 5,
    paddingVertical: 12,
  },
  shadow: {
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  input: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
  },
};

// iOS-specific styles
const iosStyles = {
  ...commonStyles,
  shadow: {
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  button: {
    ...commonStyles.button,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  input: {
    ...commonStyles.input,
    paddingVertical: 12, // iOS inputs typically have more padding
  },
  // iOS-specific styles for e-commerce components
  productCard: {
    borderRadius: 12,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  cartItem: {
    borderRadius: 12,
    marginVertical: 10,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
  },
  checkoutButton: {
    borderRadius: 8,
    paddingVertical: 14,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
};

// Android-specific styles
const androidStyles = {
  ...commonStyles,
  shadow: {
    elevation: 4,
  },
  button: {
    ...commonStyles.button,
    elevation: 3,
  },
  input: {
    ...commonStyles.input,
    paddingVertical: 8, // Android inputs typically have less padding
  },
  // Android-specific styles for e-commerce components
  productCard: {
    borderRadius: 8,
    elevation: 4,
  },
  cartItem: {
    borderRadius: 8,
    marginVertical: 8,
    elevation: 3,
  },
  checkoutButton: {
    borderRadius: 5,
    paddingVertical: 12,
    elevation: 5,
  },
};

// Export platform-specific styles
export const platformStyles = Platform.OS === 'ios' ? iosStyles : androidStyles;

// Export specific style creators for components that need more customization
export const createEcommerceStyles = (customColors = {}) => {
  const mergedColors = { ...colors, ...customColors };
  
  return StyleSheet.create({
    productImage: Platform.OS === 'ios' 
      ? {
          borderRadius: 12,
          overflow: 'hidden',
          aspectRatio: 1,
        }
      : {
          borderRadius: 8,
          overflow: 'hidden',
          aspectRatio: 1,
        },
    productTitle: Platform.OS === 'ios'
      ? {
          fontSize: 16,
          fontWeight: '600',
          marginTop: 10,
          marginBottom: 6,
        }
      : {
          fontSize: 15,
          fontWeight: 'bold',
          marginTop: 8,
          marginBottom: 4,
        },
    priceContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: Platform.OS === 'ios' ? 8 : 6,
    },
    discountPrice: {
      fontSize: Platform.OS === 'ios' ? 18 : 16,
      fontWeight: 'bold',
      color: mergedColors.primary,
    },
    originalPrice: {
      fontSize: Platform.OS === 'ios' ? 15 : 14,
      color: mergedColors.textSecondary,
      textDecorationLine: 'line-through',
      marginLeft: 8,
    },
    addToCartButton: Platform.OS === 'ios'
      ? {
          borderRadius: 8,
          paddingVertical: 12,
          backgroundColor: mergedColors.primary,
          shadowColor: mergedColors.primary,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.3,
          shadowRadius: 4,
        }
      : {
          borderRadius: 5,
          paddingVertical: 10,
          backgroundColor: mergedColors.primary,
          elevation: 3,
        },
  });
};

export default {
  platformStyles,
  createEcommerceStyles,
};
