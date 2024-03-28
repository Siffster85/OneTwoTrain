import { Entypo } from '@expo/vector-icons';
import { Stack, router, useLocalSearchParams } from 'expo-router';
import LottieView from 'lottie-react-native';
import { useRef, useState } from 'react';
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
  const confettiRef = useRef<LottieView>(null);
  const [endCount, setEndCount] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [key, setKey] = useState(0);

  function triggerConfetti() {
    confettiRef.current?.play(0);
  }

  function complete() {
    if (endCount === Number(setQuantity)) {
      triggerConfetti();
      setTimeout(() => {
        router.back();
      }, 3000);
    }
    setEndCount(currentCount => currentCount + 1);
    setKey(prevKey => prevKey + 1);
    setIsPlaying(false);
  }

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
          onComplete={complete}
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
      <LottieView
        ref={confettiRef}
        source={require('../../../assets/animations/confetti.json')}
        autoPlay={false}
        loop={false}
        style={styles.lottie}
        resizeMode="cover"
      />
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
  lottie: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
    pointerEvents: 'none',
  },
});
