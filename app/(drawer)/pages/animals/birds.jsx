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

const BirdsScreen = () => {
  const currentSound = useRef(null);

  const birds = useMemo(
    () => [
      {
        name: "Eagle",
        image: require("../../../../assets/images/birds/eagle.webp"),
        realSound: require("../../../../assets/sounds/birds/eagle.mp3"),
      },
      {
        name: "Owl",
        image: require("../../../../assets/images/birds/owl.jpg"),
        realSound: require("../../../../assets/sounds/birds/owl.mp3"),
      },
      {
        name: "Parrot",
        image: require("../../../../assets/images/birds/parrot.webp"),
        realSound: require("../../../../assets/sounds/birds/parrot.mp3"),
      },
      {
        name: "Duck",
        image: require("../../../../assets/images/birds/duck.jpg"),
        realSound: require("../../../../assets/sounds/birds/duck.mp3"),
      },
      {
        name: "Finch",
        image: require("../../../../assets/images/birds/finch.jpg"),
        realSound: require("../../../../assets/sounds/birds/finch.mp3"),
      },
      {
        name: "Crow",
        image: require("../../../../assets/images/birds/crow.jpg"),
        realSound: require("../../../../assets/sounds/birds/crow.mp3"),
      },
      {
        name: "Pigeon",
        image: require("../../../../assets/images/birds/pigeon.jpg"),
        realSound: require("../../../../assets/sounds/birds/pigeon.mp3"),
      },
            {
        name: "Chicken",
        image: require("../../../../assets/images/birds/chicken.jpg"),
        realSound: require("../../../../assets/sounds/birds/chicken.mp3"),
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

  const playSound = async (animal) => {
    try {
      await cleanupSound();
      Speech.stop();

      Speech.speak(animal.name, {
        rate: 0.25,
        pitch: 1.1,
        language: "en-US",
        onDone: async () => {
          try {
            const { sound } = await Audio.Sound.createAsync(animal.realSound);
            currentSound.current = sound;
            await sound.playAsync();

            sound.setOnPlaybackStatusUpdate((status) => {
              if (status.didJustFinish) {
                cleanupSound();
              }
            });
          } catch (error) {
            console.warn("Failed to load or play sound:", error);
          }
        },
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
      <Text style={styles.title}>Birds Friends</Text>
      <Text style={styles.subtitle}>Tap to hear their sounds!</Text>

      <FlatList
        data={birds}
        renderItem={renderItem}
        keyExtractor={(item) => item.name}
        numColumns={2}
        contentContainerStyle={[
          styles.grid,
          { paddingBottom: Platform.OS === "ios" ? 100 : 85 },
        ]}
      />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
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

export default BirdsScreen;
