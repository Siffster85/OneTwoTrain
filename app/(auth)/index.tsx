import { Text, View } from '@/components/Themed';
import { router } from 'expo-router';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Welcome() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Hello!</Text>
        <Text style={styles.title}>Already have an account?</Text>
      </View>
      <View style={styles.answerContainer}>
        <TouchableOpacity
          onPress={() => router.push('/(auth)/quiz-1')}
          style={styles.answer}>
          <Text style={styles.answerText}>Not yet</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => router.push('/(auth)/signin')}
          style={styles.answer}>
          <Text style={styles.answerText}>Yes, I have an account</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eef1f4',
    alignItems: 'center',
  },
  titleContainer: {
    backgroundColor: 'transparent',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    color: '#171717',
    fontSize: 32,
    textAlign: 'center',
  },
  answerContainer: {
    flexGrow: 1,
    width: '100%',
    padding: 20,
    backgroundColor: 'transparent',
    justifyContent: 'flex-end',
  },
  answer: {
    padding: 20,
    fontSize: 20,
    backgroundColor: '#f22a39',
    marginBottom: 24,
    borderRadius: 12,
  },
  answerText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
});
