import React, {useState} from 'react';
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
import {Picker} from '@react-native-picker/picker';
import {Receipt} from '../../component';

const categories = [
  {id: 1, name: 'Chanwal', subcategories: [{name: 'Basmati', type: 'weight'}]},
  {id: 2, name: 'Daal', subcategories: [{name: 'Masoor', type: 'weight'}]},
  {
    id: 3,
    name: 'Vegetables',
    subcategories: [{name: 'Tomato', type: 'weight'}],
  },
  {id: 4, name: 'Fruits', subcategories: [{name: 'Apple', type: 'weight'}]},
  {id: 5, name: 'Dairy', subcategories: [{name: 'Milk', type: 'volume'}]},
  {id: 6, name: 'Snacks', subcategories: [{name: 'Chips', type: 'quantity'}]},
  {id: 7, name: 'Beverages', subcategories: [{name: 'Juice', type: 'volume'}]},
  {id: 8, name: 'Grains', subcategories: [{name: 'Oats', type: 'weight'}]},
  {id: 9, name: 'Spices', subcategories: [{name: 'Salt', type: 'weight'}]},
  {id: 10, name: 'Nuts', subcategories: [{name: 'Almonds', type: 'weight'}]},
  {
    id: 11,
    name: 'Biscuits', // Capitalized for consistency
    subcategories: [{name: 'Peanuts', type: 'quantity'}], // Fixed typo
  },
];

const BookOrder = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [weight, setWeight] = useState({});
  const [quantity, setQuantity] = useState({});
  const [unit, setUnit] = useState({});
  const [showReceipt, setShowReceipt] = useState(false);
  const [receiptData, setReceiptData] = useState([]);

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
    let finalQty;
    let displayUnit;

    if (selectedType === 'weight') {
      const qtyInGrams = weight[selectedSubcategory] || 0;
      const selectedUnit = unit[selectedSubcategory] || 'g';
      const quantityInGrams =
        selectedUnit === 'kg' ? qtyInGrams * 1000 : qtyInGrams;

      if (quantityInGrams > 0) {
        if (quantityInGrams >= 1000) {
          finalQty = (quantityInGrams / 1000).toFixed(1);
          displayUnit = 'kg';
        } else {
          finalQty = (quantityInGrams / 1000).toFixed(1); // Display 0.5 instead of 0.500
          displayUnit = 'kg';
        }

        const newReceiptItem = {
          subcategory: selectedSubcategory,
          quantity: finalQty,
          unit: displayUnit,
        };

        setReceiptData(prevData => [...prevData, newReceiptItem]);
        setShowReceipt(true);
        setWeight(prevWeights => ({...prevWeights, [selectedSubcategory]: ''}));
        setSelectedSubcategory(null);
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
        };

        setReceiptData(prevData => [...prevData, newReceiptItem]);
        setShowReceipt(true);
        setQuantity(prevQuantities => ({
          ...prevQuantities,
          [selectedSubcategory]: '',
        }));
        setSelectedSubcategory(null);
      } else {
        Alert.alert('Invalid Input', 'Please enter a valid quantity.');
      }
    }
  };

  return (
    <>
      <View style={styles.header}>
        <Text style={styles.headerText}>Home</Text>
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
    backgroundColor: COLORS.white,
    padding: 16,
  },
  header: {
    padding: 20,
    backgroundColor: COLORS.background,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
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
    color: COLORS.darkGray,
  },
  categoryList: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  categoryButton: {
    backgroundColor: COLORS.secondary,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 12,
    margin: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
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
    color: COLORS.darkGray,
    marginVertical: 10,
  },
  subcategoryPicker: {
    height: 50,
    width: '100%',
    borderRadius: 12,
    borderColor: COLORS.lightGray,
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
    elevation: 2,
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
  },
  unitPicker: {
    marginVertical: 5,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  doneButton: {
    backgroundColor: COLORS.secondary,
    padding: 12,
    borderRadius: 10,
    marginVertical: 5,
    alignItems: 'center',
    elevation: 2,
  },
  doneButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default BookOrder;
