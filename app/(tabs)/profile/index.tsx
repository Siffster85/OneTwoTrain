import { View, Text } from "@/components/Themed"
import { Stack } from "expo-router";
import { signOut } from "firebase/auth";
import { auth } from "@/firebaseConfig";
import { Alert, Button } from "react-native";

const profile = () => {
  const handleSignOut = () => {
    signOut(auth).then(() => {
      Alert.alert("Sign-out successful.")
    }).catch((error) => {
      Alert.alert(error)
    });
  }
  
  return (
    <View>
      <Stack.Screen options={{headerShown: true, title: "Profile"}}/>
      <Text>Profile page</Text>
      <Button title="Sign Out" onPress={() => handleSignOut()}/>
    </View>
  )
}

export default profile;