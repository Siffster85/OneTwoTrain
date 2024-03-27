import CustomButton from '@/components/CustomButton';
import ExerciseList from '@/components/exerciseCard/ExerciseList';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import { SafeAreaView, StyleSheet, View } from 'react-native';

export default function CurrentExercise() {
  const { id, title } = useLocalSearchParams();

  const Quantity = 3;
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
        <ExerciseList setQuantity={Quantity} reps={reps} weight={weight} />
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
          onPress={() => alert('pushed it babes')}
        />
        <CustomButton
          theme="startExercise"
          label="Start"
          onPress={() =>
            router.push({
              pathname: '/(tabs)/plan/timer',
              params: {
                Quantity,
                reps,
                weight,
                title,
              },
            })
          }
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
    flex: 3
  }
});
