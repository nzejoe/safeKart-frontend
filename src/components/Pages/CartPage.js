import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

import { actions as cartActions } from "../../store/cart-slice";

const CartPage = () => {
  document.title = "Cart | SafeKart";
  const { token } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  dispatch(cartActions.getCartList(token));

  return (
    <section className={`section `}>
      <div className="section__wrapper">cart items</div>
    </section>
  );
};

export default CartPage;
