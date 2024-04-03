import { Feather } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

const TabsLayout = () => {
  const generateIcon = (name: string, focused: boolean) => (
    <Feather name={name} size={25} color={focused ? '#f22a39' : '#8e8e93'} />
  );

  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="calendar"
        options={{
          tabBarLabel: 'Calendar',
          title: 'Calendar',
          tabBarIcon: ({ focused }) => generateIcon('calendar', focused),
          tabBarActiveTintColor: '#f22a39',
        }}
      />
      <Tabs.Screen
        name="plan"
        options={{
          tabBarLabel: 'Plan',
          title: 'Plan',
          tabBarIcon: ({ focused }) => generateIcon('layout', focused),
          tabBarActiveTintColor: '#f22a39',
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarLabel: 'Profile',
          title: 'Profile',
          tabBarIcon: ({ focused }) => generateIcon('user', focused),
          tabBarActiveTintColor: '#f22a39',
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
