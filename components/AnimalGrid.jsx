import React, { useRef, useCallback } from "react";
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

const AnimalGrid = ({ title, subtitle, items, backgroundImage }) => {
  const currentSound = useRef(null);

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
      style={styles.animalCard}
      onPress={() => playSound(item)}
      activeOpacity={0.75}
    >
      <Image source={item.image} style={styles.animalImage} resizeMode="cover" />
      <Text style={styles.animalName}>{item.name}</Text>
      <Ionicons name="volume-high" size={24} color="#FFF" style={styles.soundIcon} />
    </TouchableOpacity>
  );

  return (
    <ImageBackground source={backgroundImage} style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>

      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item) => item.name}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 10,
          paddingBottom: Platform.OS === "ios" ? 100 : 85,
        }}
      />
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
    zIndex: 1,
    textShadowColor: "rgba(0,0,0,0.5)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
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

export default AnimalGrid;
