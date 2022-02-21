import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
// icons
import { FiPlus, FiMinus } from "react-icons/fi";

// store
import { actions as cartActions } from "../../store/cart-slice";

const CartItem = ({ item, styles }) => {
  const { authUser } = useSelector((state) => state.users)
  const { product, variation } = item;

  const dispatch = useDispatch();

  // this increases the quantity of cart item
  const incrementItem = async () => {
    // check if user is authenticated
    if(authUser){
      // increment on server
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
    }else{
      // increment on localStorage
      dispatch(cartActions.incrementItem(item.id))
    }
  };

  // this reduces the quantity of cart item
  const decrementItem = async () => {
    // check if user is authenticated
    if (authUser) {
      // decrement on server
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
    }else{
      // increment on localStorage
      dispatch(cartActions.decrementItem(item.id));
    }
  };

  // this reduces the quantity of cart item
  const removeItem = async () => {
    if(authUser){
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
    }else{
      dispatch(cartActions.removeItem(item.id));
    }
  };

  return (
    <div className={styles.cart__item}>
      <div className={styles.cart__item_container}>
        <div className={styles.cart__item_left}>
          <div className={styles.cart__item_img}>
            <img
              src={product.image}
              alt={product.product_name}
              style={{ width: "100px" }}
            />
          </div>
          <div>
            <Link to={`/store/${product.slug}`}>
              <h4>{product.product_name}</h4>
            </Link>
            {variation.brand && (
              <p>
                brand: <span className={styles.value}>{variation.brand}</span>
              </p>
            )}
            {variation.color && (
              <p>
                color: <span className={styles.value}>{variation.color}</span>
              </p>
            )}
            {variation.size && (
              <p>
                size: <span className={styles.value}>{variation.size}</span>
              </p>
            )}
            <p>
              price:{" "}
              <span className={styles.value}>
                $<span>{product.price}</span>
              </span>
            </p>
          </div>
        </div>
        <div className={styles.cart__item_center}>
          <button onClick={decrementItem} className={styles.btn__left}>
            <FiMinus className={styles.icon} />
          </button>
          <span>{item.quantity}</span>
          <button onClick={incrementItem} className={styles.btn__right}>
            {" "}
            <FiPlus className={styles.icon} />
          </button>
        </div>

        <div className={styles.cart__item_right}>
          <h2>
            $<span>{parseFloat(item.total_amount).toFixed(2)}</span>
          </h2>
        </div>
      </div>
      <div className={styles.btn__remove_container}>
        <span className={styles.btn__remove} onClick={removeItem}>
          remove
        </span>
      </div>
    </div>
  );
};

export default CartItem;
