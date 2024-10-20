// import libraries
import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {COLORS} from '../../theme';

// create a component
const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/logo.png')} // Update the path to your logo
        style={styles.logo}
        resizeMode="contain"
      />
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
  logo: {
    borderRadius: 50,
  },
  text: {
    fontSize: 24,
    color: COLORS.primary, // Change to your desired text color
  },
});

export default SplashScreen;
