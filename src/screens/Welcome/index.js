import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {TextFields} from '../../component';
import {COLORS} from '../../theme';

const Welcome = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      <TextFields
        headingText="Welcome to EcoMart"
        bodyText="Discover amazing features of our app. Shop conveniently, sustainably!"
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Login')}>
        <Text style={styles.buttonText}>Let’s Get Started</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background, // Light or theme-based background
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  logo: {
    width: 350,
    height: 350,
    marginBottom: 30,
  },
  button: {
    marginTop: 40,
    paddingVertical: 15,
    paddingHorizontal: 60,
    backgroundColor: COLORS.primary, // Use theme primary color
    borderRadius: 8,
    elevation: 5, // Add subtle shadow for better button appearance
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.white, // Ensure readability
    textAlign: 'center',
  },
});

export default Welcome;
