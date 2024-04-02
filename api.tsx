import axios from 'axios';
import { auth } from './firebaseConfig';
import { formatDate } from './utils';

const user = auth.currentUser;
const currentDate = new Date();
const todaysDate = formatDate(currentDate);

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

interface Set {
  weight: string;
  reps: string;
}

interface Excersie {
  exerciseName: string | string[];
  category: string | string[];
  sets: Record<string, Set>;
}

export const getAllExercises = async () => {
  try {
    const userAccessToken = await user?.getIdToken(true);

    const response = await axios.get(
      'https://app-dy64z7slha-uc.a.run.app/api/custom-exercises',
      {
        headers: {
          Authorization: `Bearer ${userAccessToken}`,
        },
      },
    );
    return response.data.publicExercises;
  } catch (error) {
    throw error;
  }
};

export const postWeightExercise = async (weightData: Excersie) => {
  try {
    const userAccessToken = await user?.getIdToken(true);

    const response = await axios.post(
      `https://app-dy64z7slha-uc.a.run.app/api/schedules/${todaysDate}/plan/workout/exercises/weight`,
      weightData,
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
