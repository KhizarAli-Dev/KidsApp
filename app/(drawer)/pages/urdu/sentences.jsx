import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import * as Speech from "expo-speech";
import { Ionicons } from "@expo/vector-icons";
import { ImageBackground } from "expo-image";

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
  const speak = (text) => {
    Speech.stop();
    Speech.speak(text, { language: "ur-PK", rate: 0.9 });
  };

  const renderItem = ({ item, index }) => (
    <TouchableOpacity
      style={[
        styles.card,
        { backgroundColor: index % 2 === 0 ? "#BA68C8" : "#4FC3F7" },
      ]}
      onPress={() => speak(item)}
    >
      <Text style={styles.sentence}>{item}</Text>
      <Ionicons name="volume-high" size={22} color="#fff" />
    </TouchableOpacity>
  );

  return (
    <ImageBackground
      source={require("../../../../assets/images/kidsbg.jpg")}
      style={styles.container}
      blurRadius={2}
    >
      <Text style={styles.title}>اردو جملے سیکھیں</Text>
      <Text style={styles.subtitle}>کسی بھی جملے پر ٹیپ کریں</Text>

      <FlatList
        data={urduSentences}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.scrollContent}
      />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    color: "#6A1B9A",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 18,
    textAlign: "center",
    color: "#00796B",
    marginBottom: 20,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  card: {
    padding: 18,
    borderRadius: 15,
    marginBottom: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
  },
  sentence: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "600",
  },
});
