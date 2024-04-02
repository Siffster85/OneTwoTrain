import { Stack, router } from 'expo-router';
import { useState } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const WeighIn = () => {
  const [weight, setWeight] = useState('');

  async function handleSave() {
    try {
      router.navigate('./home');
    } catch {
      alert('Something has gone wrong, please try again.');
    }
  }

  return (
    <SafeAreaView style={styles.pageContainer}>
      <Stack.Screen
        options={{
          headerBackTitleVisible: false,
          headerTitle: 'Weigh-In',
        }}
      />
      <View style={styles.subContainer}>
        <Text style={styles.title}>How much do you weigh today?</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputBox}
          enterKeyHint="done"
          inputMode="decimal"
          clearButtonMode="while-editing"
          placeholder="Input weight here"
          placeholderTextColor="#808080"
          value={weight}
          onChangeText={text => setWeight(text)}
        />
        <Text style={styles.KG}>KG</Text>
      </View>
      <View style={styles.subContainer}>
        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text>Save</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default WeighIn;

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    marginTop: StatusBar.currentHeight ?? 0,
  },
  subContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 25,
  },
  button: {
    borderWidth: 2,
    borderColor: 'green',
    padding: 25,
    width: 250,
    alignItems: 'center',
    borderRadius: 150,
    backgroundColor: 'green',
  },
  inputContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  KG: {
    marginLeft: 10,
  },
  inputBox: {
    textAlign: 'center',
    padding: 40,
    fontSize: 20,
    minWidth: 200,
  },
});
