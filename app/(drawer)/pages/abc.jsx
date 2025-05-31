import React, { useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from "react-native";
import * as Speech from "expo-speech";
import { ImageBackground } from "expo-image";
import { useFocusEffect } from "@react-navigation/native";

const { width } = Dimensions.get("window");

// Dynamically choose columns based on screen width
const numColumns = width > 768 ? 6 : 4;
const boxSize = (width - (numColumns + 1) * 10) / numColumns;

const AlphabetSpeechApp = () => {
  const alphabet = Array.from({ length: 26 }, (_, i) => ({
    upper: String.fromCharCode(65 + i),
    lower: String.fromCharCode(97 + i),
  }));

  const colors = [
    "#FF5733", "#33FF57", "#3357FF", "#F333FF", "#33FFF5",
    "#FF33A8", "#A833FF", "#33FF8C", "#FF8C33", "#33A8FF",
    "#FF3361", "#61FF33", "#6133FF", "#FF33F5", "#33FFC1",
    "#FFC133", "#C133FF", "#33FF61", "#FF6133", "#33C1FF",
    "#FF33C1", "#C1FF33", "#33FF33", "#FF3333", "#3333FF", "#FF33FF",
  ];

  const speak = (letter) => {
    Speech.stop();
    Speech.speak(letter, {
      rate: 0.2,
      pitch: 1,
      language: "en-US",
    });
  };

  useFocusEffect(
    useCallback(() => {
      return () => {
        Speech.stop();
      };
    }, [])
  );

  const renderItem = ({ item, index }) => (
    <TouchableOpacity
      onPress={() => speak(item.upper)}
      style={[
        styles.box,
        {
          backgroundColor: colors[index % colors.length],
          width: boxSize,
          height: boxSize,
        },
      ]}
    >
      <Text style={styles.letter}>{item.upper}</Text>
      <Text style={styles.smallLetter}>{item.lower}</Text>
    </TouchableOpacity>
  );

  return (
    <ImageBackground
      source={require("../../../assets/images/kidsbg.jpg")}
      style={styles.container}
      blurRadius={2}
    >
      <Text style={styles.title}>Alphabet Pronunciation</Text>
      <Text style={styles.subtitle}>Tap any letter to hear it</Text>

      <FlatList
        data={alphabet}
        renderItem={renderItem}
        keyExtractor={(item) => item.upper}
        numColumns={numColumns}
        contentContainerStyle={styles.grid}
      />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 5,
    color: "white",
    textShadowColor: "#000",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
    color: "white",
    textShadowColor: "#000",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  grid: {
    paddingHorizontal: 10,
    justifyContent: "center",
    paddingBottom: 20,
  },
  box: {
    margin: 5,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  letter: {
    fontSize: 34,
    fontWeight: "bold",
    color: "white",
  },
  smallLetter: {
    fontSize: 18,
    color: "white",
    marginTop: -4,
  },
});

export default AlphabetSpeechApp;
