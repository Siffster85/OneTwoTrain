import { postExercise } from '@/api';
import { Stack, router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const ResistancePage = () => {
  const params = useLocalSearchParams();
  const { category, exerciseName } = params;
  const [weight, setWeight] = useState('');
  const [reps, setReps] = useState('');
  const [data, setData] = useState<Set[]>([]);
  const sets: Record<string, Set> = {};

  data.forEach((item, index) => {
    sets[`${index}`] = item;
  });

  const dataToSend = {
    exerciseName,
    category,
    sets,
  };

  interface Set {
    weight: string;
    reps: string;
  }

  const handleAddSet = () => {
    const newSet: Set = {
      weight,
      reps,
    };

    setData(prevData => [...prevData, newSet]);
    setWeight('');
    setReps('');
  };

  const handleSubmit = async () => {
    try {
      const response = await postExercise(dataToSend);
      return response;
    } catch {
      alert('Something went wrong please try again');
    } finally {
      router.navigate('/(tabs)/plan/workout');
    }
  };

  const handleRemoveSet = () => {
    if (data.length > 0) {
      setData(prevData => prevData.slice(0, prevData.length - 1));
    }
  };

  const Item = ({ weight, reps }: Set) => {
    return (
      <View style={styles.setCard}>
        <Text>Weight: {weight}KG</Text>
        <Text>Reps: {reps}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.pageContainer}>
      <Stack.Screen
        options={{
          headerTitle: `Weights and Reps - ${exerciseName}`,
          headerBackTitleVisible: false,
        }}
      />
      <View style={styles.metricPickersContainer}>
        <View style={styles.pickerBox}>
          <TextInput
            style={styles.textInput}
            enterKeyHint="done"
            inputMode="numeric"
            clearButtonMode="while-editing"
            placeholder="Input Weight In KG"
            placeholderTextColor="#737373"
            value={weight}
            onChangeText={number => setWeight(number)}
          />
        </View>
        <View style={styles.pickerBox}>
          <TextInput
            style={styles.textInput}
            enterKeyHint="done"
            inputMode="numeric"
            clearButtonMode="while-editing"
            placeholder="Input Reps"
            placeholderTextColor="#737373"
            value={reps}
            onChangeText={number => setReps(number)}
          />
        </View>
      </View>
      <View style={styles.upperButtonsContainer}>
        <TouchableOpacity style={styles.upperButtonLeft} onPress={handleAddSet}>
          <Text style={{ color: '#fff' }}>Add Set</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.upperButtonRight}
          onPress={handleRemoveSet}>
          <Text style={{ color: '#fff' }}>Remove Set</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.setContainer}>
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <Item weight={item.weight} reps={item.reps} />
          )}
        />
      </View>
      <View style={styles.submitButtonContainer}>
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={{ color: '#fff' }}>Submit</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ResistancePage;

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    marginTop: StatusBar.currentHeight ?? 0,
  },
  metricPickersContainer: {
    flex: 2,
  },
  upperButtonsContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  setContainer: {
    padding: 20,
    flex: 2,
  },
  submitButtonContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pickerBox: {
    flex: 0.5,
    borderWidth: 2,
    borderColor: '#737373',
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f7f7f7',
    borderRadius: 15,
  },
  upperButtonRight: {
    marginRight: 60,
    borderColor: '#fff',
    borderRadius: 150,
    padding: 20,
    backgroundColor: '#f22a39',
  },
  upperButtonLeft: {
    marginLeft: 60,
    borderColor: '#fff',
    borderRadius: 150,
    padding: 20,
    backgroundColor: '#f22a39',
  },
  submitButton: {
    borderRadius: 150,
    padding: 20,
    backgroundColor: '#f22a39',
  },
  setCard: {
    flexDirection: 'row',
    padding: 12,
    borderWidth: 1,
    borderRadius: 12,
    marginBottom: 12,
    justifyContent: 'space-between',
  },
  textInput: {
    flex: 1,
    width: '50%',
    textAlign: 'center',
  },
});
