import React, { useEffect, useState } from 'react';
import {
  View, Text, TouchableOpacity,
  StyleSheet, SafeAreaView, Alert
} from 'react-native';
import { PI_URL } from '../api/config';

const DashboardScreen = ({ navigation }) => {
  const [lockStatus, setLockStatus] = useState('checking...');

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

  const menuItems = [
    { label: '🔓  Lock / Unlock', screen: 'Lock', color: '#00c8ff' },
    { label: '📷  Live Camera', screen: 'Camera', color: '#00c864' },
    { label: '📬  Mail Status', screen: 'Mail', color: '#ffa000' },
    { label: '🚚  Delivery PIN', screen: 'DeliveryPin', color: '#b464ff' },
    { label: '🔑  Change PIN', screen: 'ChangePin', color: '#ff6432' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>🔒 LockBox</Text>
        <View style={[styles.statusBadge, { borderColor: lockStatus === 'open' ? '#00c864' : '#ff6432' }]}>
          <Text style={[styles.statusText, { color: lockStatus === 'open' ? '#00c864' : '#ff6432' }]}>
            {lockStatus === 'open' ? '🟢 Open' : '🔴 Closed'}
          </Text>
        </View>
      </View>

      <View style={styles.menu}>
        {menuItems.map((item) => (
          <TouchableOpacity
            key={item.screen}
            style={[styles.menuItem, { borderLeftColor: item.color }]}
            onPress={() => navigation.navigate(item.screen)}
          >
            <Text style={styles.menuText}>{item.label}</Text>
            <Text style={styles.arrow}>›</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        style={styles.logoutButton}
        onPress={() => navigation.replace('Welcome')}
      >
        <Text style={styles.logoutText}>Log Out</Text>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 32,
    marginTop: 8
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#fff'
  },
  statusBadge: {
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 4
  },
  statusText: {
    fontSize: 13,
    fontWeight: '600'
  },
  menu: {
    flex: 1,
    gap: 12
  },
  menuItem: {
    backgroundColor: '#1a2030',
    padding: 20,
    borderRadius: 14,
    borderLeftWidth: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  menuText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600'
  },
  arrow: {
    color: '#4a6070',
    fontSize: 24
  },
  logoutButton: {
    padding: 16,
    alignItems: 'center'
  },
  logoutText: {
    color: '#4a6070',
    fontSize: 15
  }
});

export default DashboardScreen;