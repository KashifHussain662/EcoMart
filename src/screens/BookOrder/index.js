import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {COLORS} from '../../theme';
import {Receipt} from '../../component';
import API_URLS from '../../Api';
import {Picker} from '@react-native-picker/picker';

const BookOrder = () => {
  const [categories, setCategories] = useState([]); // Initially empty
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [weight, setWeight] = useState({});
  const [quantity, setQuantity] = useState({});
  const [unit, setUnit] = useState({});
  const [showReceipt, setShowReceipt] = useState(false);
  const [receiptData, setReceiptData] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(API_URLS.GET_PRODUCT1);
        const {data} = await response.json(); // Destructure to get 'data'
        // console.log('Fetched categories:', data); // Debugging log
        if (Array.isArray(data)) {
          setCategories(data); // Now setCategories will work correctly
        } else {
          console.error('Invalid data format:', data);
          Alert.alert('Error', 'Invalid data received from the server.');
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
        Alert.alert('Error', 'Failed to fetch categories');
      }
    };

    fetchCategories();
  }, []);

  const handleCategorySelect = categoryId => {
    const category = categories.find(cat => cat.id === categoryId);
    setSelectedCategory(category);
    setSelectedSubcategory(null);
  };

  const handleWeightChange = weightValue => {
    setWeight(prevWeights => ({
      ...prevWeights,
      [selectedSubcategory]: weightValue,
    }));
  };

  const handleQuantityChange = qty => {
    setQuantity(prevQuantities => ({
      ...prevQuantities,
      [selectedSubcategory]: qty,
    }));
  };

  const handleUnitChange = unitValue => {
    setUnit(prevUnits => ({
      ...prevUnits,
      [selectedSubcategory]: unitValue,
    }));
  };

  const handleDone = () => {
    const selectedType = selectedCategory.subcategories.find(
      sub => sub.name === selectedSubcategory,
    ).type;
    const selectedPrice = selectedCategory.subcategories.find(
      sub => sub.name === selectedSubcategory,
    ).price;

    let finalQty;
    let displayUnit;

    if (selectedType === 'weight') {
      const qtyInGrams = weight[selectedSubcategory] || 0;
      const selectedUnit = unit[selectedSubcategory] || 'g';
      const quantityInGrams =
        selectedUnit === 'kg' ? qtyInGrams * 1000 : qtyInGrams;

      if (quantityInGrams > 0) {
        finalQty = (quantityInGrams / 1000).toFixed(3);
        displayUnit = quantityInGrams >= 1000 ? 'kg' : 'g';

        const newReceiptItem = {
          subcategory: selectedSubcategory,
          quantity: finalQty,
          unit: displayUnit,
          price: selectedPrice, // Ensure price is passed here
        };

        setReceiptData(prevData => [...prevData, newReceiptItem]);
        setShowReceipt(true);
        setWeight(prevWeights => ({...prevWeights, [selectedSubcategory]: ''}));
        setSelectedSubcategory(null);
        setSelectedCategory('');
      } else {
        Alert.alert('Invalid Input', 'Please enter a valid weight.');
      }
    } else if (selectedType === 'quantity') {
      const qty = quantity[selectedSubcategory] || 0;

      if (qty > 0) {
        const newReceiptItem = {
          subcategory: selectedSubcategory,
          quantity: qty,
          unit: 'P',
          price: selectedPrice, // Ensure price is passed here
        };

        setReceiptData(prevData => [...prevData, newReceiptItem]);
        setShowReceipt(true);
        setQuantity(prevQuantities => ({
          ...prevQuantities,
          [selectedSubcategory]: '',
        }));
        setSelectedSubcategory(null);
        setSelectedCategory('');
      } else {
        Alert.alert('Invalid Input', 'Please enter a valid quantity.');
      }
    }
  };

  return (
    <>
      <View style={styles.header}>
        <Text style={styles.headerText}>Order Your Items</Text>
      </View>
      <View style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <Text style={styles.title}>Categories</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.categoryList}>
            {categories.map(category => (
              <TouchableOpacity
                key={category.id}
                style={styles.categoryButton}
                onPress={() => handleCategorySelect(category.id)}>
                <Text style={styles.categoryText}>{category.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {selectedCategory && (
            <View>
              <Text style={styles.selectedCategoryText}>
                {selectedCategory.name}
              </Text>

              <Picker
                selectedValue={selectedSubcategory}
                style={styles.subcategoryPicker}
                onValueChange={value => setSelectedSubcategory(value)}>
                <Picker.Item label="Select a subcategory" value={null} />
                {selectedCategory.subcategories.map((subcategory, index) => (
                  <Picker.Item
                    key={index}
                    label={subcategory.name}
                    value={subcategory.name}
                  />
                ))}
              </Picker>

              {selectedSubcategory && (
                <View style={styles.subcategoryItem}>
                  <Text style={styles.subcategoryText}>
                    {selectedSubcategory}
                  </Text>

                  {selectedCategory.subcategories.find(
                    sub => sub.name === selectedSubcategory,
                  ).type === 'weight' ? (
                    <>
                      <TextInput
                        style={styles.quantityInput}
                        placeholder="Enter weight (g or kg)"
                        keyboardType="numeric"
                        value={weight[selectedSubcategory] || ''}
                        onChangeText={handleWeightChange}
                      />

                      <Picker
                        selectedValue={unit[selectedSubcategory] || 'g'}
                        style={styles.unitPicker}
                        onValueChange={handleUnitChange}>
                        <Picker.Item label="G" value="g" />
                        <Picker.Item label="kg" value="kg" />
                      </Picker>
                    </>
                  ) : (
                    <TextInput
                      style={styles.quantityInput}
                      placeholder="Enter quantity"
                      keyboardType="numeric"
                      value={quantity[selectedSubcategory] || ''}
                      onChangeText={handleQuantityChange}
                    />
                  )}

                  <TouchableOpacity
                    style={styles.doneButton}
                    onPress={handleDone}>
                    <Text style={styles.doneButtonText}>Done</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          )}

          {showReceipt && <Receipt cart={receiptData} />}
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    height: 120,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.background,
    paddingHorizontal: 15,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
  },
  scrollView: {
    flex: 1,
    marginTop: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    color: COLORS.dark,
  },
  categoryList: {
    flexDirection: 'row',
    marginBottom: 20,
    color: COLORS.dark,
  },
  categoryButton: {
    backgroundColor: '#3b3b3b', // Change to a secondary color
    borderRadius: 12,
    margin: 8,
    elevation: 4, // Slightly higher elevation for depth
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 6,
    padding: 12,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  categoryText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  selectedCategoryText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.dark,
    marginVertical: 10,
  },
  subcategoryPicker: {
    height: 50,
    width: '100%',
    borderRadius: 12,
    borderColor: COLORS.dark,
    borderWidth: 1,
    marginVertical: 10,
    backgroundColor: 'white',
    paddingHorizontal: 10,
  },
  subcategoryItem: {
    backgroundColor: 'white',
    borderRadius: 12,
    borderColor: COLORS.lightGray,
    borderWidth: 1,
    padding: 15,
    marginVertical: 5,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 3,
    shadowOffset: {
      width: 0,
      height: 1,
    },
  },
  subcategoryText: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.darkGray,
    marginBottom: 10,
  },
  quantityInput: {
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    borderRadius: 10,
    padding: 12,
    marginVertical: 5,
    backgroundColor: 'white',
    elevation: 2,
  },
  unitPicker: {
    marginVertical: 5,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    borderRadius: 10,
    backgroundColor: 'white',
    elevation: 2,
  },
  doneButton: {
    backgroundColor: COLORS.dark,
    padding: 12,
    borderRadius: 10,
    marginVertical: 5,
    alignItems: 'center',
    elevation: 3,
  },
  doneButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default BookOrder;
