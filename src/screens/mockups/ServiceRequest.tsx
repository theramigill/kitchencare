import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { colors, typography, spacing, borderRadius, shadows } from '../../theme/colors';

// This is a mockup component to demonstrate the service request screen
const ServiceRequestScreen = () => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Request Service</Text>
        <View style={styles.placeholder} />
      </View>
      
      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Raise a Service Request</Text>
        <Text style={styles.subtitle}>
          Tell us what needs attention in your kitchen
        </Text>
        
        {/* Service Type Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Service Type</Text>
          <View style={styles.serviceTypeContainer}>
            <TouchableOpacity style={[styles.serviceTypeCard, styles.serviceTypeSelected]}>
              <View style={styles.serviceTypeIcon}>
                <Text style={styles.serviceTypeIconText}>🔧</Text>
              </View>
              <Text style={styles.serviceTypeText}>Plumbing</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.serviceTypeCard}>
              <View style={styles.serviceTypeIcon}>
                <Text style={styles.serviceTypeIconText}>🪑</Text>
              </View>
              <Text style={styles.serviceTypeText}>Cabinet</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.serviceTypeCard}>
              <View style={styles.serviceTypeIcon}>
                <Text style={styles.serviceTypeIconText}>🍳</Text>
              </View>
              <Text style={styles.serviceTypeText}>Appliance</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.serviceTypeCard}>
              <View style={styles.serviceTypeIcon}>
                <Text style={styles.serviceTypeIconText}>💨</Text>
              </View>
              <Text style={styles.serviceTypeText}>Chimney</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.serviceTypeCard}>
              <View style={styles.serviceTypeIcon}>
                <Text style={styles.serviceTypeIconText}>⚡</Text>
              </View>
              <Text style={styles.serviceTypeText}>Electrical</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.serviceTypeCard}>
              <View style={styles.serviceTypeIcon}>
                <Text style={styles.serviceTypeIconText}>🔍</Text>
              </View>
              <Text style={styles.serviceTypeText}>Other</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        {/* Issue Description */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Describe the Issue</Text>
          <View style={styles.textAreaContainer}>
            <TextInput
              style={styles.textArea}
              multiline={true}
              numberOfLines={5}
              placeholder="Please describe the problem in detail..."
              placeholderTextColor={colors.textLight}
            />
          </View>
        </View>
        
        {/* Upload Photos */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Upload Photos</Text>
          <Text style={styles.sectionSubtitle}>
            Add photos of the issue to help our technicians prepare
          </Text>
          
          <View style={styles.photoUploadContainer}>
            <TouchableOpacity style={styles.photoUploadButton}>
              <Text style={styles.photoUploadButtonText}>+</Text>
              <Text style={styles.photoUploadLabel}>Add Photo</Text>
            </TouchableOpacity>
            
            {/* Placeholder for uploaded photos */}
            <View style={styles.uploadedPhotosPlaceholder}>
              <Text style={styles.uploadedPhotosText}>Photos will appear here</Text>
            </View>
          </View>
        </View>
        
        {/* Preferred Date and Time */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferred Date & Time</Text>
          
          <View style={styles.dateTimeContainer}>
            <TouchableOpacity style={styles.datePickerButton}>
              <Text style={styles.datePickerLabel}>Select Date</Text>
              <Text style={styles.datePickerValue}>Apr 25, 2025</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.timePickerButton}>
              <Text style={styles.timePickerLabel}>Select Time</Text>
              <Text style={styles.timePickerValue}>Morning (9AM-12PM)</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        {/* Contact Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact Information</Text>
          
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Contact Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Your Name"
              placeholderTextColor={colors.textLight}
            />
          </View>
          
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Phone Number</Text>
            <TextInput
              style={styles.input}
              placeholder="Your Phone Number"
              placeholderTextColor={colors.textLight}
              keyboardType="phone-pad"
            />
          </View>
          
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Alternate Phone (Optional)</Text>
            <TextInput
              style={styles.input}
              placeholder="Alternate Phone Number"
              placeholderTextColor={colors.textLight}
              keyboardType="phone-pad"
            />
          </View>
        </View>
        
        {/* Submit Button */}
        <TouchableOpacity style={styles.submitButton}>
          <Text style={styles.submitButtonText}>Submit Request</Text>
        </TouchableOpacity>
        
        <View style={styles.disclaimer}>
          <Text style={styles.disclaimerText}>
            * Service requests are subject to your active warranty plan coverage.
            Our team will contact you to confirm the appointment.
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
  section: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  sectionSubtitle: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    marginBottom: spacing.md,
  },
  serviceTypeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  serviceTypeCard: {
    width: '30%',
    backgroundColor: colors.background,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  serviceTypeSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.divider,
  },
  serviceTypeIcon: {
    width: 50,
    height: 50,
    borderRadius: borderRadius.round,
    backgroundColor: colors.divider,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  serviceTypeIconText: {
    fontSize: typography.fontSize.xl,
  },
  serviceTypeText: {
    fontSize: typography.fontSize.sm,
    color: colors.textPrimary,
    textAlign: 'center',
  },
  textAreaContainer: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.md,
    backgroundColor: colors.background,
  },
  textArea: {
    padding: spacing.md,
    fontSize: typography.fontSize.md,
    color: colors.textPrimary,
    textAlignVertical: 'top',
    minHeight: 120,
  },
  photoUploadContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  photoUploadButton: {
    width: 100,
    height: 100,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  photoUploadButtonText: {
    fontSize: typography.fontSize.xxxl,
    color: colors.primary,
  },
  photoUploadLabel: {
    fontSize: typography.fontSize.xs,
    color: colors.primary,
  },
  uploadedPhotosPlaceholder: {
    flex: 1,
    height: 100,
    borderRadius: borderRadius.md,
    backgroundColor: colors.divider,
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadedPhotosText: {
    fontSize: typography.fontSize.sm,
    color: colors.textLight,
  },
  dateTimeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  datePickerButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginRight: spacing.md,
  },
  datePickerLabel: {
    fontSize: typography.fontSize.xs,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  datePickerValue: {
    fontSize: typography.fontSize.md,
    color: colors.textPrimary,
  },
  timePickerButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.md,
    padding: spacing.md,
  },
  timePickerLabel: {
    fontSize: typography.fontSize.xs,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  timePickerValue: {
    fontSize: typography.fontSize.md,
    color: colors.textPrimary,
  },
  inputContainer: {
    marginBottom: spacing.md,
  },
  inputLabel: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    fontSize: typography.fontSize.md,
    color: colors.textPrimary,
  },
  submitButton: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.md,
    paddingVertical: spacing.lg,
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  submitButtonText: {
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

export default ServiceRequestScreen;
