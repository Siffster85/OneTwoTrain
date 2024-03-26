import { Feather } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

const TabsLayout = () => {
  const planIcon = <Feather name="layout" size={25} />;
  const profileIcon = <Feather name="user" size={25} />;

  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="plan"
        options={{
          tabBarLabel: 'Plan',
          title: 'Plan',
          tabBarIcon: () => planIcon,
          tabBarActiveTintColor: '#387C44',
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarLabel: 'Profile',
          title: 'Profile',
          tabBarIcon: () => profileIcon,
          tabBarActiveTintColor: '#387C44',
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
