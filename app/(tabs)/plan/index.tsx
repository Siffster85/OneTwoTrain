import { View, Text } from "@/components/Themed"
import { Link, Stack } from "expo-router";
import { StatusBar, StyleSheet } from "react-native";

const plan = () => {
  return (
    <View style={styles.item}>
      <Link href={"/plan/workout"}>
        <Text style={styles.title}>Go To Workout</Text>
      </Link>
    </View>
  )
}

const styles = StyleSheet.create({
  item: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    flexDirection: 'row',
    backgroundColor: '#4BA663',
    padding: 20,
    justifyContent: 'space-between',
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 25,
  },
})

export default plan;