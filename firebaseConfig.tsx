import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyB79fdqQQHj44WAfXXScBDTjBU6YesclUk",
  authDomain: "train-test-f27d7.firebaseapp.com",
  projectId: "train-test-f27d7",
  storageBucket: "train-test-f27d7.appspot.com",
  messagingSenderId: "767761667332",
  appId: "1:767761667332:web:08f93a57f4758784e4ec51"
};

export const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});