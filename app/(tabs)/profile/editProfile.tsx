import { getUserProfile, patchUser } from '@/api';
import ActivityLevelInput from '@/components/ActivityLevelInput';
import { auth } from '@/firebaseConfig';
import { Stack, router } from 'expo-router';
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updateEmail,
} from 'firebase/auth';
import { useEffect, useState } from 'react';
import {
  Alert,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

const EditProfile = () => {
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
  const authEmail = user?.email ?? '';
  const [password, setPassword] = useState('');
  const credential = EmailAuthProvider.credential(authEmail, password);

  const [formError, setFormError] = useState('');
  const [userName, setUserName] = useState(userProfile.user.name);
  const [email, setEmail] = useState(userProfile.user.email);
  const [selectedActivity, setSelectedActivity] = useState('sedentary');

  useEffect(() => {
    getUserProfile()
      .then(data => {
        setUserProfile(data.data);
      })
      .catch(err => {
        throw err;
      });
  }, []);

  const profileData = {
    name: userName || userProfile.user.name,
    dailyActivityLevel: selectedActivity || userProfile.user.dailyActivityLevel,
    email: email || userProfile.user.email,
  };

  async function handleSubmit() {
    try {
      await patchUser(profileData);
      updateUser();
    } catch (error) {
      throw error;
    } finally {
      router.push('/(tabs)/profile/');
    }
  }

  const updateUser = () => {
    if (user)
      reauthenticateWithCredential(user, credential)
        .then(() => {
          if (email !== userProfile.user.email) {
            updateEmail(user, email);
          }
        })
        .then(() => {
          Alert.alert('E-mail Updated');
        })
        .catch(error => {
          Alert.alert('Error:', error.message);
        });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <Stack.Screen
          options={{
            headerShown: true,
            title: 'Update Profile',
            headerTitleAlign: 'center',
          }}
        />
        <Text style={[styles.title, styles.text]}>Update Your Profile.</Text>
        <TextInput
          style={styles.input}
          onChangeText={text => setUserName(text)}
          onFocus={() => setFormError('')}
          value={userName}
          placeholder={userProfile.user.name}
          placeholderTextColor="#808080"
        />
        <TextInput
          style={styles.input}
          onChangeText={text => setEmail(text)}
          onFocus={() => setFormError('')}
          value={email}
          placeholder={userProfile.user.email}
          placeholderTextColor="#808080"
        />
        <TextInput
          style={styles.input}
          onChangeText={text => setPassword(text)}
          value={password}
          secureTextEntry
          placeholder="Please Enter Password to Change Email"
          placeholderTextColor="#808080"
        />
        <ActivityLevelInput
          selectedActivity={selectedActivity}
          setSelectedActivity={setSelectedActivity}
        />
        {formError ? <Text style={styles.error}>{formError}</Text> : null}
        <TouchableOpacity onPress={handleSubmit} style={styles.button}>
          <Text style={styles.text}>Proceed</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    padding: 20,
  },
  titleContainer: {
    height: '30%',
    backgroundColor: 'transparent',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingVertical: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 20,
  },
  text: {
    color: '#fff',
    textAlign: 'center',
  },
  error: {
    color: 'red',
    marginTop: 20,
    textAlign: 'center',
  },
  button: {
    fontSize: 20,
    backgroundColor: '#464C55',
    borderRadius: 12,
    padding: 12,
    color: '#fff',
    marginTop: 12,
  },
  input: {
    backgroundColor: '#fff',
    minHeight: 40,
    color: '#000',
    marginBottom: 12,
    padding: 12,
  },
});

export default EditProfile;
