import React, { useCallback, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import * as Speech from "expo-speech";
import { ImageBackground } from "expo-image";

const QUESTIONS = [
  "What is your name?",
  "What is your age?",
  "What is your father's name?",
  "What is your mother's name?",
  "Where do you live?",
  "What is your favorite color?",
];

const GK = () => {
  // Stop speech when component unmounts
  useEffect(() => {
    return () => {
      Speech.stop();
    };
  }, []);

  // Function to speak question
  const speakQuestion = useCallback((text) => {
    Speech.stop(); // Stop any previous speech
    Speech.speak(text, {
      rate: 0.2,
      pitch: 1,
      language: "en-GB",
    });
  }, []);

  // Render single card
  const renderItem = useCallback(
    ({ item }) => (
      <TouchableOpacity
        style={styles.card}
        onPress={() => speakQuestion(item)}
        activeOpacity={0.7}
      >
        <Text style={styles.questionText}>{item}</Text>
      </TouchableOpacity>
    ),
    [speakQuestion]
  );

  return (
    <ImageBackground
      source={require("../../../assets/images/kidsbg.jpg")}
      style={styles.container}
      blurRadius={2}
    >
      <Text style={styles.header}>General Knowledge</Text>
      <FlatList
        data={QUESTIONS}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </ImageBackground>
  );
};

export default GK;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFF",
    textAlign: "center",
    marginBottom: 20,
    textShadowColor: "rgba(0,0,0,0.4)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  listContent: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: "#E0F7FA",
    padding: 20,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  questionText: {
    fontSize: 18,
    color: "#333",
    fontWeight: "500",
  },
});
