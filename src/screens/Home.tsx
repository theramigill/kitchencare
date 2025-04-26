import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, spacing, borderRadius, shadows } from '../theme/colors';

type HomeScreenNavigationProp = StackNavigationProp<any>;

const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View>
            <Text style={styles.greeting}>Hello, Rahul</Text>
            <Text style={styles.subGreeting}>Welcome to KitchenCare+</Text>
          </View>
          <TouchableOpacity style={styles.notificationButton}>
            <Ionicons name="notifications-outline" size={24} color={colors.primary} />
            <View style={styles.notificationBadge} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Active Plan Card */}
        <View style={styles.planCard}>
          <View style={styles.planCardHeader}>
            <Text style={styles.planCardTitle}>Your Active Plan</Text>
            <TouchableOpacity>
              <Text style={styles.viewDetailsText}>View Details</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.planInfo}>
            <View style={styles.planTypeContainer}>
              <Text style={styles.planType}>3-Year Standard</Text>
              <View style={styles.planStatusContainer}>
                <View style={styles.planStatusDot} />
                <Text style={styles.planStatus}>Active</Text>
              </View>
            </View>
            <Text style={styles.planValidity}>Valid till: April 23, 2028</Text>
            <View style={styles.progressContainer}>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: '5%' }]} />
              </View>
              <Text style={styles.progressText}>3 months completed</Text>
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.quickActionsContainer}>
          <TouchableOpacity 
            style={styles.quickActionButton}
            onPress={() => navigation.navigate('ServiceRequest')}
          >
            <View style={[styles.quickActionIcon, { backgroundColor: colors.primary }]}>
              <Ionicons name="construct-outline" size={24} color={colors.background} />
            </View>
            <Text style={styles.quickActionText}>Request Service</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.quickActionButton}>
            <View style={[styles.quickActionIcon, { backgroundColor: colors.secondary }]}>
              <Ionicons name="document-text-outline" size={24} color={colors.background} />
            </View>
            <Text style={styles.quickActionText}>View Contract</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.quickActionButton}>
            <View style={[styles.quickActionIcon, { backgroundColor: colors.info }]}>
              <Ionicons name="chatbubble-outline" size={24} color={colors.background} />
            </View>
            <Text style={styles.quickActionText}>Contact Support</Text>
          </TouchableOpacity>
        </View>

        {/* Upcoming Service */}
        <Text style={styles.sectionTitle}>Upcoming Service</Text>
        <View style={styles.serviceCard}>
          <View style={styles.serviceCardHeader}>
            <View style={styles.serviceTypeIcon}>
              <Ionicons name="water-outline" size={24} color={colors.primary} />
            </View>
            <View style={styles.serviceInfo}>
              <Text style={styles.serviceType}>Plumbing Service</Text>
              <Text style={styles.serviceId}>ID: SRV-2025-0423</Text>
            </View>
            <TouchableOpacity style={styles.serviceStatusTag}>
              <Text style={styles.serviceStatusText}>Scheduled</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.serviceDivider} />
          
          <View style={styles.serviceDetails}>
            <View style={styles.serviceDetailItem}>
              <Ionicons name="calendar-outline" size={18} color={colors.textSecondary} />
              <Text style={styles.serviceDetailText}>April 28, 2025</Text>
            </View>
            <View style={styles.serviceDetailItem}>
              <Ionicons name="time-outline" size={18} color={colors.textSecondary} />
              <Text style={styles.serviceDetailText}>Morning (9AM-12PM)</Text>
            </View>
            <View style={styles.serviceDetailItem}>
              <Ionicons name="person-outline" size={18} color={colors.textSecondary} />
              <Text style={styles.serviceDetailText}>Technician: Amit Kumar</Text>
            </View>
          </View>
          
          <View style={styles.serviceActions}>
            <TouchableOpacity style={styles.serviceActionButton}>
              <Text style={styles.serviceActionText}>Reschedule</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.serviceActionButton, styles.serviceActionButtonPrimary]}>
              <Text style={styles.serviceActionTextPrimary}>View Details</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Upgrade Plan */}
        <Text style={styles.sectionTitle}>Upgrade Your Plan</Text>
        <TouchableOpacity 
          style={styles.upgradeBanner}
          onPress={() => navigation.navigate('WarrantyPlan')}
        >
          <View style={styles.upgradeContent}>
            <Text style={styles.upgradeTitle}>Get Premium Protection</Text>
            <Text style={styles.upgradeDescription}>
              Upgrade to our 5-Year Premium Plan for complete coverage and unlimited service visits
            </Text>
            <View style={styles.upgradeButton}>
              <Text style={styles.upgradeButtonText}>Explore Plans</Text>
              <Ionicons name="arrow-forward" size={16} color={colors.background} />
            </View>
          </View>
          <View style={styles.upgradeBadge}>
            <Text style={styles.upgradeBadgeText}>20% OFF</Text>
          </View>
        </TouchableOpacity>

        {/* Tips & Maintenance */}
        <Text style={styles.sectionTitle}>Kitchen Maintenance Tips</Text>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.tipsContainer}
        >
          <View style={styles.tipCard}>
            <View style={styles.tipImagePlaceholder}>
              <Text style={styles.tipImageText}>Tip Image</Text>
            </View>
            <View style={styles.tipContent}>
              <Text style={styles.tipTitle}>Clean Chimney Filters</Text>
              <Text style={styles.tipDescription}>
                Regular cleaning extends life and improves efficiency
              </Text>
            </View>
          </View>
          
          <View style={styles.tipCard}>
            <View style={styles.tipImagePlaceholder}>
              <Text style={styles.tipImageText}>Tip Image</Text>
            </View>
            <View style={styles.tipContent}>
              <Text style={styles.tipTitle}>Cabinet Care</Text>
              <Text style={styles.tipDescription}>
                Wipe with microfiber cloth to maintain finish
              </Text>
            </View>
          </View>
          
          <View style={styles.tipCard}>
            <View style={styles.tipImagePlaceholder}>
              <Text style={styles.tipImageText}>Tip Image</Text>
            </View>
            <View style={styles.tipContent}>
              <Text style={styles.tipTitle}>Sink Maintenance</Text>
              <Text style={styles.tipDescription}>
                Avoid harsh chemicals on steel sinks
              </Text>
            </View>
          </View>
        </ScrollView>
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
    backgroundColor: colors.background,
    paddingTop: spacing.xl * 2,
    paddingBottom: spacing.lg,
    paddingHorizontal: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
    ...shadows.small,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    fontSize: typography.fontSize.xl,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  subGreeting: {
    fontSize: typography.fontSize.md,
    color: colors.textSecondary,
  },
  notificationButton: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.round,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 10,
    height: 10,
    borderRadius: borderRadius.round,
    backgroundColor: colors.secondary,
    borderWidth: 2,
    borderColor: colors.background,
  },
  content: {
    flex: 1,
    padding: spacing.lg,
  },
  planCard: {
    backgroundColor: colors.background,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.xl,
    ...shadows.medium,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
  },
  planCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  planCardTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  viewDetailsText: {
    fontSize: typography.fontSize.sm,
    color: colors.primary,
  },
  planInfo: {
    marginBottom: spacing.sm,
  },
  planTypeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.xs,
  },
  planType: {
    fontSize: typography.fontSize.xl,
    fontWeight: 'bold',
    color: colors.primary,
  },
  planStatusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  planStatusDot: {
    width: 8,
    height: 8,
    borderRadius: borderRadius.round,
    backgroundColor: colors.success,
    marginRight: spacing.xs,
  },
  planStatus: {
    fontSize: typography.fontSize.sm,
    color: colors.success,
  },
  planValidity: {
    fontSize: typography.fontSize.md,
    color: colors.textSecondary,
    marginBottom: spacing.md,
  },
  progressContainer: {
    marginTop: spacing.sm,
  },
  progressBar: {
    height: 6,
    backgroundColor: colors.divider,
    borderRadius: borderRadius.round,
    marginBottom: spacing.xs,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: borderRadius.round,
  },
  progressText: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
  },
  sectionTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: spacing.md,
    marginTop: spacing.lg,
  },
  quickActionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quickActionButton: {
    alignItems: 'center',
    width: '30%',
  },
  quickActionIcon: {
    width: 60,
    height: 60,
    borderRadius: borderRadius.round,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.sm,
    ...shadows.small,
  },
  quickActionText: {
    fontSize: typography.fontSize.sm,
    color: colors.textPrimary,
    textAlign: 'center',
  },
  serviceCard: {
    backgroundColor: colors.background,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
    ...shadows.small,
  },
  serviceCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  serviceTypeIcon: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.round,
    backgroundColor: colors.divider,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  serviceInfo: {
    flex: 1,
  },
  serviceType: {
    fontSize: typography.fontSize.md,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  serviceId: {
    fontSize: typography.fontSize.xs,
    color: colors.textLight,
  },
  serviceStatusTag: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    backgroundColor: colors.info + '20', // 20% opacity
    borderRadius: borderRadius.round,
  },
  serviceStatusText: {
    fontSize: typography.fontSize.xs,
    color: colors.info,
    fontWeight: 'bold',
  },
  serviceDivider: {
    height: 1,
    backgroundColor: colors.divider,
    marginVertical: spacing.md,
  },
  serviceDetails: {
    marginBottom: spacing.md,
  },
  serviceDetailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  serviceDetailText: {
    fontSize: typography.fontSize.md,
    color: colors.textPrimary,
    marginLeft: spacing.sm,
  },
  serviceActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  serviceActionButton: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.md,
    marginLeft: spacing.sm,
  },
  serviceActionButtonPrimary: {
    backgroundColor: colors.primary,
  },
  serviceActionText: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
  },
  serviceActionTextPrimary: {
    fontSize: typography.fontSize.sm,
    color: colors.background,
    fontWeight: 'bold',
  },
  upgradeBanner: {
    backgroundColor: colors.primaryLight,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.xl,
    position: 'relative',
    overflow: 'hidden',
  },
  upgradeContent: {
    width: '80%',
  },
  upgradeTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: 'bold',
    color: colors.background,
    marginBottom: spacing.xs,
  },
  upgradeDescription: {
    fontSize: typography.fontSize.sm,
    color: colors.background,
    opacity: 0.9,
    marginBottom: spacing.md,
  },
  upgradeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.secondary,
    alignSelf: 'flex-start',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.round,
  },
  upgradeButtonText: {
    fontSize: typography.fontSize.sm,
    color: colors.background,
    fontWeight: 'bold',
    marginRight: spacing.xs,
  },
  upgradeBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: colors.secondary,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.round,
  },
  upgradeBadgeText: {
    fontSize: typography.fontSize.xs,
    color: colors.background,
    fontWeight: 'bold',
  },
  tipsContainer: {
    marginBottom: spacing.xl,
  },
  tipCard: {
    width: 200,
    backgroundColor: colors.background,
    borderRadius: borderRadius.lg,
    marginRight: spacing.md,
    ...shadows.small,
    overflow: 'hidden',
  },
  tipImagePlaceholder: {
    width: '100%',
    height: 100,
    backgroundColor: colors.divider,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tipImageText: {
    fontSize: typography.fontSize.md,
    color: colors.textLight,
  },
  tipContent: {
    padding: spacing.md,
  },
  tipTitle: {
    fontSize: typography.fontSize.md,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  tipDescription: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
  },
});

export default HomeScreen;
