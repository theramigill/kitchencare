import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, FlatList } from 'react-native';
import { Card, Button, IconButton, Divider, Badge, List } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../theme/colors';
import { platformStyles } from '../theme/platformStyles';
import { useFirebase } from '../services/firebase-context';

const ShoppingCart = () => {
  const navigation = useNavigation();
  const { currentUser, getCartItems, updateCartItemQuantity, removeFromCart } = useFirebase();
  
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [subtotal, setSubtotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [deliveryCharge, setDeliveryCharge] = useState(0);
  const [total, setTotal] = useState(0);
  
  // Sample cart items (would be fetched from Firebase in production)
  const sampleCartItems = [
    {
      id: 'cart1',
      productId: 'chm001',
      name: 'Premium Auto-Clean Chimney',
      category: 'chimney',
      price: 15999,
      discountPrice: 13999,
      quantity: 1,
      image: 'chimney1.jpg',
      brand: 'Amaze Space'
    },
    {
      id: 'cart2',
      productId: 'hob001',
      name: '4 Burner Built-in Gas Hob',
      category: 'hob',
      price: 9999,
      discountPrice: 8499,
      quantity: 1,
      image: 'hob1.jpg',
      brand: 'Amaze Space'
    }
  ];
  
  useEffect(() => {
    // In a real app, this would fetch from Firebase
    // const fetchCartItems = async () => {
    //   try {
    //     const cartData = await getCartItems(currentUser.uid);
    //     setCartItems(cartData);
    //   } catch (error) {
    //     console.error('Error fetching cart items:', error);
    //   } finally {
    //     setLoading(false);
    //   }
    // };
    // 
    // fetchCartItems();
    
    // Using sample data for now
    setCartItems(sampleCartItems);
    setLoading(false);
  }, []);
  
  useEffect(() => {
    calculateTotals();
  }, [cartItems]);
  
  const calculateTotals = () => {
    const itemsSubtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const itemsDiscountTotal = cartItems.reduce((sum, item) => sum + ((item.price - item.discountPrice) * item.quantity), 0);
    const shipping = itemsSubtotal > 0 ? (itemsSubtotal >= 20000 ? 0 : 499) : 0;
    
    setSubtotal(itemsSubtotal);
    setDiscount(itemsDiscountTotal);
    setDeliveryCharge(shipping);
    setTotal(itemsSubtotal - itemsDiscountTotal + shipping);
  };
  
  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    
    // In a real app, this would update Firebase
    // updateCartItemQuantity(itemId, newQuantity);
    
    // For now, update local state
    const updatedItems = cartItems.map(item => 
      item.id === itemId ? { ...item, quantity: newQuantity } : item
    );
    
    setCartItems(updatedItems);
  };
  
  const handleRemoveItem = (itemId) => {
    // In a real app, this would remove from Firebase
    // removeFromCart(itemId);
    
    // For now, update local state
    const updatedItems = cartItems.filter(item => item.id !== itemId);
    setCartItems(updatedItems);
  };
  
  const handleContinueShopping = () => {
    navigation.navigate('ProductCatalog');
  };
  
  const handleCheckout = () => {
    navigation.navigate('Checkout', { 
      cartItems, 
      subtotal, 
      discount, 
      deliveryCharge, 
      total 
    });
  };
  
  const renderCartItem = (item) => {
    return (
      <Card style={styles.cartItemCard}>
        <View style={styles.cartItemContent}>
          <Image 
            source={require('../assets/images/placeholder.png')} 
            style={styles.itemImage}
            resizeMode="contain"
          />
          
          <View style={styles.itemDetails}>
            <Text style={styles.itemCategory}>
              {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
            </Text>
            <Text style={styles.itemName} numberOfLines={2}>
              {item.name}
            </Text>
            <Text style={styles.itemBrand}>
              {item.brand}
            </Text>
            
            <View style={styles.priceContainer}>
              <Text style={styles.discountPrice}>₹{item.discountPrice.toLocaleString()}</Text>
              <Text style={styles.originalPrice}>₹{item.price.toLocaleString()}</Text>
            </View>
            
            <View style={styles.quantityContainer}>
              <IconButton
                icon="minus"
                size={20}
                style={styles.quantityButton}
                onPress={() => handleQuantityChange(item.id, item.quantity - 1)}
              />
              <Text style={styles.quantityText}>{item.quantity}</Text>
              <IconButton
                icon="plus"
                size={20}
                style={styles.quantityButton}
                onPress={() => handleQuantityChange(item.id, item.quantity + 1)}
              />
              <TouchableOpacity 
                style={styles.removeButton}
                onPress={() => handleRemoveItem(item.id)}
              >
                <Text style={styles.removeText}>Remove</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Card>
    );
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Shopping Cart</Text>
        {cartItems.length > 0 && (
          <Badge style={styles.cartBadge}>{cartItems.length}</Badge>
        )}
      </View>
      
      {cartItems.length === 0 ? (
        <View style={styles.emptyCartContainer}>
          <Image 
            source={require('../assets/images/placeholder.png')} 
            style={styles.emptyCartImage}
            resizeMode="contain"
          />
          <Text style={styles.emptyCartTitle}>Your cart is empty</Text>
          <Text style={styles.emptyCartText}>
            Looks like you haven't added any products to your cart yet.
          </Text>
          <Button 
            mode="contained" 
            style={styles.shopButton}
            onPress={handleContinueShopping}
          >
            Continue Shopping
          </Button>
        </View>
      ) : (
        <View style={styles.cartContainer}>
          <FlatList
            data={cartItems}
            renderItem={({ item }) => renderCartItem(item)}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.cartItemsContainer}
          />
          
          <Card style={styles.summaryCard}>
            <Card.Content>
              <Text style={styles.summaryTitle}>Order Summary</Text>
              
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Subtotal</Text>
                <Text style={styles.summaryValue}>₹{subtotal.toLocaleString()}</Text>
              </View>
              
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Discount</Text>
                <Text style={[styles.summaryValue, styles.discountValue]}>
                  -₹{discount.toLocaleString()}
                </Text>
              </View>
              
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Delivery Charge</Text>
                <Text style={styles.summaryValue}>
                  {deliveryCharge === 0 ? 'FREE' : `₹${deliveryCharge.toLocaleString()}`}
                </Text>
              </View>
              
              <Divider style={styles.divider} />
              
              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Total</Text>
                <Text style={styles.totalValue}>₹{total.toLocaleString()}</Text>
              </View>
              
              <Button 
                mode="contained" 
                style={styles.checkoutButton}
                onPress={handleCheckout}
              >
                Proceed to Checkout
              </Button>
              
              <Button 
                mode="outlined" 
                style={styles.continueButton}
                onPress={handleContinueShopping}
              >
                Continue Shopping
              </Button>
            </Card.Content>
          </Card>
        </View>
      )}
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
    padding: 15,
    backgroundColor: colors.primary,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.white,
  },
  cartBadge: {
    backgroundColor: colors.secondary,
    color: colors.white,
    marginLeft: 10,
  },
  emptyCartContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyCartImage: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  emptyCartTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: 10,
  },
  emptyCartText: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 30,
  },
  shopButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 30,
    ...platformStyles.button,
  },
  cartContainer: {
    flex: 1,
  },
  cartItemsContainer: {
    padding: 10,
    paddingBottom: 20,
  },
  cartItemCard: {
    marginBottom: 10,
    borderRadius: 10,
    overflow: 'hidden',
    ...platformStyles.shadow,
  },
  cartItemContent: {
    flexDirection: 'row',
    padding: 10,
  },
  itemImage: {
    width: 100,
    height: 100,
    backgroundColor: colors.backgroundLight,
    borderRadius: 5,
  },
  itemDetails: {
    flex: 1,
    marginLeft: 15,
  },
  itemCategory: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: 5,
  },
  itemBrand: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 5,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
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
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    margin: 0,
    backgroundColor: colors.backgroundLight,
  },
  quantityText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.textPrimary,
    minWidth: 30,
    textAlign: 'center',
  },
  removeButton: {
    marginLeft: 'auto',
  },
  removeText: {
    fontSize: 14,
    color: colors.error,
  },
  summaryCard: {
    margin: 10,
    borderRadius: 10,
    ...platformStyles.shadow,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.textPrimary,
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
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  discountValue: {
    color: colors.success,
  },
  divider: {
    marginVertical: 15,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  totalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary,
  },
  checkoutButton: {
    backgroundColor: colors.primary,
    marginBottom: 10,
    ...platformStyles.button,
  },
  continueButton: {
    borderColor: colors.primary,
    ...platformStyles.button,
  },
});

export default ShoppingCart;
