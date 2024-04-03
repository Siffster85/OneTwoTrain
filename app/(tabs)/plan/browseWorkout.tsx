import CalendarComponent from '@/components/CalendarComponent';
import { View } from '@/components/Themed';
import { Stack, router } from 'expo-router';
import React from 'react';

type DateData = {
  dateString: string;
  day: number;
  month: number;
  timestamp: number;
  year: number;
};

const BrowseWorkout = () => {
  const handleDayPress = (date: DateData) => {
    router.navigate({
      pathname: '/(tabs)/plan/singleDayWorkout',
      params: { selectedDate: date?.dateString },
    });
  };
  return (
    <View>
      <Stack.Screen
        options={{
          headerTitle: 'Browse From Calendar',
          headerBackTitleVisible: false,
        }}
      />
      <CalendarComponent handleDayPress={handleDayPress} />
    </View>
  );
};

export default React.memo(BrowseWorkout);
