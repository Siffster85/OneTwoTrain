import { getUserProfile, patchUser } from '@/api';
import { Text, View } from '@/components/Themed';
import { auth } from '@/firebaseConfig';
import * as ImagePicker from 'expo-image-picker';
import { Stack, router } from 'expo-router';
import { signOut } from 'firebase/auth';
import { useEffect, useState } from 'react';
import {
  Alert,
  Button,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
} from 'react-native';

const Profile = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>();
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

  const defaultImage =
    'https://images.pexels.com/photos/416726/pexels-photo-416726.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2';
  const profileData = [
    ['Date of Birth', userProfile.user.dateOfBirth],
    ['E-Mail', userProfile.user.email],
    ['Weight', `${userProfile.user.weight} kg`],
    ['Height', `${userProfile.user.height} cm`],
    [
      'Activity Level',
      userProfile.user.dailyActivityLevel.split('_').join(' '),
    ],
    ['Water Goal', `${userProfile.user.waterGoal} ml`],
    ['Calorie Goal', `${Math.floor(userProfile.user.calorieGoal)} kcal`],
  ];

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
        const profileImage = { profileImage: result.assets[0].uri };
        const updateImage = await patchUser(profileImage);
      } else {
        alert('You did not select any image.');
      }
    } catch (error: any) {
      Alert.alert(error);
    }
  }

  function ImageViewer({ selectedImage }) {
    const imageSource = { uri: selectedImage };
    return <Image source={imageSource} style={styles.image} />;
  }

  //make the image a Pressable with a default and then have it replaced by the same image route in the profile data.

  return (
    <ScrollView style={styles.container}>
      <Stack.Screen
        options={{
          title: 'Profile',
          headerTitleAlign: 'center',
          headerRight: () => (
            <Button title="Sign Out" onPress={() => handleSignOut()} />
          ),
        }}
      />
      <View style={styles.profileImage}>
        <Pressable onPress={pickImageAsync} style={styles.imageContainer}>
          <Image
            source={{ uri: selectedImage ? selectedImage : defaultImage }}
            style={styles.image}
          />
        </Pressable>
        <Text style={styles.userName}>{userProfile.user.name}</Text>
      </View>
      <View style={styles.profileData}>
        {profileData.map(data => {
          return (
            <View key={data[0]} style={styles.profileItem}>
              <Text style={styles.text}>{data[0]}</Text>
              <Text style={styles.text}>{data[1]}</Text>
            </View>
          );
        })}
        <View style={styles.profileItem}>
          <Text style={styles.text}>Password</Text>
          <View style={styles.button}>
            <Pressable
              onPress={() =>
                router.push({
                  pathname: '/profile/changePassword',
                })
              }>
              <Text style={styles.text}>Change</Text>
            </Pressable>
          </View>
        </View>
        <Button
          title="Edit Profile"
          onPress={() =>
            router.push({
              pathname: '/profile/editProfile',
            })
          }
        />
      </View>
      <Button
        title="Delete Account"
        color="#f22b39"
        onPress={() =>
          router.push({
            pathname: '/profile/deleteProfile',
          })
        }
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    borderTopColor: '#ececec',
    borderTopWidth: 1,
    backgroundColor: '#ececec',
  },
  profileImage: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ececec',
    marginBottom: 20,
  },
  profileData: {
    backgroundColor: '#fff',
    padding: 20,
    paddingBottom: 12,
    borderRadius: 12,
    marginBottom: 20,
  },
  profileItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingBottom: 5,
    backgroundColor: 'transparent',
    marginBottom: 8,
    borderBottomColor: '#ececec',
    borderBottomWidth: 2,
  },
  text: {
    fontSize: 16,
    color: '#000',
  },
  userName: {
    fontSize: 24,
    textTransform: 'capitalize',
    fontWeight: 'bold',
    color: '#000',
    marginTop: 8,
  },
  button: {
    fontSize: 16,
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 8,
    backgroundColor: '#ececec',
    marginBottom: 4,
  },
  imageContainer: {
    borderRadius: 12,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 150,
  },
  image: {
    borderWidth: 4,
    padding: 35,
    alignItems: 'center',
    justifyContent: 'center',
    width: 150,
    height: 150,
    borderColor: '#ffd33d',
    borderRadius: 100,
  },
});

export default Profile;
