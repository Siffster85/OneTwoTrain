import { getUserProfile } from '@/api';
import { Text, View } from '@/components/Themed';
import { auth } from '@/firebaseConfig';
import * as ImagePicker from 'expo-image-picker';
import { Stack, router } from 'expo-router';
import { signOut } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { Alert, Button, StyleSheet } from 'react-native';
import CustomButton from '../../../components/CustomButton';

const Profile = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [userProfile, setUserProfile] = useState({
    user: {
      calorieGoal: 0,
      dailyActivityLevel: '',
      dateOfBirth: '',
      email: '',
      height: '',
      name: '',
      profileImage: '',
      waterGoal: 0,
      weight: '',
    },
  });
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

  useEffect(() => {
    getUserProfile()
      .then(data => {
        setUserProfile(data.data);
      })
      .catch(err => {
        throw err;
      });
  }, []);

  const profileData = [
    ['Name', userProfile.user.name],
    ['Date of Birth', userProfile.user.dateOfBirth],
    ['E-Mail', userProfile.user.email],
    ['Weight', userProfile.user.weight],
    ['Height', userProfile.user.height],
    ['Activity Level', userProfile.user.dailyActivityLevel],
    ['Water Goal', userProfile.user.waterGoal],
    ['Calorie Goal', userProfile.user.calorieGoal],
  ];

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
        <Text>Profile page of {userProfile.user.name}</Text>
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
        title="Edit Profile"
        onPress={() =>
          router.push({
            pathname: '/profile/editProfile',
          })
        }
      />
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
