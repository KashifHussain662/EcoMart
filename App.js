import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Auth from './src/navigation/Auth';

export default function App() {
  return (
    <NavigationContainer>
      <Auth />
    </NavigationContainer>
  );
}
