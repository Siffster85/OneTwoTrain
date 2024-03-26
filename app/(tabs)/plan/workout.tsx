import CustomButton from '@/components/CustomButton';
import { View, Text } from '@/components/Themed';
import { router } from 'expo-router';
import {
  Alert,
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
  },
  {
    id: 2,
    title: 'Star jumps',
  },
  {
    id: 3,
    title: 'ELENA ELEVATIONS',
  },
  {
    id: 4,
    title: 'KENNY KICKS',
  },
];

type ItemProps = { title: string };

const Item = ({ title }: ItemProps): any => {
  return (
    <SafeAreaView style={styles.item}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.exerciseQuantity}>Change to exercise quantity</Text>
    </SafeAreaView>
  );
};

const workout = () => {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={({ item }) => (
          <Pressable
            key={item.id}
            onPress={() =>
              router.push({
                pathname: '/(tabs)/plan/exercises/[id]',
                params: { id: item.id, title: item.title },
              })
            }>
            <Item title={item.title} />
          </Pressable>
        )}></FlatList>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => router.push('/(tabs)/plan/addExercise')}>
          <Text>Add An Exercise</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#87CEEB',
    padding: 20,
    justifyContent: 'space-between',
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 25,
  },
  exerciseQuantity: {
    textAlign: 'center',
  },
});

export default workout;
