import { Text, View } from '@/components/Themed';
import { router } from 'expo-router';
import { StyleSheet, TouchableOpacity } from 'react-native';

export default function Welcome() {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Hello!</Text>
        <Text style={styles.title}>Already have an account?</Text>
      </View>
      <View style={styles.answerContainer}>
        <TouchableOpacity
          onPress={() => router.push('/(auth)/signup')}
          style={styles.answer}>
          <Text>Not yet</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => router.push('/(auth)/signin')}
          style={styles.answer}>
          <Text>Yes, I have an account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
  },
  titleContainer: {
    height: '30%',
    backgroundColor: 'transparent',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 32,
  },
  answerContainer: {
    flexGrow: 1,
    width: '100%',
    padding: 20,
    backgroundColor: 'transparent',
    justifyContent: 'flex-end',
    marginBottom: 80,
  },
  answer: {
    padding: 12,
    fontSize: 20,
    backgroundColor: '#464C55',
    marginBottom: 24,
  },
});
