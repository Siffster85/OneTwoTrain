import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

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
  return (
    <View>
      <FlatList
        style={styles.list}
        data={dayWorkout}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Text style={styles.name}>{item.exerciseName}</Text>
            <View style={styles.categoryContainer}>
              <Text style={styles.category}>{item.category}</Text>
            </View>
            <FlatList
              data={Object.values(item.sets)}
              renderItem={({ item }) => (
                <View style={styles.setItem}>
                  <Text>
                    {item.weight
                      ? `weight: ${item.weight}`
                      : `distance: ${item.distance}`}
                  </Text>
                  <Text>
                    {item.reps ? `reps: ${item.reps}` : `time: ${item.time}`}
                  </Text>
                </View>
              )}
            />
          </View>
        )}
      />
      {handleCopyWorkout && (
        <TouchableOpacity onPress={handleCopyWorkout} style={styles.button}>
          <Text>Add this workout</Text>
        </TouchableOpacity>
      )}
    </View>
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
  list: {},
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
    padding: 12,
    backgroundColor: '#808080',
  },
});

export default WorkoutList;
