import { getAllExercises } from '@/api';
import { Stack } from 'expo-router';
import { SafeAreaView, Text } from 'react-native';

const browseExercises = () => {
  const lol = getAllExercises();

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

export default browseExercises;
