import { router } from 'expo-router';
import React from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';

type DateData = {
  dateString: string;
  day: number;
  month: number;
  timestamp: number;
  year: number;
};

const workoutColor = '#cca8e9';
const weightColor = '#ff847c';
const caloriesColor = '#42b883';
const waterColor = '#8dc6ff';

const CustomDayComponent = ({
  date,
  isBrowseWorkout
}: {
  date: (string & DateData) | undefined;
  isBrowseWorkout: boolean
}) => {
  const currentDate = new Date().toISOString().split('T')[0];
  const isToday = date?.dateString === currentDate;
  const doneGoals = {
    workout: false,
    weight: false,
    calories: false,
    water: false,
  };

  const navigateToSingleDay = () => {
    router.navigate({
      pathname: '/(tabs)/plan/singleDayWorkout',
      params: { selectedDate: date?.dateString }
    })
  }

  return (
    <Pressable
      style={[styles.dayContainer]}
      onPress={() => {
        return isBrowseWorkout ? navigateToSingleDay() : Alert.alert('Display workout for this day');
      }}>
      <Text style={isToday ? styles.today : null}>{date?.day}</Text>
      <View style={styles.dotsContainer}>
        <View
          style={[
            styles.dot,
            doneGoals.workout ? { backgroundColor: workoutColor } : null,
            { borderColor: workoutColor },
          ]}
        />
        <View
          style={[
            styles.dot,
            doneGoals.weight ? { backgroundColor: weightColor } : null,
            { borderColor: weightColor },
          ]}
        />
        <View
          style={[
            styles.dot,
            doneGoals.calories ? { backgroundColor: caloriesColor } : null,
            { borderColor: caloriesColor },
          ]}
        />
        <View
          style={[
            styles.dot,
            doneGoals.water ? { backgroundColor: waterColor } : null,
            { borderColor: waterColor },
          ]}
        />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  dayContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 2,
  },
  dotsContainer: {
    flexDirection: 'row',
    marginTop: 4,
  },
  dot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    marginHorizontal: 1,
    borderWidth: 1,
  },
  today: {
    color: waterColor,
    fontWeight: '600',
  },
});

export default React.memo(CustomDayComponent);
