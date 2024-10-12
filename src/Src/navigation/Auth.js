import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {Splash, Welcome} from '../../screens';

const Stack = createStackNavigator();

const Auth = () => {
  const [showSplashScreen, setShowSplashScreen] = useState(true);
  const [showWelcomeScreen, setShowWelcomeScreen] = useState(false);
  const [showLoginScreen, setShowLoginScreen] = useState(false);

  useEffect(() => {
    checkAppStatus();
  }, []);

  const checkAppStatus = async () => {
    try {
      const appStatus = await AsyncStorage.getItem('appStatus');
      if (!appStatus) {
        setShowWelcomeScreen(true);
        await AsyncStorage.setItem('appStatus', 'opened');
      } else {
        setShowLoginScreen(true);
      }
    } catch (error) {
      console.log('Error retrieving app status:', error);
    } finally {
      setTimeout(() => {
        setShowSplashScreen(false);
      }, 3000);
    }
  };

  return (
    <Stack.Navigator
      initialRouteName="SplashScreen"
      screenOptions={{headerShown: false}}>
      {showSplashScreen ? (
        <Stack.Screen name="SplashScreen" component={Splash} />
      ) : null}

      {showWelcomeScreen ? (
        <Stack.Screen name="WelcomeScreen" component={Welcome} />
      ) : null}

      <Stack.Screen
        name="Home"
        component={DrawerStack}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default Auth;
