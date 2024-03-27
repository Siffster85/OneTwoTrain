import UserAuthentication from '@/components/UserAuthentication';
import { useLocalSearchParams } from 'expo-router';

const Signup = () => {
  const { userName, weight, height, age, selectedActivity } =
    useLocalSearchParams();
  function calculateCalories(
    age: string | string[],
    weight: string | string[],
    height: string | string[],
    activityLevel: string | string[],
  ) {
    const numAge = Array.isArray(age) ? Number(age[0]) : Number(age);
    const numWeight = Array.isArray(weight)
      ? Number(weight[0])
      : Number(weight);
    const numHeight = Array.isArray(height)
      ? Number(height[0])
      : Number(height);
    const actLevel = Array.isArray(activityLevel)
      ? activityLevel[0]
      : activityLevel;
    const bmr = 10 * numWeight + 6.25 * numHeight - 5 * numAge + 5;

    const activityFactors: Record<string, number> = {
      sedentary: 1.2,
      lightly_active: 1.375,
      moderately_active: 1.55,
      very_active: 1.725,
      extra_active: 1.9,
    };

    const tdee = bmr * activityFactors[actLevel];
    return tdee;
  }

  const caloriesPerDay = calculateCalories(
    age,
    weight,
    height,
    selectedActivity,
  );

  return (
    <UserAuthentication
      isUserRegistered={false}
      userName={userName}
      caloriesPerDay={caloriesPerDay}
    />
  );
};

export default Signup;
