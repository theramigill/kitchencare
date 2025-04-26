import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { colors, typography, spacing, borderRadius } from '../../theme/colors';

// This is a mockup component to demonstrate the onboarding screen design
const OnboardingScreen = () => {
  return (
    <View style={styles.container}>
      {/* Header with logo */}
      <View style={styles.header}>
        <Image 
          source={require('../../assets/images/logo-placeholder.png')} 
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.appName}>KitchenCare+</Text>
      </View>
      
      {/* Main content */}
      <View style={styles.content}>
        <Text style={styles.title}>Premium Kitchen Care</Text>
        <Text style={styles.subtitle}>
          Protect your modular kitchen with our premium warranty and service plans
        </Text>
        
        <View style={styles.imageContainer}>
          {/* Placeholder for kitchen image */}
          <View style={styles.imagePlaceholder}>
            <Text style={styles.placeholderText}>Kitchen Image</Text>
          </View>
        </View>
        
        <View style={styles.features}>
          <View style={styles.featureItem}>
            <View style={[styles.featureIcon, { backgroundColor: colors.primary }]}>
              <Text style={styles.featureIconText}>✓</Text>
            </View>
            <Text style={styles.featureText}>Expert technicians</Text>
          </View>
          
          <View style={styles.featureItem}>
            <View style={[styles.featureIcon, { backgroundColor: colors.secondary }]}>
              <Text style={styles.featureIconText}>✓</Text>
            </View>
            <Text style={styles.featureText}>Quick service response</Text>
          </View>
          
          <View style={styles.featureItem}>
            <View style={[styles.featureIcon, { backgroundColor: colors.primary }]}>
              <Text style={styles.featureIconText}>✓</Text>
            </View>
            <Text style={styles.featureText}>Genuine parts replacement</Text>
          </View>
        </View>
      </View>
      
      {/* Bottom buttons */}
      <View style={styles.footer}>
        <TouchableOpacity style={[styles.button, styles.secondaryButton]}>
          <Text style={styles.secondaryButtonText}>Sign In</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={[styles.button, styles.primaryButton]}>
          <Text style={styles.primaryButtonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.lg,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.xl,
  },
  logo: {
    width: 40,
    height: 40,
  },
  appName: {
    fontSize: typography.fontSize.lg,
    fontWeight: 'bold',
    color: colors.primary,
    marginLeft: spacing.sm,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: spacing.xl,
  },
  title: {
    fontSize: typography.fontSize.xxxl,
    fontWeight: 'bold',
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  subtitle: {
    fontSize: typography.fontSize.md,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  imageContainer: {
    width: '100%',
    aspectRatio: 16/9,
    marginBottom: spacing.xl,
    borderRadius: borderRadius.md,
    overflow: 'hidden',
  },
  imagePlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.divider,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    color: colors.textLight,
    fontSize: typography.fontSize.md,
  },
  features: {
    width: '100%',
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  featureIcon: {
    width: 24,
    height: 24,
    borderRadius: borderRadius.round,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  featureIconText: {
    color: colors.background,
    fontSize: typography.fontSize.sm,
    fontWeight: 'bold',
  },
  featureText: {
    fontSize: typography.fontSize.md,
    color: colors.textPrimary,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.xl,
  },
  button: {
    flex: 1,
    height: 50,
    borderRadius: borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: spacing.xs,
  },
  primaryButton: {
    backgroundColor: colors.primary,
  },
  primaryButtonText: {
    color: colors.background,
    fontSize: typography.fontSize.md,
    fontWeight: 'bold',
  },
  secondaryButton: {
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  secondaryButtonText: {
    color: colors.primary,
    fontSize: typography.fontSize.md,
    fontWeight: 'bold',
  },
});

export default OnboardingScreen;
