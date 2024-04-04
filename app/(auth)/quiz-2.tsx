import ActivityLevelInput from '@/components/ActivityLevelInput';
import BirthDateInput from '@/components/BirthDateInput';
import { calculateAge, formatDate } from '@/utils';
import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const ActivityLevel = () => {
  const { userName, weight, height } = useLocalSearchParams();
  const [date, setDate] = useState<Date>(new Date());
  const [selectedActivity, setSelectedActivity] = useState('sedentary');

  const handleSubmit = () => {
    router.push({
      pathname: '/(auth)/signup',
      params: {
        name: userName,
        weight: Number(weight),
        height: Number(height),
        age: calculateAge(date),
        selectedActivity,
        dateOfBirth: formatDate(date),
      },
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={[styles.title, styles.text]}>
          Detail Your Daily Dynamics
        </Text>
        <Text style={[styles.subtitle, styles.text]}>
          Understanding your body's energy needs is crucial for crafting your
          perfect fitness plan.
        </Text>
      </View>
      <View style={styles.inputContainer}>
        <BirthDateInput date={date} setDate={setDate} />
        <ActivityLevelInput
          selectedActivity={selectedActivity}
          setSelectedActivity={setSelectedActivity}
        />
      </View>
      <TouchableOpacity onPress={handleSubmit} style={styles.button}>
        <Text style={styles.buttonText}>Proceed</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ActivityLevel;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eef1f4',
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  titleContainer: {
    backgroundColor: 'transparent',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingVertical: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 18,
    color: '#171717',
  },
  text: {
    color: '#171717',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#f22a39',
    borderRadius: 12,
    padding: 20,
    marginTop: 12,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
  inputContainer: {
    marginBottom: 20,
  },
});
