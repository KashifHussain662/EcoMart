import React from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Text,
} from 'react-native';
import axios from 'axios';
import API_URLS from '../../Api';
import {Picker} from '@react-native-picker/picker'; // Import Picker

const CategoryForm = ({
  categoryName,
  setCategoryName,
  subcategories,
  setSubcategories,
  isAddingSubcategories,
  setIsAddingSubcategories,
  fetchCategories,
}) => {
  // Handle change in subcategory fields (name, type, price)
  const handleSubcategoryChange = (index, field, value) => {
    const updatedSubcategories = [...subcategories];
    updatedSubcategories[index][field] = value;
    setSubcategories(updatedSubcategories);
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

  return (
    <View>
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
          {subcategories.map((subcategory, index) => (
            <View key={index} style={styles.subcategoryInputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Subcategory Name"
                value={subcategory.name}
                onChangeText={text =>
                  handleSubcategoryChange(index, 'name', text)
                }
              />

              <Picker
                selectedValue={subcategory.type}
                onValueChange={itemValue =>
                  handleSubcategoryChange(index, 'type', itemValue)
                }
                style={styles.input}>
                <Picker.Item label="Select Type" value="" />
                <Picker.Item label="weight" value="weight" />
                <Picker.Item label="quantity" value="quantity" />
              </Picker>

              <TextInput
                style={styles.input}
                placeholder="Price"
                keyboardType="numeric"
                value={subcategory.price}
                onChangeText={text =>
                  handleSubcategoryChange(index, 'price', text)
                }
              />
            </View>
          ))}
          <TouchableOpacity
            style={styles.button}
            onPress={handleAddSubcategory}>
            <Text style={styles.buttonText}>Add Another Subcategory</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleAddCategory}>
            <Text style={styles.buttonText}>Submit Category</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
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
  buttonText: {color: '#fff', fontWeight: '600', fontSize: 16},
  subcategoryInputContainer: {marginBottom: 15},
});

export default CategoryForm;
