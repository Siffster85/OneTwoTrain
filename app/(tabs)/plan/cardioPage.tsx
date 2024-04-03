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

const CardioPage = () => {
  const params = useLocalSearchParams();
  const { category, exerciseName } = params;
  const [distance, setDistance] = useState('');
  const [time, setTime] = useState('');
  const [data, setData] = useState<Set[]>([]);
  const sets: Record<string, Set> = {};

  data.forEach((item, index) => {
    sets[`${index}`] = item;
  });

  interface Set {
    distance: string;
    time: string;
  }

  const dataToSend = {
    exerciseName,
    category,
    sets,
  };

  const handleAddSet = () => {
    const newSet: Set = {
      distance,
      time,
    };
    setData(prevData => [...prevData, newSet]);
    setDistance('');
    setTime('');
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

  const Item = ({ distance, time }: Set) => {
    return (
      <View style={styles.setCard}>
        <Text style={styles.cardInfo}>distance: {distance}M</Text>
        <Text style={styles.cardInfo}>time: {time}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.pageContainer}>
      <Stack.Screen
        options={{
          headerTitle: `Distance and Time - ${exerciseName}`,
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
            placeholder="Input Distance In Meters"
            placeholderTextColor="#737373"
            value={distance}
            onChangeText={number => setDistance(number)}
          />
        </View>
        <View style={styles.pickerBox}>
          <TextInput
            style={styles.textInput}
            enterKeyHint="done"
            inputMode="numeric"
            clearButtonMode="while-editing"
            placeholder="Input Time In Seconds"
            placeholderTextColor="#737373"
            value={time}
            onChangeText={number => setTime(number)}
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
            <Item distance={item.distance} time={item.time} />
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

export default CardioPage;

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
    borderColor: '#737373',
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f7f7f7',
    borderRadius: 15,
  },
  upperButtonRight: {
    marginRight: 60,
    borderRadius: 150,
    padding: 20,
    backgroundColor: '#f22a39',
  },
  upperButtonLeft: {
    marginLeft: 60,
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
    padding: 3,
    borderWidth: 1,
    borderRadius: 150,
  },
  cardInfo: {
    marginLeft: 20,
  },
  textInput: {
    flex: 1,
    width: '50%',
    textAlign: 'center',
  },
});
