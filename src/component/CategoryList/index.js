import React from 'react';
import {ScrollView, TouchableOpacity, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {COLORS} from '../../theme';

const CategoryList = ({categories, onCategorySelect, onAddCategory}) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.categoryList}>
      {categories.map(category => (
        <TouchableOpacity
          key={category.id}
          style={styles.categoryButton}
          onPress={() => onCategorySelect(category.id)}>
          <Text style={styles.categoryText}>{category.name}</Text>
        </TouchableOpacity>
      ))}
      <TouchableOpacity onPress={onAddCategory} style={styles.categoryAdd}>
        <Icon name="add" color="black" style={{fontSize: 30}} />
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  categoryList: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  categoryButton: {
    backgroundColor: '#3b3b3b',
    borderRadius: 12,
    margin: 8,
    elevation: 4,
    padding: 12,
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
});

export default CategoryList;
