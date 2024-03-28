import { Stack, router } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

export default function AddExercise() {
  const [exerciseName, setExerciseName] = useState('');
  const [category, setCategory] = useState('');
  const [metrics, setMetrics] = useState('');
  const [isNextButtonNav, setIsNextButtonNav] = useState(false);

  const categoryItems = [
    { label: 'Abs', value: 'Abs' },
    { label: 'Back', value: 'Back' },
    { label: 'Biceps', value: 'Biceps' },
    { label: 'Cardio', value: 'Cardio' },
    { label: 'Chest', value: 'Chest' },
    { label: 'Knees Over Toes', value: 'Knees Over Toes' },
    { label: 'Legs', value: 'Legs' },
    { label: 'Shoulders', value: 'Shoulders' },
    { label: 'Triceps', value: 'Triceps' },
  ];

  const metricItems = [
    {
      label: 'Weight and Reps',
      value: 'Weight and Reps',
    },
    {
      label: 'Distance and Time',
      value: 'Distance and Time',
    },
  ];

  useEffect(() => {
    if (metrics === 'Weight and Reps') {
      setIsNextButtonNav(true);
    } else {
      setIsNextButtonNav(false);
    }
  }, [metrics]);

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          headerTitle: 'Create A Custom Exercise',
          headerBackTitleVisible: false,
        }}
      />
      <View style={styles.input}>
        <Text>Please select a category below</Text>
        <RNPickerSelect
          style={{
            ...pickerSelectStyles,
            iconContainer: {
              top: 10,
              right: 12,
            },
          }}
          value={category}
          onValueChange={value => setCategory(value)}
          items={categoryItems}
        />
      </View>
      <View style={styles.input}>
        <Text>Please input an exercise name below</Text>
        <TextInput
          enterKeyHint="done"
          clearButtonMode="while-editing"
          placeholder="Input Exercise Name"
          placeholderTextColor="#808080"
          value={exerciseName}
          onChangeText={text => setExerciseName(text)}
        />
      </View>
      <View style={styles.input}>
        <Text>Please select measurement</Text>
        <RNPickerSelect
          style={{
            ...pickerSelectStyles,
            iconContainer: {
              top: 10,
              right: 12,
            },
          }}
          value={metrics}
          onValueChange={value => setMetrics(value)}
          items={metricItems}
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            return isNextButtonNav
              ? router.push({
                  pathname: '/(tabs)/plan/resistancePage',
                  params: { exerciseName, category },
                })
              : router.push({
                  pathname: '/(tabs)/plan/cardioPage',
                  params: { exerciseName, category },
                });
          }}>
          <Text style={{ fontSize: 20 }}>Next</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    flex: 0.5,
    justifyContent: 'space-evenly',
    backgroundColor: '#fff',
    minHeight: 40,
    color: '#000',
    marginBottom: 12,
    padding: 12,
  },
  buttonContainer: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
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
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  placeholder: {
    color: 'gray',
  },
});
