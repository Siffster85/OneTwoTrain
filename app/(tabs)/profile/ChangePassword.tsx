import { View } from '@/components/Themed';
import { auth } from '@/firebaseConfig';
import { Stack } from 'expo-router';
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
} from 'firebase/auth';
import { useEffect, useState } from 'react';
import { Alert, Button, StyleSheet, TextInput } from 'react-native';

const ChangePassword = () => {
  const user: any = auth.currentUser;
  const [password, setPassword] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [reset, setReset] = useState(false);
  const newPassword = password;

  const credential: any = EmailAuthProvider.credential(user.email, oldPassword);

  useEffect(() => {
    if (!reset) {
      handleSubmit();
      setReset(true);
    }
  }, []);
  const handleSubmit = () => {
    if (reset) {
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
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Stack.Screen
        options={{
          headerShown: true,
          title: 'Change Password',
          headerTitleAlign: 'center',
        }}
      />
      <View style={styles.verticallySpaced}>
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
          onChangeText={text => setPassword(text)}
          value={password}
          secureTextEntry
          placeholder="New Password"
          placeholderTextColor="#808080"
        />
      </View>
      <View style={[styles.verticallySpaced, styles.buttonContainer]}>
        <Button title="Change Password" onPress={handleSubmit} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: 'stretch',
  },
  buttonContainer: {
    fontSize: 20,
    width: '80%',
    alignSelf: 'center',
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
