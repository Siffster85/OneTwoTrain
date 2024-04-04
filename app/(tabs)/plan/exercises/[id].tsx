import { deleteExerciseByName, postExercise } from '@/api';
import CustomButton from '@/components/CustomButton';
import ExerciseList from '@/components/exerciseCard/ExerciseList';
import { Stack, router, useLocalSearchParams } from 'expo-router';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function CurrentExercise() {
  const { id, title, category, sets, fromBrowsePage } = useLocalSearchParams();
  const parsedSets = JSON.parse(sets);
  const setAmounts = Object.keys(parsedSets).length;

  const dataToSend = {
    exerciseName: title,
    category,
    sets: parsedSets,
  };

  function handleAddExercise() {
    postExercise(dataToSend).then(() => {
      alert('Exercise Added');
      router.navigate('../workout');
    });
  }

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          headerTitle: `${title}`,
          headerBackTitleVisible: false,
        }}
      />
      <View style={styles.exerciseListContainer}>
        <ExerciseList
          key={id.toString()}
          setQuantity={setAmounts}
          sets={parsedSets}
        />
      </View>

      {fromBrowsePage ? (
        <View
          style={[styles.bottomButtonContainer, { justifyContent: 'center' }]}>
          <TouchableOpacity style={styles.button} onPress={handleAddExercise}>
            <Text style={styles.title}>Add Exercise</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.bottomButtonContainer}>
          <CustomButton
            theme="deleteExercise"
            onPress={() =>
              deleteExerciseByName(`${title}`).then(() => {
                router.back();
              })
            }
          />
          <CustomButton
            theme="startExercise"
            onPress={() => {
              return router.push({
                pathname:
                  category === 'Cardio'
                    ? '/(tabs)/plan/stopwatch'
                    : '/(tabs)/plan/timer',
                params: {
                  setAmounts,
                  sets: JSON.stringify(parsedSets),
                  title,
                },
              });
            }}
          />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#387C44',
    padding: 20,
    justifyContent: 'space-between',
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 25,
    color: '#fff',
  },
  infoText: {
    fontSize: 15,
  },
  exerciseListContainer: {
    flex: 3,
  },
  bottomButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    padding: 35,
    margin: 25,
    width: 250,
    alignItems: 'center',
    borderRadius: 150,
    backgroundColor: '#f32b3a',
  },
});
