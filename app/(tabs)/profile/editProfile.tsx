import { getUserProfile, patchUser } from '@/api';
import { auth } from '@/firebaseConfig';
import { Stack, router } from 'expo-router';
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updateEmail,
} from 'firebase/auth';
import { useEffect, useState } from 'react';
import {
  Keyboard,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
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
  const [email, setEmail] = useState('');

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
    email: email || userProfile.user.email,
  };

  async function handleSubmit() {
    try {
      await patchUser(profileData);
      if (user) {
        reauthenticateWithCredential(user, credential);
        updateEmail(user, email);
      }
    } catch (error) {
      throw error;
    } finally {
      router.push('/(tabs)/profile/');
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <Stack.Screen
            options={{
              headerShown: true,
              title: 'Update Profile',
              headerTitleAlign: 'center',
            }}
          />
          <Text style={[styles.title, styles.text]}>Update Your Profile</Text>
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
            placeholder="Enter Password to Confirm"
            placeholderTextColor="#808080"
          />
          {formError ? <Text style={styles.error}>{formError}</Text> : null}
          <TouchableOpacity onPress={handleSubmit} style={styles.button}>
            <Text style={styles.buttonText}>Proceed</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eef1f4',
    paddingHorizontal: 10,
    paddingVertical: 40,
  },
  titleContainer: {
    backgroundColor: 'transparent',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingVertical: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 18,
    color: '#171717',
  },
  text: {
    color: '#171717',
    textAlign: 'center',
  },
  error: {
    color: 'red',
    marginTop: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#f22a39',
    borderRadius: 12,
    padding: 20,
    marginTop: 12,
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderRadius: 12,
    borderColor: '#ececec',
    minHeight: 40,
    color: '#000',
    marginBottom: 12,
    padding: 12,
    fontSize: 16,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
  inputContainer: {
    marginBottom: 20,
  },
});

export default EditProfile;
