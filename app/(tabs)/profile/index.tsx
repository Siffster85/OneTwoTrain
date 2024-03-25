import { View, Text } from "@/components/Themed"
import { Stack } from "expo-router";

const profile = () => {
  return (
    <View>
      <Stack.Screen options={{headerShown: true, title: "Profile"}}/>
      <Text>Profile page</Text>
    </View>
  )
}

export default profile;