import { Text, View } from '@/components/Themed';
import { auth } from '@/firebaseConfig';
import { Stack } from 'expo-router';
import { deleteUser } from 'firebase/auth';
import { Alert, Button, StyleSheet } from 'react-native';

const DeleteProfile = () => {
  const user: any = auth.currentUser;
  const deleteAccount = () => {
    deleteUser(user)
      .then(() => {
        Alert.alert('Account Deleted');
      })
      .catch(error => {
        Alert.alert('Error:', error.message);
      });
  };
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
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
  text: {
    fontSize: 25,
  },
  deleteButton: {
    padding: 10,
  },
});

export default DeleteProfile;
