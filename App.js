import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Auth from './src/navigation/Auth';
import Toast from 'react-native-toast-message';

export default function App() {
  return (
    <NavigationContainer>
      <Auth />
      <Toast />
    </NavigationContainer>
  );
}
