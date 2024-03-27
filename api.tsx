import axios from 'axios';
import { auth } from './firebaseConfig';

const user = auth.currentUser;

type UserData = {
  // define the type of userData here
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
          'Content-Type': 'application/json',
        },
      },
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};
