import axios from 'axios';
import { auth } from './firebaseConfig';

const user = auth.currentUser;

type UserData = {
  userName: string | string[];
  email: any;
  dateOfBirth: string | string[];
  weight: string | string[];
  height: string | string[];
  dailyActivityLevel: string | string[];
  waterGoal: number;
  calorieGoal: number;
};

export const postUserData = async (userData: UserData) => {
  try {
    const userAccessToken = await user?.getIdToken(true);

    const response = await axios.post(
      'https://app-dy64z7slha-uc.a.run.app/api/users',
      userData,
      {
        headers: {
          Authorization: `Bearer ${userAccessToken}`,
        },
      },
    );

    return response;
  } catch (error) {
    throw error;
  }
};

export const getUserData = async () => {
  try {
    const userAccessToken = await user?.getIdToken(true);

    const response = await axios.get(
      'https://app-dy64z7slha-uc.a.run.app/api/user/profile',
      {
        headers: {
          Authorization: `Bearer ${userAccessToken}`,
        },
      },
    );

    return response;
  } catch (error) {
    throw error;
  }
};
