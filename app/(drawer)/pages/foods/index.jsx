import React, { useMemo } from "react";
import ItemGrid from "../../../../components/ItemGrid";

const FruitsScreen = () => {
  const fruits = useMemo(
    () => [
      { name: "Apple", image: require("../../../../assets/images/fruits/apple.jpg") },
      { name: "Orange", image: require("../../../../assets/images/fruits/orange.jpg") },
      { name: "Banana", image: require("../../../../assets/images/fruits/banana.jpg") },
      { name: "Mango", image: require("../../../../assets/images/fruits/mango.jpg") },
      { name: "Strawberry", image: require("../../../../assets/images/fruits/strawberry.jpg") },
      { name: "Watermelon", image: require("../../../../assets/images/fruits/watermelon.jpg") },
      { name: "PineApple", image: require("../../../../assets/images/fruits/pineapple.jpg") },
      { name: "Grapes", image: require("../../../../assets/images/fruits/grapes.jpg") },
    ],
    []
  );

  return (
    <ItemGrid
      items={fruits}
      title="Fruits"
      background={require("../../../../assets/images/kidsbg.jpg")}
    />
  );
};

export default FruitsScreen;
