// App
// - Purpose: Application entry point. Sets up React Navigation with Home and Inventory screens.
// - Output: NavigationContainer with stack navigator containing `Home` and `Inventory`.

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './screens/HomeScreen';
import InventoryScreen from './screens/InventoryScreen';
import ProductBrowser from './screens/ProductBrowser';
import ProductBasket from './screens/ProductBasket';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Inventory" component={InventoryScreen} options={{ title: 'Inventory' }} />
        <Stack.Screen name="ProductBrowser" component={ProductBrowser} options={{ title: 'Products' }} />
        <Stack.Screen name="ProductBasket" component={ProductBasket} options={{ title: 'Basket' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
