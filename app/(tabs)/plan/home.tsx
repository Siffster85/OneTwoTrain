import { Text } from '@/components/Themed';
import { router } from 'expo-router';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

const plan = () => {
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.item}
        onPress={() => router.push('/plan/workout')}>
        <Text style={styles.title}>Go To Workout</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.item}
        onPress={() => router.push('/plan/stopwatch')}>
        <Text style={styles.title}>Stopwatch Placeholder</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.item}
        onPress={() => router.push('/(tabs)/plan/weigh-in-page')}>
        <Text style={styles.title}>Go To Weigh In</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight ?? 0,
  },
  item: {
    flexDirection: 'row',
    backgroundColor: '#4BA663',
    padding: 20,
    justifyContent: 'space-between',
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 25,
  },
});

export default plan;
