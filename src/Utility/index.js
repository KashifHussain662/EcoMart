import Toast from 'react-native-toast-message';

const showToast = ({message, type = 'error'}) => {
  Toast.show({
    type: type,
    text1: message,
  });
};

export default showToast;
