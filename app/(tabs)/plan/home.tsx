import { Text } from '@/components/Themed';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

const navigation = [
  {
    pathname: '/plan/workout',
    title: 'Do Workout',
    text: 'Add and do exercises',
    image:
      'https://images.pexels.com/photos/4397833/pexels-photo-4397833.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    pathname: '/(tabs)/plan/weigh-in-page',
    title: 'Weigh-In',
    text: 'Regular check-ins',
    image:
      'https://images.pexels.com/photos/6975463/pexels-photo-6975463.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
];

const plan = () => {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        style={styles.list}
        data={navigation}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => router.push(item.pathname)}>
            <Image
              source={{ uri: item.image }}
              style={styles.image}
              resizeMode="cover"
            />
            <View>
              <Text style={[styles.title]}>{item.title}</Text>
              <Text style={[styles.text]}>{item.text}</Text>
            </View>
            <View style={styles.arrowContainer}>
              <Feather name="chevron-right" size={24} color="#909090" />
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    borderTopColor: '#ececec',
    borderTopWidth: 1,
  },
  title: {
    fontSize: 20,
    color: '#171717',
    marginBottom: 4,
  },
  text: {
    fontSize: 16,
    color: '#737373',
  },
  list: {
    margin: 20,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f1f1',
    borderWidth: 2,
    borderColor: '#ececec',
    borderRadius: 12,
    padding: 10,
    marginBottom: 20,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 12,
    marginRight: 20,
  },
  arrowContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
});

export default plan;
