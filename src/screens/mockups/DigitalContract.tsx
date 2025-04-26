import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { colors, typography, spacing, borderRadius, shadows } from '../../theme/colors';

// This is a mockup component to demonstrate the digital contract template
const DigitalContractScreen = () => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Service Agreement</Text>
        <View style={styles.placeholder} />
      </View>
      
      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.contractContainer}>
          {/* Contract Header */}
          <View style={styles.contractHeader}>
            <View style={styles.logoContainer}>
              <View style={styles.logoPlaceholder}>
                <Text style={styles.logoText}>Amaze Space</Text>
              </View>
            </View>
            <Text style={styles.contractTitle}>KitchenCare+ Service Agreement</Text>
            <Text style={styles.contractSubtitle}>Premium Kitchen Warranty & Service Plan</Text>
          </View>
          
          {/* Contract Details */}
          <View style={styles.contractSection}>
            <Text style={styles.sectionTitle}>AGREEMENT DETAILS</Text>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Agreement Number:</Text>
              <Text style={styles.detailValue}>KC-2025-04-24-1234</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Date of Issue:</Text>
              <Text style={styles.detailValue}>April 24, 2025</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Plan Type:</Text>
              <Text style={styles.detailValue}>3-Year Standard Protection</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Coverage Period:</Text>
              <Text style={styles.detailValue}>April 24, 2025 - April 23, 2028</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Amount Paid:</Text>
              <Text style={styles.detailValue}>₹12,999.00</Text>
            </View>
          </View>
          
          {/* Client Information */}
          <View style={styles.contractSection}>
            <Text style={styles.sectionTitle}>CLIENT INFORMATION</Text>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Client Name:</Text>
              <Text style={styles.detailValue}>Rahul Sharma</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Contact Number:</Text>
              <Text style={styles.detailValue}>+91 98765 43210</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Email Address:</Text>
              <Text style={styles.detailValue}>rahul.sharma@example.com</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Installation Address:</Text>
              <Text style={styles.detailValue}>123 Park Street, Apartment 4B, Mumbai, Maharashtra 400001</Text>
            </View>
          </View>
          
          {/* Kitchen Details */}
          <View style={styles.contractSection}>
            <Text style={styles.sectionTitle}>KITCHEN DETAILS</Text>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Kitchen Type:</Text>
              <Text style={styles.detailValue}>Modular Kitchen</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Installation Date:</Text>
              <Text style={styles.detailValue}>January 15, 2025</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Kitchen Size:</Text>
              <Text style={styles.detailValue}>10 x 12 ft</Text>
            </View>
            <View style={styles.kitchenImageContainer}>
              <View style={styles.kitchenImagePlaceholder}>
                <Text style={styles.placeholderText}>Kitchen Image</Text>
              </View>
            </View>
          </View>
          
          {/* Coverage Details */}
          <View style={styles.contractSection}>
            <Text style={styles.sectionTitle}>COVERAGE DETAILS</Text>
            <Text style={styles.coverageText}>
              This KitchenCare+ Service Agreement covers the following components and services:
            </Text>
            
            <View style={styles.coverageItem}>
              <Text style={styles.coverageBullet}>•</Text>
              <Text style={styles.coverageItemText}>Full parts coverage for cabinets, countertops, and hardware</Text>
            </View>
            <View style={styles.coverageItem}>
              <Text style={styles.coverageBullet}>•</Text>
              <Text style={styles.coverageItemText}>Plumbing fixtures and connections within the kitchen area</Text>
            </View>
            <View style={styles.coverageItem}>
              <Text style={styles.coverageBullet}>•</Text>
              <Text style={styles.coverageItemText}>Electrical fixtures and connections within the kitchen area</Text>
            </View>
            <View style={styles.coverageItem}>
              <Text style={styles.coverageBullet}>•</Text>
              <Text style={styles.coverageItemText}>Chimney and exhaust systems</Text>
            </View>
            <View style={styles.coverageItem}>
              <Text style={styles.coverageBullet}>•</Text>
              <Text style={styles.coverageItemText}>Up to 6 service visits during the coverage period</Text>
            </View>
            <View style={styles.coverageItem}>
              <Text style={styles.coverageBullet}>•</Text>
              <Text style={styles.coverageItemText}>Annual maintenance check-up</Text>
            </View>
            <View style={styles.coverageItem}>
              <Text style={styles.coverageBullet}>•</Text>
              <Text style={styles.coverageItemText}>Priority customer support</Text>
            </View>
          </View>
          
          {/* Terms and Conditions */}
          <View style={styles.contractSection}>
            <Text style={styles.sectionTitle}>TERMS AND CONDITIONS</Text>
            <Text style={styles.termsText}>
              1. This is a service-based coverage agreement between Amaze Space and the client, not a government insurance product.
            </Text>
            <Text style={styles.termsText}>
              2. Coverage is limited to manufacturing defects, normal wear and tear, and functional failures.
            </Text>
            <Text style={styles.termsText}>
              3. Damage caused by misuse, accidents, natural disasters, or unauthorized modifications is not covered.
            </Text>
            <Text style={styles.termsText}>
              4. Service requests must be submitted through the KitchenCare+ app or by contacting customer support.
            </Text>
            <Text style={styles.termsText}>
              5. Response time for service requests is typically within 48 hours.
            </Text>
            <Text style={styles.termsText}>
              6. This agreement can be renewed upon expiration at the then-current rates.
            </Text>
            <Text style={styles.termsText}>
              7. Amaze Space reserves the right to inspect the kitchen before approving certain repairs.
            </Text>
            <Text style={styles.termsText}>
              8. This agreement is non-transferable without written consent from Amaze Space.
            </Text>
          </View>
          
          {/* Signatures */}
          <View style={styles.contractSection}>
            <Text style={styles.sectionTitle}>SIGNATURES</Text>
            <Text style={styles.signatureText}>
              By clicking "I Accept" below, you acknowledge that you have read and agree to the terms and conditions of this service agreement.
            </Text>
            
            <View style={styles.signatureContainer}>
              <View style={styles.signatureParty}>
                <View style={styles.signaturePlaceholder}>
                  <Text style={styles.signaturePlaceholderText}>Client Signature</Text>
                </View>
                <Text style={styles.signatureName}>Rahul Sharma</Text>
                <Text style={styles.signatureDate}>Date: April 24, 2025</Text>
              </View>
              
              <View style={styles.signatureParty}>
                <View style={styles.signaturePlaceholder}>
                  <Text style={styles.signaturePlaceholderText}>Company Signature</Text>
                </View>
                <Text style={styles.signatureName}>Amaze Space</Text>
                <Text style={styles.signatureDate}>Date: April 24, 2025</Text>
              </View>
            </View>
          </View>
          
          {/* Accept Button */}
          <TouchableOpacity style={styles.acceptButton}>
            <Text style={styles.acceptButtonText}>I Accept the Agreement</Text>
          </TouchableOpacity>
          
          <View style={styles.disclaimer}>
            <Text style={styles.disclaimerText}>
              This document is legally binding upon acceptance. Please read all terms carefully before accepting.
            </Text>
          </View>
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
  contractContainer: {
    backgroundColor: colors.background,
    borderRadius: borderRadius.lg,
    ...shadows.small,
    marginBottom: spacing.xxl,
  },
  contractHeader: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
  logoContainer: {
    marginBottom: spacing.lg,
  },
  logoPlaceholder: {
    width: 120,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  logoText: {
    fontSize: typography.fontSize.lg,
    fontWeight: 'bold',
    color: colors.primary,
  },
  contractTitle: {
    fontSize: typography.fontSize.xxl,
    fontWeight: 'bold',
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  contractSubtitle: {
    fontSize: typography.fontSize.md,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  contractSection: {
    padding: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
  sectionTitle: {
    fontSize: typography.fontSize.md,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: spacing.md,
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: spacing.sm,
  },
  detailLabel: {
    flex: 1,
    fontSize: typography.fontSize.md,
    color: colors.textSecondary,
  },
  detailValue: {
    flex: 2,
    fontSize: typography.fontSize.md,
    color: colors.textPrimary,
    fontWeight: '500',
  },
  kitchenImageContainer: {
    marginTop: spacing.md,
  },
  kitchenImagePlaceholder: {
    width: '100%',
    height: 150,
    backgroundColor: colors.divider,
    borderRadius: borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    color: colors.textLight,
    fontSize: typography.fontSize.md,
  },
  coverageText: {
    fontSize: typography.fontSize.md,
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  coverageItem: {
    flexDirection: 'row',
    marginBottom: spacing.sm,
  },
  coverageBullet: {
    fontSize: typography.fontSize.md,
    color: colors.primary,
    marginRight: spacing.sm,
    width: 15,
  },
  coverageItemText: {
    flex: 1,
    fontSize: typography.fontSize.md,
    color: colors.textPrimary,
  },
  termsText: {
    fontSize: typography.fontSize.sm,
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  signatureText: {
    fontSize: typography.fontSize.md,
    color: colors.textPrimary,
    marginBottom: spacing.lg,
  },
  signatureContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  signatureParty: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: spacing.md,
  },
  signaturePlaceholder: {
    width: '100%',
    height: 60,
    borderBottomWidth: 1,
    borderBottomColor: colors.textPrimary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  signaturePlaceholderText: {
    fontSize: typography.fontSize.sm,
    color: colors.textLight,
  },
  signatureName: {
    fontSize: typography.fontSize.md,
    color: colors.textPrimary,
    fontWeight: '500',
    marginBottom: spacing.xs,
  },
  signatureDate: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
  },
  acceptButton: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.md,
    paddingVertical: spacing.lg,
    alignItems: 'center',
    margin: spacing.lg,
  },
  acceptButtonText: {
    color: colors.background,
    fontSize: typography.fontSize.md,
    fontWeight: 'bold',
  },
  disclaimer: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
  },
  disclaimerText: {
    fontSize: typography.fontSize.xs,
    color: colors.textLight,
    textAlign: 'center',
  },
});

export default DigitalContractScreen;
