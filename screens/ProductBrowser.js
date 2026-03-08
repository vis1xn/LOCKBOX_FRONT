import React, { useEffect } from 'react';
import { View, FlatList, ActivityIndicator, Button, StyleSheet, Alert } from 'react-native';
import useProducts from '../hooks/useProducts';
import basketApi from '../api/basketApi';
import ProductItem from '../components/ProductItem';

// Simple constant userId for demo - in a real app, use auth and proper user ids
const DEMO_USER_ID = 'demo-user-1';

export default function ProductBrowser({ navigation }) {
  const { products, loading, fetchProducts } = useProducts();

  useEffect(() => {
    // Fetch products on mount (do not clear the basket automatically)
    fetchProducts().catch(err => Alert.alert('Error', String(err)));
  }, []);

  const handleAdd = async (productId) => {
    try {
      await basketApi.addToBasket({ userId: DEMO_USER_ID, productId, quantity: 1 });
      Alert.alert('Added', 'Product added to basket');
    } catch (err) {
      Alert.alert('Error adding', String(err));
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Button title="Open Basket" onPress={() => navigation.navigate('ProductBasket', { userId: DEMO_USER_ID })} />
      </View>

      {loading ? <ActivityIndicator size="large" /> : (
        <FlatList
          data={products}
          keyExtractor={(i, idx) => i._id || i.id || String(idx)}
          renderItem={({ item }) => (
            <ProductItem item={item} onAdd={handleAdd} />
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 12 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
});
