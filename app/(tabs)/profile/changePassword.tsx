import { View } from '@/components/Themed';
import { auth } from '@/firebaseConfig';
import { Stack } from 'expo-router';
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
} from 'firebase/auth';
import { useState } from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';

const ChangePassword = () => {
  const user = auth.currentUser;
  const email = user?.email ?? '';
  const [newPassword, setNewPassword] = useState('');
  const [oldPassword, setOldPassword] = useState('');

  const credential = EmailAuthProvider.credential(email, oldPassword);

  const changePassword = () => {
    if (user)
      reauthenticateWithCredential(user, credential)
        .then(() => {
          updatePassword(user, newPassword);
        })
        .then(() => {
          Alert.alert('Password Changed');
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
          title: 'Change Password',
          headerTitleAlign: 'center',
        }}
      />
      <TextInput
        style={styles.input}
        onChangeText={text => setOldPassword(text)}
        value={oldPassword}
        secureTextEntry
        placeholder="Old Password"
        placeholderTextColor="#808080"
      />
      <TextInput
        style={styles.input}
        onChangeText={text => setNewPassword(text)}
        value={newPassword}
        secureTextEntry
        placeholder="New Password"
        placeholderTextColor="#808080"
      />
      <TouchableOpacity onPress={changePassword} style={styles.button}>
        <Text style={styles.buttonText}>Change Password</Text>
      </TouchableOpacity>
    </View>
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
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: 'stretch',
  },
  button: {
    backgroundColor: '#f22a39',
    borderRadius: 12,
    padding: 20,
    marginTop: 12,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
  input: {
    backgroundColor: '#fff',
    minHeight: 40,
    color: '#000',
    marginBottom: 12,
    padding: 12,
  },
});

export default ChangePassword;
