import { Text, View } from '@/components/Themed';
import { router } from 'expo-router';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
const logo = require('../../assets/images/12train-logo-f.png');

export default function Welcome() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.upperTitle}>Welcome to</Text>
        <Text style={styles.title}>One Two Train!</Text>
        <Text style={styles.lowertitle}>Already have an account?</Text>
      </View>
      <View style={styles.imageContainer}>
        <Image source={logo} style={styles.image} resizeMode="contain" />
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
  upperTitle: {
    color: '#171717',
    fontSize: 32,
    textAlign: 'center',
    marginBottom: 10,
  },
  title: {
    color: '#171717',
    fontSize: 40,
    textAlign: 'center',
    fontWeight: 'bold',
    fontFamily: '',
  },
  lowertitle: {
    color: '#171717',
    fontSize: 30,
    textAlign: 'center',
    marginTop: 20,
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
  imageContainer: {
    backgroundColor: 'transparent',
    marginVertical: 50,
  },
  image: {
    width: 200,
    height: 200,
    backgroundColor: 'transparent',
  },
});
