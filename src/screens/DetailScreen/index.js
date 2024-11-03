// DetailScreen.js
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {COLORS} from '../../theme';

const DetailScreen = ({route, navigation}) => {
  const {item} = route.params;

  const handleButtonPress = () => {
    console.log('Button Pressed!');
    // Example: navigation.navigate('CartScreen'); // Navigate to another screen
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Item Details</Text>
      </View>
      <Image source={item.imageUrl} style={styles.image} />
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.price}>${item.price.toFixed(2)}</Text>
        <Text style={styles.category}>Category: {item.category}</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleButtonPress}>
        <Text style={styles.buttonText}>Add to Cart</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightBackground, // Use a defined color for a consistent theme
  },
  header: {
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary, // Use primary color from the theme
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    elevation: 5, // Add shadow for elevation
  },
  headerTitle: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    resizeMode: 'cover',
    marginBottom: 20,
  },
  detailsContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 5,
    marginHorizontal: 20, // Add margin for spacing
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  price: {
    fontSize: 22,
    color: COLORS.green, // Use a defined color for price
    marginBottom: 10,
  },
  category: {
    fontSize: 16,
    color: '#777',
  },
  button: {
    backgroundColor: COLORS.secondary, // Use a defined color for the button
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 30,
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default DetailScreen;
