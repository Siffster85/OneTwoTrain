import { removeUser } from '@/api';
import { Text, View } from '@/components/Themed';
import { auth } from '@/firebaseConfig';
import { Stack } from 'expo-router';
import {
  EmailAuthProvider,
  deleteUser,
  reauthenticateWithCredential,
} from 'firebase/auth';
import { useState } from 'react';
import { Alert, Pressable, StyleSheet, TextInput } from 'react-native';

const DeleteProfile = () => {
  const user = auth.currentUser;
  const email = user?.email ?? '';
  const [password, setPassword] = useState('');

  const credential = EmailAuthProvider.credential(email, password);

  const deleteAccount = () => {
    if (user)
      reauthenticateWithCredential(user, credential)
        .then(() => {
          deleteUser(user);
          removeUser();
        })
        .then(() => {
          Alert.alert('Account Deleted');
        })
        .catch(error => {
          Alert.alert('Error:', error.message);
        });
  };
  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: true,
          title: 'Account Deletion',
          headerTitleAlign: 'center',
        }}
      />
      <View style={styles.message}>
        <Text style={[styles.text, styles.title]}>
          Delete Account
        </Text>
        <Text style={styles.text}>
          Are you sure you wish to delete your account?
        </Text>
        <Text style={styles.text}>
          This will delete all your data from our server.
        </Text>
      </View>
      <TextInput
        style={styles.input}
        onChangeText={text => setPassword(text)}
        value={password}
        secureTextEntry
        placeholder="Enter Password"
        placeholderTextColor="#808080"
      />
      <Pressable style={styles.button} onPress={() => deleteAccount()}>
        <Text style={[styles.text, styles.buttonText]}>Delete Account</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ececec",
    padding: 20,
    paddingTop: 60,
  },
  message: {
    backgroundColor: "#ececec",
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    color: "#000",
    textAlign: "center",
    marginBottom: 4,
  },
  title: {
    fontSize: 24,
    marginBottom: 12,
  },
  input: {
    width: "100%",
    backgroundColor: '#fff',
    borderWidth: 2,
    borderRadius: 12,
    borderColor: '#ececec',
    minHeight: 40,
    color: '#000',
    marginVertical: 12,
    padding: 12,
    fontSize: 16,
  },
  button: {
    fontSize: 20,
    backgroundColor: '#f22a39',
    borderRadius: 12,
    padding: 20,
    color: '#fff',
    marginTop: 12,
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },
});

export default DeleteProfile;
