import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

const Calculator = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');

  const handleInput = value => {
    setInput(input + value);
  };

  const calculateResult = () => {
    try {
      setResult(eval(input)); // Evaluate the input expression
    } catch (error) {
      setResult('Error'); // Handle error in case of invalid expression
    }
  };

  const clearInput = () => {
    setInput('');
    setResult('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.resultContainer}>
        <Text style={styles.resultText}>{result || input || '0'}</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <View style={styles.row}>
          <Button title="C" onPress={clearInput} />
          <Button title="(" onPress={() => handleInput('(')} />
          <Button title=")" onPress={() => handleInput(')')} />
          <Button title="/" onPress={() => handleInput('/')} />
        </View>
        <View style={styles.row}>
          <Button title="7" onPress={() => handleInput('7')} />
          <Button title="8" onPress={() => handleInput('8')} />
          <Button title="9" onPress={() => handleInput('9')} />
          <Button title="*" onPress={() => handleInput('*')} />
        </View>
        <View style={styles.row}>
          <Button title="4" onPress={() => handleInput('4')} />
          <Button title="5" onPress={() => handleInput('5')} />
          <Button title="6" onPress={() => handleInput('6')} />
          <Button title="-" onPress={() => handleInput('-')} />
        </View>
        <View style={styles.row}>
          <Button title="1" onPress={() => handleInput('1')} />
          <Button title="2" onPress={() => handleInput('2')} />
          <Button title="3" onPress={() => handleInput('3')} />
          <Button title="+" onPress={() => handleInput('+')} />
        </View>
        <View style={styles.row}>
          <Button title="0" onPress={() => handleInput('0')} />
          <Button title="." onPress={() => handleInput('.')} />
          <Button
            title="="
            onPress={calculateResult}
            style={styles.equalsButton}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const Button = ({title, onPress, style}) => (
  <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
    <Text style={styles.buttonText}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
  resultContainer: {
    flex: 2,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    backgroundColor: '#dcdcdc',
    padding: 20,
  },
  resultText: {
    fontSize: 48,
    color: '#000',
  },
  buttonsContainer: {
    flex: 5,
    padding: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ededed',
    padding: 20,
    margin: 5,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 24,
    color: '#000',
  },
  equalsButton: {
    backgroundColor: '#f39c12',
  },
});

export default Calculator;
