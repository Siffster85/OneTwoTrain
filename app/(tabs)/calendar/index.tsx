import { CalendarList } from 'react-native-calendars';
import CustomDayComponent from '@/components/CustomDayComponent';

const CalendarComponent = () => {
  return (
    <CalendarList
      pastScrollRange={12}
      showScrollIndicator
      futureScrollRange={12}
      dayComponent={({ date }) => <CustomDayComponent date={date} />}
    />
  );
};

export default CalendarComponent;
