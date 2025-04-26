// Theme colors for KitchenCare+ app
// Based on Amaze Space brand colors (red, blue, white)

export const colors = {
  // Primary brand colors
  primary: '#0F75BC', // Blue from logo
  secondary: '#E31E24', // Red from logo
  background: '#FFFFFF', // White
  
  // UI variations
  primaryLight: '#3A97D4',
  primaryDark: '#0A5A8F',
  secondaryLight: '#F04C51',
  secondaryDark: '#B8181D',
  
  // Text colors
  textPrimary: '#333333',
  textSecondary: '#666666',
  textLight: '#999999',
  
  // Status colors
  success: '#4CAF50',
  warning: '#FFC107',
  error: '#F44336',
  info: '#2196F3',
  
  // UI elements
  border: '#E0E0E0',
  divider: '#F0F0F0',
  card: '#FFFFFF',
  disabled: '#CCCCCC',
  
  // Gradients
  gradientPrimary: ['#0F75BC', '#3A97D4'],
  gradientSecondary: ['#E31E24', '#F04C51'],
};

// Typography
export const typography = {
  fontFamily: {
    regular: 'System',
    medium: 'System-Medium',
    bold: 'System-Bold',
  },
  fontSize: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    xxxl: 32,
  },
};

// Spacing
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

// Border radius
export const borderRadius = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  round: 999,
};

// Shadows
export const shadows = {
  small: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },
  large: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
  },
};
