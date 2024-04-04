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

const Item = ({ title, category, amountOfSets }: ItemProps): any => {
  return (
    <View
      style={[
        styles.exItem,
        category === 'cardio' ? styles.cardioItem : styles.weightItem,
      ]}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.itemExtras}>
        <Text style={styles.exerciseDetails}>X{amountOfSets}</Text>
        <Text style={styles.exerciseDetails}>{category}</Text>
      </View>
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

  const renderFooter = () => (
    <View style={styles.buttonContainer}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('/(tabs)/plan/addExercise')}>
        <Text style={styles.buttonText}>Create New Exercise</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => browsePrevWorkout()}>
        <Text style={styles.buttonText}>Browse Previous Workouts</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('/(tabs)/plan/browseExercises')}>
        <Text style={styles.buttonText}>Browse Exercises</Text>
      </TouchableOpacity>
    </View>
  );

  const renderWorkoutItem = ({ item, index }: renderItemProps) => (
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
  );

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          headerBackTitleVisible: false,
        }}
      />
      <FlatList
        data={todaysExercises}
        ListFooterComponent={renderFooter}
        renderItem={renderWorkoutItem}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight ?? 24,
    backgroundColor: '#eef1f4',
  },
  buttonContainer: {
    backgroundColor: '#eef1f4',
    marginTop: 36,
  },
  itemExtras: {
    flex: 1,
  },
  button: {
    backgroundColor: '#f32b3a',
    padding: 20,
    justifyContent: 'space-between',
    borderRadius: 20,
    width: '70%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginVertical: 5,
  },
  title: {
    fontSize: 25,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
  exerciseDetails: {
    textAlign: 'right',
    color: '#737373',
  },
  cardioItem: {
    // additional styles for cardio items go here
  },
  weightItem: {
    // additional styles for weight items go here
  },
  exItem: {
    flex: 1,
    flexDirection: 'row',
    padding: 20,
    width: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
    borderColor: '#d6d6d6',
    borderBottomWidth: 1,
  },
});

export default Workout;
