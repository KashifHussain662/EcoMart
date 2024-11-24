import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {COLORS} from '../../theme';

const TextFields = ({headingText, bodyText, headingStyle, bodyStyle}) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.heading, headingStyle]}>{headingText}</Text>
      <Text style={[styles.body, bodyStyle]}>{bodyText}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    // marginVertical: 50,
  },
  heading: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 10,
    color: COLORS.primary,
    textAlign: 'center',
  },
  body: {
    fontSize: 18,
    color: COLORS.light,
    textAlign: 'center',
  },
});

export default TextFields;
