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

interface AuthProps {
  isUserRegistered: boolean;
  userName: string;
  caloriesPerDay: number;
}

const UserAuthentication: React.FC<AuthProps> = ({
  isUserRegistered,
  userName,
  caloriesPerDay,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const btnTitle = isUserRegistered ? 'Sign in' : 'Sign up';
  const pageTitle = isUserRegistered
    ? 'Welcome Back to Your Fitness Journey'
    : 'Last Step:\nSecure Your Path';
  const pageSubtitle = isUserRegistered
    ? 'Sign In to Continue Transforming'
    : 'This step ensures you have exclusive access to your fitness roadmap, progress tracking, and motivational insights.';

  const signUpWithEmail = () => {
    setLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        const user = userCredential.user;
        Alert.alert(
          `Signed up as ${userName}\nEmail: ${user.email}\nCalories Per Day: ${caloriesPerDay}`,
        );
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
      .then(userCredential => {
        const user = userCredential.user;
        Alert.alert(`Logged in ${user.email}`);
      })
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
        </View>
        <View style={styles.verticallySpaced}>
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
          <Text style={styles.text}>{btnTitle}</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default UserAuthentication;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    padding: 20,
    paddingTop: 60,
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
    marginBottom: 48,
  },
  text: {
    color: '#fff',
    textAlign: 'center',
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: 'stretch',
  },
  button: {
    fontSize: 20,
    backgroundColor: '#464C55',
    borderRadius: 12,
    padding: 12,
    color: '#fff',
  },
  input: {
    backgroundColor: '#fff',
    minHeight: 40,
    color: '#000',
    marginBottom: 12,
    padding: 12,
  },
});
