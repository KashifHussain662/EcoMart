import React, {useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {CustomButton, CustomTextInput, TextFields} from '../../../component';
import {COLORS} from '../../../theme';
import {Picker} from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Import Icon library

const LocationDetails = ({navigation, route}) => {
  const {firstName, lastName, gender} = route.params;
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [error, setError] = useState({});

  const countryCityData = {
    USA: ['New York', 'Los Angeles', 'Chicago'],
    Canada: ['Toronto', 'Vancouver', 'Montreal'],
    UK: ['London', 'Birmingham', 'Manchester'],
    India: ['Delhi', 'Mumbai', 'Bangalore'],
    Australia: ['Sydney', 'Melbourne', 'Brisbane'],
  };

  const handleNext = () => {
    const newError = {};
    if (!country) newError.country = 'Please select a country.';
    if (!city) newError.city = 'Please select a city.';
    if (!address.trim()) newError.address = 'Address is required.';

    if (Object.keys(newError).length > 0) {
      setError(newError);
    } else {
      setError({});
      navigation.navigate('SecurityDetails', {
        firstName,
        lastName,
        gender,
        country,
        city,
        address,
      });
    }
  };

  return (
    <View style={styles.container}>
      <TextFields headingText="Location Details" />

      {/* Country Picker */}
      <View
        style={[styles.pickerContainer, error.country && styles.errorBorder]}>
        <Icon name="public" size={20} color={COLORS.dark} style={styles.icon} />
        <Picker
          selectedValue={country}
          onValueChange={itemValue => {
            setCountry(itemValue);
            setCity(''); // Reset city when country changes
            setError(prev => ({...prev, country: ''}));
          }}
          style={styles.picker}>
          <Picker.Item label="Select Country" value="" />
          {Object.keys(countryCityData).map(countryName => (
            <Picker.Item
              key={countryName}
              label={countryName}
              value={countryName}
            />
          ))}
        </Picker>
      </View>
      {error.country ? (
        <Text style={styles.errorText}>{error.country}</Text>
      ) : null}

      {/* City Picker */}
      <View style={[styles.pickerContainer, error.city && styles.errorBorder]}>
        <Icon
          name="location-city"
          size={20}
          color={COLORS.dark}
          style={styles.icon}
        />
        <Picker
          selectedValue={city}
          onValueChange={itemValue => {
            setCity(itemValue);
            setError(prev => ({...prev, city: ''}));
          }}
          style={styles.picker}
          enabled={country !== ''}>
          <Picker.Item label="Select City" value="" />
          {countryCityData[country]?.map(cityName => (
            <Picker.Item key={cityName} label={cityName} value={cityName} />
          ))}
        </Picker>
      </View>
      {error.city ? <Text style={styles.errorText}>{error.city}</Text> : null}

      {/* Address Input */}
      <CustomTextInput
        iconComponent={
          <Icon name="home" size={20} color={COLORS.dark} style={styles.icon} />
        }
        placeholder="Address"
        placeholderTextColor={COLORS.grey}
        value={address}
        onChangeText={text => {
          setAddress(text);
          setError(prev => ({...prev, address: ''}));
        }}
        error={error.address}
      />
      {error.address ? (
        <Text style={styles.errorText}>{error.address}</Text>
      ) : null}

      {/* Next Button */}
      <CustomButton
        label="Next"
        width={'90%'}
        height={45}
        style={styles.button}
        onPress={handleNext}
        disabled={!country || !city || !address.trim()} // Disable until all fields are valid
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
    borderColor: COLORS.dark,
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 20,
    backgroundColor: '#f9f9f9',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
  },
  picker: {
    height: 55,
    flex: 1,
    color: COLORS.dark,
  },
  button: {
    marginTop: 16,
  },
  errorBorder: {
    borderColor: COLORS.error,
  },
  errorText: {
    color: COLORS.error,
    marginBottom: 10,
    fontSize: 12,
  },
  icon: {
    marginRight: 10,
  },
});

export default LocationDetails;
