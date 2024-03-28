import { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native';
import ExerciseCard from './ExerciseCard';

interface props {
  setQuantity: number;
  reps: number;
  weight: string;
}

const ExerciseList = ({ setQuantity, reps, weight }: props) => {
  const [exerciseCount, setExerciseCount] = useState(0);

  useEffect(() => {
    setExerciseCount(setQuantity);
  }, [setQuantity]);

  const titles = Array.from(
    { length: exerciseCount },
    (_, i) => `#SET${i + 1}`,
  );

  return (
    <SafeAreaView>
      {titles.map((title, index) => (
        <ExerciseCard key={index} title={title} weight={weight} reps={reps} />
      ))}
    </SafeAreaView>
  );
};

export default ExerciseList;
