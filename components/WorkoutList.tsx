import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

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

type Props = {
  dayWorkout: Excersie[];
  handleCopyWorkout: (() => void) | null;
};

const WorkoutList = ({ dayWorkout, handleCopyWorkout }: Props) => {
  const renderWorkoutItem = ({ item }) => (
    <View style={styles.listItem}>
      <Text style={styles.name}>{item.exerciseName}</Text>
      <View style={styles.categoryContainer}>
        <Text style={styles.category}>{item.category}</Text>
      </View>
      <FlatList
        data={Object.values(item.sets)}
        renderItem={renderSetItem}
        keyExtractor={(item, index) => `set-${index}`}
      />
    </View>
  );

  const renderSetItem = ({ item }) => (
    <View style={styles.setItem}>
      <Text>
        {item.weight ? `weight: ${item.weight}` : `distance: ${item.distance}`}
      </Text>
      <Text>{item.reps ? `reps: ${item.reps}` : `time: ${item.time}`}</Text>
    </View>
  );

  const renderFooter = () => (
    handleCopyWorkout && (
      <TouchableOpacity onPress={handleCopyWorkout} style={styles.button}>
        <Text style={styles.buttonText}>Add this workout</Text>
      </TouchableOpacity>
    )
  );

  return (
    <FlatList
      data={dayWorkout}
      renderItem={renderWorkoutItem}
      keyExtractor={(item, index) => `workout-${index}`}
      ListFooterComponent={renderFooter}
    />
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
  listItem: {
    backgroundColor: '#f1f1f1',
    borderWidth: 2,
    borderColor: '#737373',
    borderRadius: 12,
    padding: 10,
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    marginBottom: 8,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  categoryContainer: {
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    marginBottom: 8,
    padding: 4,
  },
  category: {
    textAlign: 'center',
    fontSize: 20,
  },
  text: {
    marginBottom: 8,
  },
  setItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 8,
    borderWidth: 1,
    borderColor: '#808080',
    borderRadius: 8,
    marginBottom: 8,
  },
  button: {
    fontSize: 20,
    backgroundColor: '#f22a39',
    borderRadius: 12,
    padding: 20,
    color: '#fff',
    marginTop: 12,
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },
});

export default WorkoutList;
