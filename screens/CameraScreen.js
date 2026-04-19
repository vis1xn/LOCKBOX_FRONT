import React, { useState, useEffect, useRef } from 'react';
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
  const [autoRefresh, setAutoRefresh] = useState(false);
  const intervalRef = useRef(null);

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
      setAutoRefresh(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSnapshot();
  }, []);

  useEffect(() => {
    if (autoRefresh) {
      intervalRef.current = setInterval(fetchSnapshot, 2000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [autoRefresh]);

  // Stop auto refresh when leaving screen
  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.back} onPress={() => {
        setAutoRefresh(false);
        navigation.goBack();
      }}>
        <Text style={styles.backText}>← Back</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Live Camera</Text>

      <View style={styles.cameraBox}>
        {snapshot ? (
          <Image source={{ uri: snapshot }} style={styles.image} resizeMode="contain" />
        ) : (
          <ActivityIndicator size="large" color="#00c8ff" />
        )}
        {loading && snapshot && (
          <View style={styles.refreshingBadge}>
            <Text style={styles.refreshingText}>Updating...</Text>
          </View>
        )}
      </View>

      {lastUpdated && (
        <Text style={styles.timestamp}>Last updated: {lastUpdated}</Text>
      )}

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.button} onPress={fetchSnapshot}>
          <Text style={styles.buttonText}>↻ Snapshot</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { borderColor: autoRefresh ? '#00c864' : '#2a3a4a' }]}
          onPress={() => setAutoRefresh(!autoRefresh)}
        >
          <Text style={[styles.buttonText, { color: autoRefresh ? '#00c864' : '#00c8ff' }]}>
            {autoRefresh ? '⏹ Stop Live' : '▶ Go Live'}
          </Text>
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
  refreshingBadge: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20
  },
  refreshingText: {
    color: '#00c8ff',
    fontSize: 11
  },
  timestamp: {
    color: '#4a6070',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 12,
    marginBottom: 16
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 8
  },
  button: {
    flex: 1,
    backgroundColor: '#1a2030',
    padding: 16,
    borderRadius: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2a3a4a'
  },
  buttonText: {
    color: '#00c8ff',
    fontSize: 15,
    fontWeight: '600'
  }
});

export default CameraScreen;