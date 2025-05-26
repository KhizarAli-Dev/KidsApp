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
          title: "Animals",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="cat" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="birds"
        options={{
          title: "Birds",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="bird" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
