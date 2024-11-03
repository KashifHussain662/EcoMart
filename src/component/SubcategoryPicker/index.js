import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';

const SubcategoryPicker = ({
  selectedSubcategory,
  subcategories,
  onSubcategoryChange,
  onWeightChange,
  onQuantityChange,
  type,
  onDone,
}) => {
  return (
    <View>
      <Text style={styles.selectedCategoryText}>{selectedSubcategory}</Text>
      <Picker
        selectedValue={selectedSubcategory}
        style={styles.subcategoryPicker}
        onValueChange={onSubcategoryChange}>
        <Picker.Item label="Select a subcategory" value={null} />
        {subcategories.map((subcategory, index) => (
          <Picker.Item
            key={index}
            label={subcategory.name}
            value={subcategory.name}
          />
        ))}
      </Picker>

      {selectedSubcategory && (
        <View style={styles.subcategoryItem}>
          {type === 'weight' ? (
            <>
              <TextInput
                style={styles.quantityInput}
                placeholder="Enter weight (g or kg)"
                keyboardType="numeric"
                onChangeText={onWeightChange}
              />
            </>
          ) : (
            <TextInput
              style={styles.quantityInput}
              placeholder="Enter quantity"
              keyboardType="numeric"
              onChangeText={onQuantityChange}
            />
          )}
          <TouchableOpacity style={styles.doneButton} onPress={onDone}>
            <Text style={styles.doneButtonText}>Done</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  selectedCategoryText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 10,
  },
  subcategoryItem: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 15,
    marginVertical: 5,
    elevation: 3,
  },
  quantityInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 12,
    marginVertical: 5,
  },
  doneButton: {
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 10,
    marginVertical: 5,
    alignItems: 'center',
  },
  doneButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SubcategoryPicker;
