import { Text, View } from '@/components/Themed';
import { auth } from '@/firebaseConfig';
import * as ImagePicker from 'expo-image-picker';
import { Stack, router } from 'expo-router';
import { signOut } from 'firebase/auth';
import { useState } from 'react';
import { Alert, Button, StyleSheet } from 'react-native';
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

  interface userProfileTypes {
    dateofbirth: string;
    eMail: string;
    weight: number;
    height: number;
    activityLevel: string;
    caloriesGoal: number;
    waterGoal: number;
  }

  const profileData = [
    ['Date of Birth'],
    ['E-Mail'],
    ['Weight'],
    ['Height'],
    ['Activity Level'],
    ['Water Goal'],
    ['Calorie Goal'],
  ];

  const userProfile: userProfileTypes = {
    dateofbirth: '29-10-1985',
    eMail: 'abcdef@mail.com',
    weight: 54,
    height: 173,
    activityLevel: 'Moderate',
    caloriesGoal: 1800,
    waterGoal: 2000,
  };

  const userProfileData = Object.values(userProfile);

  for (let i = 0; i < userProfileData.length; i++) {
    profileData[i].push(userProfileData[i]);
  }

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
    <View style={styles.centralAlign}>
      <Stack.Screen
        options={{
          headerShown: true,
          title: 'Profile',
          headerTitleAlign: 'center',
          headerRight: () => (
            <Button title="Sign Out" onPress={() => handleSignOut()} />
          ),
        }}
      />
      <View style={styles.centralAlign}>
        <CustomButton
          theme="circular"
          label="Add Profile Photo"
          onPress={pickImageAsync}
        />
        <Text>Profile page of {user?.email}</Text>
      </View>
      <View>
        {profileData.map(data => {
          return (
            <View key={data[0]} style={styles.profileData}>
              <Text>{data[0]}</Text>
              <Text>{data[1]}</Text>
            </View>
          );
        })}
      </View>
      <Button
        title="Change Password"
        onPress={() =>
          router.push({
            pathname: '/profile/changePassword',
          })
        }
      />
      <Button
        title="Delete Account"
        onPress={() =>
          router.push({
            pathname: '/profile/deleteProfile',
          })
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  centralAlign: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileData: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingBottom: 5,
  },
});

export default Profile;
