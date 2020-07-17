import React from "react";
import { formatPrice } from "../helpers";

const Fish = ({ details }) => {
  console.log(details);
  return (
    <li className="menu-fish">
      <img src={details.image} alt={details.name}></img>
      <h3 className="fish-name">
        {details.name}
        <span className="price">{formatPrice(details.price)}</span>
      </h3>
      <p>{details.desc}</p>
      <button>Add To Cart</button>
    </li>
  );
};

export default Fish;
