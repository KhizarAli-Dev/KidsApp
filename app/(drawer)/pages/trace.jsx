import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  FlatList,
  Dimensions,
  Platform,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const { width } = Dimensions.get("window");

// Dynamically determine if device is tablet-sized
const isTablet = width >= 768;

const scaleFont = isTablet ? 1.8 : width < 400 ? 1 : 1.3;
const scalePadding = isTablet ? 1.8 : width < 400 ? 1 : 1.4;

const tracePage = [
  { name: "English", icon: "alphabetical", color: "#FF9E3B", screen: "/trace/english/engtrace" },
  { name: "Urdu", icon: "book-open-page-variant", color: "#6C63FF", screen: "" },
  { name: "Math", icon: "numeric", color: "#d62828", screen: "" },
  // { name: "Shapes", icon: "shape", color: "#20A39E", screen: "" },
  // { name: "Lines", icon: "vector-line", color: "#EF476F", screen: "" },
  // { name: "Dots", icon: "dots-horizontal", color: "#118AB2", screen: "" },
];

export default function Trace() {
  const router = useRouter();

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.traceCard, { backgroundColor: item.color }]}
      onPress={() => router.push(item.screen)}
      activeOpacity={0.8}
    >
      <MaterialCommunityIcons
        name={item.icon}
        size={60 * scaleFont}
        color="#FFF"
      />
      <Text style={styles.traceText}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <ImageBackground
      source={require("../../../assets/images/kidsbg.jpg")}
      style={styles.container}
    >
      <Text style={styles.title}>Trace Page</Text>

      <FlatList
        data={tracePage}
        renderItem={renderItem}
        keyExtractor={(item) => item.name}
        numColumns={isTablet ? 3 : 2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.listContainer}
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
  listContainer: {
    paddingBottom: 16,
  },
  row: {
    justifyContent: "space-between",
    marginBottom: 16 * scalePadding,
  },
  traceCard: {
    width: isTablet ? "31%" : "47%",
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
  traceText: {
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
