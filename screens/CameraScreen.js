import React, { useState, useEffect } from 'react';
import {
  View, Text, TouchableOpacity,
  StyleSheet, SafeAreaView, Image,
  ActivityIndicator, Alert
} from 'react-native';
import { PI_URL } from '../api/config';

const CameraScreen = ({ navigation }) => {
  const [snapshot, setSnapshot] = useState(null);
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);

  const fetchSnapshot = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${PI_URL}/camera/snapshot`);
      const data = await res.json();
      if (data.image) {
        setSnapshot(`data:image/jpeg;base64,${data.image}`);
        setLastUpdated(new Date().toLocaleTimeString());
      }
    } catch {
      Alert.alert('Error', 'Could not fetch camera snapshot.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSnapshot();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>← Back</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Live Camera</Text>

      <View style={styles.cameraBox}>
        {loading ? (
          <ActivityIndicator size="large" color="#00c8ff" />
        ) : snapshot ? (
          <Image source={{ uri: snapshot }} style={styles.image} resizeMode="contain" />
        ) : (
          <Text style={styles.noImage}>No image available</Text>
        )}
      </View>

      {lastUpdated && (
        <Text style={styles.timestamp}>Last updated: {lastUpdated}</Text>
      )}

      <TouchableOpacity style={styles.button} onPress={fetchSnapshot}>
        <Text style={styles.buttonText}>↻ Refresh Snapshot</Text>
      </TouchableOpacity>
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
    marginBottom: 24
  },
  cameraBox: {
    flex: 1,
    backgroundColor: '#1a2030',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#2a3a4a',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden'
  },
  image: {
    width: '100%',
    height: '100%'
  },
  noImage: {
    color: '#4a6070',
    fontSize: 16
  },
  timestamp: {
    color: '#4a6070',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 12,
    marginBottom: 16
  },
  button: {
    backgroundColor: '#1a2030',
    padding: 16,
    borderRadius: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2a3a4a',
    marginBottom: 8
  },
  buttonText: {
    color: '#00c8ff',
    fontSize: 16,
    fontWeight: '600'
  }
});

export default CameraScreen;