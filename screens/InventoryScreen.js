// InventoryScreen
// - Purpose: Orchestrates the inventory UI: shows product list and provides add/edit/delete flows.
// - Key inputs: none (uses internal state and the `useProducts` hook to fetch/manage products).
// - Key outputs: renders AddEditProduct form, product list (ProductItem), and invokes create/update/delete via the hook.
// - Notes: This file should remain orchestration-only: UI and logic for form, image picking, and API calls are delegated to components and hooks.

import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  Alert,
} from 'react-native';

import ProductItem from '../components/ProductItem';
import AddEditProduct from '../components/AddEditProduct';
import useProducts from '../hooks/useProducts';

export default function InventoryScreen() {
  const { products, loading, posting, fetchProducts, createProduct, updateProduct, deleteProduct } = useProducts();

  const [editingId, setEditingId] = useState(null);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  // --- Simplified alternative: group all form fields into one state object ---
  // const [form, setForm] = useState({ name: '', price: '', description: '', image: null });
  // Update a single field with: setForm(prev => ({ ...prev, name: 'new value' }))
  // Pass to AddEditProduct as: <AddEditProduct form={form} setForm={setForm} ... />
  // (replaces the five individual useState calls above and reduces prop count)

  useEffect(() => {
    fetchProducts();
  }, []);

  async function saveProduct() {
    if (!name.trim()) return Alert.alert('Validation', 'Name is required');
    const parsedPrice = parseFloat(price);
    if (price && Number.isNaN(parsedPrice)) return Alert.alert('Validation', 'Price must be a number');

    try {
      const body = { name: name.trim(), price: price ? parsedPrice : undefined, description: description.trim(), image };
      if (editingId) {
        await updateProduct(editingId, body);
        setEditingId(null);
        Alert.alert('Success', 'Product updated');
      } else {
        await createProduct(body);
        Alert.alert('Success', 'Product added');
      }

      setName('');
      setPrice('');
      setDescription('');
      setImage(null);
    } catch (err) {
      Alert.alert('Error', String(err));
    }
  }

  function onEditPress(item) {
    setEditingId(item._id || item.id || null);
    setName(item.name || '');
    setPrice(item.price !== undefined && item.price !== null ? String(item.price) : '');
    setDescription(item.description || '');
    setImage(item.image || null);
  }

  function renderItem({ item }) {
    return <ProductItem item={item} onEdit={onEditPress} onDelete={deleteProduct} />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Inventory</Text>

      <AddEditProduct
        editingId={editingId}
        name={name}
        setName={setName}
        price={price}
        setPrice={setPrice}
        description={description}
        setDescription={setDescription}
        image={image}
        setImage={setImage}
        posting={posting}
        onSave={saveProduct}
        onRefresh={fetchProducts}
      />

      <Text style={styles.header}>Products</Text>

      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList data={products} keyExtractor={(item, idx) => item._id || item.id || String(idx)} renderItem={renderItem} ListEmptyComponent={<Text style={styles.empty}>No products found.</Text>} contentContainerStyle={products.length === 0 ? styles.emptyContainer : null} />
      )}

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 18,
    fontWeight: '600',
    marginVertical: 8,
  },
  empty: { textAlign: 'center', color: '#666', marginTop: 20 },
  emptyContainer: { flex: 1, justifyContent: 'center' },
});
