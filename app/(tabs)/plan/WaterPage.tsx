import { getUserProfile, getWater, postWater } from '@/api';
import { Stack, router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
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
      .catch((err) => {
        // getWater is undefined (on load)
      });
  }, []);

  return (
    <SafeAreaView style={styles.pageContainer}>
      <ScrollView>
        <Stack.Screen
          options={{
            headerBackTitleVisible: false,
            headerTitle: 'Water',
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
          <TouchableOpacity style={styles.individualIncrementButton} onPress={() => setCurrentWater((curr) => {
            return curr + 100;
          })}>
            <Text style={styles.individualIncrement}>100 ml</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.individualIncrementButton} onPress={() => setCurrentWater((curr) => {
            return curr + 500;
          })}>
            <Text style={styles.individualIncrement}>500 ml</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.individualIncrementButton} onPress={() => setCurrentWater((curr) => {
            return curr + 1000;
          })}>
            <Text style={styles.individualIncrement}>1000 ml</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.controlButtons}>
          <TouchableOpacity style={styles.controlButton} onPress={() => setCurrentWater(0)}>
            <Text style={styles.controlButtonText}>Reset</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.controlButton} onPress={() => setCurrentWater(waterGoal)}>
            <Text style={styles.controlButtonText}>Max</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={{ textAlign: 'center', color: 'white', fontSize: 32}}>Save</Text>
        </TouchableOpacity>
      </ScrollView>
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
    fontSize: 32,
    textAlign: 'center',
  },
  subContainer: {
    marginTop: 32,
    alignItems: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '80%',
  },
  button: {
    borderWidth: 2,
    borderColor: '#f22b39',
    padding: 25,
    width: 250,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 10,
    borderRadius: 150,
    backgroundColor: '#f22b39',
  },
  waterGoal: {
    margin: 20,
    padding: 10,
    textAlign: 'center',
    flexDirection: 'column',
  },
  increment: {
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    textAlign: 'center',
  },
  individualIncrement: {
    fontSize: 20,
    color: '#fff',
  },
  individualIncrementButton: {
    backgroundColor: '#55afc5',
    padding: 10,
    borderRadius: 15,
  },
  incrementButton: {
    fontSize: 28,
    textAlign: 'center',
    color: '#fff',
  },
  addButtonWrapper: {
    padding: 15,
    backgroundColor: '#f22b39',
    width: '50%',
    marginLeft: 'auto',
    marginRight: 'auto',
    borderRadius: 150,
    marginTop: 20,
  },
  controlButtons: {
    marginTop: 25,
    marginBottom: 20,
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    textAlign: 'center',
  },
  controlButton: {
    backgroundColor: '#f22b39',
    padding: 20,
    borderRadius: 150,
    width: '33%',
  },
  controlButtonText: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
  },
});