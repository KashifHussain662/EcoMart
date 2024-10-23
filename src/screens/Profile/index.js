//import libraries
import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

// create a component
const Profile = () => {
  const user = {
    name: 'John Doe',
    email: 'johndoe@example.com',
    bio: 'A passionate software developer who loves coding and exploring new technologies.',
    location: 'San Francisco, CA',
    profilePicture: 'https://randomuser.me/api/portraits/men/41.jpg', // Sample profile picture URL
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileCard}>
        <Image
          source={{uri: user.profilePicture}}
          style={styles.profilePicture}
        />
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.location}>{user.location}</Text>

        <View style={styles.infoSection}>
          <Text style={styles.label}>Email</Text>
          <Text style={styles.info}>{user.email}</Text>

          <Text style={styles.label}>Bio</Text>
          <Text style={styles.info}>{user.bio}</Text>
        </View>
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ecf0f1',
    padding: 20,
  },
  profileCard: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: {width: 0, height: 2},
    elevation: 3, // For Android shadow
    width: '90%',
  },
  profilePicture: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#3498db',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 5,
  },
  location: {
    fontSize: 16,
    color: '#7f8c8d',
    marginBottom: 20,
  },
  infoSection: {
    width: '100%',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#34495e',
    marginTop: 10,
  },
  info: {
    fontSize: 16,
    color: '#7f8c8d',
    marginBottom: 10,
  },
});

//make this component available to the app
export default Profile;
