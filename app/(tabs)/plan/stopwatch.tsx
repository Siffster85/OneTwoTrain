import React, { useRef, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { DisplayTime } from './stopwatchComponent/displayTime';
import Result from './stopwatchComponent/result';

const Stopwatch = () => {
  // State and refs to manage time and stopwatch status
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);
  const [results, setResults] = useState([]);
  const intervalRef = useRef(null);
  const startTimeRef = useRef(0);
  // Function to start the stopwatch
  const startStopwatch = () => {
    startTimeRef.current = Date.now() - seconds * 1000;
    intervalRef.current = setInterval(() => {
      setSeconds(Math.floor((Date.now() - startTimeRef.current) / 1000));
    }, 1000);
    setRunning(true);
  };
  // Function to pause the stopwatch
  const pauseStopwatch = () => {
    clearInterval(intervalRef.current);
    setRunning(false);
  };
  // Function to reset the stopwatch
  const resetStopwatch = () => {
    clearInterval(intervalRef.current);
    setSeconds(0);
    setRunning(false);
  };
  const completeLap = () => {
    setResults(previousResults => [seconds, ...previousResults]);
    setSeconds(0);
    clearInterval(intervalRef.current);
  };
  // Function to log times
  const logTimes = () => {
    console.log(results);
    setResults([]);
    //needs to push all laps to
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>*Exercise*</Text>
      <Text style={styles.timeText}>{DisplayTime(seconds)}</Text>
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
              style={[styles.button, styles.resumeButton]}
              onPress={completeLap}>
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
      <Text style={styles.subHeader}>Laps</Text>
      <View style={styles.laps}>
        <Result results={results} />
        <TouchableOpacity
          style={[styles.button, styles.resumeButton]}
          onPress={logTimes}>
          <Text style={styles.buttonText}>Log Exercise</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 30,
    color: 'green',
    marginBottom: 10,
  },
  subHeader: {
    fontSize: 18,
    marginBottom: 10,
    marginTop: 10,
    color: 'blue',
  },
  timeText: {
    fontSize: 48,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    margin: 5,
  },
  startButton: {
    backgroundColor: '#2ecc71',
    marginRight: 10,
  },
  resetButton: {
    backgroundColor: '#e74c3c',
    marginRight: 10,
  },
  pauseButton: {
    backgroundColor: '#f39c12',
  },
  resumeButton: {
    backgroundColor: '#3498db',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  laps: { 
    flex: 2 / 5,
  },
});

export default Stopwatch;
