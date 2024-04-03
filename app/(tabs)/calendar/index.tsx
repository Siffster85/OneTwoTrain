import CalendarComponent from '@/components/CalendarComponent';
import { router } from 'expo-router';

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
  return <CalendarComponent handleDayPress={handleDayPress} />;
};

export default Calendar;
