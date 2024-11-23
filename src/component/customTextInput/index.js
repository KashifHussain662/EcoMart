import React from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {COLORS} from '../../theme';

const CustomTextInput = ({
  iconComponent, // Accept dynamic icon components
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
  toggleSecureTextEntry,
  error,
  placeholderTextColor,
}) => {
  return (
    <View style={styles.container}>
      <View style={[styles.inputContainer, error && styles.inputError]}>
        {iconComponent && <View style={styles.icon}>{iconComponent}</View>}
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          onChangeText={onChangeText}
          value={value}
          secureTextEntry={secureTextEntry}
          placeholderTextColor={placeholderTextColor || COLORS.grey}
        />
        {toggleSecureTextEntry && (
          <TouchableOpacity onPress={toggleSecureTextEntry}>
            <Text style={styles.toggleIcon}>
              {secureTextEntry ? '👁️' : '👁️‍🗨️'}
            </Text>
          </TouchableOpacity>
        )}
      </View>
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 55,
    borderColor: COLORS.grey,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 15,
    backgroundColor: '#f9f9f9',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  input: {
    flex: 1,
    height: '100%',
    fontSize: 16,
    color: COLORS.dark,
  },
  icon: {
    marginRight: 10,
  },
  error: {
    color: COLORS.error,
    fontSize: 14,
    marginTop: 5,
  },
  inputError: {
    borderColor: COLORS.error,
  },
  toggleIcon: {
    fontSize: 18,
    color: COLORS.primary,
  },
});

export default CustomTextInput;
