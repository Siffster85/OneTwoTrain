import { getUserProfile, patchUser } from '@/api';
import { Text, View } from '@/components/Themed';
import { auth } from '@/firebaseConfig';
import * as ImagePicker from 'expo-image-picker';
import { Stack, router } from 'expo-router';
import { signOut } from 'firebase/auth';
import { useEffect, useState } from 'react';
import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Profile = () => {
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
  const [selectedImage, setSelectedImage] = useState<string | null>();
  const [isLoading, setIsLoading] = useState(true);

  const loadingImage = 'https://i.gifer.com/ZKZg.gif';
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
        setSelectedImage(data.data.user.profileImage);
      })
      .then(() => {
        setIsLoading(false);
      })
      .catch(err => {
        throw err;
      });
  }, []);

  async function pickImageAsync() {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled) {
        setSelectedImage(result.assets[0].uri);
        const profileImage = { profileImage: result.assets[0].uri };
        await patchUser(profileImage);
      } else {
        alert('You did not select any image.');
      }
    } catch (error: any) {
      Alert.alert(error);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Stack.Screen
          options={{
            title: 'Profile',
            headerTitleAlign: 'center',
            headerRight: () => (
              <TouchableOpacity
                style={styles.button}
                onPress={() => handleSignOut()}>
                <Text style={styles.text}>Sign Out</Text>
              </TouchableOpacity>
            ),
          }}
        />
        <View style={styles.profileImage}>
          <Pressable onPress={pickImageAsync} style={styles.imageContainer}>
            {isLoading ? (
              <Image source={{ uri: loadingImage }} style={styles.image} />
            ) : (
              <Image
                source={{ uri: selectedImage ? selectedImage : defaultImage }}
                style={styles.image}
              />
            )}
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
          <TouchableOpacity
            style={styles.edit}
            onPress={() => router.push({ pathname: '/profile/editProfile' })}>
            <Text style={styles.buttonText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.delete}
          onPress={() => router.push({ pathname: '/profile/deleteProfile' })}>
          <Text style={styles.buttonText}>Delete Account</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
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
    marginBottom: 12,
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
  edit: {
    fontSize: 16,
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 8,
    backgroundColor: '#737373',
    marginBottom: 4,
    alignItems: 'center',
  },
  delete: {
    fontSize: 16,
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 8,
    backgroundColor: '#f22b39',
    marginBottom: 4,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  imageContainer: {
    borderRadius: 12,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 150,
  },
});

export default Profile;
