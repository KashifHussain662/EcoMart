import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Alert,
  StyleSheet,
  Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import API_URLS from '../../Api';
import CustomButton from '../customButton';
import CustomTextInput from '../customTextInput';
import showToast from '../../Utility';

const CategoryList1 = ({categoriesData, fetchCategories}) => {
  const [expandedCategoryId, setExpandedCategoryId] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentSubcategory, setCurrentSubcategory] = useState(null);
  const [editedSubcategory, setEditedSubcategory] = useState({
    name: '',
    type: '',
    price: '',
  });

  const toggleCategory = categoryId => {
    setExpandedCategoryId(
      expandedCategoryId === categoryId ? null : categoryId,
    );
  };

  const handleEditSubcategory = subcategory => {
    setCurrentSubcategory(subcategory);
    setEditedSubcategory({
      name: subcategory.name,
      type: subcategory.type,
      price: subcategory.price,
    });
    setIsModalVisible(true);
  };

  const handleDeleteSubcategory = subcategory => {
    Alert.alert(
      'Delete Subcategory',
      `Are you sure you want to delete ${subcategory.name}?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: async () => {
            try {
              const response = await fetch(API_URLS.GET_PRODUCT1, {
                method: 'DELETE',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  subcategory_id: subcategory.id,
                }),
              });

              const data = await response.json();
              if (data.status === 'success') {
                showToast({
                  message: 'Subcategory deleted successfully!',
                  type: 'success',
                });
                fetchCategories();
              } else {
                showToast({
                  message: data.message || 'Failed to delete subcategory',
                  type: 'error',
                });
              }
            } catch (error) {
              console.error(error);
              showToast({
                message: 'An error occurred while deleting the subcategory.',
                type: 'error',
              });
            }
          },
        },
      ],
    );
  };

  const handleCategoryDelete = categoryId => {
    Alert.alert(
      'Delete Category',
      `Are you sure you want to delete this category and all its subcategories?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: async () => {
            try {
              const response = await fetch(API_URLS.GET_PRODUCT1, {
                method: 'DELETE',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  category_id: categoryId, // Sending category ID to be deleted
                }),
              });

              const data = await response.json();
              if (data.status === 'success') {
                showToast({
                  message:
                    'Category and associated subcategories deleted successfully!',
                  type: 'success',
                });
                fetchCategories(); // Refresh the categories list after deletion
              } else {
                showToast({
                  message: data.message || 'Failed to delete category',
                  type: 'error',
                });
              }
            } catch (error) {
              console.error(error);
              showToast({
                message: 'An error occurred while deleting the category.',
                type: 'error',
              });
            }
          },
        },
      ],
    );
  };

  const handleSaveChanges = async () => {
    try {
      const response = await fetch(API_URLS.GET_PRODUCT1, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          subcategory_id: currentSubcategory.id,
          subcategory_name: editedSubcategory.name,
          subcategory_type: editedSubcategory.type,
          subcategory_price: editedSubcategory.price,
        }),
      });

      const data = await response.json();
      if (data.status === 'success') {
        showToast({
          message: 'Subcategory updated successfully!',
          type: 'success',
        });
        setIsModalVisible(false);
        fetchCategories(); // Refresh the categories list after updating
      } else {
        showToast({
          message: data.message || 'Failed to update subcategory',
          type: 'error',
        });
      }
    } catch (error) {
      console.error(error);
      showToast({
        message: 'An error occurred while updating the subcategory.',
        type: 'error',
      });
    }
  };

  return (
    <>
      <FlatList
        data={categoriesData}
        keyExtractor={item => item.id.toString()}
        renderItem={({item, index}) => (
          <View style={styles.categoryItem}>
            <TouchableOpacity
              onPress={() => toggleCategory(item.id)}
              style={styles.categoryHeader}>
              <Text style={styles.categoryName}>
                No: {index + 1} {item.name}
              </Text>

              <View style={styles.iconContainer}>
                <Icon
                  name={
                    expandedCategoryId === item.id
                      ? 'keyboard-arrow-up'
                      : 'keyboard-arrow-down'
                  }
                  size={24}
                  color="#333"
                  style={styles.arrowIcon}
                />

                <Icon
                  name="delete"
                  size={24}
                  color="red"
                  onPress={() => handleCategoryDelete(item.id)}
                  style={styles.deleteIcon}
                />
              </View>
            </TouchableOpacity>

            {expandedCategoryId === item.id &&
              item.subcategories &&
              item.subcategories.length > 0 && (
                <View style={styles.tableContainer}>
                  <View style={styles.tableHeader}>
                    <Text style={styles.tableHeaderText}>Subcategory</Text>
                    <Text style={styles.tableHeaderText}>Type</Text>
                    <Text style={styles.tableHeaderText}>Price</Text>
                    <Text style={styles.tableHeaderText}>Actions</Text>
                  </View>
                  {item.subcategories.map((sub, idx) => (
                    <View key={idx} style={styles.tableRow}>
                      <Text style={styles.tableCell}>{sub.name}</Text>
                      <Text style={styles.tableCell}>{sub.type}</Text>
                      <Text style={styles.tableCell}>{sub.price}</Text>
                      <View style={styles.tableCellActions}>
                        <TouchableOpacity
                          style={styles.iconButton}
                          onPress={() => handleEditSubcategory(sub)}>
                          <Icon name="edit" size={24} color="#4CAF50" />
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={styles.iconButton}
                          onPress={() => handleDeleteSubcategory(sub)}>
                          <Icon name="delete" size={24} color="red" />
                        </TouchableOpacity>
                      </View>
                    </View>
                  ))}
                </View>
              )}
          </View>
        )}
      />

      {/* Modal for editing subcategory */}
      <Modal visible={isModalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Subcategory</Text>

            <CustomTextInput
              placeholder="Subcategory Name"
              value={editedSubcategory.name}
              onChangeText={text =>
                setEditedSubcategory({...editedSubcategory, name: text})
              }
            />
            <CustomTextInput
              placeholder="Type"
              value={editedSubcategory.type}
              onChangeText={text =>
                setEditedSubcategory({...editedSubcategory, type: text})
              }
            />
            <CustomTextInput
              placeholder="Price"
              value={editedSubcategory.price}
              onChangeText={text =>
                setEditedSubcategory({...editedSubcategory, price: text})
              }
            />

            <View style={styles.modalButtons}>
              <CustomButton
                label="Save Changes"
                onPress={handleSaveChanges}
                style={{backgroundColor: 'green'}}
              />
              <CustomButton
                label="Cancel"
                onPress={() => setIsModalVisible(false)}
                style={{backgroundColor: 'red'}}
              />

              {/* <Button title="Save Changes" onPress={handleSaveChanges}  />
              <Button title="Cancel" onPress={() => setIsModalVisible(false)} /> */}
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  categoryItem: {
    marginBottom: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
  },
  categoryName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  arrowIcon: {
    marginRight: 10,
  },
  deleteIcon: {
    marginLeft: 0,
  },

  tableContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f4f4f4',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  tableHeaderText: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  tableCell: {
    flex: 1,
    fontSize: 14,
    textAlign: 'center',
  },
  tableCellActions: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconButton: {
    marginLeft: 10,
  },

  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 8,
    borderRadius: 4,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default CategoryList1;
