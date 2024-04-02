export function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const paddedMonth = month < 10 ? `0${month}` : month.toString();
  const day = date.getDate();
  const paddedDay = day < 10 ? `0${day}` : day.toString();

  return `${year}-${paddedMonth}-${paddedDay}`;
}

export function calculateAge(birthDate: Date): number {
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const month = today.getMonth() - birthDate.getMonth();

  if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  return age;
}

export function calculateCalories(
  age: string | string[],
  weight: string | string[],
  height: string | string[],
  activityLevel: string | string[],
) {
  const numAge = Array.isArray(age) ? Number(age[0]) : Number(age);
  const numWeight = Array.isArray(weight) ? Number(weight[0]) : Number(weight);
  const numHeight = Array.isArray(height) ? Number(height[0]) : Number(height);
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
