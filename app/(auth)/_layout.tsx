import { Stack } from "expo-router"

const AuthLayout = () => {
  return <Stack>
    <Stack.Screen
      name="index"
      options={{
        headerTitle: "OneTwoTrain"
      }}
    />
    <Stack.Screen
      name="signup"
      options={{
        headerTitle: "Sign Up"
      }}
    />
    <Stack.Screen
      name="signin"
      options={{
        headerTitle: "Sign In"
      }}
    />
  </Stack>
}

export default AuthLayout;