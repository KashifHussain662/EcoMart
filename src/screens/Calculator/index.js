import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
  StyleSheet,
} from 'react-native';
import axios from 'axios';
import API_URLS from '../../Api';
import {CategoryForm, CategoryList1} from '../../component';

const Calculator = () => {
  const [categoryName, setCategoryName] = useState('');
  const [subcategories, setSubcategories] = useState([
    {name: '', type: '', price: ''},
  ]);
  const [categoriesData, setCategoriesData] = useState([]);
  const [isAddingSubcategories, setIsAddingSubcategories] = useState(false);

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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Category</Text>
      <CategoryForm
        categoryName={categoryName}
        setCategoryName={setCategoryName}
        subcategories={subcategories}
        setSubcategories={setSubcategories}
        isAddingSubcategories={isAddingSubcategories}
        setIsAddingSubcategories={setIsAddingSubcategories}
        fetchCategories={fetchCategories}
      />
      <Text style={styles.title}>Categories List</Text>
      <CategoryList1
        categoriesData={categoriesData}
        fetchCategories={fetchCategories}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, padding: 20, backgroundColor: '#f9f9f9'},
  title: {fontSize: 22, fontWeight: '600', marginBottom: 15, color: '#333'},
});

export default Calculator;
