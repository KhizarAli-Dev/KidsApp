import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import React from "react";
import { ImageBackground } from "expo-image";

const AboutUs = () => {
  return (
    <ImageBackground
      source={require("../../../assets/images/kidsbg.jpg")}
      style={styles.container}
      // blurRadius={2}
    >
      <ScrollView style={styles.background}>
        <View style={styles.card}>
          <Image
            source={require("../../../assets/images/adaptive-icon.png")}
            style={styles.logo}
          />
          <Text style={styles.heading}>About Us</Text>
          <Text style={styles.text}>
            This app is proudly developed by{" "}
            <Text style={styles.bold}>Universals Tech</Text>, especially
            designed to help children learn in a fun, interactive, and creative
            way.
          </Text>
          <Text style={styles.footer}>
            Thank you for choosing our app. Keep learning, keep growing! 🌟
          </Text>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default AboutUs;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    flex: 1,
  },
  background: {
    flex: 1,
    // backgroundColor: '#E3F2FD', // Light sky blue
  },
  card: {
    backgroundColor: "#FFFFFF",
    margin: 20,
    padding: 20,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  logo: {
    width: 100,
    height: 100,
    alignSelf: "center",
    marginBottom: 20,
    borderRadius: 20,
  },
  heading: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#6C63FF",
    marginBottom: 20,
    textAlign: "center",
  },
  text: {
    fontSize: 16,
    color: "#333",
    marginBottom: 15,
    lineHeight: 24,
  },
  bold: {
    fontWeight: "bold",
    color: "#6C63FF",
  },
  footer: {
    fontSize: 16,
    color: "#4CAF50",
    marginTop: 10,
    fontWeight: "600",
    textAlign: "center",
  },
});
