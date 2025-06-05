import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  useWindowDimensions,
  Platform,
} from "react-native";
import * as Speech from "expo-speech";
import { ImageBackground } from "expo-image";
import { Ionicons } from "@expo/vector-icons";

const NUMBERS = [
  { word: "one", letters: ["o", "n", "e"], color: "#FF5733" },
  { word: "two", letters: ["t", "w", "o"], color: "#33FF57" },
  { word: "three", letters: ["t", "h", "r", "e", "e"], color: "#3357FF" },
  { word: "four", letters: ["f", "o", "u", "r"], color: "#F333FF" },
  { word: "five", letters: ["f", "i", "v", "e"], color: "#33FFF5" },
  { word: "six", letters: ["s", "i", "x"], color: "#FF33A8" },
  { word: "seven", letters: ["s", "e", "v", "e", "n"], color: "#A833FF" },
  { word: "eight", letters: ["e", "i", "g", "h", "t"], color: "#33FF8C" },
  { word: "nine", letters: ["n", "i", "n", "e"], color: "#FF8C33" },
  { word: "ten", letters: ["t", "e", "n"], color: "#33A8FF" },
  { word: "eleven", letters: ["e", "l", "e", "v", "e", "n"], color: "#FF33B5" },
  { word: "twelve", letters: ["t", "w", "e", "l", "v", "e"], color: "#FF5733" },
  {
    word: "thirteen",
    letters: ["t", "h", "i", "r", "t", "e", "e", "n"],
    color: "#33FF57",
  },
  {
    word: "fourteen",
    letters: ["f", "o", "u", "r", "t", "e", "e", "n"],
    color: "#3357FF",
  },
  {
    word: "fifteen",
    letters: ["f", "i", "f", "t", "e", "e", "n"],
    color: "#F333FF",
  },
  {
    word: "sixteen",
    letters: ["s", "i", "x", "t", "e", "e", "n"],
    color: "#33FFF5",
  },
  {
    word: "seventeen",
    letters: ["s", "e", "v", "e", "n", "t", "e", "e", "n"],
    color: "#FF33A8",
  },
  {
    word: "eighteen",
    letters: ["e", "i", "g", "h", "t", "e", "e", "n"],
    color: "#A833FF",
  },
  {
    word: "nineteen",
    letters: ["n", "i", "n", "e", "t", "e", "e", "n"],
    color: "#33FF8C",
  },
  { word: "twenty", letters: ["t", "w", "e", "n", "t", "y"], color: "#FF8C33" },
];

const OneTwoThree = () => {
  const [activeNumber, setActiveNumber] = useState(null);
  const [timeouts, setTimeouts] = useState([]);
  const { width, height } = useWindowDimensions();

  const isPortrait = height >= width;

  // Columns based on orientation
  const numColumns = isPortrait ? 2 : 4;
  const CARD_WIDTH = width / numColumns - 30;

  useEffect(() => {
    return () => clearAllTimeouts();
  }, []);

  const clearAllTimeouts = () => {
    timeouts.forEach(clearTimeout);
    setTimeouts([]);
  };

  const speakNumber = (number) => {
    Speech.stop();
    clearAllTimeouts();
    setActiveNumber(number.word);

    let newTimeouts = [];
    let delay = 0;

    number.letters.forEach((letter) => {
      const t = setTimeout(() => {
        Speech.speak(letter, { rate: 0.6, pitch: 1.1 });
      }, delay);
      newTimeouts.push(t);
      delay += 1000;
    });

    const finalTimeout = setTimeout(() => {
      Speech.speak(number.word, { rate: 0.7, pitch: 1.0 });
    }, delay + 500);
    newTimeouts.push(finalTimeout);

    setTimeouts(newTimeouts);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.numberCard,
        {
          backgroundColor: item.color,
          width: CARD_WIDTH,
          transform: [{ scale: activeNumber === item.word ? 1.05 : 1 }],
          opacity: activeNumber === item.word ? 1 : 0.9,
        },
      ]}
      onPress={() => speakNumber(item)}
    >
      <Text style={styles.numberWord}>{item.word}</Text>
      <View style={styles.lettersContainer}>
        {item.letters.map((letter, index) => (
          <Text key={index} style={styles.letter}>
            {letter}
          </Text>
        ))}
      </View>
      <Ionicons
        name="volume-high"
        size={24}
        color="#FFF"
        style={styles.soundIcon}
      />
    </TouchableOpacity>
  );

  return (
    <ImageBackground
      source={require("../../../../assets/images/kidsbg.jpg")}
      style={styles.container}
    >
      <Text style={styles.title}>Learn Numbers</Text>
      <Text style={styles.subtitle}>Tap to hear the spelling</Text>
      <FlatList
        data={NUMBERS}
        renderItem={renderItem}
        keyExtractor={(item) => item.word}
        numColumns={numColumns}
        contentContainerStyle={[
          styles.listContent,
          { paddingBottom: Platform.OS === "ios" ? 100 : 85 },
        ]}
        showsVerticalScrollIndicator={false}
        key={numColumns} // re-render FlatList on orientation change
      />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 12,
    color: "#FFF",
    textShadowColor: "rgba(0,0,0,0.5)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  subtitle: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
    color: "#FFF",
    textShadowColor: "rgba(0,0,0,0.3)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  numberCard: {
    height: 160,
    margin: 10,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.3)",
    position: "relative",
  },
  numberWord: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#FFF",
    marginBottom: 8,
    textTransform: "capitalize",
    textShadowColor: "rgba(0,0,0,0.3)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  lettersContainer: {
    flexDirection: "row",
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderRadius: 20,
    flexWrap: "wrap",
    justifyContent: "center",
  },
  letter: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FFF",
    marginHorizontal: 2,
    textShadowColor: "rgba(0,0,0,0.4)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  soundIcon: {
    position: "absolute",
    bottom: 10,
    right: 10,
    opacity: 0.8,
  },
  listContent: {
    paddingHorizontal: 10,
  },
});

export default OneTwoThree;
