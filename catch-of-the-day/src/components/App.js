import React, { useState } from "react";

import Header from "./Header";
import Order from "./Order";
import Inventory from "./Inventory";
import sampleFishes from "../sample-fishes";
import Fish from "./Fish";

const App = () => {
  const [fishes, setFishes] = useState({});
  const [order, setOrder] = useState({});

  const addFish = (fish) => {
    const newFishes = { ...fishes };
    newFishes[`fish${Date.now()}`] = fish;
    setFishes(newFishes);
  };

  const loadSampleFishes = () => {
    setFishes(sampleFishes);
  };
  console.log(fishes);

  return (
    <div className="catch-of-the-day">
      <div className="menu">
        <Header tagline="Fresh Seafood Market" />
        <ul className="fishes">
          {Object.keys(fishes).map((key) => (
            <Fish key={key} details={fishes[key]}>
              {key}
            </Fish>
          ))}
        </ul>
      </div>
      <Order />
      <Inventory addFish={addFish} loadSampleFishes={loadSampleFishes} />
    </div>
  );
};

export default App;
