import { getSchedule } from '@/api';
import { formatDate } from '@/utils';
import { useEffect, useState } from 'react';
import { CalendarList } from 'react-native-calendars';

type Workout = {
  date: string;
  workoutExerciseCount: number;
};

type DateData = {
  dateString: string;
  day: number;
  month: number;
  timestamp: number;
  year: number;
};

type Props = {
  handleDayPress: (_day: DateData) => void;
};

const CalendarComponent = ({ handleDayPress }: Props) => {
  const dotOne = { key: 'dotOne', color: '#94b9bc' };
  const dotTwo = { key: 'dotTwo', color: '#71929c' };
  const dotThree = { key: 'dotThree', color: '#577882' };
  const dotFour = { key: 'dotFour', color: '#46606f' };
  const todayDate = formatDate(new Date());
  const [workoutDates, setWorkoutDates] = useState<Workout[]>([]);
  const [markedDates, setMarkedDates] = useState({});

  useEffect(() => {
    getSchedule().then(result => {
      setWorkoutDates(result);
    });
  }, []);

  useEffect(() => {
    const newMarkedDates = workoutDates.reduce((acc: any, currWorkout) => {
      const exercisesCount =
        currWorkout.workoutExerciseCount + 1 > 4
          ? 4
          : currWorkout.workoutExerciseCount + 1;
      const dots = [dotOne, dotTwo, dotThree, dotFour].slice(0, exercisesCount);
      acc[currWorkout.date] = { dots };
      return acc;
    }, {});

    newMarkedDates[todayDate] = {
      ...newMarkedDates[todayDate],
      selected: true,
      selectedColor: '#ececec',
      selectedTextColor: '#577882',
    };
    setMarkedDates(newMarkedDates);
  }, [workoutDates]);

  return (
    <CalendarList
      pastScrollRange={3}
      showScrollIndicator
      futureScrollRange={1}
      markingType="multi-dot"
      markedDates={markedDates}
      onDayPress={day => handleDayPress(day)}
    />
  );
};

export default CalendarComponent;
