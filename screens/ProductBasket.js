import React, { useEffect } from 'react';
import { View, Text, FlatList, Button, ActivityIndicator, StyleSheet, Alert } from 'react-native';
import useBasket from '../hooks/useBasket';

export default function ProductBasket({ route }) {
  // For demo purposes, use a userId from route params or fallback to a constant.
  // In a real app, use proper auth and user management.
  const userId = route?.params?.userId || 'demo-user-1';
  const { basket, loading, total, loadBasket, changeQuantity, incrementQuantity } = useBasket(userId);

  useEffect(() => {
    loadBasket().catch(err => Alert.alert('Error', String(err)));
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.total}>Total: €{total}</Text>
      </View>

      {loading ? <ActivityIndicator size="large" /> : (
        <FlatList
          data={basket.items || []}
          keyExtractor={(i, idx) => i._id || i.product?._id || i.product?.id || String(idx)}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={styles.itemTitle}>{item.product?.name || 'Deleted product'}</Text>
              <Text>€{item.product?.price ?? 0} x {item.quantity}</Text>
              <View style={styles.controls}>
                <Button title="-" onPress={() => changeQuantity(item).catch(err => Alert.alert('Error', String(err)))} />
                <View style={{ width: 8 }} />
                <Button title="+" onPress={() => incrementQuantity(item).catch(err => Alert.alert('Error', String(err)))} />
                <View style={{ width: 8 }} />
                <Button title="Remove" color="#d9534f" onPress={() => changeQuantity(item, true).catch(err => Alert.alert('Error', String(err)))} />
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 12 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  total: { fontWeight: '700' },
  item: { padding: 10, borderWidth: 1, borderColor: '#eee', borderRadius: 6, marginVertical: 6 },
  itemTitle: { fontWeight: '600' },
  controls: { flexDirection: 'row', marginTop: 8 },
});
