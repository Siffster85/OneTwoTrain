import { Stack } from 'expo-router';
import { SafeAreaView, Text } from 'react-native';

const browseExercises = () => {
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
