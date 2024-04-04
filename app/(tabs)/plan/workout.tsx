import { getSingleDayWorkout } from '@/api';
import { Text, View } from '@/components/Themed';
import { formatDate } from '@/utils';
import { Ionicons } from '@expo/vector-icons';
import { Stack, router } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  FlatList,
  Pressable,
  SafeAreaView,
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
        styles.transparent,
      ]}>
      <Text style={styles.title}>{title}</Text>
      <View style={[styles.itemExtras, styles.transparent]}>
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
      <FlatList data={todaysExercises} renderItem={renderWorkoutItem} />
      <View style={[styles.transparent, styles.btnContainer]}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push('/(tabs)/plan/addExercise')}>
          <Ionicons name="add-circle-outline" size={24} color="#fff" />
          <Text style={styles.text}>create</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => browsePrevWorkout()}>
          <Ionicons name="copy-outline" size={24} color="#fff" />
          <Text style={styles.text}>copy</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push('/(tabs)/plan/browseExercises')}>
          <Ionicons name="search-outline" size={24} color="#fff" />
          <Text style={styles.text}>browse</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 20,
    flex: 1,
    backgroundColor: '#eef1f4',
    justifyContent: 'space-between',
    alignContent: 'space-between',
  },
  text: {
    fontSize: 16,
    marginLeft: 8,
    color: "#fff"
  },
  buttonContainer: {
    backgroundColor: '#eef1f4',
    marginTop: 36,
  },
  itemExtras: {
    flex: 1,
  },
  btnContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  button: {
    backgroundColor: '#f32b3a',
    padding: 12,
    paddingVertical: 20,
    borderRadius: 20,
    marginVertical: 5,
    minWidth: 100,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  transparent: {
    backgroundColor: 'transparent',
  },
  title: {
    fontSize: 25,
    color: '#737373',
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
  exItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ececec',
    borderWidth: 2,
    borderColor: '#737373',
    borderRadius: 12,
    padding: 10,
    marginBottom: 12,
  },
});

export default Workout;
