import React, { createRef } from "react";

const AddFishForm = ({ addFish }) => {
  const nameRef = createRef();
  const priceRef = createRef();
  const statusRef = createRef();
  const descRef = createRef();
  const imageRef = createRef();

  const createFish = (event) => {
    event.preventDefault();
    const fish = {
      name: nameRef.current.value,
      price: parseFloat(priceRef.current.value),
      status: statusRef.current.value,
      desc: descRef.current.value,
      image: imageRef.current.value,
    };
    addFish(fish);
  };

  return (
    <form className="fish-edit" onSubmit={createFish}>
      <input name="name" ref={nameRef} type="text" placeholder="Name" />
      <input name="price" ref={priceRef} type="text" placeholder="Price" />
      <select name="status" ref={statusRef}>
        <option value="avilable">Fresh!</option>
        <option value="unavailable">Sold Out!</option>
      </select>
      <textarea name="desc" ref={descRef} placeholder="Description" />
      <input name="image" ref={imageRef} type="text" placeholder="Image" />
      <button type="submit">+ Add Fish</button>
    </form>
  );
};

export default AddFishForm;
