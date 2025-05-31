import { Tabs } from "expo-router";
import {
  MaterialIcons,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { Platform } from "react-native";

export default function TestTabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#6C63FF",
        tabBarInactiveTintColor: "#999",
        tabBarStyle: {
          backgroundColor: "#fff",
          paddingBottom: Platform.OS === "ios" ? 20 : 10,
          paddingTop: 5,
          height: Platform.OS === "ios" ? 80 : 65,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          position: "absolute",
          shadowColor: "#000",
          shadowOpacity: 0.1,
          shadowOffset: { width: 0, height: -2 },
          shadowRadius: 10,
          elevation: 10,
        },
        tabBarLabelStyle: {
          fontSize: 13,
          fontWeight: "bold",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "English",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="alphabetical" size={size + 4} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="urdu"
        options={{
          title: "Urdu",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="language" size={size + 4} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="math"
        options={{
          title: "Math",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="calculator-variant" size={size + 4} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
