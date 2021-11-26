import React, { memo, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

// redux
import { userLogout, actions as userActions } from "../../store/user-slice";
import { getCartList } from "../../store/cart-slice";
// utils
import { getTotalCart } from "../../utils";

const Header = () => {
  const { authUser } = useSelector((state) => state.users);
  const { cartList, refresh } = useSelector((state) => state.carts);

  const token = authUser && authUser.token
  const totalCartItems = getTotalCart(cartList);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCartList(token));
  }, [dispatch, token, refresh]);

  const handleLogout = (e) => {
    dispatch(userLogout(token));
    dispatch(userActions.setLoginRedirect(null));
  };

  return (
    <section>
      <div>
        <h5>SafeKart</h5>
      </div>
      <div>
        <ul>
          <li>
            <NavLink to="/">home</NavLink>
          </li>
          <li>
            <NavLink to="/store/">store</NavLink>
          </li>
        </ul>
        <div>
          {authUser ? (
            <div className="userInfor">
              <p>Welcome, {authUser.username} </p>
              <div>
                <Link to="/carts/">myCart</Link>{" "}
                <span style={{ color: "red" }}> {totalCartItems}</span>
              </div>
              <Link to="/accounts/password_change/">change password</Link>{" "}
              <br />
              <button type="button" onClick={handleLogout}>
                Log out
              </button>
            </div>
          ) : (
            <div className="anonUser">
              {" "}
              <Link to="accounts/login/">log in</Link>{" "}
              <Link to="accounts/register/">register</Link>
              <Link to="/carts/">myCart</Link>
              <div>
                <Link to="/carts/">myCart</Link>{" "}
                <span style={{ color: "red" }}> {totalCartItems}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default memo(Header);
