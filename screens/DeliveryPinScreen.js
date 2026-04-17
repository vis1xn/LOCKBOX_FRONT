import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity,
  StyleSheet, SafeAreaView, ActivityIndicator, Alert
} from 'react-native';
import { BACKEND_URL } from '../api/config';

const DeliveryPinScreen = ({ navigation }) => {
  const [pin, setPin] = useState(null);
  const [loading, setLoading] = useState(false);

  const generatePin = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${BACKEND_URL}/delivery/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      const data = await res.json();
      if (data.pin) {
        setPin(data.pin);
      } else {
        Alert.alert('Error', 'Could not generate delivery PIN.');
      }
    } catch {
      Alert.alert('Error', 'Could not reach backend.');
    } finally {
      setLoading(false);
    }
  };

  const deletePin = async () => {
    if (!pin) return;
    setLoading(true);
    try {
      await fetch(`${BACKEND_URL}/delivery/expire`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pin })
      });
      setPin(null);
      Alert.alert('Success', 'Delivery PIN expired.');
    } catch {
      Alert.alert('Error', 'Could not expire PIN.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>← Back</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Delivery PIN</Text>
      <Text style={styles.subtitle}>
        Generate a one-time PIN for your delivery driver
      </Text>

      <View style={styles.content}>
        {loading ? (
          <ActivityIndicator size="large" color="#b464ff" />
        ) : pin ? (
          <>
            <View style={styles.pinBox}>
              <Text style={styles.pinLabel}>One-Time PIN</Text>
              <Text style={styles.pinText}>{pin}</Text>
              <Text style={styles.pinNote}>Share this with your delivery driver</Text>
            </View>

            <TouchableOpacity style={styles.expireButton} onPress={deletePin}>
              <Text style={styles.expireButtonText}>Expire PIN</Text>
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity style={styles.generateButton} onPress={generatePin}>
            <Text style={styles.generateButtonText}>Generate PIN</Text>
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
    marginBottom: 40
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  pinBox: {
    backgroundColor: '#1a2030',
    borderRadius: 14,
    padding: 32,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#b464ff',
    width: '100%',
    marginBottom: 24
  },
  pinLabel: {
    color: '#b464ff',
    fontSize: 12,
    letterSpacing: 2,
    fontWeight: '700',
    marginBottom: 16
  },
  pinText: {
    color: '#fff',
    fontSize: 48,
    fontWeight: '800',
    letterSpacing: 8,
    marginBottom: 16
  },
  pinNote: {
    color: '#4a6070',
    fontSize: 13,
    textAlign: 'center'
  },
  generateButton: {
    backgroundColor: '#b464ff',
    padding: 18,
    borderRadius: 14,
    alignItems: 'center',
    width: '100%'
  },
  generateButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700'
  },
  expireButton: {
    backgroundColor: 'transparent',
    padding: 16,
    borderRadius: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ff6432',
    width: '100%'
  },
  expireButtonText: {
    color: '#ff6432',
    fontSize: 16,
    fontWeight: '600'
  }
});

export default DeliveryPinScreen;