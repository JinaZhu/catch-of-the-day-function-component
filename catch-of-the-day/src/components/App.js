import React from "react";
import Header from "./Header";
import Order from "./Order";
import Inventory from "./Inventory";
import sampleFishes from "../sample-fishes";
import Fish from "./Fish";
import base from "../base";

class App extends React.Component {
  state = {
    fishes: {},
    order: {},
  };
  componentDidMount() {
    const { params } = this.props.match;
    // reinstate localstorage
    const localStorageRef = localStorage.getItem(params.storeId);
    if (localStorageRef) {
      this.setState({ order: JSON.parse(localStorageRef) });
    }

    this.ref = base.syncState(`${params.storeId}/fishes`, {
      context: this,
      state: "fishes",
    });
  }

  componentDidUpdate() {
    localStorage.setItem(
      this.props.match.params.storeId,
      JSON.stringify(this.state.order)
    );
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  addFish = (fish) => {
    // 1. Take a copy of the existing state
    const fishes = { ...this.state.fishes };
    // 2. Add our new fish to that fishes variable
    fishes[`fish${Date.now()}`] = fish;
    // 3. Set the new fishes object to state
    this.setState({ fishes });
  };

  updateFish = (key, updatedFish) => {
    //take a copy of the current state
    const fishes = { ...this.state.fishes };
    // update state
    fishes[key] = updatedFish;
    // set state
    this.setState({ fishes });
  };

  deleteFish = (key) => {
    // take a copy for state
    const fishes = { ...fishes };
    //update state
    // firebase wants delete item to be set as null
    fishes[key] = null;
    this.setState({ fishes });
  };

  loadSampleFishes = () => {
    this.setState({ fishes: sampleFishes });
  };

  addToOrder = (key) => {
    // 1. take a copy of state
    const order = { ...this.state.order };
    // 2. Either add to the order, or update the number in our order
    order[key] = order[key] + 1 || 1;
    // 3. Call setState to update our state object
    this.setState({ order });
  };

  removeFromOrder = (key) => {
    // 1. take a copy of state
    const order = { ...this.state.order };
    // 2. remove item from order
    delete order[key];
    // 3. Call setState to update our state object
    this.setState({ order });
  };

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline={"Fresh Seafood Market"} />
          <ul className="fishes">
            {Object.keys(this.state.fishes).map((key) => (
              <Fish
                key={key}
                index={key}
                details={this.state.fishes[key]}
                addToOrder={this.addToOrder}
              />
            ))}
          </ul>
        </div>
        <Order
          fishes={this.state.fishes}
          order={this.state.order}
          removeFromOrder={this.removeFromOrder}
        />
        <Inventory
          addFish={this.addFish}
          updateFish={this.updateFish}
          loadSampleFishes={this.loadSampleFishes}
          fishes={this.state.fishes}
          deleteFish={this.deleteFish}
          storeId={this.props.match.params.storeId}
        />
      </div>
    );
  }
}

export default App;

// import React, { useState, useEffect, useRef } from "react";
// import firebase from "firebase";

// import Header from "./Header";
// import Order from "./Order";
// import Inventory from "./Inventory";
// import sampleFishes from "../sample-fishes";
// import Fish from "./Fish";
// import base from "../base";

// const App = ({
//   match: {
//     params: { storeId },
//   },
// }) => {
//   const [fishes, setFishes] = useState({});
//   const [order, setOrder] = useState({});

//   useEffect(() => {
//     console.log("firebase", firebase);
//     const db = firebase.firestore();
//     const ref = db.collection(`${storeId}`).add({
//       fishes,
//     });

//     // const ref = base.syncState(`${storeId}/fishes`, {
//     //   context: {
//     //     setState: ({ fishes }) => {
//     //       console.log("fishes in set state", fishes);
//     //       return setFishes({ ...fishes });
//     //     },
//     //     state: { fishes },
//     //   },
//     //   state: "fishes",
//     // });

//     console.log("ref", ref);
//     return () => {
//       base.removeBinding(ref);
//     };
//   }, []);
//   console.log("fishes", fishes);

//   const addFish = (fish) => {
//     const newFishes = { ...fishes };
//     newFishes[`fish${Date.now()}`] = fish;
//     setFishes(newFishes);
//   };

//   const loadSampleFishes = () => {
//     setFishes(sampleFishes);
//   };

//   const addToOrder = (key) => {
//     const newOrder = { ...order };
//     // if order that fish exist add one and if not create a new key with value of 1
//     newOrder[key] = newOrder[key] + 1 || 1;
//     setOrder(newOrder);
//   };

//   return (
//     <div className="catch-of-the-day">
//       <div className="menu">
//         <Header tagline="Fresh Seafood Market" />
//         <ul className="fishes">
//           {Object.keys(fishes).map((key) => (
//             <Fish
//               key={key}
//               index={key}
//               details={fishes[key]}
//               addToOrder={addToOrder}
//             >
//               {key}
//             </Fish>
//           ))}
//         </ul>
//       </div>
//       <Order fishes={fishes} order={order} />
//       <Inventory addFish={addFish} loadSampleFishes={loadSampleFishes} />
//     </div>
//   );
// };

// export default App;
