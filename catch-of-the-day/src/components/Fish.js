import React from "react";
import PropTypes from "prop-types";
import { formatPrice } from "../helpers";

const Fish = ({ details, index, addToOrder }) => {
  const handleClick = () => {
    addToOrder(index);
  };
  const isAvailable = details.status === "available";
  return (
    <li className="menu-fish">
      <img src={details.image} alt={details.name}></img>
      <h3 className="fish-name">
        {details.name}
        <span className="price">{formatPrice(details.price)}</span>
      </h3>
      <p>{details.desc}</p>
      <button disabled={!isAvailable} onClick={handleClick}>
        {isAvailable ? "Add To Order" : "Sold out!"}
      </button>
    </li>
  );
};

// Fish.PropTypes = {
//   details: PropTypes.shape({
//     image: PropTypes.string,
//     name: PropTypes.string,
//     desc: PropTypes.string,
//     status: PropTypes.string,
//     price: PropTypes.number,
//   }),
//   addToOrder: PropTypes.func,
// };

export default Fish;
