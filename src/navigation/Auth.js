import {createStackNavigator} from '@react-navigation/stack';
import {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  CreateAccount,
  DetailScreen,
  Home,
  LocationDetails,
  Login,
  MonthlyReport,
  SecurityDetails,
  SplashScreen,
  Welcome,
} from '../screens';
import BottomTabs from './BottomTabs';

const Stack = createStackNavigator();

const Auth = () => {
  const [showSplashScreen, setShowSplashScreen] = useState(true);
  const [showWelcomeScreen, setShowWelcomeScreen] = useState(false);

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
        // Directly navigate to Login if appStatus exists
        setShowWelcomeScreen(false); // Hide welcome screen if it was shown
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
      {/* Onboarding Screens */}
      {showSplashScreen && (
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
      )}
      {showWelcomeScreen && <Stack.Screen name="Welcome" component={Welcome} />}
      <Stack.Screen name="Login" component={Login} />

      <Stack.Screen name="CreateAccount" component={CreateAccount} />
      <Stack.Screen name="LocationDetails" component={LocationDetails} />
      <Stack.Screen name="SecurityDetails" component={SecurityDetails} />

      <Stack.Screen name="Tabs" component={BottomTabs} />
      <Stack.Screen name="MonthlyReport" component={MonthlyReport} />

      <Stack.Screen name="Detail" component={DetailScreen} />
    </Stack.Navigator>
  );
};

export default Auth;
