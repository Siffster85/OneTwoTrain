import { Stack } from "expo-router"

const PlanLayout = () => {
  return (
  <Stack>
    <Stack.Screen name="index" 
    options={{
      headerTitle: "Daily Plan"
    }}/>
    <Stack.Screen name="workout" options={{
      headerTitle: "Todays Workout"
    }}/>
  </Stack>
  )
}

export default PlanLayout;