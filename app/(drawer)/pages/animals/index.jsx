import React, { useMemo } from "react";
import AnimalGrid from "../../../../components/AnimalGrid";

const AnimalsScreen = () => {
  const animals = useMemo(
    () => [
      {
        name: "Lion",
        image: require("../../../../assets/images/animals/lion.jpg"),
        realSound: require("../../../../assets/sounds/animals/lion2.mp3"),
      },
      {
        name: "Elephant",
        image: require("../../../../assets/images/animals/elephant.webp"),
        realSound: require("../../../../assets/sounds/animals/elephant.mp3"),
      },
      {
        name: "Monkey",
        image: require("../../../../assets/images/animals/monkey.jpg"),
        realSound: require("../../../../assets/sounds/animals/monkey.mp3"),
      },
      {
        name: "Zebra",
        image: require("../../../../assets/images/animals/zebra.webp"),
        realSound: require("../../../../assets/sounds/animals/zebra.mp3"),
      },
      {
        name: "Penguin",
        image: require("../../../../assets/images/animals/penguin.jpg"),
        realSound: require("../../../../assets/sounds/animals/penguin.mp3"),
      },
      {
        name: "Hippo",
        image: require("../../../../assets/images/animals/hippo.webp"),
        realSound: require("../../../../assets/sounds/animals/hippo.mp3"),
      },
      {
        name: "Cat",
        image: require("../../../../assets/images/animals/cat.jpg"),
        realSound: require("../../../../assets/sounds/animals/cat.mp3"),
      },
      {
        name: "Horse",
        image: require("../../../../assets/images/animals/horse.jpeg"),
        realSound: require("../../../../assets/sounds/animals/horse.mp3"),
      },
      {
        name: "Cow",
        image: require("../../../../assets/images/animals/cow.jpg"),
        realSound: require("../../../../assets/sounds/animals/cow.mp3"),
      },
    ],
    []
  );

  return (
    <AnimalGrid
      title="Animal Friends"
      subtitle="Tap to hear their sounds!"
      items={animals}
      backgroundImage={require("../../../../assets/images/kidsbg.jpg")}
    />
  );
};

export default AnimalsScreen;
