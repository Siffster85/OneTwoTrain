import { postUserData } from '@/api';
import { auth } from '@/firebaseConfig';
import { Stack } from 'expo-router';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import React, { useState } from 'react';
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

type UserData = {
  name: string | string[];
  dateOfBirth: string | string[];
  weight: string | string[];
  height: string | string[];
  dailyActivityLevel: string | string[];
  waterGoal: number;
  calorieGoal: number;
};

interface AuthProps {
  isUserRegistered: boolean;
  userData?: UserData;
}

const UserAuthentication: React.FC<AuthProps> = ({
  isUserRegistered,
  userData,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const btnTitle = isUserRegistered ? 'Sign in' : 'Sign up';
  const pageTitle = isUserRegistered
    ? 'Welcome Back to Your Fitness Journey'
    : 'Last Step!\nSecure Your Path';
  const pageSubtitle = isUserRegistered
    ? 'Sign In to Continue Transforming'
    : 'This step ensures you have exclusive access to your fitness roadmap, progress tracking, and motivational insights.';

  const signUpWithEmail = () => {
    setLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        const userDataToPost = { ...userData, email, profileImage: '' };
        postUserData(userDataToPost);
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;

        if (errorCode === 'auth/email-already-in-use') {
          Alert.alert('Email already in use');
        } else {
          Alert.alert(`Error signing up ${errorMessage}`);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const signInWithEmail = () => {
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;

        if (errorCode === 'auth/invalid-credential') {
          Alert.alert('Invalid credential');
        } else {
          Alert.alert(`Error logging in ${errorMessage}`);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <Stack.Screen options={{ headerShown: true, title: 'Auth' }} />
        <View style={styles.titleContainer}>
          <Text style={[styles.title, styles.text]}>{pageTitle}</Text>
          <Text style={[styles.subtitle, styles.text]}>{pageSubtitle}</Text>
        </View>
        <View style={styles.verticallySpaced}>
          <TextInput
            style={styles.input}
            onChangeText={text => setEmail(text)}
            value={email}
            placeholder="Email"
            placeholderTextColor="#808080"
          />
          <TextInput
            style={styles.input}
            onChangeText={text => setPassword(text)}
            value={password}
            secureTextEntry
            placeholder="Password"
            placeholderTextColor="#808080"
          />
        </View>
        <TouchableOpacity
          style={styles.button}
          disabled={loading}
          onPress={() =>
            isUserRegistered ? signInWithEmail() : signUpWithEmail()
          }>
          <Text style={styles.buttonText}>{btnTitle}</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default UserAuthentication;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eef1f4',
    padding: 20,
    paddingTop: 40,
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
    marginBottom: 16,
  },
  text: {
    color: '#171717',
    textAlign: 'center',
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: 'stretch',
    marginBottom: 20,
  },
  button: {
    fontSize: 20,
    backgroundColor: '#f22a39',
    borderRadius: 12,
    padding: 20,
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#fff',
    minHeight: 40,
    color: '#000',
    marginBottom: 8,
    padding: 12,
    borderWidth: 2,
    borderRadius: 12,
    borderColor: '#ececec',
    fontSize: 16,
  },
});
