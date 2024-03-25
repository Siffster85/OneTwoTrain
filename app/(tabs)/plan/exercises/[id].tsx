import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function currentExercise () {

    const {id, title} = useLocalSearchParams()

    return (
        <View>
            <Text>Excerise page - {id}</Text>
            <Text>{title}</Text>
        </View>
    )
}