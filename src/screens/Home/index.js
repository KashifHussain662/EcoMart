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
  {
    id: 1,
    name: 'Chanwal',
    subcategories: [
      {name: 'Basmati', type: 'weight', pricePerUnit: 0.15},
      {name: 'Sella', type: 'weight', pricePerUnit: 0.1},
      {name: 'Brown Rice', type: 'weight', pricePerUnit: 0.12},
      {name: 'White Rice', type: 'weight', pricePerUnit: 0.11},
      {name: 'Parboiled', type: 'weight', pricePerUnit: 0.13},
    ],
  },
  {
    id: 2,
    name: 'Daal',
    subcategories: [
      {name: 'Masoor', type: 'weight', pricePerUnit: 0.09},
      {name: 'Moong', type: 'weight', pricePerUnit: 0.08},
      {name: 'Toor', type: 'weight', pricePerUnit: 0.1},
      {name: 'Chana', type: 'weight', pricePerUnit: 0.07},
      {name: 'Urad', type: 'weight', pricePerUnit: 0.11},
    ],
  },
];

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [quantity, setQuantity] = useState({});
  const [unit, setUnit] = useState({});
  const [showReceipt, setShowReceipt] = useState(false);
  const [receiptData, setReceiptData] = useState([]);

  const handleCategorySelect = categoryId => {
    const category = categories.find(cat => cat.id === categoryId);
    setSelectedCategory(category);
    setSelectedSubcategory(null);
  };

  const handleQuantityChange = qty => {
    setQuantity(prevQuantities => ({
      ...prevQuantities,
      [selectedSubcategory]: qty,
    }));
  };

  const handleUnitChange = unit => {
    setUnit(prevUnits => ({
      ...prevUnits,
      [selectedSubcategory]: unit,
    }));
  };

  const handleDone = (pricePerUnit, type) => {
    const qty = quantity[selectedSubcategory] || 0;
    const selectedUnit = unit[selectedSubcategory] || 'grams';

    const finalQty = selectedUnit === 'kilograms' ? qty * 1000 : qty;

    const computedPrice =
      type === 'weight'
        ? finalQty * pricePerUnit
        : parseInt(qty) * pricePerUnit;

    if (qty > 0) {
      const newReceiptItem = {
        subcategory: selectedSubcategory,
        quantity: finalQty,
        price: computedPrice,
        unit: selectedUnit,
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
  };

  const getTotalPrice = () => {
    return receiptData
      .reduce((total, item) => total + item.price, 0)
      .toFixed(2);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.ismenHeader}>Home</Text>
      </View>

      <ScrollView style={styles.scrollView}>
        <Text style={styles.title}>Categories</Text>
        <View style={styles.categoryList}>
          {categories.map(category => (
            <TouchableOpacity
              key={category.id}
              style={styles.categoryButton}
              onPress={() => handleCategorySelect(category.id)}>
              <Text style={styles.categoryText}>{category.name}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {selectedCategory && (
          <View>
            <Text style={styles.title}>Select Subcategory</Text>
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

                <TextInput
                  style={styles.quantityInput}
                  placeholder={`Enter ${
                    selectedCategory.subcategories.find(
                      sub => sub.name === selectedSubcategory,
                    ).type === 'weight'
                      ? 'grams or kilograms'
                      : 'quantity'
                  }`}
                  keyboardType="numeric"
                  value={quantity[selectedSubcategory] || ''}
                  onChangeText={handleQuantityChange}
                />

                {selectedCategory.subcategories.find(
                  sub => sub.name === selectedSubcategory,
                ).type === 'weight' && (
                  <Picker
                    selectedValue={unit[selectedSubcategory] || 'grams'}
                    style={styles.unitPicker}
                    onValueChange={handleUnitChange}>
                    <Picker.Item label="Grams" value="grams" />
                    <Picker.Item label="Kilograms" value="kilograms" />
                  </Picker>
                )}

                <TouchableOpacity
                  style={styles.doneButton}
                  onPress={() =>
                    handleDone(
                      selectedCategory.subcategories.find(
                        sub => sub.name === selectedSubcategory,
                      ).pricePerUnit,
                      selectedCategory.subcategories.find(
                        sub => sub.name === selectedSubcategory,
                      ).type,
                    )
                  }>
                  <Text style={styles.doneButtonText}>Done</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        )}

        {showReceipt && (
          <Receipt cart={receiptData} totalPrice={getTotalPrice()} />
        )}
      </ScrollView>
    </View>
  );
};

// Styles for Home component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGray,
  },
  header: {
    padding: 16,
    backgroundColor: COLORS.primary,
  },
  ismenHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  scrollView: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  categoryList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  categoryButton: {
    backgroundColor: COLORS.secondary,
    padding: 10,
    borderRadius: 5,
    margin: 5,
  },
  categoryText: {
    color: 'white',
  },
  subcategoryPicker: {
    height: 50,
    width: '100%',
    marginVertical: 10,
  },
  subcategoryItem: {
    marginBottom: 10,
  },
  subcategoryText: {
    fontSize: 16,
  },
  quantityInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginVertical: 5,
  },
  unitPicker: {
    marginVertical: 5,
  },
  doneButton: {
    backgroundColor: COLORS.secondary,
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
  },
  doneButtonText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default Home;
