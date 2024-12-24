import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import {create, all} from 'mathjs';
import {COLORS} from '../../theme';

const math = create(all, {});

const Calculator = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');

  const operators = ['+', '-', '*', '/'];

  const handleInput = value => {
    const lastChar = input[input.length - 1];

    if (result) {
      if (operators.includes(value)) {
        setInput(result + value);
        setResult('');
      } else {
        setInput(value);
        setResult('');
      }
    } else if (operators.includes(value) && operators.includes(lastChar)) {
      setInput(input.slice(0, -1) + value);
    } else {
      setInput(input + value);
    }
  };

  const calculateResult = () => {
    try {
      const evaluatedResult = math.evaluate(input);
      setResult(evaluatedResult.toString());
    } catch (error) {
      console.error(error);
      setResult('Error');
    }
  };

  const clearInput = () => {
    setInput('');
    setResult('');
  };

  const backspace = () => {
    setInput(input.slice(0, -1));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Calculator</Text>
      </View>
      <View style={styles.resultContainer}>
        <Text style={styles.resultText}>{result || input || '0'}</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <View style={styles.row}>
          <Button title="C" onPress={clearInput} />
          <Button title="←" onPress={backspace} />
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
  header: {
    padding: 20,
    backgroundColor: COLORS.background,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    color: '#fff',
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
    backgroundColor: COLORS.primary,
    color: 'white',
  },
});

export default Calculator;
