import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  FlatList,
  Dimensions,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width } = Dimensions.get("window");

// Responsive scaling
const isTablet = width >= 768;
const numColumns = isTablet ? 4 : 2;
const scaleFont = isTablet ? 1.5 : width < 400 ? 1 : 1.2;
const scalePadding = isTablet ? 1.5 : width < 400 ? 1 : 1.2;

const ONE_DAY_MS = 24 * 60 * 60 * 1000;
const CHECK_INTERVAL_MS = 10 * 60 * 1000;

const learningCategories = [
  { name: "Alphabet", icon: "alphabetical", color: "#FF9E3B", screen: "/pages/abc" },
  { name: "Numbers", icon: "numeric", color: "#6C63FF", screen: "/pages/numbers" },
  { name: "Shapes", icon: "shape-outline", color: "#4CAF50", screen: "/pages/shapes" },
  { name: "Colors", icon: "palette", color: "#F06292", screen: "/pages/colors" },
  { name: "Animals", icon: "cat", color: "#9e0059", screen: "/pages/animals" },
  { name: "Poems", icon: "book-open-page-variant", color: "#FFCA28", screen: "/pages/poems" },
  { name: "GK", icon: "book", color: "#FF7043", screen: "/pages/gk" },
  { name: "Islamiyat", icon: "mosque", color: "#42A5F5", screen: "/pages/islamiat" },
  { name: "Urdu", icon: "book-open-page-variant", color: "#d62828", screen: "/pages/urdu" },
  { name: "Foods", icon: "food-apple", color: "#00f5d4", screen: "/pages/foods" },
  { name: "Test", icon: "draw", color: "#9b5de5", screen: "/pages/test" },
    { name: "Trace", icon: "draw", color: "#3c096c", screen: "/pages/trace" },

];

export default function KidsLearningHome() {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const [username, password, loginTime] = await Promise.all([
          AsyncStorage.getItem("username"),
          AsyncStorage.getItem("password"),
          AsyncStorage.getItem("loginTime"),
        ]);

        const now = Date.now();
        const isExpired = loginTime && now - parseInt(loginTime) > ONE_DAY_MS;

        if (!username || !password || isExpired) {
          await AsyncStorage.clear();
          router.replace("/login");
        }
      } catch (error) {
        console.error("Auth check error:", error);
      }
    };

    checkAuth();
    const interval = setInterval(checkAuth, CHECK_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [router]);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.categoryCard, { backgroundColor: item.color }]}
      onPress={() => router.push(item.screen)}
      activeOpacity={0.8}
    >
      <MaterialCommunityIcons name={item.icon} size={60 * scaleFont} color="#FFF" />
      <Text style={styles.categoryText}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <ImageBackground
      source={require("../../assets/images/kidsbg.jpg")}
      style={styles.container}
    >
      <Text style={styles.title}>Kids Learning Fun!</Text>
      <FlatList
        data={learningCategories}
        renderItem={renderItem}
        keyExtractor={(item) => item.name}
        numColumns={numColumns}
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={numColumns > 1 && styles.row}
      />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16 * scalePadding,
  },
  title: {
    fontSize: 26 * scaleFont,
    fontWeight: "bold",
    color: "#FFF",
    textAlign: "center",
    marginBottom: 20,
    textShadowColor: "rgba(0,0,0,0.3)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  listContent: {
    paddingBottom: 40,
  },
  row: {
    justifyContent: "space-between",
  },
  categoryCard: {
    flex: 1,
    margin: 8,
    aspectRatio: 1,
    borderRadius: 16 * scalePadding,
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  categoryText: {
    marginTop: 8,
    fontSize: 14 * scaleFont,
    fontWeight: "bold",
    color: "#FFF",
    textAlign: "center",
    textShadowColor: "rgba(0,0,0,0.3)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
});
