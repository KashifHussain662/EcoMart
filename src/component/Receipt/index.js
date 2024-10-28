import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

// Function to generate a random receipt number
const generateReceiptNumber = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const Receipt = ({cart}) => {
  const customerName = 'Kashif';
  const receiptNumber = generateReceiptNumber(); // Auto-generated receipt number
  const date = new Date().toLocaleDateString();
  const time = new Date().toLocaleTimeString();

  return (
    <View style={styles.container}>
      <Text style={styles.shopName}>Kashif Kiryana Shop</Text>
      <View style={styles.header}>
        <View>
          <Text style={styles.receiptInfo}>Receipt No: {receiptNumber}</Text>
          <Text>CustomerName : {customerName}</Text>
        </View>
        <View>
          <Text style={styles.receiptInfo}>Date: {date}</Text>
          <Text style={styles.receiptInfo}>Time: {time}</Text>
        </View>
      </View>

      <View style={styles.receiptContainer}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'space-between',
    backgroundColor: '#ecf0f1',
    borderRadius: 8,
  },
  receiptContainer: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  shopName: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#2c3e50',
    textDecorationLine: 'underline',
  },
  receiptInfo: {
    fontSize: 14,
    // paddingHorizontal: 12,
    color: '#7f8c8d',
  },
  customerInfo: {
    flexDirection: 'row',
    marginBottom: 10,
    // paddingHorizontal: 10,
    padding: 12,
  },
  customerLabel: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  customerName: {
    fontSize: 18,
    color: '#7f8c8d',
    textAlign: 'center',
    width: '70%',
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 2,
    borderBottomColor: '#2980b9',
    paddingVertical: 8,
  },
  headerText: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
    color: '#2980b9',
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  rowText: {
    flex: 1,
    textAlign: 'center',
    fontSize: 14,
    color: '#34495e',
  },
  totalText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'right',
    color: '#e74c3c',
  },
});

export default Receipt;
