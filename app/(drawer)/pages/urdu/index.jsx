import React, { useMemo, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Platform,
  AccessibilityInfo,
  useWindowDimensions,
} from "react-native";
import * as Speech from "expo-speech";
import { ImageBackground } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

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
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;

  // Adjust number of columns based on orientation and device size
  const numColumns = isLandscape ? 6 : 4;

  // Calculate card size dynamically
  const cardSize = width / numColumns - (isLandscape ? 20 : 16);

  const coloredLetters = useMemo(() =>
    urduLetters.map(letter => ({
      letter,
      bgColor: colors[Math.floor(Math.random() * colors.length)],
    })),
  []);

  const speakUrdu = useCallback((letter) => {
    Speech.stop();
    let toSpeak = letter;
    if (letter === "ق") toSpeak = "قاف";
    else if (letter === "ژ") toSpeak = "زے";
    Speech.speak(toSpeak, {
      language: "ur-PK",
      pitch: 1,
      rate: 0.6,
    });
    AccessibilityInfo.announceForAccessibility(`آواز: ${toSpeak}`);
  }, []);

  useFocusEffect(
    useCallback(() => {
      return () => Speech.stop();
    }, [])
  );

  const renderItem = useCallback(({ item }) => (
    <TouchableOpacity
      style={[styles.letterCard, { backgroundColor: item.bgColor, width: cardSize, height: cardSize }]}
      onPress={() => speakUrdu(item.letter)}
      activeOpacity={0.7}
      accessibilityLabel={`اردو حرف ${item.letter}`}
      accessibilityRole="button"
    >
      <Text style={[styles.letterText, { fontSize: cardSize / 2 }]}>
        {item.letter}
      </Text>
    </TouchableOpacity>
  ), [speakUrdu, cardSize]);

  return (
    <ImageBackground
      source={require("../../../../assets/images/kidsbg.jpg")}
      style={styles.container}
    >
      <View style={styles.overlay}>
        <Text style={[styles.heading, { fontSize: isLandscape ? 36 : 28 }]}>📖 اردو حروف</Text>

        <FlatList
          data={coloredLetters}
          numColumns={numColumns}
          key={numColumns} // re-render on orientation change
          keyExtractor={(item) => item.letter}
          contentContainerStyle={[styles.listContainer, { paddingBottom: Platform.OS === "ios" ? 100 : 85 }]}
          renderItem={renderItem}
          columnWrapperStyle={{ flexDirection: "row-reverse" }}
          showsVerticalScrollIndicator={false}
          initialNumToRender={20}
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  overlay: { flex: 1, paddingHorizontal: 12, paddingTop: 16 },
  heading: {
    fontWeight: "bold",
    color: "#FFF",
    textAlign: "center",
    marginBottom: 20,
    textShadowColor: "#000000aa",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 6,
    fontFamily: Platform.OS === "ios" ? "ArialHebrew" : "sans-serif",
  },
  listContainer: { paddingBottom: 40 },
  letterCard: {
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
