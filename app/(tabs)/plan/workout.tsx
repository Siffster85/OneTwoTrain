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
    <View style={[styles.exItem, (category === 'cardio' ? styles.cardioItem : styles.weightItem)]}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.itemExtras}>
        <Text style={styles.exerciseDetails}>#qty</Text>
        <Text style={styles.exerciseDetails}>{category}</Text>
      </View>
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
          style={styles.button}
          onPress={() => router.push('/(tabs)/plan/addExercise')}>
          <Text style={styles.buttonText}>Add An Exercise</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => browsePrevWorkout()}>
          <Text style={styles.buttonText}>Browse Previous Workouts</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push('/(tabs)/plan/browseExercises')}>
          <Text style={styles.buttonText}>Browse Exercises</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight ?? 24,
    backgroundColor: '#ececec',
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
  }
});

export default workout;
