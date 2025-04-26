import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, spacing, borderRadius, shadows } from '../theme/colors';

type MyPlansScreenNavigationProp = StackNavigationProp<any>;

const MyPlansScreen = () => {
  const navigation = useNavigation<MyPlansScreenNavigationProp>();
  const [activeTab, setActiveTab] = useState('active');

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Plans</Text>
        <TouchableOpacity style={styles.headerButton}>
          <Ionicons name="filter-outline" size={24} color={colors.primary} />
        </TouchableOpacity>
      </View>

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tabButton, activeTab === 'active' && styles.activeTabButton]}
          onPress={() => setActiveTab('active')}
        >
          <Text style={[styles.tabText, activeTab === 'active' && styles.activeTabText]}>
            Active
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tabButton, activeTab === 'history' && styles.activeTabButton]}
          onPress={() => setActiveTab('history')}
        >
          <Text style={[styles.tabText, activeTab === 'history' && styles.activeTabText]}>
            History
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tabButton, activeTab === 'renewal' && styles.activeTabButton]}
          onPress={() => setActiveTab('renewal')}
        >
          <Text style={[styles.tabText, activeTab === 'renewal' && styles.activeTabText]}>
            Renewal
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {activeTab === 'active' && (
          <>
            {/* Active Plan Card */}
            <View style={styles.planCard}>
              <View style={styles.planCardHeader}>
                <View style={styles.planBadge}>
                  <Text style={styles.planBadgeText}>Standard</Text>
                </View>
                <View style={styles.planStatusContainer}>
                  <View style={styles.planStatusDot} />
                  <Text style={styles.planStatus}>Active</Text>
                </View>
              </View>
              
              <View style={styles.planDetails}>
                <Text style={styles.planTitle}>3-Year Standard Protection</Text>
                <Text style={styles.planDescription}>
                  Full parts coverage with 6 service visits and annual maintenance
                </Text>
                
                <View style={styles.planInfoRow}>
                  <View style={styles.planInfoItem}>
                    <Text style={styles.planInfoLabel}>Contract ID</Text>
                    <Text style={styles.planInfoValue}>KC-2025-04-24-1234</Text>
                  </View>
                  <View style={styles.planInfoItem}>
                    <Text style={styles.planInfoLabel}>Purchase Date</Text>
                    <Text style={styles.planInfoValue}>Apr 24, 2025</Text>
                  </View>
                </View>
                
                <View style={styles.planInfoRow}>
                  <View style={styles.planInfoItem}>
                    <Text style={styles.planInfoLabel}>Valid From</Text>
                    <Text style={styles.planInfoValue}>Apr 24, 2025</Text>
                  </View>
                  <View style={styles.planInfoItem}>
                    <Text style={styles.planInfoLabel}>Valid Till</Text>
                    <Text style={styles.planInfoValue}>Apr 23, 2028</Text>
                  </View>
                </View>
                
                <View style={styles.progressContainer}>
                  <View style={styles.progressHeader}>
                    <Text style={styles.progressTitle}>Plan Progress</Text>
                    <Text style={styles.progressPercentage}>5%</Text>
                  </View>
                  <View style={styles.progressBar}>
                    <View style={[styles.progressFill, { width: '5%' }]} />
                  </View>
                  <Text style={styles.progressText}>3 months completed of 36 months</Text>
                </View>
                
                <View style={styles.serviceUsageContainer}>
                  <Text style={styles.serviceUsageTitle}>Service Usage</Text>
                  <View style={styles.serviceUsageRow}>
                    <View style={styles.serviceUsageItem}>
                      <View style={styles.serviceUsageCircle}>
                        <Text style={styles.serviceUsageNumber}>1</Text>
                      </View>
                      <Text style={styles.serviceUsageLabel}>Used</Text>
                    </View>
                    <View style={styles.serviceUsageDivider} />
                    <View style={styles.serviceUsageItem}>
                      <View style={styles.serviceUsageCircle}>
                        <Text style={styles.serviceUsageNumber}>5</Text>
                      </View>
                      <Text style={styles.serviceUsageLabel}>Remaining</Text>
                    </View>
                    <View style={styles.serviceUsageDivider} />
                    <View style={styles.serviceUsageItem}>
                      <View style={styles.serviceUsageCircle}>
                        <Text style={styles.serviceUsageNumber}>6</Text>
                      </View>
                      <Text style={styles.serviceUsageLabel}>Total</Text>
                    </View>
                  </View>
                </View>
                
                <View style={styles.planActions}>
                  <TouchableOpacity 
                    style={styles.planActionButton}
                    onPress={() => navigation.navigate('ServiceRequest')}
                  >
                    <Ionicons name="construct-outline" size={18} color={colors.primary} />
                    <Text style={styles.planActionText}>Request Service</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity 
                    style={styles.planActionButton}
                    onPress={() => navigation.navigate('DigitalContract', { planType: '3-Year Standard' })}
                  >
                    <Ionicons name="document-text-outline" size={18} color={colors.primary} />
                    <Text style={styles.planActionText}>View Contract</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            
            {/* Kitchen Details */}
            <View style={styles.kitchenCard}>
              <Text style={styles.kitchenCardTitle}>Kitchen Details</Text>
              
              <View style={styles.kitchenImageContainer}>
                <View style={styles.kitchenImagePlaceholder}>
                  <Text style={styles.placeholderText}>Kitchen Image</Text>
                </View>
              </View>
              
              <View style={styles.kitchenDetails}>
                <View style={styles.kitchenDetailRow}>
                  <Text style={styles.kitchenDetailLabel}>Kitchen Type:</Text>
                  <Text style={styles.kitchenDetailValue}>Modular Kitchen</Text>
                </View>
                <View style={styles.kitchenDetailRow}>
                  <Text style={styles.kitchenDetailLabel}>Installation Date:</Text>
                  <Text style={styles.kitchenDetailValue}>January 15, 2025</Text>
                </View>
                <View style={styles.kitchenDetailRow}>
                  <Text style={styles.kitchenDetailLabel}>Kitchen Size:</Text>
                  <Text style={styles.kitchenDetailValue}>10 x 12 ft</Text>
                </View>
                <View style={styles.kitchenDetailRow}>
                  <Text style={styles.kitchenDetailLabel}>Location:</Text>
                  <Text style={styles.kitchenDetailValue}>Mumbai, Maharashtra</Text>
                </View>
              </View>
              
              <TouchableOpacity style={styles.editKitchenButton}>
                <Text style={styles.editKitchenButtonText}>Edit Kitchen Details</Text>
              </TouchableOpacity>
            </View>
            
            {/* Upgrade Banner */}
            <TouchableOpacity 
              style={styles.upgradeBanner}
              onPress={() => navigation.navigate('WarrantyPlan')}
            >
              <View style={styles.upgradeContent}>
                <Text style={styles.upgradeTitle}>Upgrade to Premium</Text>
                <Text style={styles.upgradeDescription}>
                  Get unlimited service visits and 24/7 priority support
                </Text>
                <View style={styles.upgradeButton}>
                  <Text style={styles.upgradeButtonText}>Upgrade Now</Text>
                </View>
              </View>
            </TouchableOpacity>
          </>
        )}
        
        {activeTab === 'history' && (
          <View style={styles.emptyStateContainer}>
            <Ionicons name="time-outline" size={64} color={colors.textLight} />
            <Text style={styles.emptyStateTitle}>No Plan History</Text>
            <Text style={styles.emptyStateDescription}>
              Your previous plan history will appear here once you have completed or renewed plans.
            </Text>
          </View>
        )}
        
        {activeTab === 'renewal' && (
          <View style={styles.renewalContainer}>
            <View style={styles.renewalCard}>
              <View style={styles.renewalHeader}>
                <Text style={styles.renewalTitle}>Plan Renewal</Text>
                <Text style={styles.renewalSubtitle}>Your current plan expires in 2 years and 9 months</Text>
              </View>
              
              <View style={styles.renewalOptions}>
                <Text style={styles.renewalOptionsTitle}>Renewal Options</Text>
                
                <TouchableOpacity style={styles.renewalOptionCard}>
                  <View style={styles.renewalOptionHeader}>
                    <Text style={styles.renewalOptionTitle}>Same Plan</Text>
                    <Text style={styles.renewalOptionPrice}>₹12,999</Text>
                  </View>
                  <Text style={styles.renewalOptionDescription}>
                    Renew with your current 3-Year Standard Protection plan
                  </Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={[styles.renewalOptionCard, styles.recommendedOption]}>
                  <View style={styles.recommendedTag}>
                    <Text style={styles.recommendedTagText}>RECOMMENDED</Text>
                  </View>
                  <View style={styles.renewalOptionHeader}>
                    <Text style={styles.renewalOptionTitle}>Upgrade to Premium</Text>
                    <Text style={styles.renewalOptionPrice}>₹19,999</Text>
                  </View>
                  <Text style={styles.renewalOptionDescription}>
                    Upgrade to 5-Year Premium Protection with unlimited service visits
                  </Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.renewalOptionCard}>
                  <View style={styles.renewalOptionHeader}>
                    <Text style={styles.renewalOptionTitle}>Ultimate Protection</Text>
                    <Text style={styles.renewalOptionPrice}>₹34,999</Text>
                  </View>
                  <Text style={styles.renewalOptionDescription}>
                    Get 10-Year Ultimate Protection with lifetime parts warranty
                  </Text>
                </TouchableOpacity>
              </View>
              
              <Text style={styles.renewalNote}>
                * Early renewal will extend your coverage period from the current expiration date
              </Text>
            </View>
          </View>
        )}
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
    paddingTop: spacing.xl * 2,
    paddingBottom: spacing.md,
    backgroundColor: colors.background,
  },
  headerTitle: {
    fontSize: typography.fontSize.xl,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.round,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
  tabButton: {
    paddingVertical: spacing.md,
    marginRight: spacing.xl,
  },
  activeTabButton: {
    borderBottomWidth: 2,
    borderBottomColor: colors.primary,
  },
  tabText: {
    fontSize: typography.fontSize.md,
    color: colors.textSecondary,
  },
  activeTabText: {
    color: colors.primary,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: spacing.lg,
  },
  planCard: {
    backgroundColor: colors.background,
    borderRadius: borderRadius.lg,
    marginBottom: spacing.xl,
    ...shadows.medium,
    overflow: 'hidden',
  },
  planCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  planBadge: {
    backgroundColor: colors.background,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.round,
  },
  planBadgeText: {
    fontSize: typography.fontSize.sm,
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
    backgroundColor: colors.background,
    marginRight: spacing.xs,
  },
  planStatus: {
    fontSize: typography.fontSize.sm,
    color: colors.background,
    fontWeight: 'bold',
  },
  planDetails: {
    padding: spacing.lg,
  },
  planTitle: {
    fontSize: typography.fontSize.xl,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  planDescription: {
    fontSize: typography.fontSize.md,
    color: colors.textSecondary,
    marginBottom: spacing.lg,
  },
  planInfoRow: {
    flexDirection: 'row',
    marginBottom: spacing.md,
  },
  planInfoItem: {
    flex: 1,
  },
  planInfoLabel: {
    fontSize: typography.fontSize.xs,
    color: colors.textLight,
    marginBottom: spacing.xs,
  },
  planInfoValue: {
    fontSize: typography.fontSize.md,
    color: colors.textPrimary,
    fontWeight: '500',
  },
  progressContainer: {
    marginVertical: spacing.lg,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  progressTitle: {
    fontSize: typography.fontSize.md,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  progressPercentage: {
    fontSize: typography.fontSize.md,
    fontWeight: 'bold',
    color: colors.primary,
  },
  progressBar: {
    height: 8,
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
  serviceUsageContainer: {
    marginBottom: spacing.lg,
  },
  serviceUsageTitle: {
    fontSize: typography.fontSize.md,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  serviceUsageRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  serviceUsageItem: {
    flex: 1,
    alignItems: 'center',
  },
  serviceUsageCircle: {
    width: 50,
    height: 50,
    borderRadius: borderRadius.round,
    backgroundColor: colors.divider,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  serviceUsageNumber: {
    fontSize: typography.fontSize.lg,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  serviceUsageLabel: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
  },
  serviceUsageDivider: {
    width: 1,
    height: 40,
    backgroundColor: colors.divider,
  },
  planActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.md,
  },
  planActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: borderRadius.md,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    flex: 1,
    marginHorizontal: spacing.xs,
  },
  planActionText: {
    fontSize: typography.fontSize.sm,
    color: colors.primary,
    fontWeight: 'bold',
    marginLeft: spacing.xs,
  },
  kitchenCard: {
    backgroundColor: colors.background,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.xl,
    ...shadows.small,
  },
  kitchenCardTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  kitchenImageContainer: {
    marginBottom: spacing.md,
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
  kitchenDetails: {
    marginBottom: spacing.lg,
  },
  kitchenDetailRow: {
    flexDirection: 'row',
    marginBottom: spacing.sm,
  },
  kitchenDetailLabel: {
    width: 120,
    fontSize: typography.fontSize.md,
    color: colors.textSecondary,
  },
  kitchenDetailValue: {
    flex: 1,
    fontSize: typography.fontSize.md,
    color: colors.textPrimary,
  },
  editKitchenButton: {
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: borderRadius.md,
    paddingVertical: spacing.md,
    alignItems: 'center',
  },
  editKitchenButtonText: {
    fontSize: typography.fontSize.md,
    color: colors.primary,
    fontWeight: 'bold',
  },
  upgradeBanner: {
    backgroundColor: colors.secondary,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.xl,
  },
  upgradeContent: {
    alignItems: 'center',
  },
  upgradeTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: 'bold',
    color: colors.background,
    marginBottom: spacing.xs,
  },
  upgradeDescription: {
    fontSize: typography.fontSize.md,
    color: colors.background,
    opacity: 0.9,
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  upgradeButton: {
    backgroundColor: colors.background,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.round,
  },
  upgradeButtonText: {
    fontSize: typography.fontSize.md,
    color: colors.secondary,
    fontWeight: 'bold',
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
    marginTop: spacing.xxl,
  },
  emptyStateTitle: {
    fontSize: typography.fontSize.xl,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
  },
  emptyStateDescription: {
    fontSize: typography.fontSize.md,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  renewalContainer: {
    padding: spacing.xs,
  },
  renewalCard: {
    backgroundColor: colors.background,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    ...shadows.medium,
  },
  renewalHeader: {
    marginBottom: spacing.lg,
  },
  renewalTitle: {
    fontSize: typography.fontSize.xl,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  renewalSubtitle: {
    fontSize: typography.fontSize.md,
    color: colors.textSecondary,
  },
  renewalOptions: {
    marginBottom: spacing.lg,
  },
  renewalOptionsTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  renewalOptionCard: {
    backgroundColor: colors.background,
    borderRadius: borderRadius.md,
    padding: spacing.lg,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    position: 'relative',
  },
  recommendedOption: {
    borderColor: colors.primary,
    borderWidth: 2,
  },
  recommendedTag: {
    position: 'absolute',
    top: -10,
    right: spacing.lg,
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.round,
  },
  recommendedTagText: {
    fontSize: typography.fontSize.xs,
    color: colors.background,
    fontWeight: 'bold',
  },
  renewalOptionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  renewalOptionTitle: {
    fontSize: typography.fontSize.md,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  renewalOptionPrice: {
    fontSize: typography.fontSize.md,
    fontWeight: 'bold',
    color: colors.primary,
  },
  renewalOptionDescription: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
  },
  renewalNote: {
    fontSize: typography.fontSize.xs,
    color: colors.textLight,
    fontStyle: 'italic',
  },
});

export default MyPlansScreen;
