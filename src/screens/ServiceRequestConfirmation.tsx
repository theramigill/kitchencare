import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Card, Button, TextInput, Divider, Chip, ActivityIndicator } from 'react-native-paper';
import { useNavigation, useRoute } from '@react-navigation/native';
import { colors } from '../theme/colors';
import { platformStyles } from '../theme/platformStyles';
import { useFirebase } from '../services/firebase-context';

const ServiceRequestConfirmation = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { currentUser } = useFirebase();
  
  // Get request from route params or use default
  const request = route.params?.request || {
    appliance: 'chimney',
    applianceName: 'Kitchen Chimney',
    issueType: 'Not working',
    description: 'My kitchen chimney is not turning on. I've checked the power supply and it seems fine.',
    preferredDate: new Date(new Date().getTime() + 86400000), // Tomorrow
    preferredTime: '9:00 AM - 12:00 PM',
    serviceCharge: 499,
    status: 'pending',
    createdAt: new Date().toISOString()
  };
  
  const estimatedTime = route.params?.estimatedTime || '1-2 business days (24-48 hours)';
  
  const handleViewDetails = () => {
    navigation.navigate('ServiceRequestDetails', { requestId: 'sample-request-id' });
  };
  
  const handleNewRequest = () => {
    navigation.navigate('ServiceRequest');
  };
  
  const handleGoHome = () => {
    navigation.navigate('Home');
  };
  
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.successIconContainer}>
          <Text style={styles.successIcon}>✓</Text>
        </View>
        <Text style={styles.headerTitle}>Request Submitted</Text>
        <Text style={styles.headerSubtitle}>
          Your service request has been successfully submitted
        </Text>
      </View>
      
      <Card style={styles.confirmationCard}>
        <Card.Content>
          <Text style={styles.sectionTitle}>Service Request Details</Text>
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Request ID:</Text>
            <Text style={styles.detailValue}>SR-{new Date().getTime().toString().slice(-8)}</Text>
          </View>
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Appliance:</Text>
            <Text style={styles.detailValue}>{request.applianceName}</Text>
          </View>
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Issue Type:</Text>
            <Text style={styles.detailValue}>{request.issueType}</Text>
          </View>
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Preferred Date:</Text>
            <Text style={styles.detailValue}>
              {request.preferredDate.toDateString()}
            </Text>
          </View>
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Preferred Time:</Text>
            <Text style={styles.detailValue}>{request.preferredTime}</Text>
          </View>
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Service Charge:</Text>
            <Text style={styles.detailValue}>₹{request.serviceCharge}</Text>
          </View>
          
          <Divider style={styles.divider} />
          
          <View style={styles.statusSection}>
            <Text style={styles.statusLabel}>Status:</Text>
            <Chip style={styles.statusChip}>
              <Text style={styles.statusText}>Pending</Text>
            </Chip>
          </View>
          
          <View style={styles.timeframeContainer}>
            <Text style={styles.timeframeTitle}>Expected Service Timeframe:</Text>
            <Text style={styles.timeframeText}>{estimatedTime}</Text>
            <Text style={styles.timeframeNote}>
              Our service partner will contact you to confirm the exact appointment time.
            </Text>
          </View>
        </Card.Content>
      </Card>
      
      <Card style={styles.paymentCard}>
        <Card.Content>
          <Text style={styles.sectionTitle}>Payment Information</Text>
          
          <View style={styles.paymentRow}>
            <Text style={styles.paymentLabel}>Service Charge:</Text>
            <Text style={styles.paymentValue}>₹{request.serviceCharge}</Text>
          </View>
          
          <View style={styles.paymentRow}>
            <Text style={styles.paymentLabel}>Payment Method:</Text>
            <Text style={styles.paymentValue}>Pay on Service</Text>
          </View>
          
          <Text style={styles.paymentNote}>
            The service charge will be collected by our technician after the service is completed.
          </Text>
        </Card.Content>
      </Card>
      
      <View style={styles.actionContainer}>
        <Button 
          mode="contained" 
          onPress={handleViewDetails}
          style={styles.detailsButton}
        >
          View Request Details
        </Button>
        
        <Button 
          mode="outlined" 
          onPress={handleNewRequest}
          style={styles.newRequestButton}
        >
          Create New Request
        </Button>
        
        <Button 
          mode="text" 
          onPress={handleGoHome}
          style={styles.homeButton}
        >
          Go to Home
        </Button>
      </View>
      
      <View style={styles.footer}>
        <Text style={styles.footerTitle}>What happens next?</Text>
        
        <View style={styles.stepContainer}>
          <View style={styles.stepNumberContainer}>
            <Text style={styles.stepNumber}>1</Text>
          </View>
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Request Processing</Text>
            <Text style={styles.stepDescription}>
              Our team will review your request and assign a qualified technician.
            </Text>
          </View>
        </View>
        
        <View style={styles.stepContainer}>
          <View style={styles.stepNumberContainer}>
            <Text style={styles.stepNumber}>2</Text>
          </View>
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Technician Assignment</Text>
            <Text style={styles.stepDescription}>
              A service partner will be assigned to your request within 24 hours.
            </Text>
          </View>
        </View>
        
        <View style={styles.stepContainer}>
          <View style={styles.stepNumberContainer}>
            <Text style={styles.stepNumber}>3</Text>
          </View>
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Confirmation Call</Text>
            <Text style={styles.stepDescription}>
              The technician will call you to confirm the appointment time.
            </Text>
          </View>
        </View>
        
        <View style={styles.stepContainer}>
          <View style={styles.stepNumberContainer}>
            <Text style={styles.stepNumber}>4</Text>
          </View>
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Service Visit</Text>
            <Text style={styles.stepDescription}>
              The technician will visit your home to diagnose and fix the issue.
            </Text>
          </View>
        </View>
      </View>
      
      <View style={styles.supportContainer}>
        <Text style={styles.supportTitle}>Need Help?</Text>
        <Text style={styles.supportText}>
          If you have any questions about your service request, please contact our customer support.
        </Text>
        <Button 
          mode="text" 
          icon="phone"
          onPress={() => {}}
          style={styles.supportButton}
        >
          Contact Support
        </Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    padding: 20,
    backgroundColor: colors.primary,
    alignItems: 'center',
  },
  successIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  successIcon: {
    fontSize: 30,
    color: colors.success,
    fontWeight: 'bold',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.white,
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: colors.white,
    opacity: 0.9,
    textAlign: 'center',
  },
  confirmationCard: {
    margin: 15,
    borderRadius: 10,
    ...platformStyles.shadow,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: 15,
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  detailLabel: {
    fontSize: 14,
    color: colors.textSecondary,
    width: 120,
  },
  detailValue: {
    fontSize: 14,
    color: colors.textPrimary,
    flex: 1,
    fontWeight: 'bold',
  },
  divider: {
    marginVertical: 15,
    backgroundColor: colors.border,
  },
  statusSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  statusLabel: {
    fontSize: 14,
    color: colors.textSecondary,
    width: 120,
  },
  statusChip: {
    backgroundColor: colors.warningLight,
  },
  statusText: {
    color: colors.warning,
    fontWeight: 'bold',
  },
  timeframeContainer: {
    backgroundColor: colors.backgroundLight,
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
  },
  timeframeTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: 5,
  },
  timeframeText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 5,
  },
  timeframeNote: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  paymentCard: {
    margin: 15,
    borderRadius: 10,
    ...platformStyles.shadow,
  },
  paymentRow: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  paymentLabel: {
    fontSize: 14,
    color: colors.textSecondary,
    width: 120,
  },
  paymentValue: {
    fontSize: 14,
    color: colors.textPrimary,
    flex: 1,
    fontWeight: 'bold',
  },
  paymentNote: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 10,
  },
  actionContainer: {
    margin: 15,
  },
  detailsButton: {
    backgroundColor: colors.primary,
    marginBottom: 10,
    ...platformStyles.button,
  },
  newRequestButton: {
    borderColor: colors.primary,
    marginBottom: 10,
    ...platformStyles.button,
  },
  homeButton: {
    ...platformStyles.button,
  },
  footer: {
    margin: 15,
    padding: 15,
    backgroundColor: colors.backgroundLight,
    borderRadius: 10,
  },
  footerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: 15,
  },
  stepContainer: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  stepNumberContainer: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  stepNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.white,
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: 5,
  },
  stepDescription: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  supportContainer: {
    margin: 15,
    padding: 15,
    backgroundColor: colors.backgroundLight,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 30,
  },
  supportTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: 5,
  },
  supportText: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 15,
  },
  supportButton: {
    ...platformStyles.button,
  },
});

export default ServiceRequestConfirmation;
