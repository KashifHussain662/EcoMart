import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import {COLORS} from '../../theme';

const CustomButton = ({label, onPress, style, textStyle, width, height}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        style,
        {width: width || 'auto', height: height || 'auto'},
      ]}
      onPress={onPress}
      activeOpacity={0.8} // Adds a subtle effect on press
    >
      <Text style={[styles.buttonText, textStyle]}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.secondary, // Change this to your desired color
    paddingVertical: 12, // Increased vertical padding for a better look
    paddingHorizontal: 20, // Increased horizontal padding
    borderRadius: 8, // Slightly larger border radius for softer edges
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 6,
    elevation: 4, // Shadow effect for Android
    shadowColor: '#000', // Shadow effect for iOS
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.6,
    shadowRadius: 4,
    borderWidth: 0.1,
  },
  buttonText: {
    color: 'white',
    fontSize: 18, // Slightly larger font size
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default CustomButton;
