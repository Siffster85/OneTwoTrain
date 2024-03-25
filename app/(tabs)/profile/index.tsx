import { View, Text } from "@/components/Themed"
import { Stack } from "expo-router";
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import Button from '../../../components/Button';
import { Alert } from "react-native";

const profile = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
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
        <Button theme="circular" label="Add Profile Photo" onPress={pickImageAsync} />
      <Text>Profile page</Text>
    </View>
  )
}

export default profile;