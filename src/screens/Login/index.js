import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import {COLORS} from '../../theme';
import Icon from 'react-native-vector-icons/FontAwesome';
import {CustomButton} from '../../component';

const Login = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const handleLogin = () => {
    // Implement your login logic here
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/logo.png')}
        style={styles.logo}
      />
      <View style={styles.formContainer}>
        <Text style={styles.title}>Log In</Text>

        <View style={styles.inputContainer}>
          <Icon name="user" size={20} color={COLORS.dark} style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Username"
            onChangeText={setUsername}
            value={username}
            placeholderTextColor={COLORS.grey}
          />
        </View>

        <View style={styles.inputContainer}>
          <Icon
            name="lock"
            size={20}
            color={COLORS.primary}
            style={styles.icon}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            onChangeText={setPassword}
            value={password}
            secureTextEntry={secureTextEntry}
            placeholderTextColor={COLORS.grey}
          />
          <TouchableOpacity
            onPress={() => setSecureTextEntry(!secureTextEntry)}>
            <Icon
              name={secureTextEntry ? 'eye-slash' : 'eye'}
              size={20}
              color={COLORS.dark}
            />
          </TouchableOpacity>
        </View>

        <CustomButton
          label={'Log in'}
          width={'90%'}
          height={50}
          onPress={handleLogin}
        />

        <TouchableOpacity
          style={styles.registerLinkContainer}
          onPress={() => navigation.navigate('Register')}>
          <Text style={styles.registerLinkText}>Don't have an account? </Text>
          <Text style={[styles.registerLinkText, styles.link]}>Create one</Text>
        </TouchableOpacity>
      </View>

      {/* Uncomment for loading modal if needed */}
      {/* <Modal
        transparent={true}
        animationType="none"
        visible={loading}
        onRequestClose={() => {}}>
        <View style={styles.modalBackground}>
          <View style={styles.activityIndicatorWrapper}>
            <ActivityIndicator size="large" color={COLORS.primary} />
            <Text style={styles.loadingText}>Logging in...</Text>
          </View>
        </View>
      </Modal> */}
    </View>
  );
};

// Define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.secondary,
    paddingHorizontal: 20,
  },
  logo: {
    height: 120,
    resizeMode: 'contain',
    marginBottom: 40,
  },
  formContainer: {
    width: '100%',
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 25,
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
    marginBottom: 20,
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
  registerLinkContainer: {
    flexDirection: 'row',
    marginTop: 15,
  },
  registerLinkText: {
    fontSize: 14,
    color: COLORS.dark,
  },
  link: {
    color: COLORS.primary,
    fontWeight: 'bold',
  },
});

// Make this component available to the app
export default Login;
