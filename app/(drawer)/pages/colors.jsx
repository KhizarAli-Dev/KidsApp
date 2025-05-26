import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ImageBackground,
} from 'react-native';
import * as Speech from 'expo-speech';
import { Ionicons } from '@expo/vector-icons';

const COLORS = [
  { name: 'Red', hex: '#FF0000', textColor: '#FFF' },
  { name: 'Orange', hex: '#FFA500', textColor: '#000' },
  { name: 'Yellow', hex: '#FFFF00', textColor: '#000' },
  { name: 'Green', hex: '#00FF00', textColor: '#000' },
  { name: 'Blue', hex: '#0000FF', textColor: '#FFF' },
  { name: 'Purple', hex: '#800080', textColor: '#FFF' },
  { name: 'Pink', hex: '#FFC0CB', textColor: '#000' },
  { name: 'Brown', hex: '#A52A2A', textColor: '#FFF' },
  { name: 'Black', hex: '#000000', textColor: '#FFF' },
  { name: 'White', hex: '#FFFFFF', textColor: '#000', borderColor: '#DDD' },
  { name: 'Gray', hex: '#808080', textColor: '#FFF' },
  { name: 'Cyan', hex: '#00FFFF', textColor: '#000' },
];

const ColorsScreen = () => {
  const [activeColor, setActiveColor] = useState(null);

  const speakColor = useCallback((color) => {
    setActiveColor(color.name);
    Speech.stop();
    Speech.speak(color.name, {
      rate: 0.2,
      pitch: 1.1,
      language: 'en-US',
    });
  }, []);

  useEffect(() => {
    return () => Speech.stop(); // Cleanup on unmount
  }, []);

  const renderItem = useCallback(({ item: color }) => (
    <TouchableOpacity
      style={[
        styles.colorCard,
        {
          backgroundColor: color.hex,
          borderColor: color.borderColor || color.hex,
          transform: [{ scale: activeColor === color.name ? 1.05 : 1 }],
        },
      ]}
      onPress={() => speakColor(color)}
      activeOpacity={0.75}
    >
      <Text style={[styles.colorName, { color: color.textColor }]}>
        {color.name}
      </Text>
      <Ionicons
        name="color-palette"
        size={24}
        color={color.textColor}
        style={styles.icon}
      />
    </TouchableOpacity>
  ), [activeColor, speakColor]);

  return (
    <ImageBackground
      source={require('../../../assets/images/kidsbg.jpg')}
      style={styles.container}
      blurRadius={2}
    >
      <Text style={styles.title}>Color Explorer</Text>
      <Text style={styles.subtitle}>Tap to learn colors!</Text>

      <FlatList
        data={COLORS}
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
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
    color: '#FFF',
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
    color: '#FFF',
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  grid: {
    paddingHorizontal: 10,
    paddingBottom: 20,
    alignItems: 'center',
  },
  colorCard: {
    width: 150,
    height: 150,
    margin: 10,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    borderWidth: 2,
  },
  colorName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  icon: {
    position: 'absolute',
    bottom: 15,
    right: 15,
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
});

export default ColorsScreen;
