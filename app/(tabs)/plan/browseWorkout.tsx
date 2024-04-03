import CustomDayComponent from '@/components/CustomDayComponent';
import { View } from '@/components/Themed';
import { Stack } from 'expo-router';
import React from 'react';
import { CalendarList } from 'react-native-calendars';

const BrowseWorkout = () => {
  return (
    <View>
      <Stack.Screen
        options={{
          headerTitle: 'Browse From Calendar',
          headerBackTitleVisible: false,
        }}
      />
      <CalendarList
        pastScrollRange={12}
        showScrollIndicator
        futureScrollRange={0}
        dayComponent={({ date }) => (
          <CustomDayComponent date={date} isBrowseWorkout />
        )}
      />
    </View>
  );
};

export default React.memo(BrowseWorkout);
