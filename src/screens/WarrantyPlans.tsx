import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Card, Button, Divider, Title, Paragraph } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../theme/colors';
import { platformStyles } from '../theme/platformStyles';

const WarrantyPlans = () => {
  const navigation = useNavigation();
  const [selectedPlan, setSelectedPlan] = useState(null);

  const plans = [
    {
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
    },
    {
      id: '3year',
      title: '3 Year Premium',
      price: '₹7,999',
      coverage: [
        'All parts and labor for repairs',
        'Priority technical support',
        '4 service visits per year',
        'Emergency repairs (24-hour response)',
        'Annual preventive maintenance',
        'One-time replacement if unrepairable'
      ],
      appliances: {
        chimney: ['Motor issues', 'Electrical components', 'Filter replacements', 'Control panel issues'],
        hob: ['Burner problems', 'Gas leakage issues', 'Ignition failures', 'Control knob replacements'],
        microwave: ['Heating elements', 'Electronic controls', 'Door mechanisms', 'Interior lighting'],
        cooktop: ['Surface damage (non-cosmetic)', 'Heating elements', 'Temperature controls', 'Electrical components']
      },
      exclusions: [
        'Cosmetic damage',
        'Unauthorized repairs',
        'Damage from misuse or accidents'
      ]
    },
    {
      id: '5year',
      title: '5 Year Elite',
      price: '₹12,999',
      coverage: [
        'Complete parts and labor coverage',
        'VIP technical support',
        'Unlimited service visits',
        'Emergency repairs (12-hour response)',
        'Bi-annual preventive maintenance',
        'One-time replacement if unrepairable',
        'Extended hours service availability'
      ],
      appliances: {
        chimney: ['Full coverage for all components', 'Annual filter replacement included'],
        hob: ['Full coverage for all components', 'Annual safety inspection included'],
        microwave: ['Full coverage for all components', 'Annual calibration included'],
        cooktop: ['Full coverage for all components', 'Annual inspection included']
      },
      exclusions: [
        'Intentional damage',
        'Unauthorized modifications'
      ]
    },
    {
      id: '10year',
      title: '10 Year Ultimate',
      price: '₹19,999',
      coverage: [
        'Lifetime parts and labor coverage',
        'Dedicated support representative',
        'Unlimited service visits',
        'Emergency repairs (6-hour response)',
        'Quarterly preventive maintenance',
        'Two-time replacement if unrepairable',
        '24/7 service availability',
        'Coverage transferable to new owner'
      ],
      appliances: {
        chimney: ['Complete coverage with no exceptions', 'Bi-annual filter replacement included'],
        hob: ['Complete coverage with no exceptions', 'Bi-annual safety inspection included'],
        microwave: ['Complete coverage with no exceptions', 'Bi-annual calibration included'],
        cooktop: ['Complete coverage with no exceptions', 'Bi-annual inspection included']
      },
      exclusions: [
        'Intentional damage only'
      ]
    }
  ];

  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan);
    navigation.navigate('DigitalContract', { plan });
  };

  const renderPlanCard = (plan) => {
    const isSelected = selectedPlan && selectedPlan.id === plan.id;
    
    return (
      <Card 
        key={plan.id} 
        style={[styles.planCard, isSelected && styles.selectedCard]}
        elevation={3}
      >
        <Card.Content>
          <Title style={styles.planTitle}>{plan.title}</Title>
          <Text style={styles.planPrice}>{plan.price}</Text>
          <Divider style={styles.divider} />
          
          <Text style={styles.sectionTitle}>Coverage Includes:</Text>
          {plan.coverage.map((item, index) => (
            <View key={index} style={styles.coverageItem}>
              <Text style={styles.bulletPoint}>•</Text>
              <Text style={styles.coverageText}>{item}</Text>
            </View>
          ))}
          
          <Divider style={styles.divider} />
          
          <Text style={styles.sectionTitle}>Appliance Coverage:</Text>
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
          
          <Text style={styles.sectionTitle}>Not Covered:</Text>
          {plan.exclusions.map((item, index) => (
            <Text key={index} style={styles.exclusionItem}>- {item}</Text>
          ))}
        </Card.Content>
        
        <Card.Actions style={styles.cardActions}>
          <Button 
            mode="contained" 
            style={styles.selectButton}
            onPress={() => handleSelectPlan(plan)}
          >
            Select Plan
          </Button>
        </Card.Actions>
      </Card>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image 
          source={require('../assets/images/warranty-icon.png')} 
          style={styles.headerImage}
          resizeMode="contain"
        />
        <Text style={styles.headerTitle}>KitchenCare+ Warranty Plans</Text>
        <Text style={styles.headerSubtitle}>
          Premium protection for your kitchen appliances
        </Text>
      </View>
      
      <Text style={styles.introText}>
        Choose the perfect warranty plan for your kitchen appliances. All plans include expert technicians, genuine parts, and priority service.
      </Text>
      
      <View style={styles.plansContainer}>
        {plans.map(plan => renderPlanCard(plan))}
      </View>
      
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          All plans are service-based coverage agreements between Amaze Space and the client, not government insurance products.
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
    alignItems: 'center',
    padding: 20,
    backgroundColor: colors.primary,
  },
  headerImage: {
    width: 80,
    height: 80,
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.white,
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 16,
    color: colors.white,
    textAlign: 'center',
    opacity: 0.9,
  },
  introText: {
    fontSize: 16,
    lineHeight: 24,
    color: colors.textPrimary,
    textAlign: 'center',
    margin: 20,
  },
  plansContainer: {
    padding: 10,
  },
  planCard: {
    marginBottom: 20,
    borderRadius: 10,
    ...platformStyles.shadow,
  },
  selectedCard: {
    borderWidth: 2,
    borderColor: colors.primary,
  },
  planTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.primary,
  },
  planPrice: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.secondary,
    marginTop: 5,
  },
  divider: {
    marginVertical: 15,
    backgroundColor: colors.border,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: 10,
  },
  coverageItem: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  bulletPoint: {
    fontSize: 16,
    marginRight: 5,
    color: colors.primary,
  },
  coverageText: {
    fontSize: 14,
    color: colors.textPrimary,
    flex: 1,
  },
  applianceSection: {
    marginBottom: 10,
  },
  applianceTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: 5,
  },
  applianceItem: {
    fontSize: 14,
    color: colors.textPrimary,
    marginLeft: 10,
    marginBottom: 3,
  },
  exclusionItem: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 3,
  },
  cardActions: {
    justifyContent: 'center',
    padding: 10,
  },
  selectButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
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
});

export default WarrantyPlans;
