import { getAllExercises } from '@/api';
import { View } from '@/components/Themed';
import { Stack, router } from 'expo-router';
import { useState } from 'react';
import {
  FlatList,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
} from 'react-native';

interface Set {
  weight: string;
  reps: string;
}

interface renderItemProps {
  item: {
    exerciseName: string;
    category: string;
    sets: Set;
    fromBrowsePage?: string;
  };
  index: number;
}

type ItemProps = { title: string; category: string; amountOfSets: number };

const Item = ({ title, category, amountOfSets }: ItemProps): any => {
  return (
    <View style={category !== 'cardio' ? styles.item : styles.cardioItem}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.exerciseQuantity}>X{amountOfSets}</Text>
    </View>
  );
};

const BrowseExercises = () => {
  const [allExercise, setAllExercise] = useState([]);

  getAllExercises().then(result => {
    const noDupeResult = [];
    const uniqueObject = {};
    for (const i in result) {
      const exceriseName = result[i]['exerciseName'];
      uniqueObject[exceriseName] = result[i];
    }
    for (const x in uniqueObject) {
      noDupeResult.push(uniqueObject[x]);
    }

    setAllExercise(noDupeResult);
  });

  return (
    <SafeAreaView>
      <Stack.Screen
        options={{
          headerBackTitleVisible: false,
        }}
      />
      <FlatList
        style={{ marginTop: 10 }}
        data={allExercise}
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
                  fromBrowsePage: 'true',
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
    </SafeAreaView>
  );
};

export default BrowseExercises;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight ?? 0,
  },
  item: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#f32b3a',
    padding: 20,
    justifyContent: 'space-between',
    margin: 10,
    borderRadius: 15,
  },
  title: {
    fontSize: 25,
    color: '#fff',
  },
  exerciseQuantity: {
    textAlign: 'right',
    color: '#fff',
  },
  cardioItem: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#39E1CC',
    padding: 20,
    justifyContent: 'space-between',
  },
});
