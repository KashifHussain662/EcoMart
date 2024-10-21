import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  Modal,
  ActivityIndicator,
} from 'react-native';
import {COLORS} from '../../theme';
import Icon from 'react-native-vector-icons/FontAwesome';
import {CustomButton} from '../../component';
import showToast from '../../Utility';

const Login = ({navigation}) => {
  // Hardcoded values
  const hardcodedEmail = 'zohaib@gmail.com';
  const hardcodedPassword = 'zohaib';

  const [username, setUsername] = useState(hardcodedEmail);
  const [password, setPassword] = useState(hardcodedPassword);
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [loading, setLoading] = useState(false);

  const validateEmail = email => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleLogin = () => {
    if (!username || !password) {
      showToast({
        message: 'Please enter both email and password',
        type: 'error',
      });
      return;
    }

    if (!validateEmail(username)) {
      showToast({
        message: 'Please enter a valid email address.',
        type: 'error',
      });
      return;
    }

    setLoading(true);

    setTimeout(() => {
      if (username === hardcodedEmail && password === hardcodedPassword) {
        setLoading(false);
        showToast({
          message: 'Login successful! Welcome back.',
          type: 'success',
        });
        navigation.navigate('Tabs');
      } else {
        setLoading(false);
        showToast({
          message: 'Invalid email or password.',
          type: 'error',
        });
      }
    }, 2000);
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

      <Modal
        transparent={true}
        animationType="none"
        visible={loading}
        onRequestClose={() => setLoading(false)}>
        <View style={styles.modalBackground}>
          <View style={styles.activityIndicatorWrapper}>
            <ActivityIndicator size="large" color={COLORS.dark} />
            <Text style={styles.loadingText}>Logging in...</Text>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    paddingHorizontal: 20,
  },
  logo: {
    height: 120,
    resizeMode: 'contain',
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
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  activityIndicatorWrapper: {
    backgroundColor: 'white',
    width: '90%',
    borderRadius: 10,
    padding: 16,
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: COLORS.dark,
  },
});

export default Login;
