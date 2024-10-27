// DetailScreen.js
import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

const DetailScreen = ({route}) => {
  const {item} = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{item.name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: 300,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  placeholderImage: {
    width: '100%',
    height: 300,
    backgroundColor: '#e0e0e0',
  },
});

export default DetailScreen;
