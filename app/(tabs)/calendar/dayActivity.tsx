import { getSingleDayWorkout } from '@/api';
import { Text, View } from '@/components/Themed';
import WorkoutList from '@/components/WorkoutList';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert } from 'react-native';

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
    <View>
      <Text>Workout</Text>
      <WorkoutList dayWorkout={dayWorkout} handleCopyWorkout={null} />
      <Text>Weight</Text>
      <Text>Water</Text>
    </View>
  );
};

export default DayActivityPage;
