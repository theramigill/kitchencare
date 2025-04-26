import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, FlatList } from 'react-native';
import { Card, Button, Title, Paragraph, Divider, Searchbar, Chip } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../theme/colors';
import { platformStyles } from '../theme/platformStyles';
import { useFirebase } from '../services/firebase-context';

const ProductCatalog = () => {
  const navigation = useNavigation();
  const { getProducts, addToCart } = useFirebase();
  
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  
  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'chimney', name: 'Kitchen Chimneys' },
    { id: 'hob', name: 'Built-in Hobs' },
    { id: 'microwave', name: 'Microwaves & Ovens' },
    { id: 'cooktop', name: 'Cooktops' }
  ];
  
  // Sample products data (would be fetched from Firebase in production)
  const sampleProducts = [
    {
      id: 'chm001',
      name: 'Premium Auto-Clean Chimney',
      category: 'chimney',
      price: 15999,
      discountPrice: 13999,
      rating: 4.5,
      reviewCount: 128,
      images: ['chimney1.jpg', 'chimney1_side.jpg', 'chimney1_front.jpg'],
      description: 'High-performance kitchen chimney with auto-clean technology and touch controls.',
      features: [
        'Suction Power: 1200 m³/hr',
        'Noise Level: 58 dB',
        'Filter Type: Baffle Filter',
        'Control Type: Touch & Gesture',
        'Auto-Clean Technology',
        'LED Lights'
      ],
      inStock: true,
      brand: 'Amaze Space'
    },
    {
      id: 'chm002',
      name: 'Curved Glass Chimney',
      category: 'chimney',
      price: 12999,
      discountPrice: 10999,
      rating: 4.2,
      reviewCount: 95,
      images: ['chimney2.jpg', 'chimney2_side.jpg', 'chimney2_front.jpg'],
      description: 'Elegant curved glass chimney with powerful suction and filterless technology.',
      features: [
        'Suction Power: 1000 m³/hr',
        'Noise Level: 60 dB',
        'Filterless Technology',
        'Control Type: Touch',
        'Oil Collector',
        'LED Lights'
      ],
      inStock: true,
      brand: 'Amaze Space'
    },
    {
      id: 'hob001',
      name: '4 Burner Built-in Gas Hob',
      category: 'hob',
      price: 9999,
      discountPrice: 8499,
      rating: 4.7,
      reviewCount: 156,
      images: ['hob1.jpg', 'hob1_top.jpg', 'hob1_side.jpg'],
      description: 'Premium 4 burner built-in gas hob with auto-ignition and toughened glass.',
      features: [
        '4 Burners (1 Triple Ring, 2 Medium, 1 Small)',
        'Auto-Ignition',
        'Toughened Glass Surface',
        'Cast Iron Pan Supports',
        'Flame Failure Safety Device',
        'Easy Clean Surface'
      ],
      inStock: true,
      brand: 'Amaze Space'
    },
    {
      id: 'hob002',
      name: '2 Burner Built-in Gas Hob',
      category: 'hob',
      price: 6999,
      discountPrice: 5999,
      rating: 4.4,
      reviewCount: 87,
      images: ['hob2.jpg', 'hob2_top.jpg', 'hob2_side.jpg'],
      description: 'Compact 2 burner built-in gas hob perfect for small kitchens.',
      features: [
        '2 Burners (1 Triple Ring, 1 Medium)',
        'Auto-Ignition',
        'Toughened Glass Surface',
        'Cast Iron Pan Supports',
        'Flame Failure Safety Device',
        'Easy Clean Surface'
      ],
      inStock: true,
      brand: 'Amaze Space'
    },
    {
      id: 'mwo001',
      name: 'Built-in Convection Microwave Oven',
      category: 'microwave',
      price: 18999,
      discountPrice: 16999,
      rating: 4.6,
      reviewCount: 112,
      images: ['microwave1.jpg', 'microwave1_open.jpg', 'microwave1_side.jpg'],
      description: 'Premium built-in convection microwave oven with grill function and auto-cook menus.',
      features: [
        'Capacity: 28L',
        'Convection, Microwave & Grill Functions',
        'Touch Control Panel',
        '200+ Auto-Cook Menus',
        'Child Lock Safety',
        'Stainless Steel Cavity'
      ],
      inStock: true,
      brand: 'Amaze Space'
    },
    {
      id: 'mwo002',
      name: 'Built-in Electric Oven',
      category: 'microwave',
      price: 24999,
      discountPrice: 21999,
      rating: 4.8,
      reviewCount: 76,
      images: ['oven1.jpg', 'oven1_open.jpg', 'oven1_side.jpg'],
      description: 'Professional built-in electric oven with multiple cooking functions.',
      features: [
        'Capacity: 70L',
        '10 Cooking Functions',
        'Digital Display & Timer',
        'Triple Glazed Door',
        'Energy Efficiency: A+',
        'Catalytic Self-Cleaning'
      ],
      inStock: true,
      brand: 'Amaze Space'
    },
    {
      id: 'ctp001',
      name: 'Induction Cooktop',
      category: 'cooktop',
      price: 7999,
      discountPrice: 6499,
      rating: 4.3,
      reviewCount: 143,
      images: ['cooktop1.jpg', 'cooktop1_angle.jpg', 'cooktop1_control.jpg'],
      description: 'Sleek induction cooktop with touch controls and multiple cooking zones.',
      features: [
        '4 Cooking Zones',
        'Touch Controls',
        'Timer Function',
        'Child Lock',
        'Auto Shut-Off',
        'Residual Heat Indicator'
      ],
      inStock: true,
      brand: 'Amaze Space'
    },
    {
      id: 'ctp002',
      name: 'Ceramic Glass Cooktop',
      category: 'cooktop',
      price: 9999,
      discountPrice: 8999,
      rating: 4.5,
      reviewCount: 98,
      images: ['cooktop2.jpg', 'cooktop2_angle.jpg', 'cooktop2_control.jpg'],
      description: 'Premium ceramic glass cooktop with radiant heating elements.',
      features: [
        '4 Radiant Heating Zones',
        'Knob Controls',
        'Residual Heat Indicator',
        'Easy Clean Surface',
        'Frameless Design',
        'High Temperature Protection'
      ],
      inStock: true,
      brand: 'Amaze Space'
    }
  ];
  
  useEffect(() => {
    // In a real app, this would fetch from Firebase
    // const fetchProducts = async () => {
    //   try {
    //     const productsData = await getProducts();
    //     setProducts(productsData);
    //     setFilteredProducts(productsData);
    //   } catch (error) {
    //     console.error('Error fetching products:', error);
    //   } finally {
    //     setLoading(false);
    //   }
    // };
    // 
    // fetchProducts();
    
    // Using sample data for now
    setProducts(sampleProducts);
    setFilteredProducts(sampleProducts);
    setLoading(false);
  }, []);
  
  useEffect(() => {
    filterProducts();
  }, [selectedCategory, searchQuery]);
  
  const filterProducts = () => {
    let filtered = [...products];
    
    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(query) || 
        product.description.toLowerCase().includes(query) ||
        product.brand.toLowerCase().includes(query)
      );
    }
    
    setFilteredProducts(filtered);
  };
  
  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
  };
  
  const handleSearch = (query) => {
    setSearchQuery(query);
  };
  
  const handleAddToCart = (product) => {
    // In a real app, this would add to Firebase cart
    // addToCart(product.id, 1);
    
    // For now, just show a message
    alert(`${product.name} added to cart!`);
  };
  
  const handleViewProduct = (product) => {
    navigation.navigate('ProductDetail', { product });
  };
  
  const renderProductCard = (product) => {
    const discountPercentage = Math.round(((product.price - product.discountPrice) / product.price) * 100);
    
    return (
      <Card style={styles.productCard} onPress={() => handleViewProduct(product)}>
        <View style={styles.discountBadge}>
          <Text style={styles.discountText}>{discountPercentage}% OFF</Text>
        </View>
        
        <Image 
          source={require('../assets/images/placeholder.png')} 
          style={styles.productImage}
          resizeMode="contain"
        />
        
        <Card.Content style={styles.productContent}>
          <Text style={styles.productCategory}>
            {categories.find(cat => cat.id === product.category)?.name}
          </Text>
          <Text style={styles.productName} numberOfLines={2}>
            {product.name}
          </Text>
          
          <View style={styles.ratingContainer}>
            <Text style={styles.ratingText}>{product.rating} ★</Text>
            <Text style={styles.reviewCount}>({product.reviewCount})</Text>
          </View>
          
          <View style={styles.priceContainer}>
            <Text style={styles.discountPrice}>₹{product.discountPrice.toLocaleString()}</Text>
            <Text style={styles.originalPrice}>₹{product.price.toLocaleString()}</Text>
          </View>
        </Card.Content>
        
        <Card.Actions style={styles.cardActions}>
          <Button 
            mode="outlined" 
            style={styles.viewButton}
            onPress={() => handleViewProduct(product)}
          >
            View
          </Button>
          <Button 
            mode="contained" 
            style={styles.cartButton}
            onPress={() => handleAddToCart(product)}
          >
            Add to Cart
          </Button>
        </Card.Actions>
      </Card>
    );
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Kitchen Appliances</Text>
        <Searchbar
          placeholder="Search products..."
          onChangeText={handleSearch}
          value={searchQuery}
          style={styles.searchBar}
        />
      </View>
      
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesContainer}
        contentContainerStyle={styles.categoriesContent}
      >
        {categories.map(category => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.categoryButton,
              selectedCategory === category.id && styles.selectedCategoryButton
            ]}
            onPress={() => handleCategorySelect(category.id)}
          >
            <Text 
              style={[
                styles.categoryText,
                selectedCategory === category.id && styles.selectedCategoryText
              ]}
            >
              {category.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      
      <FlatList
        data={filteredProducts}
        renderItem={({ item }) => renderProductCard(item)}
        keyExtractor={item => item.id}
        numColumns={2}
        contentContainerStyle={styles.productsContainer}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No products found</Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    padding: 15,
    backgroundColor: colors.primary,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.white,
    marginBottom: 15,
  },
  searchBar: {
    elevation: 0,
    backgroundColor: colors.white,
    borderRadius: 5,
  },
  categoriesContainer: {
    maxHeight: 60,
    backgroundColor: colors.backgroundLight,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  categoriesContent: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  categoryButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginHorizontal: 5,
    borderRadius: 20,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
  },
  selectedCategoryButton: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  categoryText: {
    fontSize: 14,
    color: colors.textPrimary,
  },
  selectedCategoryText: {
    color: colors.white,
    fontWeight: 'bold',
  },
  productsContainer: {
    padding: 10,
  },
  productCard: {
    flex: 1,
    margin: 5,
    borderRadius: 10,
    overflow: 'hidden',
    ...platformStyles.shadow,
  },
  discountBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: colors.secondary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    zIndex: 1,
  },
  discountText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: 'bold',
  },
  productImage: {
    width: '100%',
    height: 150,
    backgroundColor: colors.backgroundLight,
  },
  productContent: {
    padding: 10,
  },
  productCategory: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 5,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.textPrimary,
    height: 40,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  ratingText: {
    fontSize: 14,
    color: colors.secondary,
    fontWeight: 'bold',
  },
  reviewCount: {
    fontSize: 12,
    color: colors.textSecondary,
    marginLeft: 5,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  discountPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.primary,
  },
  originalPrice: {
    fontSize: 14,
    color: colors.textSecondary,
    textDecorationLine: 'line-through',
    marginLeft: 8,
  },
  cardActions: {
    justifyContent: 'space-between',
    padding: 10,
  },
  viewButton: {
    flex: 1,
    marginRight: 5,
    borderColor: colors.primary,
  },
  cartButton: {
    flex: 1,
    marginLeft: 5,
    backgroundColor: colors.primary,
  },
  emptyContainer: {
    padding: 20,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: colors.textSecondary,
  },
});

export default ProductCatalog;
