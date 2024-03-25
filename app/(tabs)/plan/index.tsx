import { View, Text } from "@/components/Themed"
import { Link, Stack } from "expo-router";
import { router } from "expo-router";
import { Pressable } from "react-native";

const plan = () => {
  return (
    <View>
      <Stack.Screen options={{headerShown: true, title: "Plan"}}/>
      <Text>Plan page</Text>
      <Link href={"/plan/workout"}>
        <Text>Go To Workout</Text>
      </Link>
    </View>
  )
}

export default plan;