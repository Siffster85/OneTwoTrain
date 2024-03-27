import { router } from 'expo-router';
import { useState } from 'react';
import {
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

const SignupQuiz = () => {
  const [userName, setUserName] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [formError, setFormError] = useState('');

  const validateForm = () => {
    if (!userName.trim() || !weight.trim() || !height.trim()) {
      setFormError('All the fields are required!');
      return false;
    }
    setFormError('');
    return true;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      router.push({
        pathname: '/(auth)/quiz-2',
        params: { userName, weight, height },
      });
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={[styles.title, styles.text]}>Let's Get Acquainted</Text>
          <Text style={[styles.subtitle, styles.text]}>
            Tell us your name, weight, and height so we can start tailoring your
            experience.
          </Text>
        </View>
        <TextInput
          style={styles.input}
          onChangeText={text => setUserName(text)}
          onFocus={() => setFormError('')}
          value={userName}
          placeholder="Name"
          placeholderTextColor="#808080"
        />
        <TextInput
          style={styles.input}
          value={weight}
          onChangeText={setWeight}
          onFocus={() => setFormError('')}
          keyboardType="numeric"
          placeholder="Weight (kg)"
          placeholderTextColor="#808080"
        />
        <TextInput
          style={styles.input}
          value={height}
          onChangeText={setHeight}
          onFocus={() => setFormError('')}
          keyboardType="numeric"
          placeholder="Height (cm)"
          placeholderTextColor="#808080"
        />
        {formError ? <Text style={styles.error}>{formError}</Text> : null}
        <TouchableOpacity onPress={handleSubmit} style={styles.button}>
          <Text style={styles.text}>Proceed</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};
export default SignupQuiz;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    padding: 20,
  },
  titleContainer: {
    height: '30%',
    backgroundColor: 'transparent',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingVertical: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 20,
  },
  text: {
    color: '#fff',
    textAlign: 'center',
  },
  error: {
    color: 'red',
    marginTop: 20,
    textAlign: 'center',
  },
  button: {
    fontSize: 20,
    backgroundColor: '#464C55',
    borderRadius: 12,
    padding: 12,
    color: '#fff',
    marginTop: 12,
  },
  input: {
    backgroundColor: '#fff',
    minHeight: 40,
    color: '#000',
    marginBottom: 12,
    padding: 12,
  },
});
