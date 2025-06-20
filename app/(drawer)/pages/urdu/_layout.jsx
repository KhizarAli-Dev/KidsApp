import { Tabs } from "expo-router";
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import { Platform } from "react-native";

export default function UrduTabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#6C63FF",
        tabBarInactiveTintColor: "#888",
        tabBarLabelStyle: {
          fontSize: 14,
          fontWeight: "600",
        },
        tabBarStyle: {
          paddingVertical: Platform.OS === "ios" ? 12 : 8,
          height: Platform.OS === "ios" ? 70 : 60,
          backgroundColor: "#FFF",
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          shadowColor: "#000",
          shadowOpacity: 0.1,
          shadowOffset: { width: 0, height: -2 },
          shadowRadius: 8,
          elevation: 8,
          position: "absolute",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Letters",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="text-fields" size={size + 4} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="sentences"
        options={{
          title: "Sentences",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="book-reader" size={size + 4} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
