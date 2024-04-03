import { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native';
import ExerciseCard from './ExerciseCard';

interface props {
  setQuantity: number;
  sets: any;
}

const ExerciseList = ({ setQuantity, sets }: props) => {
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
        <ExerciseCard
          key={index}
          title={title}
          weight={sets[index].weight}
          reps={sets[index].reps}
          distance={sets[index].distance}
          time={sets[index].time}
        />
      ))}
    </SafeAreaView>
  );
};

export default ExerciseList;
