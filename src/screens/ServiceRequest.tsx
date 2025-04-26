import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Card, Button, TextInput, Divider, Title, Paragraph, Chip } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../theme/colors';
import { platformStyles } from '../theme/platformStyles';
import { useFirebase } from '../services/firebase-context';

const ServiceRequest = () => {
  const navigation = useNavigation();
  const { currentUser, createServiceRequest } = useFirebase();
  
  const [selectedAppliance, setSelectedAppliance] = useState(null);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [description, setDescription] = useState('');
  const [preferredDate, setPreferredDate] = useState(null);
  const [preferredTime, setPreferredTime] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // Service charges based on appliance type
  const serviceCharges = {
    chimney: 499,
    hob: 599,
    microwave: 699,
    cooktop: 549,
    default: 499
  };
  
  // Available time slots
  const timeSlots = [
    '9:00 AM - 12:00 PM',
    '12:00 PM - 3:00 PM',
    '3:00 PM - 6:00 PM'
  ];
  
  // Appliance types
  const appliances = [
    { id: 'chimney', name: 'Kitchen Chimney', icon: 'chimney-icon.png' },
    { id: 'hob', name: 'Built-in Hob', icon: 'hob-icon.png' },
    { id: 'microwave', name: 'Microwave/Oven', icon: 'microwave-icon.png' },
    { id: 'cooktop', name: 'Cooktop', icon: 'cooktop-icon.png' }
  ];
  
  // Common issues by appliance type
  const issuesByAppliance = {
    chimney: [
      'Not working',
      'Low suction power',
      'Unusual noise',
      'Filter cleaning/replacement',
      'Control panel issues',
      'Other'
    ],
    hob: [
      'Burner not igniting',
      'Gas leakage',
      'Flame issues',
      'Control knob problems',
      'Glass surface damage',
      'Other'
    ],
    microwave: [
      'Not heating',
      'Unusual noise',
      'Door not closing properly',
      'Display not working',
      'Interior light issues',
      'Other'
    ],
    cooktop: [
      'Element not heating',
      'Temperature control issues',
      'Surface damage',
      'Power problems',
      'Control panel issues',
      'Other'
    ]
  };
  
  // Calculate minimum date (tomorrow)
  const getMinimumDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow;
  };
  
  // Calculate maximum date (14 days from now)
  const getMaximumDate = () => {
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 14);
    return maxDate;
  };
  
  const handleApplianceSelect = (appliance) => {
    setSelectedAppliance(appliance);
    setSelectedIssue(null); // Reset issue when appliance changes
  };
  
  const handleIssueSelect = (issue) => {
    setSelectedIssue(issue);
  };
  
  const handleDateSelect = (date) => {
    setPreferredDate(date);
    setShowDatePicker(false);
  };
  
  const handleTimeSelect = (time) => {
    setPreferredTime(time);
  };
  
  const handleSubmit = async () => {
    if (!selectedAppliance || !selectedIssue || !description || !preferredDate || !preferredTime) {
      // Show validation error
      return;
    }
    
    setLoading(true);
    
    try {
      const serviceRequest = {
        userId: currentUser.uid,
        appliance: selectedAppliance.id,
        applianceName: selectedAppliance.name,
        issueType: selectedIssue,
        description,
        preferredDate,
        preferredTime,
        serviceCharge: serviceCharges[selectedAppliance.id] || serviceCharges.default,
        status: 'pending',
        createdAt: new Date().toISOString()
      };
      
      await createServiceRequest(serviceRequest);
      
      // Navigate to confirmation screen
      navigation.navigate('ServiceConfirmation', { 
        request: serviceRequest,
        estimatedTime: '1-2 business days (24-48 hours)'
      });
    } catch (error) {
      console.error('Error submitting service request:', error);
      // Show error message
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Request Service</Text>
        <Text style={styles.headerSubtitle}>
          Professional service for your kitchen appliances
        </Text>
      </View>
      
      <Card style={styles.infoCard}>
        <Card.Content>
          <Text style={styles.infoTitle}>Service Visit Information</Text>
          <Text style={styles.infoText}>
            • Service visits have a minimal charge based on appliance type
          </Text>
          <Text style={styles.infoText}>
            • Expected service timeframe: 1-2 business days (24-48 hours)
          </Text>
          <Text style={styles.infoText}>
            • Service charges may be waived for premium warranty plans
          </Text>
        </Card.Content>
      </Card>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>1. Select Appliance</Text>
        <View style={styles.applianceContainer}>
          {appliances.map(appliance => (
            <TouchableOpacity
              key={appliance.id}
              style={[
                styles.applianceItem,
                selectedAppliance?.id === appliance.id && styles.selectedApplianceItem
              ]}
              onPress={() => handleApplianceSelect(appliance)}
            >
              <Image 
                source={require('../assets/images/placeholder.png')} 
                style={styles.applianceIcon}
              />
              <Text style={styles.applianceName}>{appliance.name}</Text>
              {selectedAppliance?.id === appliance.id && (
                <Text style={styles.serviceCharge}>
                  ₹{serviceCharges[appliance.id] || serviceCharges.default}
                </Text>
              )}
            </TouchableOpacity>
          ))}
        </View>
      </View>
      
      {selectedAppliance && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>2. Select Issue</Text>
          <View style={styles.issueContainer}>
            {issuesByAppliance[selectedAppliance.id].map((issue, index) => (
              <Chip
                key={index}
                selected={selectedIssue === issue}
                onPress={() => handleIssueSelect(issue)}
                style={[
                  styles.issueChip,
                  selectedIssue === issue && styles.selectedIssueChip
                ]}
                textStyle={selectedIssue === issue ? styles.selectedIssueText : styles.issueText}
              >
                {issue}
              </Chip>
            ))}
          </View>
        </View>
      )}
      
      {selectedIssue && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>3. Describe the Problem</Text>
          <TextInput
            mode="outlined"
            multiline
            numberOfLines={4}
            placeholder="Please provide details about the issue..."
            value={description}
            onChangeText={setDescription}
            style={styles.descriptionInput}
          />
        </View>
      )}
      
      {description.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>4. Select Preferred Date & Time</Text>
          
          <Text style={styles.fieldLabel}>Preferred Date:</Text>
          <TouchableOpacity
            style={styles.datePickerButton}
            onPress={() => setShowDatePicker(true)}
          >
            <Text style={styles.datePickerText}>
              {preferredDate ? preferredDate.toDateString() : 'Select a date'}
            </Text>
          </TouchableOpacity>
          
          <Text style={styles.fieldLabel}>Preferred Time:</Text>
          <View style={styles.timeSlotContainer}>
            {timeSlots.map((slot, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.timeSlot,
                  preferredTime === slot && styles.selectedTimeSlot
                ]}
                onPress={() => handleTimeSelect(slot)}
              >
                <Text style={[
                  styles.timeSlotText,
                  preferredTime === slot && styles.selectedTimeSlotText
                ]}>
                  {slot}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}
      
      {selectedAppliance && selectedIssue && description.length > 0 && preferredDate && preferredTime && (
        <View style={styles.summarySection}>
          <Text style={styles.summaryTitle}>Service Request Summary</Text>
          
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Appliance:</Text>
            <Text style={styles.summaryValue}>{selectedAppliance.name}</Text>
          </View>
          
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Issue:</Text>
            <Text style={styles.summaryValue}>{selectedIssue}</Text>
          </View>
          
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Preferred Date:</Text>
            <Text style={styles.summaryValue}>{preferredDate.toDateString()}</Text>
          </View>
          
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Preferred Time:</Text>
            <Text style={styles.summaryValue}>{preferredTime}</Text>
          </View>
          
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Service Charge:</Text>
            <Text style={styles.summaryValue}>₹{serviceCharges[selectedAppliance.id] || serviceCharges.default}</Text>
          </View>
          
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Expected Service:</Text>
            <Text style={styles.summaryValue}>1-2 business days (24-48 hours)</Text>
          </View>
          
          <Button
            mode="contained"
            loading={loading}
            disabled={loading}
            onPress={handleSubmit}
            style={styles.submitButton}
          >
            Submit Service Request
          </Button>
          
          <Text style={styles.disclaimer}>
            By submitting this request, you agree to the service charge and terms of service.
          </Text>
        </View>
      )}
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
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.white,
  },
  headerSubtitle: {
    fontSize: 16,
    color: colors.white,
    opacity: 0.9,
    marginTop: 5,
  },
  infoCard: {
    margin: 15,
    borderRadius: 10,
    ...platformStyles.shadow,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 10,
  },
  infoText: {
    fontSize: 14,
    color: colors.textPrimary,
    marginBottom: 5,
  },
  section: {
    padding: 15,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: 15,
  },
  applianceContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  applianceItem: {
    width: '48%',
    backgroundColor: colors.backgroundLight,
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: colors.border,
  },
  selectedApplianceItem: {
    borderColor: colors.primary,
    borderWidth: 2,
    backgroundColor: colors.primaryLight,
  },
  applianceIcon: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
  applianceName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.textPrimary,
    textAlign: 'center',
  },
  serviceCharge: {
    fontSize: 14,
    color: colors.secondary,
    fontWeight: 'bold',
    marginTop: 5,
  },
  issueContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  issueChip: {
    margin: 5,
    backgroundColor: colors.backgroundLight,
  },
  selectedIssueChip: {
    backgroundColor: colors.primary,
  },
  issueText: {
    color: colors.textPrimary,
  },
  selectedIssueText: {
    color: colors.white,
  },
  descriptionInput: {
    backgroundColor: colors.backgroundLight,
  },
  fieldLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: 10,
    marginTop: 15,
  },
  datePickerButton: {
    padding: 15,
    backgroundColor: colors.backgroundLight,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.border,
  },
  datePickerText: {
    fontSize: 16,
    color: colors.textPrimary,
  },
  timeSlotContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 5,
  },
  timeSlot: {
    padding: 10,
    backgroundColor: colors.backgroundLight,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.border,
    marginRight: 10,
    marginBottom: 10,
  },
  selectedTimeSlot: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  timeSlotText: {
    fontSize: 14,
    color: colors.textPrimary,
  },
  selectedTimeSlotText: {
    color: colors.white,
  },
  summarySection: {
    margin: 15,
    padding: 15,
    backgroundColor: colors.backgroundLight,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 15,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  summaryLabel: {
    fontSize: 14,
    color: colors.textSecondary,
    flex: 1,
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.textPrimary,
    flex: 2,
  },
  submitButton: {
    marginTop: 20,
    backgroundColor: colors.primary,
    ...platformStyles.button,
  },
  disclaimer: {
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 15,
  },
});

export default ServiceRequest;
