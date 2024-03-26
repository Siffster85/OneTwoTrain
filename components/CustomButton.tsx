import { StyleSheet, View, Pressable, Text } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function CustomButton({
  label,
  theme,
  onPress,
}: {
  [key: string]: any;
}) {
  if (theme === 'circular') {
    return (
      <View
        style={[
          styles.buttonContainer,
          {
            borderWidth: 4,
            padding: 35,
            alignItems: 'center',
            justifyContent: 'center',
            width: 150,
            height: 150,
            borderColor: '#ffd33d',
            borderRadius: 100,
          },
        ]}>
        <Pressable
          style={[styles.button, { backgroundColor: '#fff' }]}
          onPress={onPress}>
          <FontAwesome
            name="picture-o"
            size={18}
            color="#25292e"
            style={styles.buttonIcon}
          />
          <Text style={[styles.buttonLabel, { color: '#25292e' }]}>
            {label}
          </Text>
        </Pressable>
      </View>
    );
  } else if (theme === 'deleteExercise') {
    return (
      <View
        style={[
          styles.buttonContainer,
          {
            borderWidth: 4,
            padding: 35,
            alignItems: 'center',
            justifyContent: 'center',
            width: 150,
            height: 150,
            borderColor: 'red',
            borderRadius: 150,
          },
        ]}>
        <Pressable
          style={[styles.button, { backgroundColor: '#fff' }]}
          onPress={onPress}>
          <FontAwesome
            name="trash"
            size={18}
            color="#25292e"
            style={styles.buttonIcon}
          />
          <Text style={[styles.buttonLabel, { color: '#25292e' }]}>
            {label}
          </Text>
        </Pressable>
      </View>
    );
  } else if (theme === 'startExercise') {
    return (
      <View
        style={[
          styles.buttonContainer,
          {
            borderWidth: 4,
            padding: 35,
            alignItems: 'center',
            justifyContent: 'center',
            width: 150,
            height: 150,
            borderColor: 'green',
            borderRadius: 150,
          },
        ]}>
        <Pressable
          style={[styles.button, { backgroundColor: '#fff' }]}
          onPress={onPress}>
          <FontAwesome
            name="play"
            size={18}
            color="#25292e"
            style={styles.buttonIcon}
          />
          <Text style={[styles.buttonLabel, { color: '#25292e' }]}>
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
    width: 320,
    height: 68,
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 3,
  },
  button: {
    borderRadius: 10,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  buttonIcon: {
    paddingRight: 8,
  },
  buttonLabel: {
    color: '#fff',
    fontSize: 15,
  },
});
