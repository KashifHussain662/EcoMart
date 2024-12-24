import React, {useEffect, useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../theme';
import {Home, BookOrder, Category, Calculator, Profile} from '../screens';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await AsyncStorage.getItem('user');

        if (userData !== null) {
          const parsedUser = JSON.parse(userData);
          setUser(parsedUser);
        }
      } catch (error) {
        console.error('Error fetching user data from AsyncStorage:', error);
      }
    };

    fetchUserData();
  }, []);

  // console.log(user);

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          // Conditionally set icon based on route name
          switch (route.name) {
            case 'Home':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'BookOrder':
              iconName = focused ? 'book' : 'book-outline';
              break;
            case 'Category':
              iconName = focused ? 'grid' : 'grid-outline'; // Or any other icon for Category
              break;
            case 'Calculator':
              iconName = focused ? 'calculator' : 'calculator-outline';
              break;
            case 'Profile':
              iconName = focused ? 'person' : 'person-outline';
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

      {user && user.role === 'customer' ? (
        <Tab.Screen
          name="Calculator"
          component={Calculator}
          options={{headerShown: false}}
        />
      ) : (
        <Tab.Screen
          name="Category"
          component={Category}
          options={{headerShown: false}}
        />
      )}

      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
};

export default BottomTabs;
