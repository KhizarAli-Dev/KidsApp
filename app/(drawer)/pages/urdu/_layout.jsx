import { Tabs } from "expo-router";
import { MaterialIcons, Ionicons, FontAwesome } from "@expo/vector-icons";

export default function UrduTabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#6C63FF",
        tabBarLabelStyle: { fontSize: 14, fontWeight: "600" },
        tabBarStyle: { paddingVertical: 6 },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Letters",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="text-fields" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="sentences"
        options={{
          title: "Sentences",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="child" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
