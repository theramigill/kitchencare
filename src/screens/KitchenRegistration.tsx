import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Card, Button, TextInput, Divider, Title, Paragraph, Chip, ActivityIndicator } from 'react-native-paper';
import { useNavigation, useRoute } from '@react-navigation/native';
import { colors } from '../theme/colors';
import { platformStyles } from '../theme/platformStyles';
import { useFirebase } from '../services/firebase-context';

const KitchenRegistration = () => {
  const navigation = useNavigation();
  const { currentUser, registerKitchen } = useFirebase();
  
  const [brand, setBrand] = useState('');
  const [installationYear, setInstallationYear] = useState('');
  const [installationMonth, setInstallationMonth] = useState('');
  const [address, setAddress] = useState('');
  const [selectedAppliances, setSelectedAppliances] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  const years = Array.from({ length: 21 }, (_, i) => (new Date().getFullYear() - 20 + i).toString());
  
  const applianceTypes = [
    { id: 'chimney', name: 'Kitchen Chimney' },
    { id: 'hob', name: 'Built-in Hob' },
    { id: 'microwave', name: 'Built-in Microwave' },
    { id: 'oven', name: 'Built-in Oven' },
    { id: 'cooktop', name: 'Cooktop' }
  ];
  
  const handleApplianceToggle = (applianceId) => {
    if (selectedAppliances.includes(applianceId)) {
      setSelectedAppliances(selectedAppliances.filter(id => id !== applianceId));
    } else {
      setSelectedAppliances([...selectedAppliances, applianceId]);
    }
  };
  
  const handleAddPhoto = () => {
    // In a real app, this would use image picker
    // For now, just add a placeholder
    setPhotos([...photos, 'placeholder.jpg']);
  };
  
  const handleRemovePhoto = (index) => {
    const updatedPhotos = [...photos];
    updatedPhotos.splice(index, 1);
    setPhotos(updatedPhotos);
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!brand.trim()) {
      newErrors.brand = 'Brand is required';
    }
    
    if (!installationYear) {
      newErrors.installationYear = 'Installation year is required';
    }
    
    if (!installationMonth) {
      newErrors.installationMonth = 'Installation month is required';
    }
    
    if (!address.trim()) {
      newErrors.address = 'Address is required';
    }
    
    if (selectedAppliances.length === 0) {
      newErrors.appliances = 'At least one appliance must be selected';
    }
    
    if (photos.length === 0) {
      newErrors.photos = 'At least one photo is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    
    try {
      const kitchenData = {
        userId: currentUser?.uid || 'sample-user-id',
        brand,
        installationDate: `${installationYear}-${String(months.indexOf(installationMonth) + 1).padStart(2, '0')}-01`,
        address,
        appliances: selectedAppliances.map(id => ({
          type: id,
          brand: brand,
          model: `Standard ${id.charAt(0).toUpperCase() + id.slice(1)}`
        })),
        photos,
        createdAt: new Date().toISOString()
      };
      
      // In a real app, this would register kitchen in Firebase
      // await registerKitchen(kitchenData);
      
      // For now, just simulate success
      setTimeout(() => {
        setLoading(false);
        navigation.navigate('WarrantyPlans');
      }, 1000);
    } catch (error) {
      console.error('Error registering kitchen:', error);
      setLoading(false);
      // Show error message
    }
  };
  
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Register Your Kitchen</Text>
        <Text style={styles.headerSubtitle}>
          Provide details about your kitchen to get personalized warranty coverage
        </Text>
      </View>
      
      <Card style={styles.formCard}>
        <Card.Content>
          <Text style={styles.sectionTitle}>Kitchen Details</Text>
          
          <Text style={styles.inputLabel}>Kitchen Brand</Text>
          <TextInput
            mode="outlined"
            placeholder="e.g., Amaze Space, Modular Kitchen, etc."
            value={brand}
            onChangeText={setBrand}
            style={styles.textInput}
            error={!!errors.brand}
          />
          {errors.brand && <Text style={styles.errorText}>{errors.brand}</Text>}
          
          <Text style={styles.inputLabel}>Installation Date</Text>
          <View style={styles.dateContainer}>
            <View style={styles.datePickerContainer}>
              <Text style={styles.datePickerLabel}>Month</Text>
              <View style={[styles.pickerWrapper, errors.installationMonth && styles.pickerError]}>
                <ScrollView 
                  horizontal 
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.pickerContent}
                >
                  {months.map((month) => (
                    <TouchableOpacity
                      key={month}
                      style={[
                        styles.pickerItem,
                        installationMonth === month && styles.selectedPickerItem
                      ]}
                      onPress={() => setInstallationMonth(month)}
                    >
                      <Text 
                        style={[
                          styles.pickerItemText,
                          installationMonth === month && styles.selectedPickerItemText
                        ]}
                      >
                        {month}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            </View>
            
            <View style={styles.datePickerContainer}>
              <Text style={styles.datePickerLabel}>Year</Text>
              <View style={[styles.pickerWrapper, errors.installationYear && styles.pickerError]}>
                <ScrollView 
                  horizontal 
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.pickerContent}
                >
                  {years.map((year) => (
                    <TouchableOpacity
                      key={year}
                      style={[
                        styles.pickerItem,
                        installationYear === year && styles.selectedPickerItem
                      ]}
                      onPress={() => setInstallationYear(year)}
                    >
                      <Text 
                        style={[
                          styles.pickerItemText,
                          installationYear === year && styles.selectedPickerItemText
                        ]}
                      >
                        {year}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            </View>
          </View>
          {(errors.installationMonth || errors.installationYear) && (
            <Text style={styles.errorText}>
              {errors.installationMonth || errors.installationYear}
            </Text>
          )}
          
          <Text style={styles.inputLabel}>Kitchen Address</Text>
          <TextInput
            mode="outlined"
            placeholder="Full address including city and pincode"
            value={address}
            onChangeText={setAddress}
            multiline
            numberOfLines={3}
            style={styles.textInput}
            error={!!errors.address}
          />
          {errors.address && <Text style={styles.errorText}>{errors.address}</Text>}
          
          <Divider style={styles.divider} />
          
          <Text style={styles.sectionTitle}>Appliances</Text>
          <Text style={styles.sectionSubtitle}>Select all appliances in your kitchen</Text>
          
          <View style={styles.appliancesContainer}>
            {applianceTypes.map((appliance) => (
              <TouchableOpacity
                key={appliance.id}
                style={[
                  styles.applianceItem,
                  selectedAppliances.includes(appliance.id) && styles.selectedApplianceItem
                ]}
                onPress={() => handleApplianceToggle(appliance.id)}
              >
                <Text 
                  style={[
                    styles.applianceText,
                    selectedAppliances.includes(appliance.id) && styles.selectedApplianceText
                  ]}
                >
                  {appliance.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          {errors.appliances && <Text style={styles.errorText}>{errors.appliances}</Text>}
          
          <Divider style={styles.divider} />
          
          <Text style={styles.sectionTitle}>Kitchen Photos</Text>
          <Text style={styles.sectionSubtitle}>Add photos of your kitchen</Text>
          
          <View style={styles.photosContainer}>
            {photos.map((photo, index) => (
              <View key={index} style={styles.photoItem}>
                <Image 
                  source={require('../assets/images/placeholder.png')} 
                  style={styles.photoImage}
                />
                <TouchableOpacity
                  style={styles.removePhotoButton}
                  onPress={() => handleRemovePhoto(index)}
                >
                  <Text style={styles.removePhotoText}>✕</Text>
                </TouchableOpacity>
              </View>
            ))}
            
            <TouchableOpacity
              style={styles.addPhotoButton}
              onPress={handleAddPhoto}
            >
              <Text style={styles.addPhotoText}>+</Text>
              <Text style={styles.addPhotoLabel}>Add Photo</Text>
            </TouchableOpacity>
          </View>
          {errors.photos && <Text style={styles.errorText}>{errors.photos}</Text>}
        </Card.Content>
      </Card>
      
      <View style={styles.actionContainer}>
        <Button 
          mode="contained" 
          onPress={handleSubmit}
          style={styles.submitButton}
          loading={loading}
          disabled={loading}
        >
          Register Kitchen
        </Button>
        
        <Button 
          mode="outlined" 
          onPress={() => navigation.goBack()}
          style={styles.cancelButton}
          disabled={loading}
        >
          Cancel
        </Button>
      </View>
      
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Your kitchen details help us provide accurate warranty coverage for your appliances.
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
  },
  formCard: {
    margin: 15,
    borderRadius: 10,
    ...platformStyles.shadow,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: 5,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 15,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginTop: 15,
    marginBottom: 5,
  },
  textInput: {
    backgroundColor: colors.backgroundLight,
    marginBottom: 5,
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  datePickerContainer: {
    flex: 1,
    marginRight: 10,
  },
  datePickerLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 5,
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 5,
    height: 50,
    justifyContent: 'center',
  },
  pickerError: {
    borderColor: colors.error,
  },
  pickerContent: {
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  pickerItem: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginHorizontal: 5,
    borderRadius: 20,
    backgroundColor: colors.backgroundLight,
  },
  selectedPickerItem: {
    backgroundColor: colors.primary,
  },
  pickerItemText: {
    fontSize: 14,
    color: colors.textPrimary,
  },
  selectedPickerItemText: {
    color: colors.white,
    fontWeight: 'bold',
  },
  divider: {
    marginVertical: 20,
    backgroundColor: colors.border,
  },
  appliancesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  applianceItem: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    margin: 5,
    borderRadius: 20,
    backgroundColor: colors.backgroundLight,
    borderWidth: 1,
    borderColor: colors.border,
  },
  selectedApplianceItem: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  applianceText: {
    fontSize: 14,
    color: colors.textPrimary,
  },
  selectedApplianceText: {
    color: colors.white,
    fontWeight: 'bold',
  },
  photosContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  photoItem: {
    width: 100,
    height: 100,
    margin: 5,
    borderRadius: 10,
    overflow: 'hidden',
    position: 'relative',
  },
  photoImage: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.backgroundLight,
  },
  removePhotoButton: {
    position: 'absolute',
    top: 5,
    right: 5,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  removePhotoText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: 'bold',
  },
  addPhotoButton: {
    width: 100,
    height: 100,
    margin: 5,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.border,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.backgroundLight,
  },
  addPhotoText: {
    fontSize: 24,
    color: colors.primary,
    marginBottom: 5,
  },
  addPhotoLabel: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  errorText: {
    fontSize: 12,
    color: colors.error,
    marginBottom: 10,
  },
  actionContainer: {
    margin: 15,
  },
  submitButton: {
    backgroundColor: colors.primary,
    marginBottom: 10,
    ...platformStyles.button,
  },
  cancelButton: {
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
    color: colors.textSecondary,
    textAlign: 'center',
  },
});

export default KitchenRegistration;
