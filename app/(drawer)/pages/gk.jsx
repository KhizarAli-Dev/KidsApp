import React, { useCallback, useEffect } from "react";
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

const { width, height } = Dimensions.get("window");

// Adjust base font and padding relative to screen width
const scaleFont = width < 400 ? 1 : width < 600 ? 1.2 : 1.4;
const scalePadding = width < 400 ? 1 : width < 600 ? 1.3 : 1.6;

const QUESTIONS = [
  "What is your name?",
  "What is your age?",
  "What is your father's name?",
  "What is your mother's name?",
  "Where do you live?",
  "What is your favorite color?",
];

const GK = () => {
  useEffect(() => {
    return () => {
      Speech.stop();
    };
  }, []);

  const speakQuestion = useCallback((text) => {
    Speech.stop();
    Speech.speak(text, {
      rate: 0.2,
      pitch: 1,
      language: "en-GB",
    });
  }, []);

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
    paddingHorizontal: 16 * scalePadding,
  },
  header: {
    fontSize: 28 * scaleFont,
    fontWeight: "bold",
    color: "#FFF",
    textAlign: "center",
    marginBottom: 20,
    textShadowColor: "rgba(0,0,0,0.4)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  listContent: {
    paddingBottom: 20 * scalePadding,
  },
  card: {
    backgroundColor: "#E0F7FA",
    padding: 20 * scalePadding,
    borderRadius: 12 * scalePadding,
    marginBottom: 12 * scalePadding,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  questionText: {
    fontSize: 18 * scaleFont,
    color: "#333",
    fontWeight: "500",
  },
});
