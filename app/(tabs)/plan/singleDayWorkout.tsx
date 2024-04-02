import { getSingleDayWorkout } from "@/api"
import { Stack, useLocalSearchParams } from "expo-router"
import { useEffect, useState } from "react"
import { Alert, StyleSheet, Text, View } from "react-native"

const SingleDayWorkout = () => {
  const { selectedDate } = useLocalSearchParams();
  const [dayWorkout, setDayWorkout] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getSingleDayWorkout(selectedDate)
      .then((exercises) => {
        setDayWorkout(exercises)
        setIsLoading(false)
      })
      .catch((err) => {
        Alert.alert(err)
      })
  }, [])

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerTitle: `${selectedDate}`,
          headerBackTitleVisible: false,
        }}
      />
      <Text style={styles.title}>{isLoading ? "Loading..." : !dayWorkout.length ? "No workouts for this day" : "Workout list"}</Text>
      <View>
        <Text style={styles.title}>Hi</Text>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    marginBottom: 20,
  },
});


export default SingleDayWorkout