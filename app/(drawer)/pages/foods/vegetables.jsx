import React, { useRef, useCallback, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  ImageBackground,
  Dimensions,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Speech from "expo-speech";
import { Audio } from "expo-av";
import { useFocusEffect } from "@react-navigation/native";

const { width } = Dimensions.get("window");
const CARD_SIZE = width / 2 - 24;

const VegetablesScreen = () => {
  const currentSound = useRef(null);

  const veg = useMemo(
    () => [
      {
        name: "Tomato",
        image: require("../../../../assets/images/vegetables/tomato.jpg"),
      },
      {
        name: "Onion",
        image: require("../../../../assets/images/vegetables/onion.jpg"),
      },
      {
        name: "Carrot",
        image: require("../../../../assets/images/vegetables/carrot.jpg"),
      },
            {
        name: "Bringle",
        image: require("../../../../assets/images/vegetables/bringle.jpg"),
      },
                  {
        name: "Lemon",
        image: require("../../../../assets/images/vegetables/lemon.jpg"),
      },
    
    ],
    []
  );

  const cleanupSound = async () => {
    if (currentSound.current) {
      try {
        await currentSound.current.stopAsync();
        await currentSound.current.unloadAsync();
      } catch (e) {
        console.warn("Error unloading sound:", e);
      } finally {
        currentSound.current = null;
      }
    }
  };

  const playSound = async (fruitnames) => {
    try {
      await cleanupSound();
      Speech.stop();

      Speech.speak(fruitnames.name, {
        rate: 0.50,
        pitch: 1,
        language: "en-IN",
      });
    } catch (error) {
      console.warn("Error in playSound:", error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      return () => {
        Speech.stop();
        cleanupSound();
      };
    }, [])
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.animalCard, { backgroundColor: item.color }]}
      onPress={() => playSound(item)}
      activeOpacity={0.75}
    >
      <Image
        source={item.image}
        style={styles.animalImage}
        resizeMode="cover"
      />
      <Text style={styles.animalName}>{item.name}</Text>
      <Ionicons
        name="volume-high"
        size={24}
        color="#FFF"
        style={styles.soundIcon}
      />
    </TouchableOpacity>
  );

  return (
    <ImageBackground
      source={require("../../../../assets/images/kidsbg.jpg")}
      style={styles.container}
      // blurRadius={2}
    >
      <Text style={styles.title}>Vegetables</Text>
      <Text style={styles.subtitle}>Tap to hear their names!</Text>

      <FlatList
        data={veg}
        renderItem={renderItem}
        keyExtractor={(item) => item.name}
        numColumns={2}
        contentContainerStyle={[
          styles.grid,
          { paddingBottom: Platform.OS === "ios" ? 100 : 85 },
        ]}      />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
    color: "white",
    textShadowColor: "rgba(0,0,0,0.3)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
    color: "white",
  },
  grid: {
    paddingHorizontal: 10,
    paddingBottom: 30,
  },
  animalCard: {
    width: CARD_SIZE,
    height: CARD_SIZE,
    margin: 8,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    overflow: "hidden",
    position: "relative",
  },
  animalImage: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  animalName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFF",
    textShadowColor: "rgba(0,0,0,0.5)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
    zIndex: 1,
  },
  soundIcon: {
    position: "absolute",
    bottom: 10,
    right: 10,
    textShadowColor: "rgba(0,0,0,0.5)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
});

export default VegetablesScreen;
