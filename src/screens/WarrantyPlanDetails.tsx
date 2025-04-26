import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Card, Button, Divider, Title, Paragraph } from 'react-native-paper';
import { useNavigation, useRoute } from '@react-navigation/native';
import { colors } from '../theme/colors';
import { platformStyles } from '../theme/platformStyles';
import { useFirebase } from '../services/firebase-context';

const WarrantyPlanDetails = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { currentUser, purchaseWarrantyPlan } = useFirebase();
  
  const [loading, setLoading] = useState(false);
  const [kitchenDetails, setKitchenDetails] = useState(null);
  
  // Get plan from route params or use default
  const plan = route.params?.plan || {
    id: '1year',
    title: '1 Year Standard',
    price: '₹2,999',
    coverage: [
      'Parts and Labor for repairs',
      'Technical phone support',
      '2 service visits per year',
      'Emergency repairs (standard response)',
      '1 preventive maintenance check-up'
    ],
    appliances: {
      chimney: ['Motor issues', 'Electrical components', 'Filter replacements'],
      hob: ['Burner problems', 'Gas leakage issues', 'Ignition failures'],
      microwave: ['Heating elements', 'Electronic controls', 'Door mechanisms'],
      cooktop: ['Surface damage (non-cosmetic)', 'Heating elements', 'Control panel issues']
    },
    exclusions: [
      'Cosmetic damage',
      'Unauthorized repairs',
      'Normal wear and tear',
      'Damage from misuse or accidents'
    ]
  };
  
  useEffect(() => {
    // In a real app, this would fetch kitchen details from Firebase
    // const fetchKitchenDetails = async () => {
    //   try {
    //     const kitchenData = await getKitchenDetails(currentUser.uid);
    //     setKitchenDetails(kitchenData);
    //   } catch (error) {
    //     console.error('Error fetching kitchen details:', error);
    //   }
    // };
    // 
    // fetchKitchenDetails();
    
    // Using sample data for now
    setKitchenDetails({
      id: 'kitchen1',
      brand: 'Amaze Space',
      installationDate: '2023-10-15',
      address: '123 Main Street, Apartment 4B, Mumbai, Maharashtra 400001',
      appliances: [
        { type: 'chimney', brand: 'Amaze Space', model: 'Premium Auto-Clean' },
        { type: 'hob', brand: 'Amaze Space', model: '4 Burner Built-in' },
        { type: 'microwave', brand: 'Amaze Space', model: 'Convection 28L' }
      ],
      photos: ['kitchen_photo1.jpg', 'kitchen_photo2.jpg']
    });
  }, []);
  
  const handlePurchasePlan = async () => {
    if (!kitchenDetails) {
      navigation.navigate('KitchenRegistration');
      return;
    }
    
    setLoading(true);
    
    try {
      // In a real app, this would create a warranty plan in Firebase
      // await purchaseWarrantyPlan(currentUser.uid, plan.id, kitchenDetails.id);
      
      // Navigate to payment screen
      navigation.navigate('PaymentScreen', { 
        amount: parseInt(plan.price.replace(/[^\d]/g, '')),
        planId: plan.id,
        planTitle: plan.title,
        kitchenId: kitchenDetails.id,
        type: 'warranty'
      });
    } catch (error) {
      console.error('Error purchasing plan:', error);
      // Show error message
    } finally {
      setLoading(false);
    }
  };
  
  const handleRegisterKitchen = () => {
    navigation.navigate('KitchenRegistration');
  };
  
  if (!plan) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Plan not found</Text>
        <Button 
          mode="contained" 
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          Go Back
        </Button>
      </View>
    );
  }
  
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{plan.title}</Text>
        <Text style={styles.headerPrice}>{plan.price}</Text>
      </View>
      
      <Card style={styles.detailsCard}>
        <Card.Content>
          <Text style={styles.sectionTitle}>Plan Coverage</Text>
          {plan.coverage.map((item, index) => (
            <View key={index} style={styles.coverageItem}>
              <Text style={styles.bulletPoint}>•</Text>
              <Text style={styles.coverageText}>{item}</Text>
            </View>
          ))}
          
          <Divider style={styles.divider} />
          
          <Text style={styles.sectionTitle}>Appliance Coverage Details</Text>
          
          <View style={styles.applianceSection}>
            <Text style={styles.applianceTitle}>Kitchen Chimney:</Text>
            {plan.appliances.chimney.map((item, index) => (
              <Text key={index} style={styles.applianceItem}>- {item}</Text>
            ))}
          </View>
          
          <View style={styles.applianceSection}>
            <Text style={styles.applianceTitle}>Built-in Hob:</Text>
            {plan.appliances.hob.map((item, index) => (
              <Text key={index} style={styles.applianceItem}>- {item}</Text>
            ))}
          </View>
          
          <View style={styles.applianceSection}>
            <Text style={styles.applianceTitle}>Microwave/Oven:</Text>
            {plan.appliances.microwave.map((item, index) => (
              <Text key={index} style={styles.applianceItem}>- {item}</Text>
            ))}
          </View>
          
          <View style={styles.applianceSection}>
            <Text style={styles.applianceTitle}>Cooktop:</Text>
            {plan.appliances.cooktop.map((item, index) => (
              <Text key={index} style={styles.applianceItem}>- {item}</Text>
            ))}
          </View>
          
          <Divider style={styles.divider} />
          
          <Text style={styles.sectionTitle}>Not Covered</Text>
          {plan.exclusions.map((item, index) => (
            <Text key={index} style={styles.exclusionItem}>- {item}</Text>
          ))}
        </Card.Content>
      </Card>
      
      {kitchenDetails ? (
        <Card style={styles.kitchenCard}>
          <Card.Content>
            <Text style={styles.sectionTitle}>Your Registered Kitchen</Text>
            
            <View style={styles.kitchenDetail}>
              <Text style={styles.kitchenLabel}>Brand:</Text>
              <Text style={styles.kitchenValue}>{kitchenDetails.brand}</Text>
            </View>
            
            <View style={styles.kitchenDetail}>
              <Text style={styles.kitchenLabel}>Installation Date:</Text>
              <Text style={styles.kitchenValue}>
                {new Date(kitchenDetails.installationDate).toLocaleDateString()}
              </Text>
            </View>
            
            <View style={styles.kitchenDetail}>
              <Text style={styles.kitchenLabel}>Address:</Text>
              <Text style={styles.kitchenValue}>{kitchenDetails.address}</Text>
            </View>
            
            <Text style={styles.appliancesTitle}>Registered Appliances:</Text>
            {kitchenDetails.appliances.map((appliance, index) => (
              <View key={index} style={styles.applianceDetail}>
                <Text style={styles.applianceType}>
                  {appliance.type.charAt(0).toUpperCase() + appliance.type.slice(1)}:
                </Text>
                <Text style={styles.applianceInfo}>
                  {appliance.brand} {appliance.model}
                </Text>
              </View>
            ))}
          </Card.Content>
        </Card>
      ) : (
        <Card style={styles.noKitchenCard}>
          <Card.Content>
            <Text style={styles.noKitchenTitle}>No Kitchen Registered</Text>
            <Text style={styles.noKitchenText}>
              You need to register your kitchen details before purchasing a warranty plan.
            </Text>
            <Button 
              mode="contained" 
              onPress={handleRegisterKitchen}
              style={styles.registerButton}
            >
              Register Kitchen
            </Button>
          </Card.Content>
        </Card>
      )}
      
      <View style={styles.actionContainer}>
        <Button 
          mode="contained" 
          onPress={handlePurchasePlan}
          style={styles.purchaseButton}
          loading={loading}
          disabled={loading || !kitchenDetails}
        >
          Purchase Plan
        </Button>
        
        <Button 
          mode="outlined" 
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          Back to Plans
        </Button>
      </View>
      
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          This is a service-based coverage agreement between Amaze Space and the client, not a government insurance product.
        </Text>
        <Text style={styles.footerNote}>
          Terms and conditions apply. See contract for full details.
        </Text>
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
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.white,
    marginBottom: 5,
  },
  headerPrice: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.white,
  },
  detailsCard: {
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
  coverageItem: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  bulletPoint: {
    fontSize: 16,
    marginRight: 5,
    color: colors.primary,
  },
  coverageText: {
    fontSize: 16,
    color: colors.textPrimary,
    flex: 1,
  },
  divider: {
    marginVertical: 20,
    backgroundColor: colors.border,
  },
  applianceSection: {
    marginBottom: 15,
  },
  applianceTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: 5,
  },
  applianceItem: {
    fontSize: 14,
    color: colors.textPrimary,
    marginLeft: 10,
    marginBottom: 5,
  },
  exclusionItem: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 5,
  },
  kitchenCard: {
    margin: 15,
    borderRadius: 10,
    ...platformStyles.shadow,
  },
  kitchenDetail: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  kitchenLabel: {
    fontSize: 14,
    color: colors.textSecondary,
    width: 120,
  },
  kitchenValue: {
    fontSize: 14,
    color: colors.textPrimary,
    flex: 1,
    fontWeight: 'bold',
  },
  appliancesTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginTop: 15,
    marginBottom: 10,
  },
  applianceDetail: {
    flexDirection: 'row',
    marginBottom: 5,
    marginLeft: 10,
  },
  applianceType: {
    fontSize: 14,
    color: colors.textSecondary,
    width: 100,
  },
  applianceInfo: {
    fontSize: 14,
    color: colors.textPrimary,
    flex: 1,
  },
  noKitchenCard: {
    margin: 15,
    borderRadius: 10,
    backgroundColor: colors.backgroundLight,
    ...platformStyles.shadow,
  },
  noKitchenTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: 10,
  },
  noKitchenText: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 20,
  },
  registerButton: {
    backgroundColor: colors.secondary,
    ...platformStyles.button,
  },
  actionContainer: {
    margin: 15,
  },
  purchaseButton: {
    backgroundColor: colors.primary,
    marginBottom: 10,
    ...platformStyles.button,
  },
  backButton: {
    borderColor: colors.primary,
    ...platformStyles.button,
  },
  footer: {
    padding: 20,
    backgroundColor: colors.backgroundLight,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  footerText: {
    fontSize: 14,
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: 10,
  },
  footerNote: {
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  errorText: {
    fontSize: 18,
    color: colors.error,
    textAlign: 'center',
    margin: 20,
  },
});

export default WarrantyPlanDetails;
