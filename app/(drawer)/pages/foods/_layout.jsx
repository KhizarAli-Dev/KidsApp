import { Tabs } from "expo-router";
import {
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { Platform } from "react-native";

export default function FoodsTabsLayout() {
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
          title: "Fruits",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="fruit-watermelon" size={size + 4} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="vegetables"
        options={{
          title: "Vegetables",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="food-apple" size={size + 4} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
