import React from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, SafeAreaView
} from 'react-native';

const WelcomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>🔒</Text>
        <Text style={styles.title}>LockBox</Text>
        <Text style={styles.subtitle}>Smart Secure Delivery</Text>
      </View>

      <View style={styles.buttons}>
        <TouchableOpacity
          style={styles.ownerButton}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.ownerButtonText}>I am an Owner</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.driverButton}
          onPress={() => navigation.navigate('DeliveryLogin')}
        >
          <Text style={styles.driverButtonText}>I am a Delivery Driver</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.footer}>ATU Galway · Final Year Project</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0d14',
    justifyContent: 'space-between',
    padding: 24
  },
  header: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  logo: {
    fontSize: 64,
    marginBottom: 16
  },
  title: {
    fontSize: 40,
    fontWeight: '800',
    color: '#fff',
    letterSpacing: 4
  },
  subtitle: {
    fontSize: 16,
    color: '#4a6070',
    marginTop: 8,
    letterSpacing: 2
  },
  buttons: {
    gap: 16,
    marginBottom: 32
  },
  ownerButton: {
    backgroundColor: '#00c8ff',
    padding: 18,
    borderRadius: 14,
    alignItems: 'center'
  },
  ownerButtonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: '700'
  },
  driverButton: {
    backgroundColor: 'transparent',
    padding: 18,
    borderRadius: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2a3a4a'
  },
  driverButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600'
  },
  footer: {
    textAlign: 'center',
    color: '#2a3a4a',
    fontSize: 12,
    letterSpacing: 1
  }
});

export default WelcomeScreen;