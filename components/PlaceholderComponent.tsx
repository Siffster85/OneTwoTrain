import { Pressable, StyleSheet, Text, View } from 'react-native';

function PlaceholderComponent({
  label,
  theme,
  onPress,
}: {
  [key: string]: any;
}) {
  return (
    <View
      style={[
        styles.buttonContainer,
        {
          alignItems: 'center',
          justifyContent: 'center',
          width: 120,
          height: 80,
          paddingTop: 10,
        },
      ]}>
      <Pressable
        style={[styles.button, { backgroundColor: 'red' }]}
        onPress={onPress}>
        <Text style={styles.buttonLabel}>{label}</Text>
      </Pressable>
    </View>
  );
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
  buttonLabel: {
    color: '#fff',
    fontSize: 16,
  },
});

export default PlaceholderComponent;
