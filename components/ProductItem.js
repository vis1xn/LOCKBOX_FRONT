// ProductItem
// - Purpose: Renders a single product entry in the product list, including image and action buttons.
// - Props:
//    - item: product object (expects fields like _id/id, name, price, description, image)
//    - onEdit: callback to call with the item when Edit is pressed
//    - onDelete: callback to call with item id when Delete is confirmed
// - Output: a View containing product details and Edit/Delete buttons.

import React from 'react';
import { View, Text, Image, Button, StyleSheet, Alert } from 'react-native';

export default function ProductItem({ item, onEdit, onDelete, onAdd }) {
  // onDeletePress: confirm with the user before invoking the provided onDelete callback.
  const onDeletePress = () => {
    const id = item._id || item.id;
    Alert.alert(
      'Delete product',
      'Are you sure you want to delete this product?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await onDelete(id);
              Alert.alert('Deleted', 'Product removed');
            } catch (err) {
              Alert.alert('Error', String(err));
            }
          },
        },
      ]
    );
  };

  // Renders product fields if present and shows action buttons.
  return (
    <View style={styles.item}>
      <Text style={styles.itemTitle}>{item.name || 'Unnamed'}</Text>
      {item.price !== undefined && item.price !== null ? (
        <Text style={styles.itemPrice}>{`€${item.price}`}</Text>
      ) : null}
      {item.description ? <Text style={styles.itemDesc}>{item.description}</Text> : null}
      {item.image && (
        <Image source={{ uri: item.image }} style={{ width: 100, height: 100, borderRadius: 6, marginTop: 10 }} />
      )}

      <View style={styles.itemButtons}>
        {onAdd ? (
          <View style={styles.buttonWrap}>
            <Button title="Add to Basket" color="#28a745" onPress={() => {
              const id = item._id || item.id;
              try { onAdd(id); } catch (err) { Alert.alert('Error', String(err)); }
            }} />
          </View>
        ) : null}

        {onEdit ? (
          <View style={styles.buttonWrap}>
            <Button title="Edit" onPress={() => onEdit(item)} />
          </View>
        ) : null}
        {onDelete ? (
          <View style={styles.buttonWrap}>
            <Button title="Delete" color="#d9534f" onPress={onDeletePress} />
          </View>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    padding: 12,
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 6,
    marginVertical: 6,
  },
  itemTitle: { fontSize: 16, fontWeight: '600' },
  itemPrice: { color: '#333', marginTop: 4 },
  itemDesc: { color: '#666', marginTop: 6 },
  itemButtons: { flexDirection: 'row', marginTop: 10 },
  buttonWrap: { marginRight: 8 },
});
