import React, {useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {CustomButton, CustomTextInput, TextFields} from '../../../component';
import {COLORS} from '../../../theme';
import Icon from 'react-native-vector-icons/MaterialIcons';

const CreateAccount = ({navigation}) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState('');
  const [error, setError] = useState({});

  const handleNext = () => {
    const newErrors = {};
    if (!firstName.trim()) newErrors.firstName = 'First name is required.';
    if (!lastName.trim()) newErrors.lastName = 'Last name is required.';
    if (!gender) newErrors.gender = 'Please select your gender.';

    if (Object.keys(newErrors).length > 0) {
      setError(newErrors);
    } else {
      setError({});
      navigation.navigate('LocationDetails', {
        firstName,
        lastName,
        gender,
      });
    }
  };

  return (
    <View style={styles.container}>
      <TextFields
        headingText="Create Account"
        bodyText="Please provide your details to proceed."
      />

      {/* First Name Input */}
      <CustomTextInput
        iconComponent={
          <Icon
            name="person"
            size={20}
            color={error.firstName ? COLORS.dark : COLORS.dark}
          />
        }
        placeholder="First Name"
        placeholderTextColor={COLORS.grey}
        value={firstName}
        onChangeText={text => {
          setFirstName(text);
          setError(prev => ({...prev, firstName: ''}));
        }}
        error={error.firstName}
      />

      {/* Last Name Input */}
      <CustomTextInput
        iconComponent={
          <Icon
            name="person-outline"
            size={20}
            color={error.lastName ? COLORS.dark : COLORS.dark}
          />
        }
        placeholder="Last Name"
        placeholderTextColor={COLORS.grey}
        value={lastName}
        onChangeText={text => {
          setLastName(text);
          setError(prev => ({...prev, lastName: ''}));
        }}
        error={error.lastName}
      />

      {/* Gender Picker */}
      <View
        style={[
          styles.pickerContainer,
          error.gender && {borderColor: COLORS.error},
        ]}>
        <Picker
          selectedValue={gender}
          onValueChange={itemValue => {
            setGender(itemValue);
            setError(prev => ({...prev, gender: ''}));
          }}
          style={styles.picker}
          dropdownIconColor={error.gender ? COLORS.error : COLORS.primary}>
          <Picker.Item label="Select Gender" value="" />
          <Picker.Item label="Male" value="male" />
          <Picker.Item label="Female" value="female" />
          <Picker.Item label="Other" value="other" />
        </Picker>
      </View>
      {error.gender ? <Text style={styles.error}>{error.gender}</Text> : null}

      {/* Next Button */}
      <CustomButton
        label="Next"
        width={'90%'}
        height={45}
        onPress={handleNext}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    padding: 16,
  },
  pickerContainer: {
    width: '100%',
    height: 55,
    borderColor: COLORS.grey,
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 20,
    paddingHorizontal: 10,
    backgroundColor: '#f9f9f9',
    justifyContent: 'center',
  },
  picker: {
    width: '100%',
    height: 45,
    color: COLORS.dark,
  },
  error: {
    color: COLORS.error,
    marginBottom: 10,
    textAlign: 'center',
  },
});

export default CreateAccount;
