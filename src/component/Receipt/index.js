// Receipt.js
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const Receipt = ({cart}) => {
  return (
    <View style={styles.receiptContainer}>
      <Text style={styles.shopName}>Kashif Kiryana Shop</Text>
      <View style={styles.tableHeader}>
        <Text style={styles.headerText}>S No</Text>
        <Text style={styles.headerText}>Item</Text>
        <Text style={styles.headerText}>Weight/Quantity</Text>
      </View>
      {cart.map((item, index) => (
        <View key={index} style={styles.tableRow}>
          <Text style={styles.rowText}>{index + 1}</Text>
          <Text style={styles.rowText}>{item.subcategory}</Text>
          <Text style={styles.rowText}>
            {item.quantity} {item.unit}
          </Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  receiptContainer: {
    padding: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginTop: 20,
    backgroundColor: 'white',
    elevation: 2,
    marginBottom: 100,
  },
  shopName: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 5,
  },
  headerText: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
  },
  rowText: {
    flex: 1,
    textAlign: 'center',
    fontSize: 14,
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    borderTopWidth: 1,
  },
});

export default Receipt;
