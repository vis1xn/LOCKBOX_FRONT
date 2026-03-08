// ImagePickerButton
// - Purpose: Provide a button to capture a photo via the device camera and preview it.
// - Props:
//    - image: current image URI/base64 string to preview
//    - onChange: callback to receive new image (URI or data URL)
//    - disabled: boolean to disable the button while posting
// - Notes: Uses expo-image-picker to request camera permissions and launch camera. Returns base64 data URI when available.

import React from 'react';
import { View, Button, Image, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function ImagePickerButton({ image, onChange, disabled }) {
  // takePhoto: request camera permission and launch camera UI.
  // On success, converts returned base64 to a data URI and calls onChange.
  const takePhoto = async () => {
    try {
      // Request camera permissions
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        // Permission denied, show alert
        Alert.alert('Permission Denied', 'We need camera access to take photos.');
        return;
      }
      // Launch camera
      const result = await ImagePicker.launchCameraAsync({ allowsEditing: true, aspect: [4, 3], quality: 0.5, base64: true });
      if (!result.canceled) {
        // Photo taken, convert to data URI and update state
        const base64 = result.assets && result.assets[0] && result.assets[0].base64;
        if (base64) onChange(`data:image/jpeg;base64,${base64}`);
      }
    } catch (err) {
      // Handle any errors
      Alert.alert('Camera error', String(err));
    }
  };

  return (
    <View style={styles.row}>
      <Button title={image ? 'Retake Photo' : 'Take Photo'} onPress={takePhoto} disabled={disabled} />
      <View style={{ width: 12 }} />
      {image ? <Image source={{ uri: image }} style={styles.preview} /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', marginVertical: 8 },
  preview: { width: 100, height: 100, borderRadius: 6, marginLeft: 8 },
});
