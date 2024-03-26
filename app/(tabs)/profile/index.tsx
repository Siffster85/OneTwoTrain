import { Text, View } from '@/components/Themed';
import { auth } from '@/firebaseConfig';
import * as ImagePicker from 'expo-image-picker';
import { Stack } from 'expo-router';
import { signOut } from 'firebase/auth';
import { useState } from 'react';
import { Alert, Button } from 'react-native';
import CustomButton from '../../../components/CustomButton';

const Profile = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const user = auth.currentUser;
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        Alert.alert('Sign-out successful.');
      })
      .catch(error => {
        Alert.alert(error);
      });
  };

  async function pickImageAsync() {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled) {
        setSelectedImage(result.assets[0].uri);
      } else {
        alert('You did not select any image.');
      }
    } catch (error: any) {
      Alert.alert(error);
    }
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Stack.Screen
        options={{
          headerShown: true,
          title: 'Profile',
          headerTitleAlign: 'center',
        }}
      />
      <CustomButton
        theme="circular"
        label="Add Profile Photo"
        onPress={pickImageAsync}
      />
      <Text>Profile page of {user?.email}</Text>
      <Button title="Sign Out" onPress={() => handleSignOut()} />
    </View>
  );
};

export default Profile;
