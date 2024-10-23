import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../theme';
import {Calculator, CustomerScreen, Home, Profile} from '../screens';

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Calculator') {
            iconName = focused ? 'calculator' : 'calculator-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          } else {
            iconName = 'home'; // Default icon (change if needed)
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.secondary,
      })}>
      <Tab.Screen name="Home" component={Home} options={{headerShown: false}} />
      <Tab.Screen
        name="Calculator"
        component={Calculator}
        // options={{headerShown: false}}
      />

      <Tab.Screen
        name="Khata"
        component={CustomerScreen}
        // options={{headerShown: false}}
      />

      <Tab.Screen
        name="Profile"
        component={Profile}
        // options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
};

export default BottomTabs;
