import { Stack, useLocalSearchParams } from 'expo-router';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

export default function currentExercise() {
  const { id, title } = useLocalSearchParams();

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          headerTitle: `${title}`,
          headerBackTitleVisible: false,
        }}
      />
      <View style={{ flex: 3, backgroundColor: 'red' }}>
        <View style={styles.card}>
          <Text style={styles.title}>#SET1</Text>
            <View>
              <Text style={styles.infoText}>Weight: 50kg </Text>
              <Text style={styles.infoText}>Reps: 50kg </Text>
            </View>
        </View>
      </View>
      <View style={{ flex: 1, backgroundColor: 'yellow' }}>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: "white",
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
  }
});
