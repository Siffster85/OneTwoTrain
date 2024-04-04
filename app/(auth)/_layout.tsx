import { Stack } from 'expo-router';

const AuthLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="signup"
        options={{
          headerTitle: 'Train!',
        }}
      />
      <Stack.Screen
        name="signin"
        options={{
          headerTitle: 'Sign In',
        }}
      />
      <Stack.Screen
        name="quiz-1"
        options={{
          headerTitle: 'Step One',
        }}
      />
      <Stack.Screen
        name="quiz-2"
        options={{
          headerTitle: 'Step Two',
        }}
      />
    </Stack>
  );
};

export default AuthLayout;
