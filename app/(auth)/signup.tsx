import UserAuthentication from '@/components/UserAuthentication';
import { calculateCalories } from '@/utils';
import { useLocalSearchParams } from 'expo-router';

const Signup = () => {
  const { userName, weight, height, age, selectedActivity, dateOfBirth } =
    useLocalSearchParams();
  const calorieGoal = calculateCalories(age, weight, height, selectedActivity);

  const userData = {
    userName,
    dateOfBirth,
    weight,
    height,
    dailyActivityLevel: selectedActivity,
    waterGoal: 2000,
    calorieGoal,
  };

  return <UserAuthentication isUserRegistered={false} userData={userData} />;
};

export default Signup;
