import { Stack, useLocalSearchParams } from 'expo-router';
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

const resistancePage = () => {
  const params = useLocalSearchParams();
  const { category, exerciseName } = params;
  const [weight, setWeight] = useState(0);
  const [reps, setReps] = useState(0);
  const [data, setData] = useState([]);

  const handleAddSet = () => {
    const newSet = { exerciseName, weight, reps };
    setData(prevData => [...prevData, newSet]);
    setWeight(0);
    setReps(0);
  };

  const Item = ({ exerciseName = 'lol', weight = 54, reps = 2 }) => {
    return (
      <View style={styles.setCard}>
        <Text style={styles.cardInfo}>{exerciseName}</Text>
        <Text style={styles.cardInfo}>{weight}KG</Text>
        <Text style={styles.cardInfo}>{reps}</Text>
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
            enterKeyHint="done"
            inputMode="numeric"
            clearButtonMode="while-editing"
            placeholder="Input Weight"
            placeholderTextColor="black"
            value={weight}
            onChangeText={number => setWeight(number)}
          />
        </View>
        <View style={styles.pickerBox}>
          <TextInput
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
        <TouchableOpacity style={styles.upperButtonRight}>
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
        <TouchableOpacity style={styles.submitButton}>
          <Text>Submit</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default resistancePage;

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
    // flex: 2,
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
    borderWidth: 2,
    borderRadius: 150,
    padding: 10,
    textAlign: 'center',
    alignContent: 'center',
  },
  cardInfo: {
    alignContent: 'center',
    justifyContent: 'center',
  },
});
