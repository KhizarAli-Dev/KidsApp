import React, { useCallback, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  useWindowDimensions,
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
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;

  // Scale factors: landscape thoda chhota fonts aur padding ke liye
  const scaleFont = isLandscape ? 0.9 : width < 400 ? 1 : width < 600 ? 1.2 : 1.4;
  const scalePadding = isLandscape ? 1 : width < 400 ? 1 : width < 600 ? 1.3 : 1.6;

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
        style={[styles.card, { padding: 20 * scalePadding, marginBottom: 12 * scalePadding, borderRadius: 12 * scalePadding }]}
        onPress={() => speakQuestion(item)}
        activeOpacity={0.7}
      >
        <Text style={[styles.questionText, { fontSize: 18 * scaleFont }]}>
          {item}
        </Text>
      </TouchableOpacity>
    ),
    [speakQuestion, scaleFont, scalePadding]
  );

  return (
    <ImageBackground
      source={require("../../../assets/images/kidsbg.jpg")}
      style={[styles.container, { paddingHorizontal: 16 * scalePadding }]}
    >
      <Text style={[styles.header, { fontSize: 28 * scaleFont, marginBottom: 20 * scalePadding }]}>
        General Knowledge
      </Text>
      <FlatList
        data={QUESTIONS}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{ paddingBottom: 20 * scalePadding }}
        showsVerticalScrollIndicator={false}
        key={isLandscape ? "h" : "v"} // re-render on orientation change
      />
    </ImageBackground>
  );
};

export default GK;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    fontWeight: "bold",
    color: "#FFF",
    textAlign: "center",
    textShadowColor: "rgba(0,0,0,0.4)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  card: {
    backgroundColor: "#E0F7FA",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  questionText: {
    color: "#333",
    fontWeight: "500",
  },
});
