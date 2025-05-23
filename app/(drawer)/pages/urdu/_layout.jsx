import { Tabs } from "expo-router";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";

export default function UrduTabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#6C63FF",
        tabBarLabelStyle: { fontSize: 14 },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "حروف",
          tabBarIcon: () => null

        }}
      />
      <Tabs.Screen
        name="sentences"
        options={{
          title: "جملے",
          tabBarIcon: () => null
        }}
      />
    </Tabs>
  );
}
