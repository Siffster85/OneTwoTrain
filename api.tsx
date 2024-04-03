import axios from 'axios';
import { auth } from './firebaseConfig';
import { formatDate } from './utils';

const user = auth.currentUser;

const instance = axios.create({
  baseURL: 'https://app-dy64z7slha-uc.a.run.app/api',
});
const currentDate = new Date();
const todaysDate = formatDate(currentDate);

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

    const response = await instance.get('/custom-exercises', {
      headers: {
        Authorization: `Bearer ${userAccessToken}`,
      },
    });
    return response.data.publicExercises;
  } catch (error) {
    throw error;
  }
};

export const postExercise = async (weightData: Excersie) => {
  try {
    const userAccessToken = await user?.getIdToken(true);

    const response = await instance.post(
      `/schedules/${todaysDate}/plan/workout/exercises`,
      weightData,
      {
        headers: {
          Authorization: `Bearer ${userAccessToken}`,
          'Content-Type': 'application/json',
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

export const getUserProfile = async () => {
  try {
    const user = auth.currentUser;
    const userAccessToken = await user?.getIdToken(true);

    const response = await instance.get('/user/profile', {
      headers: {
        Authorization: `Bearer ${userAccessToken}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const getSingleDayWorkout = async (date: string | string[]) => {
  try {
    const user = auth.currentUser;
    const userAccessToken = await user?.getIdToken(true);

    const response = await instance.get(
      `/schedules/${date}/plan/workout/exercises`,
      {
        headers: {
          Authorization: `Bearer ${userAccessToken}`,
        },
      },
    );

    return response.data.exercises;
  } catch (error) {
    throw error;
  }
};

export const removeUser = async () => {
  try {
    const user = auth.currentUser;
    const userAccessToken = await user?.getIdToken(true);

    const response = await instance.delete('/users', {
      headers: {
        Authorization: `Bearer ${userAccessToken}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const postWeight = async (date: string, weight: number) => {
  try {
    const user = auth.currentUser;
    const userAccessToken = await user?.getIdToken(true);

    const response = await instance.post(
      `/schedules/${date}/plan/weight`,
      { weight },
      {
        headers: {
          Authorization: `Bearer ${userAccessToken}`,
        },
      },
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const patchUser = async (profileData: object) => {
  try {
    const user = auth.currentUser;
    const userAccessToken = await user?.getIdToken(true);

    const response = await instance.patch('/user/profile', profileData, {
      headers: {
        Authorization: `Bearer ${userAccessToken}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};
