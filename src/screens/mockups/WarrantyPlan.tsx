import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { colors, typography, spacing, borderRadius, shadows } from '../../theme/colors';

// This is a mockup component to demonstrate the warranty plan selection screen
const WarrantyPlanScreen = () => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Select Warranty Plan</Text>
        <View style={styles.placeholder} />
      </View>
      
      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Choose Your Protection Plan</Text>
        <Text style={styles.subtitle}>
          Select the perfect warranty plan for your premium kitchen
        </Text>
        
        {/* Plan Cards */}
        <View style={styles.planContainer}>
          {/* 1 Year Plan */}
          <TouchableOpacity style={[styles.planCard, styles.planCardBasic]}>
            <View style={styles.planHeader}>
              <Text style={styles.planTitle}>1 Year</Text>
              <Text style={styles.planSubtitle}>Basic Protection</Text>
            </View>
            <View style={styles.planPrice}>
              <Text style={styles.planPriceAmount}>₹4,999</Text>
              <Text style={styles.planPriceUnit}>/year</Text>
            </View>
            <View style={styles.planFeatures}>
              <View style={styles.planFeatureItem}>
                <Text style={styles.planFeatureIcon}>✓</Text>
                <Text style={styles.planFeatureText}>Essential parts coverage</Text>
              </View>
              <View style={styles.planFeatureItem}>
                <Text style={styles.planFeatureIcon}>✓</Text>
                <Text style={styles.planFeatureText}>2 service visits</Text>
              </View>
              <View style={styles.planFeatureItem}>
                <Text style={styles.planFeatureIcon}>✓</Text>
                <Text style={styles.planFeatureText}>Phone support</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.selectButton}>
              <Text style={styles.selectButtonText}>Select Plan</Text>
            </TouchableOpacity>
          </TouchableOpacity>
          
          {/* 3 Year Plan */}
          <TouchableOpacity style={[styles.planCard, styles.planCardStandard]}>
            <View style={styles.popularTag}>
              <Text style={styles.popularTagText}>POPULAR</Text>
            </View>
            <View style={styles.planHeader}>
              <Text style={styles.planTitle}>3 Years</Text>
              <Text style={styles.planSubtitle}>Standard Protection</Text>
            </View>
            <View style={styles.planPrice}>
              <Text style={styles.planPriceAmount}>₹12,999</Text>
              <Text style={styles.planPriceUnit}>/3 years</Text>
            </View>
            <View style={styles.planFeatures}>
              <View style={styles.planFeatureItem}>
                <Text style={styles.planFeatureIcon}>✓</Text>
                <Text style={styles.planFeatureText}>Full parts coverage</Text>
              </View>
              <View style={styles.planFeatureItem}>
                <Text style={styles.planFeatureIcon}>✓</Text>
                <Text style={styles.planFeatureText}>6 service visits</Text>
              </View>
              <View style={styles.planFeatureItem}>
                <Text style={styles.planFeatureIcon}>✓</Text>
                <Text style={styles.planFeatureText}>Priority support</Text>
              </View>
              <View style={styles.planFeatureItem}>
                <Text style={styles.planFeatureIcon}>✓</Text>
                <Text style={styles.planFeatureText}>Annual maintenance</Text>
              </View>
            </View>
            <TouchableOpacity style={[styles.selectButton, styles.selectButtonHighlighted]}>
              <Text style={styles.selectButtonTextHighlighted}>Select Plan</Text>
            </TouchableOpacity>
          </TouchableOpacity>
          
          {/* 5 Year Plan */}
          <TouchableOpacity style={[styles.planCard, styles.planCardPremium]}>
            <View style={styles.planHeader}>
              <Text style={styles.planTitle}>5 Years</Text>
              <Text style={styles.planSubtitle}>Premium Protection</Text>
            </View>
            <View style={styles.planPrice}>
              <Text style={styles.planPriceAmount}>₹19,999</Text>
              <Text style={styles.planPriceUnit}>/5 years</Text>
            </View>
            <View style={styles.planFeatures}>
              <View style={styles.planFeatureItem}>
                <Text style={styles.planFeatureIcon}>✓</Text>
                <Text style={styles.planFeatureText}>Complete coverage</Text>
              </View>
              <View style={styles.planFeatureItem}>
                <Text style={styles.planFeatureIcon}>✓</Text>
                <Text style={styles.planFeatureText}>Unlimited service visits</Text>
              </View>
              <View style={styles.planFeatureItem}>
                <Text style={styles.planFeatureIcon}>✓</Text>
                <Text style={styles.planFeatureText}>24/7 priority support</Text>
              </View>
              <View style={styles.planFeatureItem}>
                <Text style={styles.planFeatureIcon}>✓</Text>
                <Text style={styles.planFeatureText}>Bi-annual maintenance</Text>
              </View>
              <View style={styles.planFeatureItem}>
                <Text style={styles.planFeatureIcon}>✓</Text>
                <Text style={styles.planFeatureText}>Free upgrades</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.selectButton}>
              <Text style={styles.selectButtonText}>Select Plan</Text>
            </TouchableOpacity>
          </TouchableOpacity>
          
          {/* 10 Year Plan */}
          <TouchableOpacity style={[styles.planCard, styles.planCardUltimate]}>
            <View style={styles.planHeader}>
              <Text style={styles.planTitle}>10 Years</Text>
              <Text style={styles.planSubtitle}>Ultimate Protection</Text>
            </View>
            <View style={styles.planPrice}>
              <Text style={styles.planPriceAmount}>₹34,999</Text>
              <Text style={styles.planPriceUnit}>/10 years</Text>
            </View>
            <View style={styles.planFeatures}>
              <View style={styles.planFeatureItem}>
                <Text style={styles.planFeatureIcon}>✓</Text>
                <Text style={styles.planFeatureText}>Lifetime parts warranty</Text>
              </View>
              <View style={styles.planFeatureItem}>
                <Text style={styles.planFeatureIcon}>✓</Text>
                <Text style={styles.planFeatureText}>Unlimited service visits</Text>
              </View>
              <View style={styles.planFeatureItem}>
                <Text style={styles.planFeatureIcon}>✓</Text>
                <Text style={styles.planFeatureText}>VIP support</Text>
              </View>
              <View style={styles.planFeatureItem}>
                <Text style={styles.planFeatureIcon}>✓</Text>
                <Text style={styles.planFeatureText}>Quarterly maintenance</Text>
              </View>
              <View style={styles.planFeatureItem}>
                <Text style={styles.planFeatureIcon}>✓</Text>
                <Text style={styles.planFeatureText}>Free upgrades & renovations</Text>
              </View>
              <View style={styles.planFeatureItem}>
                <Text style={styles.planFeatureIcon}>✓</Text>
                <Text style={styles.planFeatureText}>Transferable warranty</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.selectButton}>
              <Text style={styles.selectButtonText}>Select Plan</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </View>
        
        <View style={styles.disclaimer}>
          <Text style={styles.disclaimerText}>
            * All plans include service-based coverage between Amaze Space and the client.
            This is not a government insurance product.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
    paddingBottom: spacing.md,
    backgroundColor: colors.background,
    ...shadows.small,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: typography.fontSize.xl,
    color: colors.primary,
  },
  headerTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    padding: spacing.lg,
  },
  title: {
    fontSize: typography.fontSize.xxl,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  subtitle: {
    fontSize: typography.fontSize.md,
    color: colors.textSecondary,
    marginBottom: spacing.xl,
  },
  planContainer: {
    marginBottom: spacing.xl,
  },
  planCard: {
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.xl,
    backgroundColor: colors.card,
    ...shadows.medium,
    position: 'relative',
    overflow: 'hidden',
  },
  planCardBasic: {
    borderLeftWidth: 4,
    borderLeftColor: colors.info,
  },
  planCardStandard: {
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
  },
  planCardPremium: {
    borderLeftWidth: 4,
    borderLeftColor: colors.secondary,
  },
  planCardUltimate: {
    borderLeftWidth: 4,
    borderLeftColor: '#9C27B0', // Purple for ultimate
  },
  popularTag: {
    position: 'absolute',
    top: 12,
    right: -30,
    backgroundColor: colors.secondary,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xs,
    transform: [{ rotate: '45deg' }],
    width: 120,
  },
  popularTagText: {
    color: colors.background,
    fontSize: typography.fontSize.xs,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  planHeader: {
    marginBottom: spacing.md,
  },
  planTitle: {
    fontSize: typography.fontSize.xl,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  planSubtitle: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
  },
  planPrice: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: spacing.lg,
  },
  planPriceAmount: {
    fontSize: typography.fontSize.xxxl,
    fontWeight: 'bold',
    color: colors.primary,
  },
  planPriceUnit: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
    marginLeft: spacing.xs,
  },
  planFeatures: {
    marginBottom: spacing.lg,
  },
  planFeatureItem: {
    flexDirection: 'row',
    marginBottom: spacing.sm,
  },
  planFeatureIcon: {
    fontSize: typography.fontSize.md,
    color: colors.success,
    marginRight: spacing.sm,
    fontWeight: 'bold',
  },
  planFeatureText: {
    fontSize: typography.fontSize.md,
    color: colors.textPrimary,
  },
  selectButton: {
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: borderRadius.md,
    paddingVertical: spacing.md,
    alignItems: 'center',
  },
  selectButtonText: {
    color: colors.primary,
    fontSize: typography.fontSize.md,
    fontWeight: 'bold',
  },
  selectButtonHighlighted: {
    backgroundColor: colors.primary,
    borderWidth: 0,
  },
  selectButtonTextHighlighted: {
    color: colors.background,
    fontSize: typography.fontSize.md,
    fontWeight: 'bold',
  },
  disclaimer: {
    marginBottom: spacing.xxl,
  },
  disclaimerText: {
    fontSize: typography.fontSize.xs,
    color: colors.textLight,
    textAlign: 'center',
  },
});

export default WarrantyPlanScreen;
