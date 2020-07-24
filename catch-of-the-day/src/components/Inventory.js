import React, { useState } from "react";
import firebase, { database } from "firebase";
import AddFishForm from "./AddFishForm";
import EditFishForm from "./editFishForm";
import Login from "./login";
import base, { firebaseApp } from "../base";

const Inventory = ({
  addFish,
  loadSampleFishes,
  fishes,
  updateFish,
  deleteFish,
  storeId,
}) => {
  const [uid, setUid] = useState();
  const [owner, setOwner] = useState();

  const authHandler = async (authData) => {
    //1. look up the current store in the firebase database
    const store = await base.fetch(storeId, {
      context: Inventory,
    });
    //2. claim it if there is no owner
    if (!store.owner) {
      await base.post(`${storeId}/owner`, {
        data: authData.user.uid,
      });
    }
    setUid(authData.user.uid);
    setOwner(store.owner || authData.user.uid);
    console.log(store);
    console.log(authData);
  };

  const authenticate = (provider) => {
    const authProvider = new firebase.auth[`${provider}AuthProvider`]();
    firebaseApp.auth().signInWithPopup(authProvider).then(authHandler);
  };

  return (
    <div>
      {!uid && <Login authenticate={authenticate} />}
      {uid && (
        <div className="inventory">
          <h2>Inventory</h2>
          {Object.keys(fishes).map((key) => (
            <EditFishForm
              key={key}
              index={key}
              fish={fishes[key]}
              updateFish={updateFish}
              deleteFish={deleteFish}
            />
          ))}
          <AddFishForm addFish={addFish} />
          <button onClick={loadSampleFishes}>Load Sample Fishes</button>
        </div>
      )}
    </div>
  );
};

export default Inventory;
