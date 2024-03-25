import { Stack } from 'expo-router'
import React, { useState } from 'react'
import { Alert, Button, StyleSheet, TextInput, View } from 'react-native'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '@/firebaseConfig';

export default function Auth() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

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
      Alert.alert(`Logged in ${user}`)
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
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <TextInput style={styles.input}
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="email@address.com"
          placeholderTextColor="#fff" 
        />
      </View>
      <View style={styles.verticallySpaced}>
        <TextInput style={styles.input}
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={true}
          placeholder="Password"
          placeholderTextColor="#fff" 
        />
      </View>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Button title="Log in" disabled={loading} onPress={() => signInWithEmail()} />
      </View>
      <View style={styles.verticallySpaced}>
        <Button title="Sign up" disabled={loading} onPress={() => signUpWithEmail()}/>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: 'stretch',
  },
  mt20: {
    marginTop: 20,
  },
  input: {
    backgroundColor: "#f0f",
    minHeight: 40,
    color: "#000",
    marginBottom: 12,
    borderWidth: 2,
    borderColor: "#f0f",
    padding: 12,
  },
})
