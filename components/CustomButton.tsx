import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function CustomButton({
  label,
  theme,
  onPress,
}: {
  [key: string]: any;
}) {
  if (theme === 'circular') {
    return (
      <View style={[styles.buttonContainer]}>
        <Pressable
          style={[styles.button]}
          onPress={onPress}>
          <FontAwesome
            name="picture-o"
            size={32}
            color="#25292e"
          />
          <Text style={[styles.buttonLabel]}>
            {label}
          </Text>
        </Pressable>
      </View>
    );
  } else if (theme === 'deleteExercise') {
    return (
      <View style={[styles.buttonContainer, styles.deletedExercise]}>
        <Pressable
          style={[styles.button]}
          onPress={onPress}>
          <FontAwesome
            name="trash"
            size={32}
            color="#fff"
          />
          <Text style={[styles.buttonLabel]}>
            {label}
          </Text>
        </Pressable>
      </View>
    );
  } else if (theme === 'startExercise') {
    return (
      <View style={[styles.buttonContainer, styles.startExercise]}>
        <Pressable
          style={[styles.button]}
          onPress={onPress}>
          <FontAwesome
            name="play"
            size={32}
            color="#fff"
          />
          <Text style={[styles.buttonLabel]}>
            {label}
          </Text>
        </Pressable>
      </View>
    );
  } else {
    return (
      <View style={styles.buttonContainer}>
        <Pressable
          style={styles.button}
          onPress={() => alert('You pressed a button.')}>
          <Text style={styles.buttonLabel}>{label}</Text>
        </Pressable>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: 'center',
    justifyContent: "space-between",
    padding: 3,
    borderWidth: 4,
    // padding: 35,
    borderColor: '#f22a39',
  },
  button: {
    width: 50,
    height: 50,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  buttonLabel: {
    fontSize: 20,
    textAlign: "center",
    color: "#fff",
    textTransform: "uppercase",
  },
  deletedExercise: {
    borderWidth: 4,
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#f22b39',
    borderRadius: 12,
    backgroundColor: '#f22b39',
  },
  startExercise: {
    borderWidth: 4,
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#71929c",
    borderColor: '#71929c',
    borderRadius: 12,
  },
});
