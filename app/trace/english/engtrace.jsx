import React, { useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import { ImageBackground } from "expo-image";

const { width } = Dimensions.get("window");
const CARD_SIZE = width / 3 - 20; // 3 cards per row with spacing

const AlphabetsTrace = () => {
  
  const router = useRouter();
  const letters = useMemo(
    () => [
      {
        letter: "A",
        color: "#FF6B6B",
        screen: "/trace/english/engtraceletters/a",
      },
      {
        letter: "B",
        color: "#FF8E72",
        screen: "/trace/english/engtraceletters/b",
      },
      {
        letter: "C",
        color: "#FFD93D",
        screen: "/trace/english/engtraceletters/c",
      },
      {
        letter: "D",
        color: "#6BCB77",
        screen: "/trace/english/engtraceletters/d",
      },
      {
        letter: "E",
        color: "#4D96FF",
        screen: "/trace/english/engtraceletters/e",
      },
      {
        letter: "F",
        color: "#845EC2",
        screen: "/trace/english/engtraceletters/f",
      },
      {
        letter: "G",
        color: "#F9C80E",
        screen: "/trace/english/engtraceletters/g",
      },
      {
        letter: "H",
        color: "#F86624",
        screen: "/trace/english/engtraceletters/h",
      },
      {
        letter: "I",
        color: "#EA3546",
        screen: "/trace/english/engtraceletters/i",
      },
      {
        letter: "J",
        color: "#662E9B",
        screen: "/trace/english/engtraceletters/j",
      },
      {
        letter: "K",
        color: "#43AA8B",
        screen: "/trace/english/engtraceletters/k",
      },
      {
        letter: "L",
        color: "#2F4858",
        screen: "/trace/english/engtraceletters/l",
      },
      {
        letter: "M",
        color: "#8AC926",
        screen: "/trace/english/engtraceletters/m",
      },
      {
        letter: "N",
        color: "#1982C4",
        screen: "/trace/english/engtraceletters/n",
      },
      {
        letter: "O",
        color: "#6A4C93",
        screen: "/trace/english/engtraceletters/o",
      },
      {
        letter: "P",
        color: "#FF595E",
        screen: "/trace/english/engtraceletters/p",
      },
      {
        letter: "Q",
        color: "#FFCA3A",
        screen: "/trace/english/engtraceletters/q",
      },
      {
        letter: "R",
        color: "#8D99AE",
        screen: "/trace/english/engtraceletters/r",
      },
      {
        letter: "S",
        color: "#38A3A5",
        screen: "/trace/english/engtraceletters/s",
      },
      {
        letter: "T",
        color: "#57CC99",
        screen: "/trace/english/engtraceletters/t",
      },
      {
        letter: "U",
        color: "#80ED99",
        screen: "/trace/english/engtraceletters/u",
      },
      {
        letter: "V",
        color: "#F94144",
        screen: "/trace/english/engtraceletters/v",
      },
      {
        letter: "W",
        color: "#F3722C",
        screen: "/trace/english/engtraceletters/w",
      },
      {
        letter: "X",
        color: "#90BE6D",
        screen: "/trace/english/engtraceletters/x",
      },
      {
        letter: "Y",
        color: "#577590",
        screen: "/trace/english/engtraceletters/y",
      },
      {
        letter: "Z",
        color: "#FFB703",
        screen: "/trace/english/engtraceletters/z",
      },
    ],
    []
  );

  return (
    <ImageBackground
      source={require("../../../assets/images/kidsbg.jpg")}
      style={styles.container}
    >
      <Text style={styles.heading}>Trace Alphabets</Text>

      <FlatList
        data={letters}
        keyExtractor={(item) => item.letter}
        numColumns={3}
        contentContainerStyle={{
          paddingBottom: Platform.OS === "ios" ? 100 : 85,
        }}
        columnWrapperStyle={{
          justifyContent: "space-between",
          marginBottom: 16,
        }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.card, { backgroundColor: item.color }]}
            onPress={() => router.push(item.screen)}
            activeOpacity={0.8}
          >
            <Text style={styles.cardText}>{item.letter}</Text>
          </TouchableOpacity>
        )}
        showsVerticalScrollIndicator={false}
      />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  heading: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "white",
  },
  card: {
    height: CARD_SIZE,
    width: CARD_SIZE,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  cardText: {
    fontSize: 35,
    fontWeight: "bold",
    color: "#fff",
    textShadowColor: "rgba(0,0,0,0.6)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
});

export default AlphabetsTrace;
