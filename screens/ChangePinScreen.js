import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, SafeAreaView, ActivityIndicator, Alert
} from 'react-native';
import { PI_URL } from '../api/config';

const ChangePinScreen = ({ navigation }) => {
  const [currentPin, setCurrentPin] = useState('');
  const [newPin, setNewPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChangePin = async () => {
    if (currentPin.length !== 5 || newPin.length !== 5 || confirmPin.length !== 5) {
      Alert.alert('Error', 'All PINs must be 5 digits');
      return;
    }
    if (newPin !== confirmPin) {
      Alert.alert('Error', 'New PINs do not match');
      return;
    }
    setLoading(true);
    try {
      // First verify current PIN
      const verifyRes = await fetch(`${PI_URL}/pin/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pin: currentPin })
      });
      const verifyData = await verifyRes.json();

      if (!verifyData.success) {
        Alert.alert('Error', 'Current PIN is incorrect');
        setLoading(false);
        return;
      }

      // Then change PIN
      const changeRes = await fetch(`${PI_URL}/pin/change`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pin: newPin })
      });
      const changeData = await changeRes.json();

      if (changeData.message) {
        Alert.alert('Success', 'PIN changed successfully!', [
          { text: 'OK', onPress: () => navigation.goBack() }
        ]);
      }
    } catch {
      Alert.alert('Error', 'Could not reach LockBox.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>← Back</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Change PIN</Text>
      <Text style={styles.subtitle}>Update your LockBox PIN</Text>

      <View style={styles.form}>
        <Text style={styles.label}>Current PIN</Text>
        <TextInput
          style={styles.input}
          placeholder="• • • • •"
          placeholderTextColor="#333"
          keyboardType="numeric"
          secureTextEntry
          maxLength={5}
          value={currentPin}
          onChangeText={setCurrentPin}
        />

        <Text style={styles.label}>New PIN</Text>
        <TextInput
          style={styles.input}
          placeholder="• • • • •"
          placeholderTextColor="#333"
          keyboardType="numeric"
          secureTextEntry
          maxLength={5}
          value={newPin}
          onChangeText={setNewPin}
        />

        <Text style={styles.label}>Confirm New PIN</Text>
        <TextInput
          style={styles.input}
          placeholder="• • • • •"
          placeholderTextColor="#333"
          keyboardType="numeric"
          secureTextEntry
          maxLength={5}
          value={confirmPin}
          onChangeText={setConfirmPin}
        />

        {loading ? (
          <ActivityIndicator size="large" color="#00c8ff" style={{ marginTop: 24 }} />
        ) : (
          <TouchableOpacity style={styles.button} onPress={handleChangePin}>
            <Text style={styles.buttonText}>Update PIN</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0d14',
    padding: 24
  },
  back: {
    marginTop: 8,
    marginBottom: 16
  },
  backText: {
    color: '#00c8ff',
    fontSize: 16
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#fff',
    marginBottom: 8
  },
  subtitle: {
    fontSize: 14,
    color: '#4a6070',
    marginBottom: 32
  },
  form: {
    flex: 1
  },
  label: {
    color: '#8ab0c8',
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 1,
    marginBottom: 8
  },
  input: {
    backgroundColor: '#1a2030',
    color: '#fff',
    fontSize: 24,
    letterSpacing: 12,
    textAlign: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#2a3a4a',
    marginBottom: 24
  },
  button: {
    backgroundColor: '#00c8ff',
    padding: 18,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 8
  },
  buttonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: '700'
  }
});

export default ChangePinScreen;