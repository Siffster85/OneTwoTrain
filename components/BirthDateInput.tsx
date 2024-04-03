import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface BirthDateProps {
  date: Date;
  setDate: React.Dispatch<React.SetStateAction<Date>>;
}

const BirthDateInput: React.FC<BirthDateProps> = ({ date, setDate }) => {
  const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    const currentDate = selectedDate ?? date;
    setDate(currentDate);
  };
  return (
    <View style={styles.dateContainer}>
      <Text style={styles.dateText}>Select your date of birth:</Text>
      <DateTimePicker
        testID="dateTimePicker"
        value={date}
        mode="date"
        is24Hour
        display="default"
        onChange={onChange}
        maximumDate={new Date()}
      />
    </View>
  );
};

export default BirthDateInput;

const styles = StyleSheet.create({
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  dateText: {
    minHeight: 40,
    fontSize: 16,
    paddingVertical: 12,
    color: '#171717',
  },
});
