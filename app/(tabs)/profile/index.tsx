import { View, Text } from "@/components/Themed"
import { Stack } from "expo-router";
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import CustomButton from '../../../components/CustomButton';
import { signOut } from "firebase/auth";
import { auth } from "@/firebaseConfig";
import { Alert, Button } from "react-native";

const profile = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const user = auth.currentUser;
  const handleSignOut = () => {
    signOut(auth).then(() => {
      Alert.alert("Sign-out successful.")
    }).catch((error) => {
      Alert.alert(error)
    });
  }

  async function pickImageAsync() {
    try {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });
  
    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    } else {
      alert('You did not select any image.');
    }
  } catch (error: any){
    Alert.alert(error)
  }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Stack.Screen options={{
        headerShown: true, 
        title: "Profile",
        headerTitleAlign: 'center'
        }}/>
        <CustomButton theme="circular" label="Add Profile Photo" onPress={pickImageAsync} />
      <Text>Profile page of {user?.email}</Text>
      <Button title="Sign Out" onPress={() => handleSignOut()}/>
    </View>
  )
}

export default profile;