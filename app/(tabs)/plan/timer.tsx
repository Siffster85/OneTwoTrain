import { Stack, router, useLocalSearchParams } from 'expo-router';
import LottieView from 'lottie-react-native';
import { useRef, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';

export default function Timer() {
  const { setAmounts, title, sets } = useLocalSearchParams();
  const confettiRef = useRef<LottieView>(null);
  const [endCount, setEndCount] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [key, setKey] = useState(0);
  const parsedSets = JSON.parse(sets);
  const [shownRepInfo, setShownRepInfo] = useState(parsedSets[0].reps);
  const [repIndex, setRepIndex] = useState(1);
  const [shownWeightInfo, setShownWeightInfo] = useState(parsedSets[0].weight);
  const [weightIndex, setWeightInsex] = useState(1);

  function triggerConfetti() {
    confettiRef.current?.play(0);
  }

  function complete() {
    if (endCount === Number(setAmounts)) {
      triggerConfetti();
      setTimeout(() => {
        router.back();
      }, 3000);
    }
    setEndCount(currentCount => currentCount + 1);
    setKey(prevKey => prevKey + 1);
    setIsPlaying(false);
    updateMetricInfo();
  }

  function updateMetricInfo() {
    const repLength = Object.keys(parsedSets).length;
    const repsArray = [];
    const weightArray = [];
    if (repLength === repIndex) {
      return null;
    }
    for (const key in parsedSets) {
      repsArray.push(parsedSets[key].reps);
      weightArray.push(parsedSets[key].weight);
    }
    setRepIndex(prevIndex => prevIndex + 1);
    setShownRepInfo(repsArray[repIndex]);
    setWeightInsex(prevIndex => prevIndex + 1);
    setShownWeightInfo(weightArray[weightIndex]);
  }

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: ""
        }}
      />
      <Text style={[styles.text, styles.setsTitle]}>Set {repIndex} of {setAmounts}</Text>
      <Text style={[styles.text, styles.title]}>{title}</Text>
      <View style={styles.infoBox}>
        <Text style={styles.text}>Reps: {shownRepInfo}</Text>
        <Text style={styles.text}>Weight: {shownWeightInfo}KG</Text>
      </View>
      <View style={styles.timer}>
        <CountdownCircleTimer
          key={key}
          isPlaying={isPlaying}
          duration={90}
          colors={['#6096B4', '#93BFCF', '#F55050', '#f22b39']}
          colorsTime={[90, 60, 30, 10]}
          onComplete={complete}
          size={250}
          updateInterval={1}>
          {({ remainingTime, color }) => (
            <Text style={{ color, fontSize: 40 }}>{remainingTime}s</Text>
          )}
        </CountdownCircleTimer>
      </View>
      <View style={styles.buttons}>
        <TouchableOpacity
          style={styles.pauseButton}
          onPress={() => setIsPlaying(false)}>
          <Text style={styles.buttonText}>Pause Break</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.startButton}
          onPress={() => setIsPlaying(true)}>
          <Text style={styles.buttonText}>Start Break</Text>
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
    margin: 20,
  },
  buttons: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: 'center',
    flexDirection: 'row',
  },
  setsTitle: {
    padding: 8,
    marginTop: 8,
    textAlign: "center",
    textTransform: "uppercase",
    backgroundColor: "#CCC",
  },
  title: {
    textAlign: "center",
    padding: 8,
    fontSize: 20,
    marginVertical: 8,
    backgroundColor: "#DDD",
  },
  infoBox: {
    justifyContent: "space-between",
    alignItems: 'center',
    flexDirection: "row",
    backgroundColor: "#ECECEC",
    padding: 8,
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    color: "#333"
  },
  timer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  startButton: {
    borderWidth: 4,
    paddingHorizontal: 20,
    paddingVertical: 40,
    borderRadius: 20,
    borderColor: '#6096B4',
    backgroundColor: '#BDCDD6',
  },
  pauseButton: {
    borderWidth: 4,
    paddingHorizontal: 20,
    paddingVertical: 40,
    borderRadius: 20,
    borderColor: '#f22b39',
    backgroundColor: '#FF8787',
  },
  buttonIcon: {
    paddingRight: 8,
    textAlign: 'right',
  },
  buttonText: {
    fontSize: 18,
    textTransform: "uppercase",
    color: "#333",
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
