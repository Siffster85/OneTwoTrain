import { getSingleDayWorkout, postWorkout } from '@/api';
import WorkoutList from '@/components/WorkoutList';
import { Stack, router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';

type Set = {
  weight?: string;
  reps?: string;
  distance?: string;
  time?: string;
};

type Excersie = {
  exerciseName: string | string[];
  category: string | string[];
  sets: Record<string, Set>;
};

const SingleDayWorkout = () => {
  const { selectedDate } = useLocalSearchParams();
  const [dayWorkout, setDayWorkout] = useState<Excersie[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const copyWorkout = async () => {
    try {
      await postWorkout(dayWorkout);
    } catch {
      alert('Something went wrong please try again');
    } finally {
      router.navigate('/(tabs)/plan/workout');
    }
  };

  useEffect(() => {
    getSingleDayWorkout(selectedDate)
      .then(exercises => {
        setDayWorkout(exercises);
        setIsLoading(false);
      })
      .catch(err => {
        Alert.alert(err);
      });
  }, []);

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerTitle: `${selectedDate}`,
          headerBackTitleVisible: false,
        }}
      />
      {isLoading ? (
        <Text style={styles.title}>Loading...</Text>
      ) : !dayWorkout.length ? (
        <Text style={styles.title}>No workouts for this day</Text>
      ) : (
        <WorkoutList dayWorkout={dayWorkout} handleCopyWorkout={copyWorkout} />
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    marginBottom: 20,
  },
  list: {},
  listItem: {
    backgroundColor: '#e0e0e0',
    padding: 12,
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    marginBottom: 8,
  },
  category: {
    fontSize: 20,
    marginBottom: 8,
  },
  text: {
    marginBottom: 8,
  },
  setItem: {
    marginBottom: 8,
  },
  button: {
    padding: 12,
    backgroundColor: '#808080',
  },
});

export default SingleDayWorkout;
