import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';

const activityMarkings = {
  '2024-03-28': {
    customStyles: {
      container: {
        backgroundColor: 'white',
      },
      text: {
        color: 'black',
      },
      dots: [
        { key: 'activity1', color: 'red', selectedDotColor: 'red' },
        { key: 'activity2', color: 'green', selectedDotColor: 'green' },
        { key: 'activity3', color: 'blue', selectedDotColor: 'blue' },
        { key: 'activity4', color: 'yellow', selectedDotColor: 'yellow' },
      ],
    },
  },
  // Add more dates as needed
};

const CalendarComponent = () => {
  return (
    <View style={styles.container}>
      <Calendar
        // Initially visible month. Default = now
        current={'2024-03-01'}
        // Callback when date changes
        markingType={'custom'}
        markedDates={activityMarkings}
        onDayPress={(day) => {
          console.log('selected day', day);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: "#fff",
    borderTopColor: "#808080",
    borderTopWidth: 1,
  },
});

export default CalendarComponent;
