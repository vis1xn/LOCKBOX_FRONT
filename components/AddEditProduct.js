// AddEditProduct
// - Purpose: Form UI for adding or editing a product. Includes inputs for name, price, description and an image picker.
// - Props:
//    - editingId: id of product being edited (optional)
//    - name, setName: state and setter for name input
//    - price, setPrice: state and setter for price input
//    - description, setDescription: state and setter for description input
//    - image, setImage: state and setter for image (URI/base64)
//    - posting: boolean indicating a save/add operation is in progress
//    - onSave: callback invoked when the Save/Add button is pressed
//    - onRefresh: callback invoked when Refresh is pressed
// - Output: renders text inputs, image picker and Save/Refresh buttons. Keeps no internal persistence logic.

import React from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import ImagePickerButton from './ImagePickerButton';

// --- Simplified alternative: receive a single form object instead of 8 individual props ---
// export default function AddEditProduct({ editingId, form, setForm, posting, onSave, onRefresh }) {
//   Access fields as form.name, form.price etc.
//   Update a field with: setForm(prev => ({ ...prev, name: newValue }))
//   return (
//     <View>
//       <TextInput value={form.name} onChangeText={text => setForm(prev => ({ ...prev, name: text }))} ... />
//       <TextInput value={form.price} onChangeText={text => setForm(prev => ({ ...prev, price: text }))} ... />
//       <TextInput value={form.description} onChangeText={text => setForm(prev => ({ ...prev, description: text }))} ... />
//       <ImagePickerButton image={form.image} onChange={uri => setForm(prev => ({ ...prev, image: uri }))} ... />
//     </View>
//   );
// }

export default function AddEditProduct({
  editingId,
  name,
  setName,
  price,
  setPrice,
  description,
  setDescription,
  image,
  setImage,
  posting,
  onSave,
  onRefresh,
}) {
  // This component is purely presentational: it receives state and setters from the parent
  // and exposes onSave/onRefresh callbacks. It does not perform API calls itself.
  return (
    <View>
      <TextInput style={styles.input} placeholder="Name" value={name} onChangeText={setName} />
      <TextInput style={styles.input} placeholder="Price (optional)" value={price} onChangeText={setPrice} keyboardType="numeric" />
      <TextInput style={[styles.input, styles.textArea]} placeholder="Description (optional)" value={description} onChangeText={setDescription} multiline />

      <ImagePickerButton image={image} onChange={setImage} disabled={posting} />

      <View style={styles.buttonsRow}>
        <Button
          title={posting ? (editingId ? 'Saving...' : 'Adding...') : (editingId ? 'Save' : 'Add Product')}
          onPress={onSave}
          disabled={posting}
        />
        <View style={styles.spacer} />
        <Button title="Refresh" onPress={onRefresh} disabled={false} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    padding: 10,
    marginVertical: 6,
  },
  textArea: {
    minHeight: 60,
    textAlignVertical: 'top',
  },
  buttonsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  spacer: { width: 12 },
});
