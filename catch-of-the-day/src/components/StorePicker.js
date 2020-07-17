import React from "react";
import { getFunName } from "../helpers";
import { createRef } from "react";

const StorePicker = (props) => {
  const myInput = createRef();

  const goToStore = (event) => {
    event.preventDefault();
    const storeName = myInput.current.value;
    console.log(props);
    props.history.push(`/store/${storeName}`);
  };
  return (
    <>
      <form className="store-selector" onSubmit={goToStore}>
        <h2>Please Enter A Store</h2>
        <input
          type="text"
          ref={myInput}
          required
          placeholder="store Name"
          defaultValue={getFunName()}
        />
        <button type="submit">Visit Store</button>
      </form>
    </>
  );
};

export default StorePicker;
