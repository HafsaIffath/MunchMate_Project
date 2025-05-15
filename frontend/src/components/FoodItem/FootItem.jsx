import React from "react";

import "./FoodItem.css";
import { assets } from "../../assets/assets";
import { useState } from "react";
import { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
function FootItem({ id, name, price, description, image }) {
  // This component represents a food item in the menu.
  const { cartItems, addToCart, removeFromCart, url } =
    useContext(StoreContext);

  return (
    <div className="food-item">
      {/* Food item image */}
      <div className="food-item-img-container">
        <img className="food-item-img" src={url + "/images/" + image} />
        {!cartItems[id] ? (
          //When Item is not added to cart
          <img
            src={assets.add_icon_white}
            className="add"
            onClick={() => addToCart(id)}
          />
        ) : (
          //When Item is added to cart
          <div className="food-item-counter">
            <img
              src={assets.remove_icon_red}
              alt=""
              onClick={() => removeFromCart(id)}
            />
            <p>{cartItems[id]}</p>
            <img
              src={assets.add_icon_green}
              alt=""
              onClick={() => addToCart(id)}
            />
          </div>
        )}
      </div>

      {/* Food Item info */}
      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>
          <img src={assets.rating_starts} alt="" />
        </div>

        {/* Food item desc */}
        <p className="food-item-description"> {description}</p>
        {/* Food item price */}
        <div className="food-item-price">&#8377;{price}</div>
      </div>
    </div>
  );
}

export default FootItem;
