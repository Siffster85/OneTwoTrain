import { Entypo } from '@expo/vector-icons';
import { Stack, router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';

export default function Timer() {
  const { reps, weight, setQuantity, title } = useLocalSearchParams();

  const [endCount, setEndCount] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [key, setKey] = useState(0);
  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <Pressable onPress={() => router.back()}>
        <Entypo
          name="circle-with-cross"
          size={24}
          color="#25292e"
          style={styles.buttonIcon}
        />
      </Pressable>
      <View style={styles.timer}>
        <CountdownCircleTimer
          key={key}
          isPlaying={isPlaying}
          duration={90}
          colors={['#004777', '#F7B801', '#A30000', '#A30000']}
          colorsTime={[90, 60, 30, 10]}
          onComplete={() => {
            if (endCount === Number(setQuantity)) {
              router.back();
            }
            setEndCount(currentCount => currentCount + 1);
            setKey(prevKey => prevKey + 1);
            setIsPlaying(false);
          }}
          size={250}
          updateInterval={1}>
          {({ remainingTime, color }) => (
            <Text style={{ color, fontSize: 40 }}>{remainingTime}</Text>
          )}
        </CountdownCircleTimer>
      </View>
      <View style={styles.infoBox}>
        <Text>{title}</Text>
        <Text>{weight}</Text>
        <Text>{reps}</Text>
      </View>
      <View style={styles.buttons}>
        <TouchableOpacity
          style={styles.startButton}
          onPress={() => setIsPlaying(true)}>
          <Text>Start Break</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.pauseButton}
          onPress={() => setIsPlaying(false)}>
          <Text>Pause Timer</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  buttons: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row',
  },
  timer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  startButton: {
    borderWidth: 4,
    padding: 50,
    borderRadius: 150,
    borderColor: '#006839',
    backgroundColor: 'green',
  },
  pauseButton: {
    borderWidth: 4,
    padding: 50,
    borderRadius: 150,
    borderColor: '#AF0000',
    backgroundColor: 'red',
  },
  infoBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonIcon: {
    paddingRight: 8,
    textAlign: 'right',
  },
});
