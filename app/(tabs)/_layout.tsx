import { Tabs } from "expo-router";

const TabsLayout = () => {
  return (
    <Tabs screenOptions={{ headerShown: false}}>
      <Tabs.Screen
        name="plan"
        options={{
          tabBarLabel: "Plan",
          title: "Plan",
          // tabBarIcon: () => ()
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarLabel: "Profile",
          title: "Profile",
          // tabBarIcon: () => ()
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;