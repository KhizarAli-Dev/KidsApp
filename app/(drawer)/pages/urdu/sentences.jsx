import React, { useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Platform,
  AccessibilityInfo,
  Dimensions,
} from "react-native";
import * as Speech from "expo-speech";
import { ImageBackground } from "react-native";

// Screen dimensions
const { width } = Dimensions.get("window");
const isTablet = width >= 768;

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
        },
      ]}
      onPress={() => speak(item)}
      activeOpacity={0.7}
      accessibilityRole="button"
      accessibilityLabel={`اردو جملہ: ${item}`}
    >
      <Text style={styles.sentence}>{item}</Text>
    </TouchableOpacity>
  ), [speak]);

  return (
    <ImageBackground
      source={require("../../../../assets/images/kidsbg.jpg")}
      style={styles.container}
    >
      <Text style={styles.title}>اردو جملے سیکھیں</Text>
      <FlatList
        data={urduSentences}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderItem}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: Platform.OS === "ios" ? 100 : 85 },
        ]}        showsVerticalScrollIndicator={false}
      />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: isTablet ? 36 : 28,
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
    paddingVertical: isTablet ? 20 : 10,
    textShadowColor: "#000a",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
    fontFamily: Platform.OS === "ios" ? "ArialHebrew" : "sans-serif",
  },
  scrollContent: {
    paddingHorizontal: isTablet ? 40 : 20,
    paddingBottom: isTablet ? 30 : 20,
  },
  card: {
    padding: isTablet ? 28 : 18,
    borderRadius: 20,
    marginBottom: isTablet ? 20 : 14,
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
    fontSize: isTablet ? 26 : 20,
    color: "#fff",
    fontWeight: "600",
    textAlign: "center",
  },
});
