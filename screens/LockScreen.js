import React, { useState, useEffect } from 'react';
import {
  View, Text, TouchableOpacity,
  StyleSheet, SafeAreaView, ActivityIndicator, Alert
} from 'react-native';
import { PI_URL } from '../api/config';

const LockScreen = ({ navigation }) => {
  const [lockStatus, setLockStatus] = useState('checking...');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchStatus();
  }, []);

  const fetchStatus = async () => {
    try {
      const res = await fetch(`${PI_URL}/status`);
      const data = await res.json();
      setLockStatus(data.lock);
    } catch {
      setLockStatus('unknown');
    }
  };

  const handleOpen = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${PI_URL}/lock/open`, { method: 'POST' });
      const data = await res.json();
      setLockStatus('open');
      Alert.alert('Success', 'LockBox opened. Auto-closes in 15 seconds.');
    } catch {
      Alert.alert('Error', 'Could not reach LockBox.');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${PI_URL}/lock/close`, { method: 'POST' });
      const data = await res.json();
      setLockStatus('closed');
      Alert.alert('Success', 'LockBox closed.');
    } catch {
      Alert.alert('Error', 'Could not reach LockBox.');
    } finally {
      setLoading(false);
    }
  };

  const isOpen = lockStatus === 'open';

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>← Back</Text>
      </TouchableOpacity>

      <View style={styles.content}>
        <Text style={styles.title}>Lock Control</Text>

        <View style={[styles.statusCircle, { borderColor: isOpen ? '#00c864' : '#ff6432' }]}>
          <Text style={styles.statusEmoji}>{isOpen ? '🔓' : '🔒'}</Text>
          <Text style={[styles.statusText, { color: isOpen ? '#00c864' : '#ff6432' }]}>
            {lockStatus.toUpperCase()}
          </Text>
        </View>

        {loading ? (
          <ActivityIndicator size="large" color="#00c8ff" style={{ marginTop: 32 }} />
        ) : (
          <View style={styles.buttons}>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: '#00c864', opacity: isOpen ? 0.3 : 1 }]}
              onPress={handleOpen}
              disabled={isOpen}
            >
              <Text style={styles.buttonText}>Open</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, { backgroundColor: '#ff6432', opacity: !isOpen ? 0.3 : 1 }]}
              onPress={handleClose}
              disabled={!isOpen}
            >
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
          </View>
        )}

        <TouchableOpacity style={styles.refreshButton} onPress={fetchStatus}>
          <Text style={styles.refreshText}>↻ Refresh Status</Text>
        </TouchableOpacity>
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
    fontSize: 28,
    fontWeight: '800',
    color: '#fff',
    marginBottom: 40
  },
  statusCircle: {
    width: 160,
    height: 160,
    borderRadius: 80,
    borderWidth: 3,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 48,
    backgroundColor: '#1a2030'
  },
  statusEmoji: {
    fontSize: 48
  },
  statusText: {
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 2,
    marginTop: 4
  },
  buttons: {
    flexDirection: 'row',
    gap: 16,
    width: '100%'
  },
  button: {
    flex: 1,
    padding: 18,
    borderRadius: 14,
    alignItems: 'center'
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700'
  },
  refreshButton: {
    marginTop: 24
  },
  refreshText: {
    color: '#4a6070',
    fontSize: 14
  }
});

export default LockScreen;