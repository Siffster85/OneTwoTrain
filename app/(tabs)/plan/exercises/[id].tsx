import { Stack, useLocalSearchParams } from 'expo-router';
import { Text, View } from 'react-native';

export default function CurrentExercise() {
  const { id, title } = useLocalSearchParams();

  return (
    <View>
      <Stack.Screen
        options={{
          headerTitle: `${title}`,
        }}
      />
      <Text>Excerise page - {id}</Text>
    </View>
  );
}
