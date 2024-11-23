import React, {useState} from 'react';
import {View, StyleSheet, Alert, Text, TouchableOpacity} from 'react-native';
import {CustomButton, CustomTextInput, TextFields} from '../../../component';
import {COLORS} from '../../../theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';

const SecurityDetails = ({navigation, route}) => {
  const {firstName, lastName, gender, country, city, address} = route.params;
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true); // Toggle for both password fields

  const toggleSecureTextEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const handleSubmit = async () => {
    if (!phoneNumber || !email || !password || !confirmPassword) {
      setError(prev => ({...prev, general: 'Please fill out all fields.'}));
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    const accountDetails = {
      firstName,
      lastName,
      gender,
      country,
      city,
      address,
      phoneNumber,
      email,
      password,
    };

    try {
      // const response = await fetch(API_URLS.REGISTER_USER, {
      //     method: 'POST',
      //     headers: { 'Content-Type': 'application/json' },
      //     body: JSON.stringify(accountDetails),
      // });
      // const data = await response.json();

      const data = accountDetails; // Mock response

      // Log the account details for debugging
      console.log('Account Details:', data);

      // Save user data locally
      await AsyncStorage.setItem('user', JSON.stringify(accountDetails));
      navigation.navigate('Login');

      // if (data.message === 'User created successfully') {
      //   navigation.navigate('Home');
      // }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TextFields headingText="Security Details" />

      {/* Phone Number Input with Icon */}
      <CustomTextInput
        iconComponent={
          <Icon
            name="phone"
            size={20}
            color={error.phoneNumber ? COLORS.dark : COLORS.dark}
          />
        }
        placeholder="Phone Number"
        placeholderTextColor={COLORS.grey}
        value={phoneNumber}
        onChangeText={text => {
          setPhoneNumber(text);
          setError(prev => ({...prev, phoneNumber: ''}));
        }}
        error={error.phoneNumber}
      />

      {/* Email Input with Icon */}
      <CustomTextInput
        iconComponent={
          <Icon
            name="email"
            size={20}
            color={error.email ? COLORS.dark : COLORS.dark}
          />
        }
        placeholder="Email"
        placeholderTextColor={COLORS.grey}
        value={email}
        onChangeText={text => {
          setEmail(text);
          setError(prev => ({...prev, email: ''}));
        }}
        error={error.email}
      />

      {/* Password Input with Icon */}
      <CustomTextInput
        iconComponent={
          <Icon
            name="lock"
            size={20}
            color={error.password ? COLORS.dark : COLORS.dark}
          />
        }
        placeholder="Password"
        placeholderTextColor={COLORS.grey}
        secureTextEntry={secureTextEntry}
        value={password}
        onChangeText={text => {
          setPassword(text);
          setError(prev => ({...prev, password: ''}));
        }}
        error={error.password}
      />

      {/* Confirm Password Input with Icon */}
      <View style={styles.passwordContainer}>
        <CustomTextInput
          iconComponent={
            <Icon
              name="lock"
              size={20}
              color={error.confirmPassword ? COLORS.dark : COLORS.dark}
            />
          }
          placeholder="Confirm Password"
          placeholderTextColor={COLORS.grey}
          secureTextEntry={secureTextEntry}
          value={confirmPassword}
          onChangeText={text => {
            setConfirmPassword(text);
            setError(prev => ({...prev, confirmPassword: ''}));
          }}
          error={error.confirmPassword}
        />
        <TouchableOpacity
          onPress={toggleSecureTextEntry}
          style={styles.iconContainer}>
          <Icon
            name={secureTextEntry ? 'visibility-off' : 'visibility'}
            size={20}
            color={COLORS.primary}
          />
        </TouchableOpacity>
      </View>

      {error.general && <Text style={styles.error}>{error.general}</Text>}

      <CustomButton
        label="Submit"
        width={'90%'}
        height={45}
        style={styles.button}
        onPress={handleSubmit}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    padding: 16,
  },
  button: {
    marginTop: 16,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },

  passwordContainer: {
    width: '100%',
    position: 'relative',
  },
  iconContainer: {
    position: 'absolute',
    right: 10,
    top: 12,
    zIndex: 1,
  },
});

export default SecurityDetails;
