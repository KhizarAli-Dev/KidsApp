import React, { useCallback, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Platform,
} from "react-native";
import * as Speech from "expo-speech";
import { ImageBackground } from "expo-image";
import { useFocusEffect } from "@react-navigation/native";

const { width } = Dimensions.get("window");

// Responsive column & box size
const numColumns = width > 768 ? 5 : 3;
const BOX_SIZE = (width - (numColumns + 1) * 10) / numColumns;

const Numbers = () => {
  const numbers = useMemo(() => Array.from({ length: 20 }, (_, i) => i + 1), []);

  const numberWords = useMemo(() => [
    "One", "Two", "Three", "Four", "Five",
    "Six", "Seven", "Eight", "Nine", "Ten",
    "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen",
    "Sixteen", "Seventeen", "Eighteen", "Nineteen", "Twenty",
  ], []);

  const colors = useMemo(() => [
    "#FF5733", "#33FF57", "#3357FF", "#F333FF", "#33FFF5",
    "#FF33A8", "#A833FF", "#33FF8C", "#FF8C33", "#33A8FF",
    "#FF3361", "#61FF33", "#6133FF", "#FF33F5", "#33FFC1",
    "#FFC133", "#C133FF", "#33FF61", "#FF6133", "#33C1FF",
  ], []);

  const speak = useCallback((numberIndex) => {
    Speech.stop();
    Speech.speak(numberWords[numberIndex], {
      rate: 0.2,
      pitch: 1,
      language: "en-IN",
    });
  }, [numberWords]);

  useFocusEffect(
    useCallback(() => {
      return () => {
        Speech.stop();
      };
    }, [])
  );

  const renderItem = ({ item, index }) => (
    <TouchableOpacity
      onPress={() => speak(index)}
      style={[styles.box, { backgroundColor: colors[index % colors.length], width: BOX_SIZE, height: BOX_SIZE }]}
      activeOpacity={0.8}
    >
      <Text style={styles.number}>{item}</Text>
      <Text style={styles.word}>{numberWords[index]}</Text>
    </TouchableOpacity>
  );

  return (
    <ImageBackground
      source={require("../../../../assets/images/kidsbg.jpg")}
      style={styles.container}
      blurRadius={2}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Numbers 1–20</Text>
        <Text style={styles.subtitle}>Tap any number to hear it</Text>
      </View>

      <FlatList
        data={numbers}
        renderItem={renderItem}
        keyExtractor={(item) => item.toString()}
        numColumns={numColumns}
        contentContainerStyle={[
          styles.grid,
          { paddingBottom: Platform.OS === "ios" ? 100 : 85 },
        ]}        showsVerticalScrollIndicator={false}
      />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignItems: "center",
    marginVertical: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
    textShadowColor: "rgba(0,0,0,0.3)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  subtitle: {
    fontSize: 16,
    color: "white",
    marginTop: 5,
  },
  grid: {
    paddingHorizontal: 10,
    paddingBottom: 30,
    justifyContent: "center",
  },
  box: {
    margin: 5,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  number: {
    fontSize: 36,
    fontWeight: "bold",
    color: "white",
  },
  word: {
    fontSize: 16,
    color: "white",
    marginTop: 4,
    textTransform: "uppercase",
  },
});

export default Numbers;
