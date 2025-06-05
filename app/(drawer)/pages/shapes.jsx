import React, { useState, useCallback, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ImageBackground,
  Dimensions,
} from 'react-native';
import * as Speech from 'expo-speech';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const SHAPES = [
  { name: 'Circle', icon: 'circle', color: '#FF5733' },
  { name: 'Square', icon: 'square', color: '#33FF57' },
  { name: 'Triangle', icon: 'triangle', color: '#3357FF' },
  { name: 'Rectangle', icon: 'rectangle', color: '#F333FF' },
  { name: 'Star', icon: 'star', color: '#FFC107' },
  { name: 'Heart', icon: 'heart', color: '#FF4081' },
  { name: 'Oval', icon: 'egg', color: '#4CAF50' },
  { name: 'Pentagon', icon: 'pentagon', color: '#9C27B0' },
  { name: 'Hexagon', icon: 'hexagon', color: '#FF9800' },
  { name: 'Rhombus', icon: 'rhombus', color: '#00BCD4' },
  { name: 'Crescent', icon: 'moon-waning-crescent', color: '#607D8B' },
  { name: 'Diamond', icon: 'diamond', color: '#E91E63' },
];

const ShapesScreen = () => {
  const [activeShape, setActiveShape] = useState(null);
  const [orientation, setOrientation] = useState('portrait');

  // Detect orientation change
  useEffect(() => {
    const updateOrientation = () => {
      const { width, height } = Dimensions.get('window');
      setOrientation(width > height ? 'landscape' : 'portrait');
    };

    updateOrientation(); // Initial check

    const subscription = Dimensions.addEventListener('change', updateOrientation);

    return () => {
      subscription?.remove();
    };
  }, []);

  const speakShape = (shape) => {
    setActiveShape(shape.name);
    Speech.stop();
    Speech.speak(shape.name, {
      rate: 0.2,
      pitch: 1,
      language: 'en-US',
    });
  };

  const renderItem = useCallback(
    ({ item }) => (
      <TouchableOpacity
        style={[
          styles.shapeCard,
          {
            backgroundColor: item.color,
            transform: [{ scale: activeShape === item.name ? 1.05 : 1 }],
          },
        ]}
        onPress={() => speakShape(item)}
        activeOpacity={0.75}
      >
        <MaterialCommunityIcons name={item.icon} size={60} color="#FFF" />
        <Text style={styles.shapeName}>{item.name}</Text>
        <Ionicons
          name="volume-high"
          size={24}
          color="#FFF"
          style={styles.icon}
        />
      </TouchableOpacity>
    ),
    [activeShape]
  );

  useEffect(() => {
    return () => Speech.stop();
  }, []);

  return (
    <ImageBackground
      source={require('../../../assets/images/kidsbg.jpg')}
      style={styles.container}
      // blurRadius={2}
    >
      <View>
        <Text style={styles.title}>Shapes World</Text>
        <Text style={styles.subtitle}>Tap to learn shapes!</Text>
      </View>

      <FlatList
        data={SHAPES}
        renderItem={renderItem}
        keyExtractor={(item) => item.name}
        numColumns={orientation === 'portrait' ? 2 : 4} // change columns based on orientation
        contentContainerStyle={[
          styles.grid,
          orientation === 'landscape' && { paddingHorizontal: 40 }, // more padding in landscape
        ]}
        showsVerticalScrollIndicator={false}
        key={orientation} // important to force re-render FlatList on orientation change
      />
    </ImageBackground>
  );
};

export default ShapesScreen;

// ---------------------- STYLES ---------------------- //

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 8,
    color: '#FFF',
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 30,
    color: '#FFF',
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  grid: {
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingBottom: 30,
  },
  shapeCard: {
    flex: 1,
    margin: 10,
    height: 150,
    maxWidth: '45%',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.3)',
    position: 'relative',
  },
  shapeName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
    marginTop: 10,
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
