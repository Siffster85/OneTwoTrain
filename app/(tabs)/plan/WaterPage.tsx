import { getUserProfile, getWater, postWater } from '@/api';
import { Stack, router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

interface WaterData {
  currentWater: number;
  waterGoal: number;
}

const WaterPage = () => {
  const [currentWater, setCurrentWater] = useState<number>(0);
  const [waterGoal, setWaterGoal] = useState<number>(0);

  async function handleSave() {
    try {
      await postWater(currentWater);
    } catch (err) {
      alert(err);
    } finally {
      router.navigate('./home');
    }
  }

  useEffect(() => {
    getUserProfile()
      .then(response => {
        setWaterGoal(response.data.user.waterGoal);
        return getWater();
      })
      .then((waterData: WaterData) => {
        waterData.currentWater
          ? setCurrentWater(waterData.currentWater)
          : setCurrentWater(0);
      })
      .catch(err => {
        // getWater is undefined (on load)
      });
  }, []);

  return (
    <ScrollView style={styles.pageContainer}>
      <Stack.Screen
        options={{
          headerBackTitleVisible: false,
          headerTitle: 'Water Tracker',
        }}
      />
      <View style={styles.subContainer}>
        <Text style={styles.title}>How much have you drank today?</Text>
      </View>
      <View style={styles.waterGoal}>
        <Text style={{ textAlign: 'center', fontSize: 32 }}>
          {currentWater} ml
        </Text>
        <Text style={{ textAlign: 'center', fontSize: 18, marginTop: 28 }}>
          Goal: {waterGoal} ml
        </Text>
      </View>
      <View style={styles.increment}>
        <TouchableOpacity
          style={styles.individualIncrementButton}
          onPress={() =>
            setCurrentWater(curr => {
              return curr + 100;
            })
          }>
          <Text style={styles.individualIncrement}>100 ml</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.individualIncrementButton}
          onPress={() =>
            setCurrentWater(curr => {
              return curr + 500;
            })
          }>
          <Text style={styles.individualIncrement}>500 ml</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.individualIncrementButton}
          onPress={() =>
            setCurrentWater(curr => {
              return curr + 1000;
            })
          }>
          <Text style={styles.individualIncrement}>1000 ml</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.controlButtons}>
        <TouchableOpacity
          style={[styles.controlButton, styles.button]}
          onPress={() => setCurrentWater(0)}>
          <Text style={styles.controlButtonText}>Reset</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.controlButton, styles.button]}
          onPress={() => setCurrentWater(waterGoal)}>
          <Text style={styles.controlButtonText}>Max</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.controlButton} onPress={handleSave}>
          <Text style={styles.controlButtonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default WaterPage;

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 32,
    textAlign: 'center',
  },
  subContainer: {
    flex: 1,
    marginTop: 32,
    alignItems: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '80%',
  },
  waterGoal: {
    flex: 1,
    margin: 20,
    padding: 10,
    textAlign: 'center',
    flexDirection: 'column',
  },
  increment: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    textAlign: 'center',
  },
  individualIncrement: {
    fontSize: 20,
    color: '#fff',
  },
  individualIncrementButton: {
    borderWidth: 4,
    borderColor: '#6096B4',
    backgroundColor: '#94b9bc',
    padding: 10,
    borderRadius: 15,
  },
  incrementButton: {
    fontSize: 28,
    textAlign: 'center',
    color: '#fff',
  },
  controlButtons: {
    flex: 1,
    marginTop: 25,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  controlButton: {
    width: '100%',
    backgroundColor: '#f22b39',
    paddingVertical: 20,
    borderRadius: 150,
    marginTop: 12,
    borderColor: '#f22b39',
    borderWidth: 4,
  },
  controlButtonText: {
    fontSize: 20,
    color: '#fff',
    textAlign: 'center',
  },
  button: {
    borderWidth: 4,
    borderColor: '#6096B4',
    backgroundColor: '#6096B4',
  },
});
