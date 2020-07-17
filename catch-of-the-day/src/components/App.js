import React, { useState } from "react";

import Header from "./Header";
import Order from "./Order";
import Inventory from "./Inventory";

const App = () => {
  const [fishes, setFishes] = useState({});
  const [order, setOrder] = useState({});

  // const addFish = (fish) => {
  //   const newFishes = { ...fishes };
  //   newFishes[`fish${Date.now()}`] = fish;
  //   console.Log(newFishes);
  //   setFishes(newFishes);
  // };

  const addFish = () => {
    console.log("hello");
  };

  return (
    <div className="catch-of-the-day">
      <div className="menu">
        <Header tagline="Fresh Seafood Market" />
      </div>
      <Order />
      <Inventory addFish={addFish} />
    </div>
  );
};

export default App;
