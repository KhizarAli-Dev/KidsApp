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
    Speech.stop(); // Stop any current speech
    Speech.speak(letter, {
      rate: 0.2,
      pitch: 1.1,
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
      style={[styles.box, { backgroundColor: colors[index % colors.length] }]}
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
        numColumns={4}
        contentContainerStyle={styles.grid}
      />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 5,
    color: "white",
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
    color: "white",
  },
  grid: {
    paddingHorizontal: 10,
    justifyContent: "center",
  },
  box: {
    width: width / 4 - 20,
    height: width / 4 - 20,
    margin: 8,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  letter: {
    fontSize: 32,
    fontWeight: "bold",
    color: "white",
  },
  smallLetter: {
    fontSize: 16,
    color: "white",
    marginTop: -5,
  },
});

export default AlphabetSpeechApp;
