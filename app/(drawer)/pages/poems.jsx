import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { Video } from "expo-av";
import { ImageBackground } from "expo-image";

const poemsData = [
  {
    title: "🌟 Twinkle Twinkle Little Star",
    lyrics: `Twinkle, twinkle, little star,\nHow I wonder what you are!\nUp above the world so high,\nLike a diamond in the sky.`,
    videoFile: require("../../../assets/poems/twinkle.mp4"),
  },
  {
    title: "🥚 Humpty Dumpty",
    lyrics: `Humpty Dumpty sat on a wall,\nHumpty Dumpty had a great fall.\nAll the king’s horses and all the king’s men\nCouldn't put Humpty together again.`,
    videoFile: require("../../../assets/poems/humpty.mp4"),
  },
];

const Poems = () => {
  const renderItem = ({ item, index }) => (
    <View style={[styles.card, { backgroundColor: getCardColor(index) }]}>
      <Text style={styles.title}>{item.title}</Text>
      <Video
        source={item.videoFile}
        style={styles.video}
        useNativeControls
        resizeMode="contain"
      />
      <Text style={styles.lyrics}>{item.lyrics}</Text>
    </View>
  );

  return (
    <ImageBackground
      source={require("../../../assets/images/kidsbg.jpg")}
      style={styles.container}
      blurRadius={2}
    >
      <FlatList
        data={poemsData}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
        contentContainerStyle={{ padding: 16, paddingBottom: 30 }}
        ListHeaderComponent={
          <Text style={styles.heading}>📚 Fun Poems for Kids 🎶</Text>
        }
        showsVerticalScrollIndicator={false}
      />
    </ImageBackground>
  );
};

const getCardColor = (index) => {
  const colors = [
    "#FFF8DC", "#FFEBEE", "#E1F5FE", "#E8F5E9", "#FFF3E0",
    "#FCE4EC", "#F3E5F5", "#F9FBE7", "#E0F7FA", "#FFE0B2",
  ];
  return colors[index % colors.length];
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  heading: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
    color: "white",
    textShadowColor: "#FFD700",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  card: {
    width: "95%",
    marginVertical: 12,
    padding: 18,
    borderRadius: 25,
    elevation: 6,
    shadowColor: "#888",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    alignSelf: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 14,
    color: "#4A148C",
    textAlign: "center",
    fontFamily: "Cochin",
  },
  lyrics: {
    fontSize: 16,
    color: "#444",
    marginTop: 10,
    lineHeight: 24,
    textAlign: "center",
  },
  video: {
    height: 210,
    width: "100%",
    borderRadius: 15,
    backgroundColor: "#000",
  },
});

export default Poems;
