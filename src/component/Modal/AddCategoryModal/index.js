import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Alert,
} from 'react-native';
import {COLORS} from '../../../theme';
import {Picker} from '@react-native-picker/picker';

const AddCategoryModal = ({
  isVisible,
  onClose,
  newCategoryName,
  setNewCategoryName,
  newSubcategories,
  setNewSubcategories,
  handleAddCategory,
}) => {
  const addSubcategory = () => {
    if (newSubcategories.length < 5) {
      setNewSubcategories([...newSubcategories, {name: '', type: 'weight'}]);
    } else {
      Alert.alert('Limit Reached', 'You can add up to 5 subcategories only.');
    }
  };

  const removeSubcategory = index => {
    const updatedSubcategories = newSubcategories.filter((_, i) => i !== index);
    setNewSubcategories(updatedSubcategories);
  };

  const validateAndSave = () => {
    if (!newCategoryName.trim()) {
      Alert.alert('Validation Error', 'Category name cannot be empty.');
      return;
    }

    const invalidSubcategories = newSubcategories.filter(
      subcat => !subcat.name.trim(),
    );

    if (invalidSubcategories.length > 0) {
      Alert.alert('Validation Error', 'Subcategory names cannot be empty.');
      return;
    }

    handleAddCategory();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Add New Category</Text>

          <TextInput
            placeholder="Enter category name"
            style={styles.modalInput}
            value={newCategoryName}
            onChangeText={setNewCategoryName}
            placeholderTextColor={COLORS.gray}
          />

          {newSubcategories.map((subcat, index) => (
            <View key={index} style={styles.subcategoryContainer}>
              <TextInput
                placeholder="Enter subcategory name"
                style={styles.modalInput}
                value={subcat.name}
                onChangeText={value => {
                  const updatedSubcategories = [...newSubcategories];
                  updatedSubcategories[index].name = value;
                  setNewSubcategories(updatedSubcategories);
                }}
                placeholderTextColor={COLORS.gray}
              />
              <Picker
                selectedValue={subcat.type}
                style={styles.unitPicker}
                onValueChange={value => {
                  const updatedSubcategories = [...newSubcategories];
                  updatedSubcategories[index].type = value;
                  setNewSubcategories(updatedSubcategories);
                }}>
                <Picker.Item label="Weight" value="weight" />
                <Picker.Item label="Quantity" value="quantity" />
              </Picker>
              <TouchableOpacity
                onPress={() => removeSubcategory(index)}
                style={styles.removeButton}>
                <Text style={styles.removeButtonText}>Remove</Text>
              </TouchableOpacity>
            </View>
          ))}

          <TouchableOpacity onPress={addSubcategory} style={styles.addButton}>
            <Text style={styles.addButtonText}>Add Subcategory</Text>
          </TouchableOpacity>

          <View style={styles.modalButtons}>
            <TouchableOpacity onPress={onClose} style={styles.cancelButton}>
              <Text style={styles.modalButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={validateAndSave}
              style={styles.saveButton}>
              <Text style={styles.modalButtonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  modalContent: {
    width: '85%',
    padding: 25,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 15,
  },
  modalInput: {
    width: '100%',
    padding: 12,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    fontSize: 16,
    color: '#000',
  },
  subcategoryContainer: {
    marginBottom: 15,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  addButton: {
    backgroundColor: COLORS.background,
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 5,
    alignItems: 'center',
    width: '100%',
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cancelButton: {
    flex: 1,
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    borderRadius: 5,
    marginRight: 10,
    alignItems: 'center',
  },
  saveButton: {
    flex: 1,
    backgroundColor: COLORS.dark,
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  unitPicker: {
    marginVertical: 5,
    borderWidth: 1,
    borderColor: COLORS.dark,
    borderRadius: 5,
    backgroundColor: 'white',
  },
  removeButton: {
    backgroundColor: 'red',
    paddingVertical: 5,
    borderRadius: 5,
    marginTop: 5,
    alignItems: 'center',
  },
  removeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default AddCategoryModal;
