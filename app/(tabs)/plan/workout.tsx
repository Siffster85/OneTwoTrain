import { Text, View } from '@/components/Themed';
import { Stack, router } from 'expo-router';
import {
  FlatList,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

const DATA = [
  {
    id: 1,
    title: 'Push Ups',
    category: 'cardio',
  },
  {
    id: 2,
    title: 'Star jumps',
    category: 'legs',
  },
  {
    id: 3,
    title: 'ELENA ELEVATIONS',
    category: 'cardio',
  },
  {
    id: 4,
    title: 'KENNY KICKS',
    category: 'back',
  },
];

type ItemProps = { title: string; category: string };

const Item = ({ title, category }: ItemProps): any => {
  return (
    <View style={category === 'cardio' ? styles.item : styles.cardioItem}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.exerciseQuantity}>Change to exercise quantity</Text>
    </View>
  );
};

const workout = () => {
  const browsePrevWorkout = () => {
    router.navigate('/(tabs)/plan/browseWorkout');
  }

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          headerBackTitleVisible: false,
        }}
      />
      <FlatList
        data={DATA}
        renderItem={({ item }) => (
          <Pressable
            key={item.id}
            onPress={() =>
              router.push({
                pathname: '/(tabs)/plan/exercises/[id]',
                params: {
                  id: item.id,
                  title: item.title,
                  category: item.category,
                },
              })
            }>
            <Item title={item.title} category={item.category} />
          </Pressable>
        )}
      />
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.item}
          onPress={() => router.push('/(tabs)/plan/addExercise')}>
          <Text>Add An Exercise</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item} onPress={() => browsePrevWorkout()}>
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

export default workout;
