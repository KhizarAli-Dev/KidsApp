import React, { useMemo } from "react";
import AnimalGrid from "../../../../components/AnimalGrid";

const BirdsScreen = () => {
  const birds = useMemo(
    () => [
      {
        name: "Eagle",
        image: require("../../../../assets/images/birds/eagle.webp"),
        realSound: require("../../../../assets/sounds/birds/eagle.mp3"),
      },
      {
        name: "Owl",
        image: require("../../../../assets/images/birds/owl.jpg"),
        realSound: require("../../../../assets/sounds/birds/owl.mp3"),
      },
      {
        name: "Parrot",
        image: require("../../../../assets/images/birds/parrot.webp"),
        realSound: require("../../../../assets/sounds/birds/parrot.mp3"),
      },
      {
        name: "Duck",
        image: require("../../../../assets/images/birds/duck.jpg"),
        realSound: require("../../../../assets/sounds/birds/duck.mp3"),
      },
      {
        name: "Finch",
        image: require("../../../../assets/images/birds/finch.jpg"),
        realSound: require("../../../../assets/sounds/birds/finch.mp3"),
      },
      {
        name: "Crow",
        image: require("../../../../assets/images/birds/crow.jpg"),
        realSound: require("../../../../assets/sounds/birds/crow.mp3"),
      },
      {
        name: "Pigeon",
        image: require("../../../../assets/images/birds/pigeon.jpg"),
        realSound: require("../../../../assets/sounds/birds/pigeon.mp3"),
      },
      {
        name: "Chicken",
        image: require("../../../../assets/images/birds/chicken.jpg"),
        realSound: require("../../../../assets/sounds/birds/chicken.mp3"),
      },
    ],
    []
  );

  return (
    <AnimalGrid 
      title="Bird Friends"
      subtitle="Tap to hear their sounds!"
      items={birds}
      backgroundImage={require("../../../../assets/images/kidsbg.jpg")}
    />
  );
};

export default BirdsScreen;
