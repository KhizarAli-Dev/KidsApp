import { useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

export default function Logout() {
  const router = useRouter();

  useEffect(() => {
    const logout = async () => {
      await AsyncStorage.clear(); // clear all saved data
      router.replace("/login");   // redirect to login screen
    };

    logout();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
      }}
    >
      <ActivityIndicator size="large" color="#6C63FF" />
    </View>
  );
}
