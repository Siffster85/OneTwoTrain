import PlaceholderComponent from '@/components/PlaceholderComponent';
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
          headerRight: () => (
            <Button title="Sign Out" onPress={() => handleSignOut()} />
          ),
        }}
      />
      <CustomButton
        theme="circular"
        label="Add Profile Photo"
        onPress={pickImageAsync}
      />
      <Text>Profile page of {user?.email}</Text>
      <ProfileTable />
      <Button
        title="Change Password"
        onPress={() =>
          router.push({
            pathname: '/profile/ChangePassword',
          })
        }
      />
      <PlaceholderComponent
        label="Delete Account"
        onPress={() =>
          router.push({
            pathname: '/profile/DeleteProfile',
          })
        }
      />
    </View>
  );
};

function ProfileTable() {
  return (
    <View style={[styles.container]}>
      <View style={styles.LCol}>
        <Text style={styles.text}>Date of Birth</Text>
      </View>
      <View style={styles.RCol}>
        <Text style={styles.text}>{userProfile.dateofbirth}</Text>
      </View>
      <View style={styles.LCol}>
        <Text style={styles.text}>E-Mail</Text>
      </View>
      <View style={styles.RCol}>
        <Text style={styles.text}>{userProfile.eMail}</Text>
      </View>
      <View style={styles.LCol}>
        <Text style={styles.text}>Weight</Text>
      </View>
      <View style={styles.RCol}>
        <Text style={styles.text}>{userProfile.weight} kg</Text>
      </View>
      <View style={styles.LCol}>
        <Text style={styles.text}>Height</Text>
      </View>
      <View style={styles.RCol}>
        <Text style={styles.text}>{userProfile.height} cm</Text>
      </View>
      <View style={styles.LCol}>
        <Text style={styles.text}>Activity Level</Text>
      </View>
      <View style={styles.RCol}>
        <Text style={styles.text}>{userProfile.activityLevel}</Text>
      </View>
      <View style={styles.LCol}>
        <Text style={styles.text}>Water Goal</Text>
      </View>
      <View style={styles.RCol}>
        <Text style={styles.text}>{userProfile.caloriesGoal} kcal</Text>
      </View>
      <View style={styles.LCol}>
        <Text style={styles.text}>Calorie Goal</Text>
      </View>
      <View style={styles.RCol}>
        <Text style={styles.text}>{userProfile.waterGoal} ml</Text>
      </View>
    </View>
  );
}

interface userProfileTypes {
  dateofbirth: string;
  eMail: string;
  weight: number;
  height: number;
  activityLevel: string;
  caloriesGoal: number;
  waterGoal: number;
}

const userProfile: userProfileTypes = {
  dateofbirth: '10-04-2000',
  eMail: 'abcdef@mail.com',
  weight: 54,
  height: 173,
  activityLevel: 'Moderate',
  caloriesGoal: 1800,
  waterGoal: 2000,
};

const styles = StyleSheet.create({
  container: {
    flex: 2,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-end',
    fontSize: 55,
  },
  LCol: {
    width: '50%',
    padding: 10,
  },
  RCol: {
    flexDirection: 'row-reverse',
    width: '50%',
    padding: 10,
  },
  text: {
    fontSize: 18,
  },
});

export default Profile;
