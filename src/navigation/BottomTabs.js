import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../theme';
import {BookOrder, Calculator, CustomerScreen, Home, Profile} from '../screens';

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          switch (route.name) {
            case 'Home':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'Calculator':
              iconName = focused ? 'calculator' : 'calculator-outline';
              break;
            case 'Profile':
              iconName = focused ? 'person' : 'person-outline';
              break;
            case 'BookOrder':
              iconName = focused ? 'book' : 'book-outline'; // Example icon
              break;
            case 'Khata':
              iconName = focused ? 'document-text' : 'document-text-outline'; // Example icon
              break;
            default:
              iconName = 'home';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: COLORS.background,
        tabBarInactiveTintColor: COLORS.dark,
      })}>
      <Tab.Screen name="Home" component={Home} options={{headerShown: false}} />
      <Tab.Screen
        name="BookOrder"
        component={BookOrder}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Calculator"
        component={Calculator}
        options={{headerShown: false}}
      />
      {/* <Tab.Screen
        name="Khata"
        component={CustomerScreen}
        options={{headerShown: false}}
      /> */}
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
};

export default BottomTabs;
