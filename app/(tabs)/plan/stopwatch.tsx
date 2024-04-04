import { router, useLocalSearchParams } from 'expo-router';
import LottieView from 'lottie-react-native';
import React, { useRef, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { DisplayTime } from './stopwatchComponent/displayTime';

const Stopwatch = () => {
  const confettiRef = useRef<LottieView>(null);

  const { setAmounts, sets, title } = useLocalSearchParams();
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);
  const parsedSets = JSON.parse(sets);
  const [index, setIndex] = useState(1);
  const [shownTimeInfo, setShownTimeInfo] = useState(parsedSets[0].time);
  const [shownDistanceInfo, setShownDistanceInfo] = useState(
    parsedSets[0].distance,
  );
  const intervalRef: { current: number | NodeJS.Timeout | null } = useRef(null);
  const startTimeRef = useRef(0);
  const setsLength = Object.keys(parsedSets).length;

  function updateMetricInfo() {
    const timeArray = [];
    const distanceArray = [];
    if (setsLength === index) {
      return null;
    }
    for (const key in parsedSets) {
      timeArray.push(parsedSets[key].reps);
      distanceArray.push(parsedSets[key].weight);
    }
    setIndex(prevIndex => prevIndex + 1);
    setShownTimeInfo(timeArray[index]);
    setShownDistanceInfo(distanceArray[index]);
  }

  function triggerConfetti() {
    confettiRef.current?.play(0);
  }

  function complete() {
    if (setsLength === index) {
      triggerConfetti();
      setTimeout(() => {
        router.back();
      }, 3000);
    }
    setSeconds(0);
    clearInterval(intervalRef.current as NodeJS.Timeout);
    updateMetricInfo();
  }

  const startStopwatch = () => {
    startTimeRef.current = Date.now() - seconds * 1000;
    intervalRef.current = setInterval(() => {
      setSeconds(Math.floor((Date.now() - startTimeRef.current) / 1000));
    }, 1000);
    setRunning(true);
  };

  const pauseStopwatch = () => {
    clearInterval(intervalRef.current as NodeJS.Timeout);
    setRunning(false);
  };

  const resetStopwatch = () => {
    clearInterval(intervalRef.current as NodeJS.Timeout);
    setSeconds(0);
    setRunning(false);
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.text, styles.setsTitle]}>
        Set {index} of {setAmounts}
      </Text>
      <Text style={[styles.text, styles.title]}>{title}</Text>
      <View style={styles.infoBox}>
        <Text style={styles.text}>Goal time: {shownTimeInfo}s</Text>
        <Text style={styles.text}>Distance: {shownDistanceInfo}m</Text>
      </View>
      <View style={styles.timeTextContainer}>
        <Text style={styles.timeText}>{DisplayTime(seconds)}</Text>
      </View>
      <View style={styles.buttonContainer}>
        {running ? (
          <View>
            <TouchableOpacity
              style={[styles.button, styles.pauseButton]}
              onPress={pauseStopwatch}>
              <Text style={styles.buttonText}>Pause</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View>
            <TouchableOpacity
              style={[styles.button, styles.startButton]}
              onPress={startStopwatch}>
              <Text style={styles.buttonText}>
                {seconds > 1 ? 'Resume' : 'Start'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.completeButton]}
              onPress={complete}>
              <Text style={styles.buttonText}>Complete Lap</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.resetButton]}
              onPress={resetStopwatch}>
              <Text style={styles.buttonText}>Reset</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      <LottieView
        ref={confettiRef}
        source={require('../../../assets/animations/confetti.json')}
        autoPlay={false}
        loop={false}
        style={styles.lottie}
        resizeMode="cover"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    textAlign: 'center',
    padding: 8,
    fontSize: 20,
    marginVertical: 8,
    backgroundColor: '#DDD',
  },
  infoBox: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#ECECEC',
    padding: 8,
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    color: '#333',
  },
  timeTextContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  setsTitle: {
    padding: 8,
    marginTop: 8,
    textAlign: 'center',
    textTransform: 'uppercase',
    backgroundColor: '#CCC',
  },
  timeText: {
    fontSize: 48,
    textAlign: 'center',
  },
  buttonContainer: {
    justifyContent: 'center',
    marginTop: 20,
  },
  button: {
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    margin: 5,
  },
  startButton: {
    borderWidth: 4,
    paddingVertical: 20,
    borderRadius: 20,
    borderColor: '#46606f',
    backgroundColor: '#94b9bc',
  },
  resetButton: {
    borderColor: '#f22b39',
    backgroundColor: '#FF8787',
    borderWidth: 4,
    paddingVertical: 20,
    borderRadius: 20,
  },
  pauseButton: {
    borderColor: '#f22b39',
    backgroundColor: '#FF8787',
    borderWidth: 4,
    paddingVertical: 20,
    borderRadius: 20,
  },
  completeButton: {
    borderWidth: 4,
    paddingVertical: 20,
    borderRadius: 20,
    borderColor: '#6096B4',
    backgroundColor: '#BDCDD6',
  },
  buttonText: {
    textAlign: 'center',
    color: '#333',
    fontSize: 18,
    textTransform: 'uppercase',
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

export default Stopwatch;
