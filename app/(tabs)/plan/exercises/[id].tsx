import CustomButton from '@/components/CustomButton';
import ExerciseList from '@/components/exerciseCard/ExerciseList';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import { SafeAreaView, StyleSheet, View } from 'react-native';

export default function CurrentExercise() {
  const { id, title, category, sets } = useLocalSearchParams();
  const parsedSets = JSON.parse(sets);
  const setAmounts = Object.keys(parsedSets).length;
  



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
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <CustomButton
          theme="deleteExercise"
          label="Remove Exercise"
          onPress={() =>
            alert(
              'Add functionality to opto render the exercise to be removed from screen and API',
            )
          }
        />
        <CustomButton
          theme="startExercise"
          label="Start"
          onPress={() => {
            return router.push({
              pathname:
                category === 'cardio'
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
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
  },
  infoText: {
    fontSize: 15,
  },
  exerciseListContainer: {
    flex: 3,
  },
});
