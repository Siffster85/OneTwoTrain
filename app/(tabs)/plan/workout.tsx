import { getSingleDayWorkout } from '@/api';
import { Text, View } from '@/components/Themed';
import { formatDate } from '@/utils';
import { Stack, router } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  FlatList,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

type ItemProps = { title: string; category: string; amountOfSets: number };

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

const Item = ({ title, category, amountOfSets }: ItemProps): any => {
  return (
    <View style={category !== 'cardio' ? styles.item : styles.cardioItem}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.exerciseQuantity}>X{amountOfSets}</Text>
    </View>
  );
};

interface renderItemProps {
  item: { exerciseName: string; category: string; sets: Set };
  index: number;
}

const Workout = () => {
  const [todaysExercises, setTodaysExercises] = useState([]);

  const todaysDate = formatDate(new Date());
  useEffect(() => {
    getSingleDayWorkout(todaysDate).then(result => {
      setTodaysExercises(result);
    });
  }, [todaysExercises]);

  const browsePrevWorkout = () => {
    router.navigate('/(tabs)/plan/browseWorkout');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          headerBackTitleVisible: false,
        }}
      />
      <FlatList
        data={todaysExercises}
        renderItem={({ item, index }: renderItemProps) => (
          <Pressable
            key={index}
            onPress={() =>
              router.push({
                pathname: '/(tabs)/plan/exercises/[id]',
                params: {
                  id: index,
                  title: item.exerciseName,
                  category: item.category,
                  sets: JSON.stringify(item.sets),
                },
              })
            }>
            <Item
              title={item.exerciseName}
              category={item.category}
              amountOfSets={Object.keys(item.sets).length}
            />
          </Pressable>
        )}
      />
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.item}
          onPress={() => router.push('/(tabs)/plan/addExercise')}>
          <Text>Add An Exercise</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.item}
          onPress={() => browsePrevWorkout()}>
          <Text>Browse Previous Workouts</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.item}
          onPress={() => router.push('/(tabs)/plan/browseExercises')}>
          <Text>Browse Exercises</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight ?? 0,
  },
  item: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#4BA663',
    padding: 20,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 25,
  },
  exerciseQuantity: {
    textAlign: 'center',
  },
  cardioItem: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#39E1CC',
    padding: 20,
    justifyContent: 'space-between',
  },
});

export default Workout;
