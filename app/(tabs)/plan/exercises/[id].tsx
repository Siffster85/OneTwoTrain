import CustomButton from '@/components/CustomButton';
import ExerciseList from '@/components/exerciseCard/ExerciseList';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import { SafeAreaView, StyleSheet, View } from 'react-native';

export default function CurrentExercise() {
  const { id, title, category } = useLocalSearchParams();
  const quantity = 3;
  const reps = 5;
  const weight = '50KG';

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
          setQuantity={quantity}
          reps={reps}
          weight={weight}
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
            return category !== 'cardio'
              ? router.push({
                  pathname: '/(tabs)/plan/stopwatch',
                  params: {
                    quantity,
                    reps,
                    weight,
                    title,
                  },
                })
              : router.push({
                  pathname: '/(tabs)/plan/timer',
                  params: {
                    quantity,
                    reps,
                    weight,
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
