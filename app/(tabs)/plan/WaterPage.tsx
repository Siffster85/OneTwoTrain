import { getUserProfile, getWater, postWater } from '@/api';
import { Stack, router } from 'expo-router';
import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StatusBar,
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
  const [waterIncrement, setWaterIncrement] = useState<number>(0);
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
        setCurrentWater(waterData.currentWater);
      });
  }, []);

  return (
    <SafeAreaView style={styles.pageContainer}>
      <Stack.Screen
        options={{
          headerBackTitleVisible: false,
          headerTitle: 'Water',
        }}
      />
      <View>
        <Text style={styles.title}>Water Tracker</Text>
      </View>
      <View style={styles.waterGoal}>
        <Text style={{ textAlign: 'center', fontSize: 50 }}>
          {currentWater} ml
        </Text>
        <Text style={{ textAlign: 'center', fontSize: 50 }}>
          {waterGoal} ml
        </Text>
      </View>
      <View style={styles.increment}>
        <TouchableOpacity onPress={() => setWaterIncrement(100)}>
          <Text style={styles.individualIncrement}>100 ml</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setWaterIncrement(500)}>
          <Text style={styles.individualIncrement}>500 ml</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setWaterIncrement(1000)}>
          <Text style={styles.individualIncrement}>1000 ml</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={() =>
          setCurrentWater(currValue => {
            return currValue + waterIncrement;
          })
        }>
        <Text style={styles.incrementButton}>+ {waterIncrement}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setCurrentWater(0)}>
        <Text style={styles.reset}>↩︎</Text>
      </TouchableOpacity>
      <Text style={styles.reset}>Reset To 0 ml</Text>
      <TouchableOpacity onPress={() => setCurrentWater(waterGoal)}>
        <Text style={styles.max}>⇧</Text>
      </TouchableOpacity>
      <Text style={styles.max}>Fill To {waterGoal} ml</Text>
      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={{ textAlign: 'center', color: 'white'}}>Save</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default WaterPage;

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    marginTop: StatusBar.currentHeight ?? 0,
  },
  title: {
    textAlign: 'center',
    fontSize: 50,
  },
  button: {
    borderWidth: 2,
    borderColor: '#f22b39',
    padding: 25,
    width: 250,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 50,
    borderRadius: 150,
    backgroundColor: '#f22b39',
  },
  waterGoal: {
    margin: 25,
    padding: 10,
    textAlign: 'center',
    flexDirection: 'column',
  },
  increment: {
    margin: 20,
    justifyContent: 'space-between',
    flexDirection: 'row',
    textAlign: 'center',
  },
  individualIncrement: {
    fontSize: 20,
  },
  incrementButton: {
    padding: 10,
    fontSize: 50,
    textAlign: 'center',
  },
  reset: {
    textAlign: 'center',
    fontSize: 25,
    padding: 10,
  },
  max: {
    textAlign: 'center',
    fontSize: 25,
    padding: 10,
  },
});