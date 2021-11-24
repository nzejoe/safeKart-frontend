import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";

// store
import { actions as cartActions } from "../../store/cart-slice";

const CartItem = ({ item }) => {
  const { product, variation } = item;

  const dispatch = useDispatch();

  // this increases the quantity of cart item
  const incrementItem = async () => {
    try {
      const response = await axios({
        url: "/carts/increment_item/",
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        data: { item_id: item.id },
      });

      if (response.status === 200) {
        dispatch(cartActions.refreshCart());
      }
    } catch (error) {
      console.log(error);
    }
  };

  // this reduces the quantity of cart item
  const decrementItem = async () => {
    try {
      const response = await axios({
        url: "/carts/decrement_item/",
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        data: { item_id: item.id },
      });

      if (response.status === 200) {
        dispatch(cartActions.refreshCart());
      }
    } catch (error) {
      console.log(error);
    }
  };

  // this reduces the quantity of cart item
  const removeItem = async () => {
    try {
      const response = await axios({
        url: "/carts/remove_item/",
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        data: { item_id: item.id },
      });

      if (response.status === 200) {
        dispatch(cartActions.refreshCart());
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        border: "1px solid rgba(0, 0, 0, .1)",
        marginBottom: "1rem",
        padding: "2rem",
      }}
    >
      <div className="cart__item_img">
        <img
          src={`http://localhost:8000${product.image}`}
          alt={product.product_name}
          style={{ width: "200px" }}
        />
      </div>
      <div>
        <Link to={`/store/${product.slug}`}>
          <h4>{product.product_name}</h4>
        </Link>
        {variation.color && <p>color: {variation.color}</p>}
        {variation.size && <p>size: {variation.size}</p>}
        {variation.brand && <p>brand: {variation.brand}</p>}
        <p>price: $ {product.price}</p>
        <p>quantity: {item.quantity}</p>
        <p>amount: $ {item.total_amount}</p>
        <div className="cart__actions">
          <button onClick={decrementItem}> - </button>{" "}
          <button onClick={incrementItem}> + </button>
        </div>
        <button onClick={removeItem}>remove</button>
      </div>
    </div>
  );
};

export default CartItem;
