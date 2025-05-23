import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import * as Speech from "expo-speech";
import { ImageBackground } from "expo-image";

const questions = [
  "What is your name?",
  "What is your age?",
  "What is your father's name?",
  "What is your mother's name?",
  "Where do you live?",
  "What is your favorite color?",
];

const GK = () => {
  const speakQuestion = (text) => {
    Speech.speak(text, {
      rate: 0.2,
      pitch: 1,
      language: "en-GB",
    });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => speakQuestion(item)}>
      <Text style={styles.questionText}>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <ImageBackground
      source={require("../../../assets/images/kidsbg.jpg")}
      style={styles.container}
      blurRadius={2}
    >
      <Text style={styles.header}>General Knowledge</Text>
      <FlatList
        data={questions}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </ImageBackground>
  );
};

export default GK;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#E0F7FA",
    padding: 20,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 3,
  },
  questionText: {
    fontSize: 18,
    color: "#333",
  },
});
