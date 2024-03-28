import { Stack } from 'expo-router';

const ProfileLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerTitle: 'Calendar',
        }}
      />
    </Stack>
  );
};

export default ProfileLayout;
