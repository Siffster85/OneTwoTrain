import { auth } from '@/firebaseConfig';
import { router } from 'expo-router';
import { onAuthStateChanged } from 'firebase/auth';

export default function IndexPage() {
  onAuthStateChanged(auth, user => {
    if (user) {
      router.replace('/(tabs)/plan/resistancePage'); // change back to home
    } else {
      router.replace('/(auth)');
    }
  });
}
