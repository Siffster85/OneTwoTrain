import { Text, View } from '@/components/Themed';
import { auth } from '@/firebaseConfig';
import { Stack } from 'expo-router';
import {
  EmailAuthProvider,
  deleteUser,
  reauthenticateWithCredential,
} from 'firebase/auth';
import { useState } from 'react';
import { Alert, Button, StyleSheet, TextInput } from 'react-native';

const DeleteProfile = () => {
  const user: any = auth.currentUser;
  const [password, setPassword] = useState('');

  const credential: any = EmailAuthProvider.credential(user.email, password);

  const deleteAccount = () => {
    reauthenticateWithCredential(user, credential)
      .then(() => {
        deleteUser(user);
      })
      .then(() => {
        Alert.alert('Account Deleted');
      })
      .catch(error => {
        Alert.alert('Error:', error.message);
      });
  };
  return (
    <View style={styles.centralAlign}>
      <Stack.Screen
        options={{
          headerShown: true,
          title: 'Account Deletion',
          headerTitleAlign: 'center',
        }}
      />
      <Text style={styles.text}>
        Are you sure you wish to delete your account?
      </Text>
      <TextInput
        style={styles.input}
        onChangeText={text => setPassword(text)}
        value={password}
        secureTextEntry
        placeholder="Please Enter Password to Delete"
        placeholderTextColor="#808080"
      />
      <View style={styles.deleteButton}>
        <Button title="Delete Account" onPress={() => deleteAccount()} />
      </View>
      <Text style={styles.text}>
        This will delete all your data from our server.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  centralAlign: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 25,
  },
  deleteButton: {
    padding: 10,
  },
  input: {
    backgroundColor: '#fff',
    minHeight: 40,
    color: '#000',
    marginBottom: 12,
    padding: 12,
  },
});

export default DeleteProfile;
