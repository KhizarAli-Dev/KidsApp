import React, { useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Platform,
  AccessibilityInfo,
  useWindowDimensions,
} from "react-native";
import * as Speech from "expo-speech";
import { ImageBackground } from "react-native";

const urduSentences = [
  "میں اسکول جا رہا ہوں۔",
  "کتاب میز پر ہے۔",
  "وہ بہت خوش ہے۔",
  "یہ سیب لال ہے۔",
  "بارش ہو رہی ہے۔",
  "مجھے آم پسند ہیں۔",
  "وہ کرکٹ کھیل رہا ہے۔",
  "آج اتوار ہے۔",
  "ہم پارک جا رہے ہیں۔",
  "میری والدہ بہت مہربان ہیں۔",
];

export default function SentencesPage() {
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;

  const speak = useCallback((text) => {
    Speech.stop();
    Speech.speak(text, { language: "ur-PK", rate: 0.6 });
    AccessibilityInfo.announceForAccessibility(`جملہ: ${text}`);
  }, []);

  const renderItem = useCallback(({ item, index }) => (
    <TouchableOpacity
      style={[
        styles.card,
        {
          backgroundColor: index % 2 === 0 ? "#BA68C8" : "#4FC3F7",
          paddingVertical: isLandscape ? 22 : 14,
        },
      ]}
      onPress={() => speak(item)}
      activeOpacity={0.7}
      accessibilityRole="button"
      accessibilityLabel={`اردو جملہ: ${item}`}
    >
      <Text style={[styles.sentence, { fontSize: isLandscape ? 24 : 20 }]}>{item}</Text>
    </TouchableOpacity>
  ), [speak, isLandscape]);

  return (
    <ImageBackground
      source={require("../../../../assets/images/kidsbg.jpg")}
      style={styles.container}
    >
      <Text style={[styles.title, { fontSize: isLandscape ? 36 : 28 }]}>اردو جملے سیکھیں</Text>
      <FlatList
        data={urduSentences}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderItem}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: Platform.OS === "ios" ? 100 : 85 }]}
        showsVerticalScrollIndicator={false}
      />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  title: {
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
    paddingVertical: 10,
    textShadowColor: "#000a",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
    fontFamily: Platform.OS === "ios" ? "ArialHebrew" : "sans-serif",
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  card: {
    borderRadius: 20,
    marginBottom: 14,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
  },
  sentence: {
    color: "#fff",
    fontWeight: "600",
    textAlign: "center",
  },
});
