import { postWeight } from '@/api';
import { formatDate } from '@/utils';
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
  const patchWeight = Number(weight);
  const currentDate = formatDate(new Date());
  async function handleSave() {
    try {
      const post = await postWeight(currentDate, patchWeight);
    } catch (error) {
    } finally {
      router.navigate('./home');
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
          placeholder="weight"
          placeholderTextColor="#d6d6d6"
          value={weight}
          onChangeText={text => setWeight(text)}
        />
        <Text style={styles.KG}>kg</Text>
      </View>
      <View style={styles.subContainer}>
        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>Save</Text>
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
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '80%',
  },
  title: {
    fontSize: 32,
    textAlign: 'center',
  },
  button: {
    borderWidth: 2,
    borderColor: '#f22b39',
    padding: 25,
    width: 250,
    alignItems: 'center',
    borderRadius: 150,
    backgroundColor: '#f22a39',
  },
  buttonText: {
    color: '#fff',
    fontSize: 28,
  },
  inputContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  KG: {
    marginLeft: 10,
    fontSize: 22,
  },
  inputBox: {
    textAlign: 'center',
    padding: 40,
    fontSize: 48,
    minWidth: 200,
    borderBottomColor: '#d6d6d6',
    borderBottomWidth: 1,
  },
});
