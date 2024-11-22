import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Alert,
  Modal,
} from 'react-native';
import {COLORS} from '../../theme';
import {Picker} from '@react-native-picker/picker';
import {Receipt} from '../../component';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AddCategoryModal from '../../component/Modal/AddCategoryModal';

const initialCategories = [
  {
    id: 1,
    name: 'Chanwal',
    subcategories: [{name: 'Basmati', type: 'weight', price: 200}],
  },
  {
    id: 2,
    name: 'Biscuits',
    subcategories: [
      {id: 1, name: 'Peanuts Rs:30', type: 'quantity', price: 30},
      {id: 2, name: 'Peanuts Rs:20', type: 'quantity', price: 20},
      {id: 3, name: 'Peanuts Rs:15', type: 'quantity', price: 15},
    ],
  },
];

const BookOrder = () => {
  const [categories, setCategories] = useState(initialCategories);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [weight, setWeight] = useState({});
  const [quantity, setQuantity] = useState({});
  const [unit, setUnit] = useState({});
  const [showReceipt, setShowReceipt] = useState(false);
  const [receiptData, setReceiptData] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newSubcategoryName, setNewSubcategoryName] = useState('');
  const [newSubcategoryType, setNewSubcategoryType] = useState('weight');
  const [newSubcategories, setNewSubcategories] = useState([
    {name: '', type: 'weight'},
  ]);

  const handleAddSubcategory = () => {
    setNewSubcategories([...newSubcategories, {name: '', type: 'weight'}]);
  };

  const handleSubcategoryChange = (index, value) => {
    const updatedSubcategories = [...newSubcategories];
    updatedSubcategories[index].name = value;
    setNewSubcategories(updatedSubcategories);
  };

  const handleSubcategoryTypeChange = (index, value) => {
    const updatedSubcategories = [...newSubcategories];
    updatedSubcategories[index].type = value;
    setNewSubcategories(updatedSubcategories);
  };

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

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

  const handleAddCategory = () => {
    if (newCategoryName && newSubcategories.length > 0) {
      const newCategory = {
        id: categories.length + 1,
        name: newCategoryName,
        subcategories: newSubcategories.filter(sub => sub.name), // Only add subcategories that have names
      };
      setCategories(prevCategories => [...prevCategories, newCategory]);
      setNewCategoryName('');
      setNewSubcategories([{name: '', type: 'weight'}]); // Reset subcategories
      closeModal();
    } else {
      Alert.alert(
        'Incomplete Information',
        'Please enter category name and at least one subcategory name.',
      );
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
            <TouchableOpacity onPress={openModal} style={styles.categoryAdd}>
              <Icon name="add" color="black" style={{fontSize: 30}} />
            </TouchableOpacity>
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

      <AddCategoryModal
        isVisible={isModalVisible}
        onClose={closeModal}
        newCategoryName={newCategoryName}
        setNewCategoryName={setNewCategoryName}
        newSubcategories={newSubcategories}
        setNewSubcategories={setNewSubcategories}
        handleAddSubcategory={handleAddSubcategory}
        handleAddCategory={handleAddCategory}
      />
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
  categoryAdd: {
    paddingHorizontal: 12,
    paddingVertical: 14,
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

  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalInput: {
    width: '100%',
    padding: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 15,
  },
  modalButton: {
    backgroundColor: COLORS.secondary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default BookOrder;
