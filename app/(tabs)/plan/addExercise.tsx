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
  const [nextButtonNav, setNextButtonNav] = useState(false);

  useEffect(() => {
    if (metrics === 'Weight and Reps') {
      setNextButtonNav(true);
    } else {
      setNextButtonNav(false);
    }
  }, [metrics]);

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          headerTitle: 'Create A Custom Exercise',
        }}
      />
      <View style={styles.input}>
        <Text>Please select a category below</Text>
        <RNPickerSelect
          value={category}
          onValueChange={value => setCategory(value)}
          items={[
            { label: 'Abs', value: 'Abs' },
            { label: 'Back', value: 'Back' },
            { label: 'Biceps', value: 'Biceps' },
            { label: 'Cardio', value: 'Cardio' },
            { label: 'Chest', value: 'Chest' },
            { label: 'Knees Over Toes', value: 'Knees Over Toes' },
            { label: 'Legs', value: 'Legs' },
            { label: 'Shoulders', value: 'Shoulders' },
            { label: 'Triceps', value: 'Triceps' },
          ]}
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
          value={metrics}
          onValueChange={value => setMetrics(value)}
          items={[
            {
              label: 'Weight and Reps',
              value: 'Weight and Reps',
            },
            {
              label: 'Distance and Time',
              value: 'Distance and Time',
            },
          ]}
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            nextButtonNav
              ? router.push({
                  pathname: '/(tabs)/plan/resistancePage',
                  params: { exerciseName, metrics, category },
                })
              : router.push({
                  pathname: '/(tabs)/plan/cardioPage',
                  params: { exerciseName, metrics, category },
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
