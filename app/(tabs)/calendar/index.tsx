import CalendarComponent from '@/components/CalendarComponent';
import { View } from '@/components/Themed';
import { router } from 'expo-router';
import { StyleSheet } from 'react-native';

type DateData = {
  dateString: string;
  day: number;
  month: number;
  timestamp: number;
  year: number;
};

const Calendar = () => {
  const handleDayPress = (date: DateData) => {
    router.navigate({
      pathname: '/(tabs)/calendar/dayActivity',
      params: {
        date: date.dateString,
      },
    });
  };
  return (
    <View style={styles.container}>
      <CalendarComponent handleDayPress={handleDayPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderTopColor: '#ececec',
    borderTopWidth: 1,
  },
});

export default Calendar;
