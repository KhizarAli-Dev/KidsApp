import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function KidsLearningHome() {
  
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const username = await AsyncStorage.getItem("username");
      const password = await AsyncStorage.getItem("password");
      const loginTime = await AsyncStorage.getItem("loginTime");

      const now = Date.now();
      const ONE_DAY_MS = 24 * 60 * 60 * 1000;
      const isExpired = loginTime && now - parseInt(loginTime) > ONE_DAY_MS;

      if (!username || !password || isExpired) {
        await AsyncStorage.clear();
        router.replace("/login");
      }
    };

    checkAuth();

    // Optional: check every 10 minutes
    const interval = setInterval(checkAuth, 10 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const learningCategories = [
    {
      name: "Alphabet",
      icon: "alphabetical",
      color: "#FF9E3B",
      screen: "/pages/abc",
    },
    {
      name: "Numbers",
      icon: "numeric",
      color: "#6C63FF",
      screen: "/pages/numbers",
    },
    {
      name: "Shapes",
      icon: "shape-outline",
      color: "#4CAF50",
      screen: "/pages/shapes",
    },
    {
      name: "Colors",
      icon: "palette",
      color: "#F06292",
      screen: "/pages/colors",
    },
    {
      name: "Animals",
      icon: "cat",
      color: "#9e0059",
      screen: "/pages/animals",
    },
    {
      name: "Poems",
      icon: "book-open-page-variant",
      color: "#FFCA28",
      screen: "/pages/poems",
    },
    {
      name: "GK",
      icon: "book",
      color: "#FF7043",
      screen: "/pages/gk",
    },
    {
      name: "Islamiyat",
      icon: "mosque",
      color: "#42A5F5",
      screen: "/pages/islamiat",
    },

    {
      name: "Urdu",
      icon: "book-open-page-variant",
      color: "#d62828",
      screen: "/pages/urdu",
    },
  ];

  return (
    <ImageBackground
      source={require("../../assets/images/kidsbg.jpg")}
      style={styles.container}
      blurRadius={2}
    >
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.title}>Kids Learning Fun!</Text>
        </View>

        <View style={styles.gridContainer}>
          {learningCategories.map((category, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.categoryCard, { backgroundColor: category.color }]}
              onPress={() => router.push(category.screen)}
            >
              <MaterialCommunityIcons
                name={category.icon}
                size={40}
                color="#FFF"
                style={styles.categoryIcon}
              />
              <Text style={styles.categoryText}>{category.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFF",
    textShadowColor: "rgba(0,0,0,0.3)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    // marginBottom: 20,
  },
  categoryCard: {
    width: "35%",
    aspectRatio: 1,
    borderRadius: 16,
    marginBottom: 16,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  categoryIcon: {
    marginBottom: 8,
  },
  categoryText: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#FFF",
    textShadowColor: "rgba(0,0,0,0.3)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
});
