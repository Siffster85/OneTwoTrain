import { Text } from '@/components/Themed';
import { Link } from 'expo-router';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';

const plan = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Link style={styles.item} href="/plan/workout">
        <Text style={styles.title}>Go To Workout</Text>
      </Link>
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
