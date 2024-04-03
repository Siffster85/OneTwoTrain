import { getAllExercises } from '@/api';
import { Stack } from 'expo-router';
import { useState } from 'react';
import { SafeAreaView, Text } from 'react-native';

const BrowseExercises = () => {
  const [allExercise, setAllExercise] = useState([]);

  getAllExercises().then(result => {
    setAllExercise(result);
  });

  return (
    <SafeAreaView>
      <Stack.Screen
        options={{
          headerBackTitleVisible: false,
        }}
      />
      <Text>Hey </Text>
    </SafeAreaView>
  );
};

export default BrowseExercises;
