import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { DisplayTime } from './displayTime';

function Result({ results }: { results: number[] }) {
  return (
    <ScrollView>
      <View style={styles.resultItem} />
      {results.map((item: number, index: number) => (
        <View key={index} style={styles.resultItem}>
          <Text style={styles.resultItemText}>
            Lap {results.length - index}
          </Text>
          <Text style={styles.resultItemText}>{DisplayTime(item)}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  resultItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#313131',
    height: 50,
    paddingHorizontal: 15,
  },
  resultItemText: { color: 'black' },
});

export default React.memo(Result);
