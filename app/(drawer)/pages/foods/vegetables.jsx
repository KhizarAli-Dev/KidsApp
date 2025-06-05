import React, { useMemo } from "react";
import ItemGrid from "../../../../components/ItemGrid";

const VegetablesScreen = () => {
  const vegetables = useMemo(
    () => [
      { name: "Tomato", image: require("../../../../assets/images/vegetables/tomato.jpg") },
      { name: "Onion", image: require("../../../../assets/images/vegetables/onion.jpg") },
      { name: "Carrot", image: require("../../../../assets/images/vegetables/carrot.jpg") },
      { name: "Bringle", image: require("../../../../assets/images/vegetables/bringle.jpg") },
      { name: "Lemon", image: require("../../../../assets/images/vegetables/lemon.jpg") },
    ],
    []
  );

  return (
    <ItemGrid
      items={vegetables}
      title="Vegetables"
      background={require("../../../../assets/images/kidsbg.jpg")}
    />
  );
};

export default VegetablesScreen;
