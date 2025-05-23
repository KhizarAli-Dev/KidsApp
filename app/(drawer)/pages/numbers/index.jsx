import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import * as Speech from "expo-speech";
import { ImageBackground } from "expo-image";

const Numbers = () => {
  const numbers = Array.from({ length: 20 }, (_, i) => i + 1);

  const colors = [
    "#FF5733", "#33FF57", "#3357FF", "#F333FF", "#33FFF5",
    "#FF33A8", "#A833FF", "#33FF8C", "#FF8C33", "#33A8FF",
    "#FF3361", "#61FF33", "#6133FF", "#FF33F5", "#33FFC1",
    "#FFC133", "#C133FF", "#33FF61", "#FF6133", "#33C1FF",
  ];

  const numberWords = [
    "One", "Two", "Three", "Four", "Five",
    "Six", "Seven", "Eight", "Nine", "Ten",
    "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen",
    "Sixteen", "Seventeen", "Eighteen", "Nineteen", "Twenty",
  ];

  const speak = (number) => {
    Speech.speak(numberWords[number - 1], {
      rate: 0.2,
      pitch: 1.1,
      language: "en-US",
    });
  };

  const renderItem = ({ item, index }) => (
    <TouchableOpacity
      onPress={() => speak(item)}
      style={[styles.box, { backgroundColor: colors[index] }]}
    >
      <Text style={styles.number}>{item}</Text>
      <Text style={styles.word}>{numberWords[index]}</Text>
    </TouchableOpacity>
  );

  return (
    <ImageBackground
      source={require("../../../../assets/images/kidsbg.jpg")}
      style={styles.container}
      blurRadius={2}
    >
      <Text style={styles.title}>Numbers 1-20</Text>
      <Text style={styles.subtitle}>Tap any number to hear it</Text>

      <FlatList
        data={numbers}
        renderItem={renderItem}
        keyExtractor={(item) => item.toString()}
        numColumns={3}
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
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
    color: "white",
  },
  grid: {
    paddingHorizontal: 10,
    alignItems: "center",
  },
  box: {
    width: 100,
    height: 100,
    margin: 8,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  number: {
    fontSize: 36,
    fontWeight: "bold",
    color: "white",
  },
  word: {
    fontSize: 14,
    color: "white",
    marginTop: 5,
    textTransform: "uppercase",
  },
});

export default Numbers;
