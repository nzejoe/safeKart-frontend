import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { getCartList } from "../../store/cart-slice";

import CartItem from "../Cart/CartItem";

//utils
import { getTotalAmount } from "../../utils/cart";

const CartPage = () => {
  document.title = "Cart | SafeKart";
  const { token } = useSelector((state) => state.users);
  const { cartList, refresh } = useSelector((state) => state.carts);
 
  const dispatch = useDispatch();

  const totalAmount = getTotalAmount(cartList);

  useEffect(()=>{
    dispatch(getCartList(token));
  },[dispatch, token, refresh]);

  return (
    <section className={`section `}>
      <div className="section__wrapper">
        <div className="cart__list">
          {cartList &&
            cartList.map((item) => {
              return <CartItem key={item.id} item={item} />;
            })}
          {cartList && cartList.length > 0 && (
            <h4>
              total amount: $<span>{totalAmount}</span>
            </h4>
          )}
        </div>
      </div>
    </section>
  );
};

export default CartPage;
