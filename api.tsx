import axios from 'axios';
import { auth } from './firebaseConfig';

const instance = axios.create({
  baseURL: 'https://app-dy64z7slha-uc.a.run.app/api',
});

type UserData = {
  name: string | string[];
  email: any;
  dateOfBirth: string | string[];
  weight: number;
  height: number;
  dailyActivityLevel: string | string[];
  waterGoal: number;
  calorieGoal: number;
  profileImage: string;
};

export const postUserData = async (userData: UserData) => {
  try {
    const user = auth.currentUser;
    const userAccessToken = await user?.getIdToken(true);
    const response = await instance.post('/users', userData, {
      headers: {
        Authorization: `Bearer ${userAccessToken}`,
        'Content-Type': 'application/json',
      },
    });

    return response;
  } catch (error) {
    throw error;
  }
};

export const getUserData = async () => {
  try {
    const user = auth.currentUser;
    const userAccessToken = await user?.getIdToken(true);

    const response = await instance.get('/profile', {
      headers: {
        Authorization: `Bearer ${userAccessToken}`,
      },
    });

    return response;
  } catch (error) {
    throw error;
  }
};
