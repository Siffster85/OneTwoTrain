import { Text } from '@/components/Themed';
import { router } from 'expo-router';
import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity
} from 'react-native';

const plan = () => {
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.item}
        onPress={() => router.push('/plan/workout')}>
        <Text style={[styles.title, styles.text]}>Go To Workout</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.item}
        onPress={() => router.push('/(tabs)/plan/weigh-in-page')}>
        <Text style={[styles.title, styles.text]}>Go To Weigh In</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    marginTop: 10,
    fontSize: 32,
    marginBottom: 10,
  },
  text: {
    color: '#ffffff',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  item: {
    backgroundColor: '#f32b3a',
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 25,
  },
});

export default plan;
