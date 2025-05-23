import React, { useMemo, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Platform,
} from "react-native";
import * as Speech from "expo-speech";
import { ImageBackground } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

const { width } = Dimensions.get("window");

const urduLetters = [
  "ا", "ب", "پ", "ت", "ٹ", "ث", "ج", "چ", "ح", "خ",
  "د", "ڈ", "ذ", "ر", "ڑ", "ز", "ژ", "س", "ش", "ص",
  "ض", "ط", "ظ", "ع", "غ", "ف", "ق", "ک", "گ", "ل",
  "م", "ن", "و", "ہ", "ء", "ی", "ے", 
];

const colors = [
  "#FFECB3", "#B2DFDB", "#F8BBD0", "#D1C4E9", "#C5CAE9", "#FFE0B2",
  "#FFCCBC", "#DCEDC8", "#F0F4C3", "#CFD8DC"
];

const UrduPage = () => {
  const coloredLetters = useMemo(() => {
    return urduLetters.map((letter) => ({
      letter,
      bgColor: colors[Math.floor(Math.random() * colors.length)],
    }));
  }, []);

const speakUrdu = (letter) => {
  Speech.stop();

  // Handle special pronunciation cases
  let toSpeak = letter;
  if (letter === "ق") {
    toSpeak = "قاف"; // Qaaf — full form
  } else if (letter === "ژ") {
    toSpeak = "زے"; // Zhe — commonly pronounced like "zhe"
  }

  Speech.speak(toSpeak, {
    language: "ur-PK",
    pitch: 1,
    rate: 0.6,
  });
};


  useFocusEffect(
    useCallback(() => {
      return () => {
        Speech.stop();
      };
    }, [])
  );

  return (
    <ImageBackground
      source={require("../../../../assets/images/kidsbg.jpg")}
      style={styles.container}
      blurRadius={3}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <Text style={styles.heading}>📖 اردو حروف</Text>

        <FlatList
          data={coloredLetters}
          numColumns={4}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.listContainer}
          // inverted // reverse the list rendering order (RTL)
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[styles.letterCard, { backgroundColor: item.bgColor }]}
              onPress={() => speakUrdu(item.letter)}
              activeOpacity={0.7}
            >
              <Text style={styles.letterText}>{item.letter}</Text>
            </TouchableOpacity>
          )}
          columnWrapperStyle={{ flexDirection: "row-reverse" }}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    paddingHorizontal: 12,
  },
  heading: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#FFF",
    textAlign: "center",
    marginBottom: 24,
    textShadowColor: "#000000aa",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 6,
    fontFamily: Platform.OS === "ios" ? "ArialHebrew" : "sans-serif", // Urdu friendly font fallback
  },
  listContainer: {
    paddingBottom: 30,
  },
  letterCard: {
    width: width / 4 - 20,
    height: width / 4 - 20,
    marginVertical: 10,
    marginHorizontal: 6,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    elevation: 8,
    shadowColor: "#000",
    shadowOpacity: 0.35,
    shadowOffset: { width: 2, height: 4 },
    shadowRadius: 8,
  },
  letterText: {
    fontSize: 40,
    fontWeight: "700",
    
    color: "#1a1a1a",
    textShadowColor: "#ffffffbb",
    textShadowOffset: { width: 0.5, height: 0.5 },
    textShadowRadius: 2,
    includeFontPadding: false,
    textAlign: "center",
  },
});

export default UrduPage;
