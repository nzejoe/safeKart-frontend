import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

// store
import { getCartList } from "../../store/cart-slice";
import { actions as userActions } from "../../store/user-slice";

import CartItem from "../Cart/CartItem";
//utils
import { getTotalAmount } from "../../utils";
// style
import styles from "./CartPage.module.css";

const CartPage = () => {
  document.title = "Cart | SafeKart";
  const { authUser } = useSelector((state) => state.users);
  const { cartList, refresh } = useSelector((state) => state.carts);

  const dispatch = useDispatch();

  const totalAmount = getTotalAmount(cartList);

  useEffect(() => {
    const token = authUser && authUser.token;
    dispatch(getCartList(token));
  }, [dispatch, authUser, refresh]);

  const handleCheckout = () => {
    if (!authUser) {
      dispatch(userActions.setLoginRedirect("/checkout/"));
    }
  };

  return (
    <section className={`section `}>
      <div className={`section__wrapper ${styles.cart__page}`}>
        <h2>Shopping Cart</h2>
        <div className={styles.cart__list_container}>
          <div className={styles.cart__list}>
            {cartList &&
              cartList.map((item) => {
                return <CartItem key={item.id} item={item} styles={styles} />;
              })}
            {cartList && cartList.length === 0 && (
              <div>
                <h4>Your shopping cart is empty.</h4>
              </div>
            )}
          </div>
          {cartList && cartList.length > 0 && (
            <div className={styles.cart__amount_container}>
              <div className={styles.cart__amount}>
                <div className={styles.header}>
                  <h3>Cost of order</h3>
                </div>
                <div className={styles.body}>
                  <h4>
                    total amount: <span>$</span>
                    <span>{totalAmount.toFixed(2)}</span>
                  </h4>
                </div>
              </div>
              <div className={styles.btn__checkout}>
                <Link to="/checkout/" onClick={handleCheckout}>
                  checkout
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CartPage;
