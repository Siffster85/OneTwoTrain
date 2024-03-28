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
  const [data, setData] = useState<Excersie[]>([]);

  interface Excersie {
    exerciseName: string | string[];
    category?: string | string[];
    weight: string;
    reps: string;
  }

  const handleAddSet = () => {
    const newSet: Excersie = {
      exerciseName,
      category,
      weight,
      reps,
    };
    setData(prevData => [...prevData, newSet]);
    setWeight('');
    setReps('');
  };

  const handleSubmit = async () => {
    try {
      //Add data to the API
    } catch {
      alert('Something went wrong please try again');
    }
    router.replace('/(tabs)/plan/workout');
  };

  const handleRemoveSet = () => {
    if (data.length > 0) {
      setData(prevData => prevData.slice(0, prevData.length - 1));
    }
  };

  const Item = ({ exerciseName, weight, reps }: Excersie) => {
    return (
      <View style={styles.setCard}>
        <Text style={styles.cardInfo}>Name: {exerciseName}</Text>
        <Text style={styles.cardInfo}>Weight: {weight}KG</Text>
        <Text style={styles.cardInfo}>Reps: {reps}</Text>
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
            placeholder="input weight in KG"
            placeholderTextColor="black"
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
            placeholderTextColor="black"
            value={reps}
            onChangeText={number => setReps(number)}
          />
        </View>
      </View>
      <View style={styles.upperButtonsContainer}>
        <TouchableOpacity style={styles.upperButtonLeft} onPress={handleAddSet}>
          <Text>Add Set</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.upperButtonRight}
          onPress={handleRemoveSet}>
          <Text>Remove Set</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.setContainer}>
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <Item
              exerciseName={item.exerciseName}
              weight={item.weight}
              reps={item.reps}
            />
          )}
        />
      </View>
      <View style={styles.submitButtonContainer}>
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text>Submit</Text>
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
    flex: 2,
    backgroundColor: 'white',
  },
  submitButtonContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pickerBox: {
    flex: 0.5,
    borderWidth: 2,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'green',
  },
  upperButtonRight: {
    marginRight: 60,
    borderWidth: 2,
    borderRadius: 150,
    padding: 15,
    backgroundColor: 'red',
  },
  upperButtonLeft: {
    marginLeft: 60,
    borderWidth: 2,
    borderRadius: 150,
    padding: 15,
    backgroundColor: 'green',
  },
  submitButton: {
    borderWidth: 2,
    borderRadius: 150,
    padding: 15,
    backgroundColor: 'green',
  },
  setCard: {
    flexDirection: 'row',
    padding: 3,
    borderWidth: 1,
    borderRadius: 150,
  },
  cardInfo: {
    marginLeft: 35,
  },
  textInput: {
    flex: 1,
    width: '50%',
    textAlign: 'center',
  },
});
