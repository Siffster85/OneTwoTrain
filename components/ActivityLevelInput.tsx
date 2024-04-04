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
    { label: '1-3 days a week', value: 'lightly_active' },
    { label: '3-5 days a week', value: 'moderately_active' },
    { label: '6-7 days a week', value: 'very_active' },
    { label: 'extra active', value: 'extra_active' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Specify Your Physical Activity Level</Text>
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
  container: {
    padding: 16,
    borderWidth: 2,
    borderRadius: 12,
    borderColor: '#ececec',
    backgroundColor: '#fff',
  },
  text: {
    color: '#171717',
    marginBottom: 12,
    fontSize: 20,
    textAlign: 'center',
  },
  picker: {
    height: 200,
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 12,
    fontSize: 16,
  },
});

export default ActivityLevelInput;
