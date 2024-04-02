import { Picker } from '@react-native-picker/picker';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface ActivityLevelProps {
  selectedActivity: string;
  setSelectedActivity: (_value: string) => void;
}

const ActivityLevelInput: React.FC<ActivityLevelProps> = ({
  selectedActivity,
  setSelectedActivity,
}) => {
  const activityLevels = [
    { label: 'little or no exercise', value: 'sedentary' },
    { label: 'light exercise 1-3 days/week', value: 'lightly_active' },
    { label: 'moderate exercise 3-5 days/week', value: 'moderately_active' },
    { label: 'hard exercise 6-7 days a week', value: 'very_active' },
    { label: 'extra active: sports & physical job', value: 'extra_active' },
  ];

  return (
    <View>
      <Text style={styles.label}>Physical Activity Level:</Text>
      <Picker
        selectedValue={selectedActivity}
        onValueChange={itemValue => {
          setSelectedActivity(itemValue);
        }}
        style={styles.picker}>
        {activityLevels.map(level => (
          <Picker.Item
            key={level.value}
            label={level.label}
            value={level.value}
          />
        ))}
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    color: '#fff',
    marginBottom: 20,
    fontSize: 16,
  },
  picker: {
    height: 220,
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 12,
  },
});

export default ActivityLevelInput;
