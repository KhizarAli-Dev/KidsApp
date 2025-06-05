import React, { useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import { ImageBackground } from "expo-image";

const { width } = Dimensions.get("window");
const CARD_SIZE = width / 2 - 32; // Adjusted for padding/margin

const FruitNames = () => {
  const router = useRouter();

  const fruits = useMemo(
    () => [
      {
        name: "Apple",
        screen: "/trace/drawingcolor/fruits/fruitstrace/apple",
        color: "#FF9E3B",
        image: require("../../../../assets/images/fruits/apple.jpg"),
      },
      {
        name: "Banana",
        screen: "/trace/drawingcolor/fruits/fruitstrace/banana",
        color: "#FFCA28",
        image: require("../../../../assets/images/fruits/banana.jpg"),
      },
      {
        name: "Mango",
        screen: "/trace/drawingcolor/fruits/fruitstrace/mango",
        color: "#FF7043",
        image: require("../../../../assets/images/fruits/mango.jpg"),
      },
    ],
    []
  );

  return (
    <ImageBackground
      source={require("../../../../assets/images/kidsbg.jpg")}
      style={styles.container}
    >
      <Text style={styles.heading}>Color On Fruits</Text>

      <FlatList
        data={fruits}
        keyExtractor={(item) => item.name}
        numColumns={2}
        contentContainerStyle={{
          paddingBottom: Platform.OS === "ios" ? 100 : 85,
        }}
        columnWrapperStyle={{
          justifyContent: "space-between",
          marginBottom: 16,
        }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.card,
              { width: CARD_SIZE, backgroundColor: item.color },
            ]}
            onPress={() => router.push(item.screen)}
            activeOpacity={0.8}
          >
            <Image
              source={item.image}
              style={styles.cardImage}
              resizeMode="cover"
            />
            <View style={styles.overlay} />
            <Text style={styles.cardText}>{item.name}</Text>
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
    backgroundColor: "#fff",
    padding: 20,
  },
  heading: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color:'white'
  },
  card: {
    height: CARD_SIZE,
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
  cardImage: {
    ...StyleSheet.absoluteFillObject,
    width: "100%",
    height: "100%",
    borderRadius: 20,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.3)",
    borderRadius: 20,
  },
  cardText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    textShadowColor: "rgba(0,0,0,0.7)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
    zIndex: 2,
  },
});

export default FruitNames;
