import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

// store
import { getCartList } from "../../store/cart-slice";
import { actions as userActions } from "../../store/user-slice";

import CartItem from "../Cart/CartItem";

//utils
import { getTotalAmount } from "../../utils";

const CartPage = () => {
  document.title = "Cart | SafeKart";
  const { authUser } = useSelector((state) => state.users);
  const { cartList, refresh } = useSelector((state) => state.carts);

 
  const dispatch = useDispatch();

  const totalAmount = getTotalAmount(cartList);

  useEffect(() => {
    const token = authUser && authUser.token
    dispatch(getCartList(token));
  }, [dispatch, authUser, refresh]);

  const handleCheckout = () => {
    if(!authUser){
      dispatch(userActions.setLoginRedirect("/checkout/"));
    }
  };
  

  return (
    <section className={`section `}>
      <div className="section__wrapper">
        <div className="cart__list">
          {cartList &&
            cartList.map((item) => {
              return <CartItem key={item.id} item={item} />;
            })}
          {cartList && cartList.length > 0 && (
            <div>
              <h4>
                total amount: $<span>{totalAmount}</span>
              </h4>
              <Link to="/checkout/" onClick={handleCheckout}>checkout</Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CartPage;
