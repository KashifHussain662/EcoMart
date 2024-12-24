import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Button,
  Alert,
} from 'react-native';

const CustomerScreen = () => {
  const [customers, setCustomers] = useState([
    {id: '1', name: 'Ali Raza Malik', amount: 1668},
  ]);
  const [searchQuery, setSearchQuery] = useState('');
  const [newCustomerName, setNewCustomerName] = useState('');
  const [newCustomerAmount, setNewCustomerAmount] = useState('');

  const addCustomer = () => {
    if (newCustomerName && newCustomerAmount) {
      const newCustomer = {
        id: (customers.length + 1).toString(),
        name: newCustomerName,
        amount: parseFloat(newCustomerAmount),
      };
      setCustomers([...customers, newCustomer]);
      setNewCustomerName('');
      setNewCustomerAmount('');
      Alert.alert('Customer Added', `${newCustomer.name} has been added.`);
    } else {
      Alert.alert('Error', 'Please enter both name and amount.');
    }
  };

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <View style={styles.container}>
      {/* Top Boxes */}
      <View style={styles.topBoxes}>
        <View style={styles.box}>
          <Text style={styles.amountNegative}>Rs. 0</Text>
          <Text style={styles.text}>Maine dene hain</Text>
        </View>
        <View style={styles.box}>
          <Text style={styles.amountPositive}>Rs. 1,668</Text>
          <Text style={styles.text}>Maine lene hain</Text>
        </View>
      </View>

      {/* Search Bar */}
      <TextInput
        style={styles.searchBar}
        placeholder="Search Customer"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      {/* Customer List */}
      <FlatList
        data={filteredCustomers}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <View style={styles.customerCard}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{item.name[0]}</Text>
            </View>
            <Text style={styles.customerName}>{item.name}</Text>
            <Text style={styles.customerAmount}>Rs. {item.amount}</Text>
          </View>
        )}
      />

      {/* Add New Customer Section */}
      <View style={styles.newCustomerSection}>
        <TextInput
          style={styles.input}
          placeholder="New Customer Name"
          value={newCustomerName}
          onChangeText={setNewCustomerName}
        />
        <TextInput
          style={styles.input}
          placeholder="Amount"
          keyboardType="numeric"
          value={newCustomerAmount}
          onChangeText={setNewCustomerAmount}
        />
        <Button title="Add Customer" onPress={addCustomer} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  topBoxes: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  box: {
    width: '48%',
    padding: 16,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    alignItems: 'center',
  },
  amountNegative: {
    color: 'red',
    fontSize: 18,
    fontWeight: 'bold',
  },
  amountPositive: {
    color: 'green',
    fontSize: 18,
    fontWeight: 'bold',
  },
  text: {
    marginTop: 8,
    fontSize: 14,
    color: '#777',
  },
  searchBar: {
    marginTop: 16,
    padding: 12,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    fontSize: 16,
  },
  customerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  avatarText: {
    fontSize: 18,
    color: '#555',
  },
  customerName: {
    fontSize: 16,
    flex: 1,
  },
  customerAmount: {
    fontSize: 16,
    color: 'green',
  },
  icons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 16,
  },
  icon: {
    marginLeft: 16,
  },
  newCustomerSection: {
    marginTop: 16,
  },
  input: {
    marginBottom: 8,
    padding: 12,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    fontSize: 16,
  },
});

export default CustomerScreen;
