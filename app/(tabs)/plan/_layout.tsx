import { Stack } from 'expo-router';

const PlanLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#FFF',
        },
        headerTintColor: '#000',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Stack.Screen
        name="home"
        options={{
          headerTitle: 'Daily Plan',
        }}
      />
      <Stack.Screen
        name="workout"
        options={{
          headerTitle: "Today's Workout",
        }}
      />
      <Stack.Screen name="exercises/[id]" />
    </Stack>
  );
};

export default PlanLayout;
