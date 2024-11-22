import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
} from 'react-native';
import ViewShot from 'react-native-view-shot';
import Share from 'react-native-share';
import {COLORS} from '../../theme';

const generateReceiptNumber = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const Receipt = ({cart}) => {
  const viewShotRef = useRef(null);
  const customerName = '######';
  const receiptNumber = generateReceiptNumber();
  const date = new Date().toLocaleDateString();
  const time = new Date().toLocaleTimeString();

  // Use the actual prices from the cart to calculate total
  const totalAmount = cart
    .reduce((total, item) => {
      const quantity = item.quantity || 0;
      return total + (parseFloat(item.price) || 0) * quantity;
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
        <View style={styles.logoContainer}>
          <Image
            source={require('../../assets/images/logo.png')}
            style={styles.logo}
          />
        </View>
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
            <Text style={[styles.headerText, styles.priceColumn]}>
              Price/Kg
            </Text>
            <Text style={[styles.headerText, styles.totalColumn]}>Total</Text>
          </View>

          {cart.map((item, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.rowText}>{index + 1}</Text>
              <Text style={styles.rowText}>{item.subcategory}</Text>
              <Text style={styles.rowText}>
                {item.unit === 'kg'
                  ? `${item.quantity} kg`
                  : item.unit === 'g'
                  ? `${item.quantity} g`
                  : `${item.quantity} pcs`}
              </Text>
              <Text style={[styles.rowText, styles.priceColumn]}>
                {item.price} {/* Ensure price from `item` is used here */}
              </Text>
              <Text style={[styles.rowText, styles.totalColumn]}>
                {(parseFloat(item.price) * item.quantity || 0).toFixed(2)}{' '}
                {/* Calculate total per item */}
              </Text>
            </View>
          ))}

          <View style={styles.totalRow}>
            <Text style={styles.totalText}>Total:</Text>
            <Text style={styles.totalText}>{totalAmount}</Text>
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Shop Location: Mohallah Anwarabad Ghotki
          </Text>
        </View>
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
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    // paddingBottom: 20,
  },
  logoContainer: {
    backgroundColor: '#000',
    alignItems: 'center',
  },
  logo: {
    width: '40%',
    height: 70,
    resizeMode: 'contain',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: '#f1f1f1',
  },
  receiptInfo: {
    fontSize: 14,
    color: '#2c3e50',
    fontWeight: '500',
  },
  receiptContainer: {
    // marginHorizontal: 15,
    // marginTop: 10,
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: COLORS.background,
    paddingVertical: 12,
    marginBottom: 5,
  },
  headerText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
    flex: 1,
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f1f1',
  },
  rowText: {
    flex: 1,
    textAlign: 'center',
    fontSize: 14,
    color: '#2c3e50',
  },
  priceInput: {
    width: '20%',
    fontSize: 12,
    textAlign: 'center',
    borderWidth: 1,
    borderColor: '#bdc3c7',
    borderRadius: 5,
    paddingVertical: 4,
    paddingHorizontal: 8,
    color: '#34495e',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#f7f7f7',
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#f1f1f1',
  },
  totalText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#e74c3c',
  },
  shareButton: {
    backgroundColor: COLORS.background,
    paddingVertical: 14,
    marginHorizontal: 30,
    marginTop: 20,
    borderRadius: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  shareText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  footer: {
    marginTop: 20,
    paddingVertical: 10,
    backgroundColor: '#f7f7f7',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  footerText: {
    fontSize: 14,
    color: 'black',
    textAlign: 'center',
  },
});

export default Receipt;
