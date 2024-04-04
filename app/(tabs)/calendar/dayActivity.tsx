import { getSingleDayWorkout } from '@/api';
import WorkoutList from '@/components/WorkoutList';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Text, View, Alert, ScrollView, StyleSheet } from 'react-native';

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

const DayActivityPage = () => {
  const { date } = useLocalSearchParams();

  const [dayWorkout, setDayWorkout] = useState<Excersie[]>([]);

  useEffect(() => {
    getSingleDayWorkout(date)
      .then(exercises => {
        setDayWorkout(exercises);
      })
      .catch(err => {
        Alert.alert(err);
      });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Workout</Text>
      <WorkoutList dayWorkout={dayWorkout} handleCopyWorkout={null} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
  },
  title: {
    fontSize: 24,
    color: '#000',
    textAlign: 'center',
    textTransform: 'capitalize',
    marginBottom: 20,
  },
});

export default DayActivityPage;
