import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  ImageBackground,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Speech from "expo-speech";
import { Audio } from "expo-av";
import React, { useRef, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";

const { width } = Dimensions.get("window");

const AnimalsScreen = () => {
  const currentSound = useRef(null);

  const animals = [
    {
      name: "Lion",
      sound: "roar",
      image: require("../../../assets/images/animals/lion.jpg"),
      color: "#FF9E3B",
      realSound: require("../../../assets/sounds/lion2.mp3"),
    },
    {
      name: "Elephant",
      sound: "trumpet",
      image: require("../../../assets/images/animals/elephant.webp"),
      color: "#9E9E9E",
      realSound: require("../../../assets/sounds/elephant.mp3"),
    },
    {
      name: "Monkey",
      sound: "chatter",
      image: require("../../../assets/images/animals/monkey.jpg"),
      color: "#795548",
      realSound: require("../../../assets/sounds/monkey.mp3"),
    },
    {
      name: "Zebra",
      sound: "bray",
      image: require("../../../assets/images/animals/zebra.webp"),
      color: "#212121",
      realSound: require("../../../assets/sounds/zebra.mp3"),
    },
    {
      name: "Penguin",
      sound: "honk",
      image: require("../../../assets/images/animals/penguin.jpg"),
      color: "#000000",
      realSound: require("../../../assets/sounds/penguin.mp3"),
    },
    {
      name: "Hippo",
      sound: "grunt",
      image: require("../../../assets/images/animals/hippo.webp"),
      color: "#607D8B",
      realSound: require("../../../assets/sounds/hippo.mp3"),
    },
    {
      name: "Cat",
      sound: "meow",
      image: require("../../../assets/images/animals/cat.jpg"),
      color: "#607D8B",
      realSound: require("../../../assets/sounds/cat.mp3"),
    },
  ];

  const playSound = async (animal) => {
    Speech.stop();

    if (currentSound.current) {
      await currentSound.current.stopAsync();
      await currentSound.current.unloadAsync();
      currentSound.current = null;
    }

    Speech.speak(animal.name, {
      rate: 0.2,
      pitch: 1.1,
      language: "en-US",
      onDone: async () => {
        const { sound } = await Audio.Sound.createAsync(animal.realSound);
        currentSound.current = sound;
        await sound.playAsync();

        sound.setOnPlaybackStatusUpdate((status) => {
          if (status.didJustFinish) {
            sound.unloadAsync();
            currentSound.current = null;
          }
        });
      },
    });
  };

  useFocusEffect(
    useCallback(() => {
      return () => {
        Speech.stop();
        if (currentSound.current) {
          currentSound.current.unloadAsync();
        }
      };
    }, [])
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.animalCard, { backgroundColor: item.color }]}
      onPress={() => playSound(item)}
      activeOpacity={0.7}
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
      source={require("../../../assets/images/kidsbg.jpg")}
      style={styles.container}
      blurRadius={2}
    >
      <Text style={styles.title}>Animal Friends</Text>
      <Text style={styles.subtitle}>Tap to hear their sounds!</Text>

      <FlatList
        data={animals}
        renderItem={renderItem}
        keyExtractor={(item) => item.name}
        numColumns={2}
        contentContainerStyle={styles.grid}
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
    textShadowColor: "rgba(0,0,0,0.2)",
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
    width: width / 2 - 24,
    height: width / 2 - 24,
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

export default AnimalsScreen;
