import React, { useState, useEffect } from "react";
import firebase from "firebase";
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
  // states to track user and owner
  const [uid, setUid] = useState("");
  const [owner, setOwner] = useState("");

  //check if we are already login
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        authHandler({ user });
      }
    });
  }, []);

  // match or assign storeId to user and set userid and owner for auth check

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
  };
  //login
  const authenticate = (provider) => {
    const authProvider = new firebase.auth[`${provider}AuthProvider`]();
    firebaseApp.auth().signInWithPopup(authProvider).then(authHandler);
  };
  //logout
  const logoutUser = async () => {
    await firebase.auth().signOut();
    setUid(null);
    setOwner(null);
  };

  const logout = <button onClick={logoutUser}>Log Out!</button>;

  return (
    <div>
      {!uid && <Login authenticate={authenticate} />}
      {uid !== owner && (
        <div>
          <p>Sorry you are not the owner!</p>
        </div>
      )}
      {uid && (
        <div className="inventory">
          <h2>Inventory</h2>
          {logout}
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
