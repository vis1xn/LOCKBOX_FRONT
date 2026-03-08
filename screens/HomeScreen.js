// HomeScreen
// - Purpose: Simple welcome screen with navigation to Inventory screen.
// - Props:
//    - navigation: react-navigation prop used to navigate to other screens
// - Output: renders a welcome message and a button to go to Inventory.

import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.center}>
        <Text style={styles.title}>Welcome to ShopDemo</Text>
        <View style={{ height: 8 }} />
        <Button title="Browse Products" onPress={() => navigation.navigate('ProductBrowser')} />
      </View>

      <View style={styles.footer}>
        <Text style={styles.text}>Manage your inventory from the Inventory screen.</Text>
        <View style={{ height: 12 }} />
        <View style={{ width: '100%', maxWidth: 360 }}>
          <Button title="Go to Inventory" onPress={() => navigation.navigate('Inventory')} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  footer: { paddingBottom: 24, alignItems: 'center' },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 8 },
  text: { marginBottom: 16, color: '#444' },
});
