import React, {useState} from 'react';
import {View, Text, StyleSheet, TextInput, FlatList, Image} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {COLORS} from '../../theme';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const data = [
    {id: '1', title: 'Rice', price: 1.5, inStock: true, category: 'Grains'},
    {
      id: '2',
      title: 'Wheat Flour',
      price: 1.2,
      inStock: true,
      category: 'Grains',
    },
    {id: '3', title: 'Sugar', price: 0.8, inStock: true, category: 'Staples'},
    {id: '4', title: 'Salt', price: 0.3, inStock: true, category: 'Staples'},
    {
      id: '5',
      title: 'Pulses (Lentils)',
      price: 2.0,
      inStock: true,
      category: 'Pulses',
    },
    {
      id: '6',
      title: 'Cooking Oil',
      price: 3.5,
      inStock: true,
      category: 'Condiments',
    },
    {
      id: '7',
      title: 'Tea Leaves',
      price: 4.0,
      inStock: false,
      category: 'Beverages',
    },
    {
      id: '8',
      title: 'Coffee Powder',
      price: 5.0,
      inStock: true,
      category: 'Beverages',
    },
    {
      id: '9',
      title: 'Spices (Masala)',
      price: 2.5,
      inStock: true,
      category: 'Spices',
    },
    {id: '10', title: 'Soap', price: 1.0, inStock: true, category: 'Household'},
    {
      id: '11',
      title: 'Detergent Powder',
      price: 2.5,
      inStock: true,
      category: 'Household',
    },
    {
      id: '12',
      title: 'Biscuits',
      price: 1.8,
      inStock: true,
      category: 'Snacks',
    },
  ];

  const filteredData = data.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.searchBar}>
          <Icon name="search" color="#888" size={20} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for grocery..."
            placeholderTextColor="#888"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <View style={styles.headerIcons}>
          <Icon name="shopping-cart" color="#fff" size={36} />
        </View>
      </View>

      <FlatList
        data={filteredData}
        keyExtractor={item => item.id}
        style={styles.cardList}
        contentContainerStyle={styles.contentContainer}
        numColumns={2}
        renderItem={({item}) => (
          <View style={styles.card}>
            <Image
              source={{uri: 'https://via.placeholder.com/150'}}
              style={styles.cardImage}
              accessibilityLabel={item.title}
            />
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardPrice}>${item.price.toFixed(2)}</Text>
              {!item.inStock && (
                <Text style={styles.outOfStock}>Out of Stock</Text>
              )}
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 170,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.background,
    paddingHorizontal: 15,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    marginHorizontal: 10,
    paddingHorizontal: 12,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    color: '#333',
    padding: 10,
  },
  headerIcons: {
    width: 40,
    alignItems: 'center',
  },
  cardList: {
    padding: 10,
    marginTop: 10,
  },
  contentContainer: {
    paddingTop: 10,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    margin: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    height: 180,
    flex: 1,
    justifyContent: 'space-between',
  },
  cardImage: {
    width: '100%',
    height: 100,
    borderRadius: 10,
  },
  cardContent: {
    padding: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  cardPrice: {
    fontSize: 14,
    color: '#555',
  },
  outOfStock: {
    fontSize: 12,
    color: 'red',
    marginTop: 5,
  },
});

export default Home;
