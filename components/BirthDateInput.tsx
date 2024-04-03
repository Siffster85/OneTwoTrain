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
      <Text style={styles.dateText}>Select your date of birth</Text>
      <DateTimePicker
        testID="dateTimePicker"
        value={date}
        mode="date"
        display="default"
        onChange={onChange}
        maximumDate={new Date()}
        themeVariant="light"
      />
    </View>
  );
};

export default BirthDateInput;

const styles = StyleSheet.create({
  dateContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderWidth: 2,
    borderRadius: 12,
    borderColor: '#ececec',
    backgroundColor: '#fff',
    marginBottom: 20,
  },
  dateText: {
    fontSize: 20,
    color: '#171717',
    marginBottom: 28,
  },
});
