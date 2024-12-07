import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Modal,
  ActivityIndicator,
  Text,
} from 'react-native';
import axios from 'axios'; // Import axios
import {COLORS} from '../../theme';
import {CustomTextInput, CustomButton} from '../../component'; // Update path if necessary
import Icon from 'react-native-vector-icons/FontAwesome';
import showToast from '../../Utility';
import AsyncStorage from '@react-native-async-storage/async-storage';
import API_URLS from '../../Api';

const Login = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [loading, setLoading] = useState(false);

  const validateEmail = email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // const handleLogin = async () => {
  //   if (!username || !password) {
  //     showToast({
  //       message: 'Please enter both email and password',
  //       type: 'error',
  //     });
  //     return;
  //   }

  //   if (!validateEmail(username)) {
  //     showToast({
  //       message: 'Please enter a valid email address.',
  //       type: 'error',
  //     });
  //     return;
  //   }

  //   setLoading(true);

  //   try {
  //     const response = await fetch(API_URLS.LOGIN_USER, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({email: username, password}),
  //     });

  //     const responseJson = await response.json();
  //     console.log(responseJson);

  //     setLoading(false);

  //     if (responseJson.error) {
  //       showToast({message: responseJson.error, type: 'error'});
  //     } else {
  //       showToast({
  //         message: 'Login successful! Welcome back.',
  //         type: 'success',
  //       });

  //       await AsyncStorage.setItem('user', JSON.stringify(responseJson.user));

  //       navigation.navigate('Tabs');
  //     }
  //   } catch (error) {
  //     setLoading(false);
  //     showToast({
  //       message: 'An error occurred while logging in. Please try again.',
  //       type: 'error',
  //     });
  //     console.error('Login Error:', error);
  //   }
  // };

  const handleLogin = async () => {
    if (!username || !password) {
      showToast({
        message: 'Please enter both email and password',
        type: 'error',
      });
      return;
    }

    if (!validateEmail(username)) {
      showToast({
        message: 'Please enter a valid email address.',
        type: 'error',
      });
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(API_URLS.LOGIN_USER, {
        email: username,
        password,
      });

      const responseJson = response.data;
      // console.log(responseJson);

      setLoading(false);

      if (responseJson.error) {
        showToast({message: responseJson.error, type: 'error'});
      } else {
        showToast({
          message: 'Login successful! Welcome back.',
          type: 'success',
        });

        await AsyncStorage.setItem('user', JSON.stringify(responseJson.user));

        navigation.navigate('Tabs');
      }
    } catch (error) {
      setLoading(false);
      showToast({
        message: 'An error occurred while logging in. Please try again.',
        type: 'error',
      });
      console.error('Login Error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/logo.png')}
        style={styles.logo}
      />

      <View style={styles.formContainer}>
        <CustomTextInput
          iconComponent={<Icon name="user" size={20} color={COLORS.dark} />}
          placeholder="Email"
          value={username}
          onChangeText={setUsername}
          placeholderTextColor={COLORS.grey}
          error={!username && 'Email is required'}
        />

        <CustomTextInput
          iconComponent={<Icon name="lock" size={20} color={COLORS.dark} />}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={secureTextEntry}
          toggleSecureTextEntry={() => setSecureTextEntry(!secureTextEntry)}
          placeholderTextColor={COLORS.grey}
          error={!password && 'Password is required'}
        />

        <CustomButton
          label="Log In"
          onPress={handleLogin}
          width="90%"
          height={50}
        />

        <CustomButton
          label="Create Account"
          onPress={() => navigation.navigate('CreateAccount')}
          style={styles.createAccountButton}
          textStyle={{color: COLORS.primary}}
        />
      </View>

      {loading && (
        <Modal transparent animationType="fade" visible={loading}>
          <View style={styles.modalBackground}>
            <View style={styles.activityIndicatorWrapper}>
              <ActivityIndicator size="large" color={COLORS.dark} />
              <Text style={styles.loadingText}>Logging in...</Text>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    paddingHorizontal: 20,
  },
  logo: {
    height: 200,
    resizeMode: 'contain',
  },
  formContainer: {
    width: '100%',
    alignItems: 'center',
  },
  createAccountButton: {
    backgroundColor: COLORS.background,
    marginTop: 10,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  activityIndicatorWrapper: {
    backgroundColor: 'white',
    width: '90%',
    borderRadius: 10,
    padding: 16,
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: COLORS.dark,
  },
});

export default Login;
