import {createStackNavigator} from '@react-navigation/stack';
import {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Home, Login, SplashScreen, Welcome} from '../screens';
import BottomTabs from './BottomTabs';

const Stack = createStackNavigator();

const Auth = () => {
  const [showSplashScreen, setShowSplashScreen] = useState(true);
  const [showWelcomeScreen, setShowWelcomeScreen] = useState(false);
  const [showGetStartedScreen, setShowGetStartedScreen] = useState(false);

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
        setShowGetStartedScreen(true);
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
      {/* //onboarding Screen */}
      {showSplashScreen && (
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
      )}
      {showWelcomeScreen && <Stack.Screen name="Welcome" component={Welcome} />}
      {showGetStartedScreen && <Stack.Screen name="Login" component={Login} />}

      <Stack.Screen name="Tabs" component={BottomTabs} />
    </Stack.Navigator>
  );
};

export default Auth;
