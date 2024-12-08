import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
} from 'react-native';
import axios from 'axios';
import API_URLS from '../../Api';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Calculator = () => {
  const [categoryName, setCategoryName] = useState('');
  const [subcategories, setSubcategories] = useState([
    {name: '', type: '', price: ''},
  ]);
  const [categoriesData, setCategoriesData] = useState([]);
  const [isAddingSubcategories, setIsAddingSubcategories] = useState(false);
  const [expandedCategoryId, setExpandedCategoryId] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(API_URLS.GET_PRODUCT1);
      if (response.data.status === 'success') {
        setCategoriesData(response.data.data);
      } else {
        Alert.alert('Error', response.data.message);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch categories.');
    }
  };

  const handleAddCategory = async () => {
    if (
      !categoryName ||
      subcategories.some(sub => !sub.name || !sub.type || !sub.price)
    ) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    try {
      const response = await axios.post(API_URLS.GET_PRODUCT1, {
        category_name: categoryName,
        subcategories: subcategories,
      });

      if (response.data.status === 'success') {
        Alert.alert('Success', response.data.message);
        setCategoryName('');
        setSubcategories([{name: '', type: '', price: ''}]);
        setIsAddingSubcategories(false);
        fetchCategories();
      } else {
        Alert.alert('Error', response.data.message);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to add category');
    }
  };

  const handleAddSubcategory = () => {
    setSubcategories([...subcategories, {name: '', type: '', price: ''}]);
  };

  const handleSubcategoryChange = (index, field, value) => {
    const updatedSubcategories = [...subcategories];
    updatedSubcategories[index][field] = value;
    setSubcategories(updatedSubcategories);
  };

  const toggleCategory = categoryId => {
    if (expandedCategoryId === categoryId) {
      setExpandedCategoryId(null);
    } else {
      setExpandedCategoryId(categoryId);
    }
  };

  const renderSubcategoryInputs = () => {
    return subcategories.map((subcategory, index) => (
      <View key={index} style={styles.subcategoryInputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Subcategory Name"
          value={subcategory.name}
          onChangeText={text => handleSubcategoryChange(index, 'name', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Subcategory Type"
          value={subcategory.type}
          onChangeText={text => handleSubcategoryChange(index, 'type', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Price"
          keyboardType="numeric"
          value={subcategory.price}
          onChangeText={text => handleSubcategoryChange(index, 'price', text)}
        />
      </View>
    ));
  };

  // Functions to handle edit and delete actions
  const handleEditSubcategory = subcategory => {
    Alert.alert('Edit Subcategory', `You clicked edit for ${subcategory.name}`);
  };

  const handleDeleteSubcategory = subcategory => {
    Alert.alert(
      'Delete Subcategory',
      `Are you sure you want to delete ${subcategory.name}?`,
      [
        {text: 'Cancel', style: 'cancel'},
        {text: 'Delete', onPress: () => console.log('Deleted', subcategory)},
      ],
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Category</Text>

      {!isAddingSubcategories ? (
        <>
          <TextInput
            style={styles.input}
            placeholder="Category Name"
            value={categoryName}
            onChangeText={setCategoryName}
          />
          <TouchableOpacity
            style={[
              styles.button,
              {backgroundColor: categoryName ? '#4CAF50' : '#ddd'},
            ]}
            onPress={() => setIsAddingSubcategories(true)}
            disabled={!categoryName}>
            <Text style={styles.buttonText}>Next: Add Subcategories</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text style={styles.title}>Add Subcategories</Text>
          {renderSubcategoryInputs()}
          <TouchableOpacity
            style={styles.button}
            onPress={handleAddSubcategory}>
            <Text style={styles.buttonText}>Add Another Subcategory</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleAddCategory}>
            <Text style={styles.buttonText}>Submit Category</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => setIsAddingSubcategories(false)}>
            <Text style={styles.secondaryButtonText}>Back to Category</Text>
          </TouchableOpacity>
        </>
      )}

      <Text style={styles.title}>Categories List</Text>
      <FlatList
        data={categoriesData}
        keyExtractor={item => item.id.toString()}
        renderItem={({item, index}) => (
          <View style={styles.categoryItem}>
            <TouchableOpacity onPress={() => toggleCategory(item.id)}>
              <Text style={styles.categoryName}>{`No: ${index + 1} ${
                item.name
              }`}</Text>
            </TouchableOpacity>
            {expandedCategoryId === item.id &&
              item.subcategories.length > 0 && (
                <View style={styles.subcategoryContainer}>
                  {item.subcategories.map((sub, idx) => (
                    <View key={idx} style={styles.subcategoryItem}>
                      <View style={styles.subcategoryInfo}>
                        <View style={styles.subcategoryDetail}>
                          <Text
                            style={[styles.subcategoryText, styles.boldText]}>
                            Subcategory:
                          </Text>
                          <Text style={styles.subcategoryValue}>
                            {sub.name}
                          </Text>
                        </View>
                        <View style={styles.subcategoryDetail}>
                          <Text
                            style={[styles.subcategoryText, styles.boldText]}>
                            Type:
                          </Text>
                          <Text style={styles.subcategoryValue}>
                            {sub.type}
                          </Text>
                        </View>
                        <View style={styles.subcategoryDetail}>
                          <Text
                            style={[styles.subcategoryText, styles.boldText]}>
                            Price:
                          </Text>
                          <Text style={styles.subcategoryValue}>
                            {sub.price}
                          </Text>
                        </View>
                        <View style={styles.subcategoryDetail}>
                          <TouchableOpacity
                            onPress={() => handleEditSubcategory(sub)}>
                            <Icon name="edit" size={24} color="#4CAF50" />
                          </TouchableOpacity>
                        </View>

                        <View style={styles.subcategoryDetail}>
                          <TouchableOpacity
                            onPress={() => handleDeleteSubcategory(sub)}>
                            <Icon name="delete" size={24} color="red" />
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  ))}
                </View>
              )}
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 15,
    color: '#333',
  },
  input: {
    height: 45,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  secondaryButton: {
    backgroundColor: '#ddd',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  secondaryButtonText: {
    color: '#555',
    fontWeight: '600',
    fontSize: 16,
  },
  subcategoryInputContainer: {
    marginBottom: 15,
  },
  categoryItem: {
    padding: 15,
    marginBottom: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 4,
    elevation: 3,
  },
  categoryName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  subcategoryContainer: {
    marginTop: 10,
  },
  subcategoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9', // Soft background
    borderRadius: 12,
    marginBottom: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: {width: 0, height: 4},
    shadowRadius: 6,
    elevation: 5,
  },

  subcategoryInfo: {
    flexDirection: 'row', // Stack details vertically for cleaner look
    alignItems: 'center',
    justifyContent: 'space-evenly',
    gap: 24,
  },

  subcategoryDetail: {
    marginBottom: 8, // Add spacing between each detail
    // marginLeft: 12,
  },

  subcategoryText: {
    fontSize: 14,
    color: '#555', // Dark gray for text
  },

  boldText: {
    fontWeight: 'bold',
    color: '#333', // Make the labels stand out
  },

  subcategoryValue: {
    fontSize: 14,
    color: '#222', // Slightly darker color for values
  },

  iconButton: {
    padding: 8, // Add padding for touch area
    borderRadius: 8, // Make buttons rounded
  },

  icon: {
    marginLeft: 15,
  },
});

export default Calculator;
