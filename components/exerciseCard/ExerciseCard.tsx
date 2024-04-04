import { StyleSheet, Text, View } from 'react-native';

interface props {
  weight: string;
  reps: number;
  title: string;
  distance: string;
  time: string;
}

const ExerciseCard = ({ title, weight, reps, distance, time }: props) => {
  return weight && reps ? (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <View>
        <Text style={styles.infoText}>Weight: {weight} </Text>
        <Text style={styles.infoText}>Reps: {reps} </Text>
      </View>
    </View>
  ) : (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <View>
        <Text style={styles.infoText}>Distance: {distance} </Text>
        <Text style={styles.infoText}>Time: {time} </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f32b3a',
    padding: 23,
    justifyContent: 'space-between',
    marginVertical: 8,
    borderRadius: 10,
  },
  title: {
    fontSize: 25,
    color: '#fff',
  },
  infoText: {
    fontSize: 15,
    color: '#fff',
  },
});

export default ExerciseCard;
