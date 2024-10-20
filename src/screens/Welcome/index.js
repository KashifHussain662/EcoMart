import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {TextFields} from '../../component';
import {COLORS} from '../../theme';

// Create a component
const Welcome = ({navigation}) => {
  return (
    <View style={styles.container}>
      <TextFields
        headingText={'Welcome to Zeeshiii'}
        bodyText={'Discover amazing features of our app'}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Home')}>
        <Text style={styles.buttonText}>Let's Go</Text>
      </TouchableOpacity>
    </View>
  );
};

// Define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    padding: 20,
  },
  button: {
    marginTop: 30,
    paddingVertical: 15,
    paddingHorizontal: 40,
    backgroundColor: '#3498db',
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});

// Make this component available to the app
export default Welcome;
