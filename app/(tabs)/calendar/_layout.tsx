import { Stack, router } from 'expo-router';
import { Button } from 'react-native';

const ProfileLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerTitle: 'Calendar',
        }}
      />
      <Stack.Screen
        name="dayActivity"
        options={{
          presentation: 'modal',
          headerTitle: 'Activity during the day',
          headerRight: () => (
            <Button
              onPress={() => router.navigate('/(tabs)/calendar')}
              title="Dismiss"
              color="#000"
            />
          ),
        }}
      />
    </Stack>
  );
};

export default ProfileLayout;
