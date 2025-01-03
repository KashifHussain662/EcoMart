import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import ViewShot from 'react-native-view-shot';
import Share from 'react-native-share';
import {COLORS} from '../../theme';
import API_URLS from '../../Api';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

const generateReceiptNumber = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const Receipt = ({cart}) => {
  const [isOrderCompleted, setIsOrderCompleted] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('user');
        if (storedUser !== null) {
          const userObject = JSON.parse(storedUser);
          setUser(userObject);
        } else {
          console.log('No user found in storage.');
        }
      } catch (error) {
        console.error('Error fetching user from AsyncStorage:', error);
      }
    };

    fetchUser();
  }, []);

  const viewShotRef = useRef(null);
  const id = `${user?.id}`;
  // console.log(id);
  const Name = `${user?.first_name} ${user?.last_name}`; // Replace with dynamic data as needed
  const receiptNumber = generateReceiptNumber();
  const date = new Date().toLocaleDateString();
  const time = new Date().toLocaleTimeString();

  const totalAmount = cart
    .reduce(
      (total, item) =>
        total + (parseFloat(item.price) || 0) * (item.quantity || 0),
      0,
    )
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

  const saveReceiptImage = async uri => {
    try {
      // Save the captured image (as base64 or URI) in AsyncStorage
      await AsyncStorage.setItem('receipt_image', uri);
      console.log('Receipt image saved to AsyncStorage');
      Alert.alert('Success', 'Receipt image has been saved!');
    } catch (error) {
      console.error('Error saving receipt image:', error.message);
      Alert.alert('Error', 'Failed to save receipt image.');
    }
  };

  const bookOrder = async () => {
    const orderData = {
      cart,
      customer_id: id,
      customer_name: Name,
      total_amount: totalAmount,
    };

    try {
      const response = await fetch(API_URLS.ORDER_BOOK, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      const rawResponse = await response.text(); // Get the raw response as text
      console.log('Raw response:', rawResponse); // Log it

      if (response.ok) {
        const result = JSON.parse(rawResponse); // Parse the response manually
        if (result.status === 'success') {
          // Capture the receipt image after successful order booking
          if (viewShotRef.current) {
            const uri = await viewShotRef.current.capture();
            await saveReceiptImage(uri); // Save image to AsyncStorage
          }

          // Set state to hide the receipt and order actions
          setIsOrderCompleted(true);

          Alert.alert(
            'Success',
            `Order booked! Receipt Number: ${result.receipt_number}`,
          );
        } else {
          Alert.alert('Error', result.message || 'Something went wrong');
        }
      } else {
        Alert.alert('Error', 'Request failed with status: ' + response.status);
      }
    } catch (error) {
      Alert.alert('Error', error.message);
      console.log('Error', error.message);
    }
  };

  // Render only when the order is not completed
  if (isOrderCompleted) {
    return (
      <View style={styles.container}>
        <Text style={styles.successText}>
          Your order has been successfully booked!
        </Text>
      </View>
    );
  }

  return (
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
          <Text style={styles.receiptInfo}>Name: {Name}</Text>
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
          <Text style={[styles.headerText, styles.priceColumn]}>Price</Text>
          <Text style={[styles.headerText, styles.totalColumn]}>Total</Text>
        </View>

        {cart.map((item, index) => (
          <View key={index} style={styles.tableRow}>
            <Text style={styles.rowText}>{index + 1}</Text>
            <Text style={styles.rowText}>{item.subcategory}</Text>
            <Text style={styles.rowText}>{item.quantity}</Text>
            <Text style={[styles.rowText, styles.priceColumn]}>
              {item.price}
            </Text>
            <Text style={[styles.rowText, styles.totalColumn]}>
              {(parseFloat(item.price) * item.quantity || 0).toFixed(2)}
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

      <TouchableOpacity onPress={bookOrder} style={styles.actionButton}>
        <Text style={styles.actionText}>Book Order</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleShare} style={styles.actionButton}>
        <Text style={styles.actionText}>Share Receipt</Text>
      </TouchableOpacity>
    </ViewShot>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 10,
    backgroundColor: '#ffffff',
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  logo: {
    width: 150,
    height: 70,
    resizeMode: 'contain',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  receiptInfo: {
    fontSize: 14,
    color: '#2c3e50',
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: COLORS.primary,
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  headerText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffffff',
    flex: 1,
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f1f1',
  },
  rowText: {
    flex: 1,
    textAlign: 'center',
    fontSize: 14,
    color: '#2c3e50',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    backgroundColor: '#f7f7f7',
  },
  totalText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  footer: {
    marginTop: 10,
    paddingVertical: 10,
    alignItems: 'center',
    backgroundColor: '#f7f7f7',
  },
  footerText: {
    fontSize: 12,
    color: '#7f8c8d',
  },
  actionButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    marginHorizontal: 30,
    marginTop: 10,
    borderRadius: 25,
    alignItems: 'center',
  },
  actionText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  successText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.primary,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default Receipt;
