import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {COLORS} from '../../theme';

const CustomerProfile = ({navigation}) => {
  const customer = {
    name: 'Kashif Hussain',
    email: 'kashif@example.com',
    location: 'AnwaraAbad',
    profilePicture: require('../../assets/images/profile.jpg'),
    previousBill: 10000,
    currentBill: 12000,
    monthlyItems: [
      {
        item: 'Rice',
        quantity: '10 kg',
        price: 2000,
        date: '2024-10-01',
        buyer: 'Raj',
      },
      {
        item: 'Flour',
        quantity: '5 kg',
        price: 100,
        date: '2024-10-05',
        buyer: 'Sita',
      },
    ],
  };

  const totalBill = customer.monthlyItems.reduce(
    (sum, item) => sum + item.price,
    0,
  );
  const overallTotal = customer.previousBill + customer.currentBill + totalBill;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Customer Profile</Text>
      </View>
      <View style={styles.profileCard}>
        <Image
          source={customer.profilePicture}
          style={styles.profilePicture}
          accessibilityLabel={`Profile picture of ${customer.name}`}
        />
        <View style={styles.profileInfo}>
          <Text style={styles.name}>{customer.name}</Text>
          <Text style={styles.location}>{customer.location}</Text>
          <Text style={styles.email}>{customer.email}</Text>
        </View>
      </View>

      <View style={styles.totalContainer}>
        <Text style={styles.totalLabel}>Overall Total:</Text>
        <Text style={styles.totalAmount}>{`Rs. ${overallTotal}`}</Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.navigate('MonthlyReport', {
            monthlyItems: customer.monthlyItems,
            previousBill: customer.previousBill,
            currentBill: customer.currentBill,
          })
        }>
        <Text style={styles.buttonText}>View Monthly Report</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    padding: 20,
    backgroundColor: COLORS.background,
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.light,
    // textAlign: 'center',
    // marginBottom: 30,
  },
  profileCard: {
    padding: 20,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
  },
  profilePicture: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 15,
    borderWidth: 2,
    borderColor: '#dee2e6',
  },
  profileInfo: {
    flex: 1,
  },
  name: {
    fontSize: 24,
    fontWeight: '600',
    color: '#343a40',
  },
  location: {
    fontSize: 16,
    color: '#868e96',
  },
  email: {
    fontSize: 14,
    color: '#868e96',
  },
  totalContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    borderTopWidth: 1,
    borderTopColor: '#dee2e6',
    paddingVertical: 15,
  },
  totalLabel: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#212529',
  },
  totalAmount: {
    fontSize: 20,
    color: '#dc3545',
  },
  button: {
    marginTop: 20,
    paddingVertical: 15,
    backgroundColor: COLORS.primary,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default CustomerProfile;
