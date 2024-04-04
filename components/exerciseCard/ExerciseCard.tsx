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
    justifyContent: 'space-between',
    marginVertical: 8,
    backgroundColor: '#f1f1f1',
    borderBottomWidth: 2,
    borderColor: '#737373',
    borderRadius: 12,
    padding: 16,
  },
  title: {
    fontSize: 25,
    color: '#737373',
  },
  infoText: {
    fontSize: 16,
    color: '#737373',
  },
});

export default ExerciseCard;
