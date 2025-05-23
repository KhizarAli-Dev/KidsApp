import { Tabs } from "expo-router";
import { FontAwesome5, MaterialIcons, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

export default function NumberTabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#6C63FF",
        tabBarLabelStyle: { fontSize: 12 },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Numbers",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="numeric" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="onetwothree"
        options={{
          title: "OneTwoThree",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="text-fields" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
