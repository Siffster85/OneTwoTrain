import { StyleSheet, Text, View } from 'react-native';

interface props {
    weight: string,
    reps: number,
    title: string,
}

const ExerciseCard = ({title, weight, reps}: props) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <View>
        <Text style={styles.infoText}>Weight: {weight} </Text>
        <Text style={styles.infoText}>Reps: {reps} </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#387C44',
    padding: 20,
    justifyContent: 'space-between',
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 25,
  },
  infoText: {
    fontSize: 15,
  },
});

export default ExerciseCard;
