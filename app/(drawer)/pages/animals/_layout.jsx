import { Tabs } from "expo-router";
import {
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { Platform } from "react-native";

export default function NumberTabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#6C63FF",
        tabBarInactiveTintColor: "#888",
        tabBarStyle: {
          backgroundColor: "#FFF",
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
          title: "Animals",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="cat" size={size + 4} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="birds"
        options={{
          title: "Birds",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="bird" size={size + 4} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
