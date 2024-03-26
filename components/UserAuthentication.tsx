import { Stack } from 'expo-router'
import React, { useState } from 'react'
import { Alert, Button, StyleSheet, TextInput, View, Text } from 'react-native'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '@/firebaseConfig';

interface AuthProps {
  isUserRegistered: boolean;
}

const UserAuthentication: React.FC<AuthProps> = ({ isUserRegistered }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const btnTitle = isUserRegistered ? "Sign in" : "Sign up"
  const pageText = isUserRegistered ? "Sign in into existing account:" : "Let's create a new account:"

  const signUpWithEmail = () => {
    setLoading(true)
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      Alert.alert(`Signed up ${user}`)
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      if (errorCode === "auth/email-already-in-use") {
        Alert.alert("Email already in use")
      } else {
        Alert.alert(`Error signing up ${errorMessage}`)
      }
    })
    .finally(() => {
      setLoading(false)
    })
  }

  const signInWithEmail = () => {
    setLoading(true)
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      Alert.alert(`Logged in ${user.email}`)
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      
      if (errorCode === "auth/invalid-credential") {
        Alert.alert("Invalid credential")
      } else {
        Alert.alert(`Error logging in ${errorMessage}`)
      }
    })
    .finally(() => {
      setLoading(false)
    })
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{headerShown: true, title: "Auth"}}/>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>
          {pageText}
        </Text>
      </View>
      <View style={styles.verticallySpaced}>
        <TextInput style={styles.input}
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="Email"
          placeholderTextColor="#808080" 
        />
      </View>
      <View style={styles.verticallySpaced}>
        <TextInput style={styles.input}
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={true}
          placeholder="Password"
          placeholderTextColor="#808080" 
        />
      </View>
      <View style={[styles.verticallySpaced, styles.buttonContainer]}>
        <Button title={btnTitle} disabled={loading} onPress={() => isUserRegistered ? signInWithEmail() : signUpWithEmail()} />
      </View>
    </View>
  )
}

export default UserAuthentication;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    padding: 20,
  },
  titleContainer: {
    height: '30%',
    backgroundColor: "transparent",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingVertical: 20,
    justifyContent: "center",
  },
  title: {
    color: '#fff',
    fontSize: 32,
  },
  answerContainer: {
    flexGrow: 1,
    width: "100%",
    padding: 20,
    backgroundColor: "transparent",
    justifyContent: "flex-end",
    marginBottom: 80,
  },
  answer: {
    padding: 12,
    fontSize: 20,
    backgroundColor: "#464C55",
    marginBottom: 24,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: 'stretch',
  },
  buttonContainer: {
    fontSize: 20,
    backgroundColor: "#464C55",
    borderRadius: 12,
  },
  input: {
    backgroundColor: "#fff",
    minHeight: 40,
    color: "#000",
    marginBottom: 12,
    padding: 12,
  },
})
