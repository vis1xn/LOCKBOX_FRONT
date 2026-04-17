import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, SafeAreaView, ActivityIndicator, Alert
} from 'react-native';
import { PI_URL } from '../api/config';

const LoginScreen = ({ navigation }) => {
  const [pin, setPin] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (pin.length !== 5) {
      Alert.alert('Error', 'PIN must be 5 digits');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${PI_URL}/pin/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pin })
      });
      const data = await res.json();
      if (data.success) {
        navigation.replace('Dashboard');
      } else {
        Alert.alert('Access Denied', 'Incorrect PIN. Try again.');
      }
    } catch (err) {
      Alert.alert('Connection Error', 'Could not reach LockBox. Make sure the Pi is on.');
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
        <Text style={styles.title}>Owner Login</Text>
        <Text style={styles.subtitle}>Enter your LockBox PIN</Text>

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
          <ActivityIndicator size="large" color="#00c8ff" style={{ marginTop: 24 }} />
        ) : (
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Login</Text>
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
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#fff',
    marginBottom: 8
  },
  subtitle: {
    fontSize: 15,
    color: '#4a6070',
    marginBottom: 40
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
    backgroundColor: '#00c8ff',
    padding: 18,
    borderRadius: 14,
    alignItems: 'center'
  },
  buttonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: '700'
  }
});

export default LoginScreen;