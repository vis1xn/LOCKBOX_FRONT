import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import WelcomeScreen from './screens/WelcomeScreen';
import LoginScreen from './screens/LoginScreen';
import DashboardScreen from './screens/DashboardScreen';
import LockScreen from './screens/LockScreen';
import CameraScreen from './screens/CameraScreen';
import MailScreen from './screens/MailScreen';
import DeliveryPinScreen from './screens/DeliveryPinScreen';
import DeliveryLoginScreen from './screens/DeliveryLoginScreen';
import ChangePinScreen from './screens/ChangePinScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
        <Stack.Screen name="Lock" component={LockScreen} />
        <Stack.Screen name="Camera" component={CameraScreen} />
        <Stack.Screen name="Mail" component={MailScreen} />
        <Stack.Screen name="DeliveryPin" component={DeliveryPinScreen} />
        <Stack.Screen name="DeliveryLogin" component={DeliveryLoginScreen} />
        <Stack.Screen name="ChangePin" component={ChangePinScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}