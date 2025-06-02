import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  FlatList,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";

const { width } = Dimensions.get("window");

const isTablet = width >= 768;
const numColumns = isTablet ? 4 : 3;

const scaleFont = width < 400 ? 1 : width < 600 ? 1.2 : 1.5;
const scalePadding = width < 400 ? 1 : width < 600 ? 1.3 : 1.6;

// Generate A-Z letters with colors and screen paths
const getAlphabetData = () => {
  const colors = [
    "#FF9E3B",
    "#6C63FF",
    "#4CAF50",
    "#F06292",
    "#9e0059",
    "#FFCA28",
    "#FF7043",
    "#42A5F5",
    "#d62828",
    "#00f5d4",
    "#9b5de5",
    "#ff6f61",
    "#00bcd4",
    "#8bc34a",
    "#e91e63",
    "#ff9800",
    "#3f51b5",
    "#009688",
    "#cddc39",
    "#673ab7",
    "#f44336",
    "#03a9f4",
    "#607d8b",
    "#795548",
    "#e65100",
    "#880e4f",
  ];

  return Array.from({ length: 26 }, (_, i) => {
    const letter = String.fromCharCode(65 + i); // 'A' to 'Z'
    return {
      letter,
      color: colors[i % colors.length],
      screen: "/trace/english/engtraceletters/LetterTraceScreen",
      params: { letter: letter.toLowerCase() },
    };
  });
};

export default function EngTrace() {
  const router = useRouter();
  const letters = getAlphabetData();

  return (
    <ImageBackground
      source={require("../../../assets/images/kidsbg.jpg")}
      style={styles.container}
    >
      <Text style={styles.title}>A to Z Trace Letters</Text>

      <FlatList
        data={letters}
        keyExtractor={(item) => item.letter}
        numColumns={numColumns}
        columnWrapperStyle={styles.row}
        contentContainerStyle={{
          paddingBottom: Platform.OS === "ios" ? 100 : 85,
        }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.letterCard,
              {
                backgroundColor: item.color,
                width: `${100 / numColumns - 4}%`, // adjust width based on columns
              },
            ]}
            onPress={() =>
              router.push({
                pathname: "/trace/english/engtraceletters/LetterTraceScreen",
                params: { letter: item.letter.toLowerCase() },
              })
            }
            activeOpacity={0.8}
          >
            <Text style={styles.letterText}>{item.letter}</Text>
          </TouchableOpacity>
        )}
      />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16 * scalePadding,
  },
  title: {
    fontSize: 26 * scaleFont,
    fontWeight: "bold",
    color: "#FFF",
    textAlign: "center",
    marginBottom: 20,
    textShadowColor: "rgba(0,0,0,0.3)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  row: {
    justifyContent: "space-evenly",
    marginBottom: 16 * scalePadding,
  },
  letterCard: {
    aspectRatio: 1,
    borderRadius: 16 * scalePadding,
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  letterText: {
    fontSize: 25 * scaleFont,
    fontWeight: "bold",
    color: "#FFF",
    textAlign: "center",
    textShadowColor: "rgba(0,0,0,0.3)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
});
