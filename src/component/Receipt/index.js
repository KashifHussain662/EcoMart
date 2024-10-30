import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import ViewShot from 'react-native-view-shot';
import Share from 'react-native-share';
import {COLORS} from '../../theme';

const generateReceiptNumber = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const Receipt = ({cart}) => {
  const viewShotRef = useRef(null);
  const customerName = 'Kashif';
  const receiptNumber = generateReceiptNumber();
  const date = new Date().toLocaleDateString();
  const time = new Date().toLocaleTimeString();

  const [prices, setPrices] = useState(cart.map(() => '')); // Initialize prices

  const handlePriceChange = (index, value) => {
    const newPrices = [...prices];
    newPrices[index] = value;
    setPrices(newPrices);
  };

  const totalAmount = prices
    .reduce((total, price, index) => {
      const quantity = cart[index].quantity || 0;
      return total + (parseFloat(price) || 0) * quantity;
    }, 0)
    .toFixed(2);

  const handleShare = async () => {
    if (viewShotRef.current) {
      try {
        const uri = await viewShotRef.current.capture();
        await Share.open({
          title: 'Receipt',
          url: uri,
          failOnCancel: false,
        });
      } catch (error) {
        Alert.alert('Error sharing the receipt', error.message);
      }
    }
  };

  return (
    <>
      <ViewShot
        ref={viewShotRef}
        options={{format: 'png', quality: 0.9}}
        style={styles.container}>
        <Text style={styles.receiptHeader}>Order Receipt</Text>
        <View style={styles.header}>
          <View>
            <Text style={styles.receiptInfo}>Receipt No: {receiptNumber}</Text>
            <Text style={styles.receiptInfo}>
              Customer Name: {customerName}
            </Text>
          </View>
          <View>
            <Text style={styles.receiptInfo}>Date: {date}</Text>
            <Text style={styles.receiptInfo}>Time: {time}</Text>
          </View>
        </View>

        <ScrollView style={styles.receiptContainer}>
          <View style={styles.tableHeader}>
            <Text style={styles.headerText}>S No</Text>
            <Text style={styles.headerText}>Item</Text>
            <Text style={styles.headerText}>Qty</Text>
            <Text style={styles.headerText}>Price/Kg</Text>
            <Text style={styles.headerText}>Total</Text>
          </View>

          {cart.map((item, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.rowText}>{index + 1}</Text>
              <Text style={styles.rowText}>{item.subcategory}</Text>
              <Text style={styles.rowText}>{item.quantity}</Text>
              <TextInput
                style={styles.priceInput}
                keyboardType="numeric"
                placeholder="Enter Price"
                value={prices[index]}
                onChangeText={value => handlePriceChange(index, value)}
              />
              <Text style={styles.rowText}>
                ${(parseFloat(prices[index]) * item.quantity || 0).toFixed(2)}
              </Text>
            </View>
          ))}
          <View style={styles.totalRow}>
            <Text style={styles.totalText}>Total:</Text>
            <Text style={styles.totalText}>${totalAmount}</Text>
          </View>
        </ScrollView>
      </ViewShot>

      <TouchableOpacity onPress={handleShare} style={styles.shareButton}>
        <Text style={styles.shareText}>Share Receipt</Text>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 10,
    backgroundColor: '#ffffff',
    // padding: 20,
    // margin: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
  },
  shopName: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#2c3e50',
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  receiptHeader: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // marginBottom: 10,
    padding: 12,
    borderWidth: 0.2,
    borderTopRightRadius: 6,
    borderTopLeftRadius: 6,
  },
  receiptInfo: {
    fontSize: 14,
    color: '#7f8c8d',
  },
  receiptContainer: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    // borderRadius: 8,
    backgroundColor: '#fdfdfd',
    marginBottom: 10,
    overflow: 'hidden',
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'black',
    paddingVertical: 10,
  },
  headerText: {
    fontSize: 14,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
    color: '#ffffff',
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    alignItems: 'center',
  },
  rowText: {
    flex: 1,
    textAlign: 'center',
    fontSize: 14,
    color: '#34495e',
  },
  priceInput: {
    // flex: 1,
    textAlign: 'center',
    fontSize: 10,
    borderWidth: 0.2,
    borderColor: '#bdc3c7',
    borderRadius: 5,
    padding: 5,
    // marginHorizontal: 5,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#e9ecef',
  },
  totalText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#e74c3c',
  },
  shareButton: {
    backgroundColor: 'black',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 15,
  },
  shareText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default Receipt;
