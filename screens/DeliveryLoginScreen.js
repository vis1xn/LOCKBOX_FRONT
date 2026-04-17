import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, SafeAreaView, ActivityIndicator, Alert
} from 'react-native';
import { BACKEND_URL, PI_URL } from '../api/config';

const DeliveryLoginScreen = ({ navigation }) => {
  const [pin, setPin] = useState('');
  const [loading, setLoading] = useState(false);

  const handleDeliveryLogin = async () => {
    if (pin.length !== 5) {
      Alert.alert('Error', 'PIN must be 5 digits');
      return;
    }
    setLoading(true);
    try {
      // Verify delivery PIN against backend
      const verifyRes = await fetch(`${BACKEND_URL}/delivery/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pin })
      });
      const verifyData = await verifyRes.json();

      if (!verifyData.success) {
        Alert.alert('Access Denied', 'Invalid or expired delivery PIN.');
        setLoading(false);
        return;
      }

      // Open the lock
      await fetch(`${PI_URL}/lock/open`, { method: 'POST' });

      // Expire the PIN immediately after use
      await fetch(`${BACKEND_URL}/delivery/expire`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pin })
      });

      Alert.alert(
        'Access Granted',
        'LockBox is open. It will close automatically in 15 seconds.',
        [{ text: 'OK', onPress: () => navigation.replace('Welcome') }]
      );
    } catch {
      Alert.alert('Error', 'Could not connect. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>← Back</Text>
      </TouchableOpacity>

      <View style={styles.content}>
        <Text style={styles.emoji}>🚚</Text>
        <Text style={styles.title}>Delivery Access</Text>
        <Text style={styles.subtitle}>Enter the PIN provided by the owner</Text>

        <TextInput
          style={styles.input}
          placeholder="• • • • •"
          placeholderTextColor="#333"
          keyboardType="numeric"
          secureTextEntry
          maxLength={5}
          value={pin}
          onChangeText={setPin}
        />

        {loading ? (
          <ActivityIndicator size="large" color="#b464ff" style={{ marginTop: 24 }} />
        ) : (
          <TouchableOpacity style={styles.button} onPress={handleDeliveryLogin}>
            <Text style={styles.buttonText}>Submit PIN</Text>
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
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  emoji: {
    fontSize: 56,
    marginBottom: 16
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
    marginBottom: 40,
    textAlign: 'center'
  },
  input: {
    width: '100%',
    backgroundColor: '#1a2030',
    color: '#fff',
    fontSize: 28,
    letterSpacing: 12,
    textAlign: 'center',
    padding: 18,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#2a3a4a',
    marginBottom: 24
  },
  button: {
    width: '100%',
    backgroundColor: '#b464ff',
    padding: 18,
    borderRadius: 14,
    alignItems: 'center'
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700'
  }
});

export default DeliveryLoginScreen;