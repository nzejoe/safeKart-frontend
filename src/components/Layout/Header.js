import React, { memo, useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
// icons
import { BsCart4 } from "react-icons/bs";
import { AiOutlineLogout } from "react-icons/ai";
import { FaRegUser } from "react-icons/fa";

// redux
import { userLogout, actions as userActions } from "../../store/user-slice";
import { getCartList } from "../../store/cart-slice";
// utils
import { getTotalCart } from "../../utils";
// style
import styles from "./Header.module.css";

const Header = () => {
  const { authUser } = useSelector((state) => state.users);
  const { cartList, refresh } = useSelector((state) => state.carts);

  // navbar navlinks toggler
  const [showLinks, setShowLinks] = useState(false);

  // get user token
  const token = authUser && authUser.token;
  const totalCartItems = getTotalCart(cartList);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCartList(token));
  }, [dispatch, token, refresh]);

  const handleLogout = (e) => {
    dispatch(userLogout(token));
    dispatch(userActions.setLoginRedirect(null));
    setShowLinks(false);
  };

  // BROWSER RESIZE HANDLER
  useEffect(() => {
    function runSetLink(e) {
      // if browser window is greater than 600px
      if (e.target.outerWidth > 600) {
        setShowLinks(false);
      }
    }
    window.addEventListener("resize", runSetLink);

    return () => window.removeEventListener("resize", runSetLink);
  }, []);

  return (
    <section className={`${styles.navbar}`}>
      <div className={`section__wrapper`}>
        <div className={styles.logo}>
          <h5>SafeKart</h5>
        </div>
        <div className={`${styles.navbar__navigation}`}>
          {/* TOGGLE BUTTON */}
          <div
            className={`${styles.navbar__nav_toggler} ${showLinks && styles.nav__links_active}`}
            onClick={() => setShowLinks(!showLinks)}
          >
            <span className={styles.toggle__btn}></span>
          </div>
          <div
            className={`${styles.navbar__links} ${
              showLinks && styles.show__links
            }`}
          >
            <div className={styles.link__wrapper}>
              <ul className="nav__links">
                <li>
                  <NavLink to="/" onClick={() => setShowLinks(false)}>
                    home
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/store/" onClick={() => setShowLinks(false)}>
                    store
                  </NavLink>
                </li>
              </ul>
              <div>
                {/* CART */}
                <Link
                  to="/carts/"
                  className={styles.cart__link}
                  onClick={() => setShowLinks(false)}
                  title="View Cart"
                >
                  <BsCart4 className={styles.cart} />
                  <span> {totalCartItems}</span>
                </Link>
                {/* USER */}
                <div className={styles.user__icon_wrapper}>
                  <FaRegUser className={styles.user__icon} />
                  <p className={styles.user__greeting}>
                    Welcome, {authUser ? authUser.username : "Guest"}{" "}
                  </p>{" "}
                </div>
                {authUser ? (
                  <div className={styles.user__info}>
                    <div className={styles.user__info_wrapper}>
                      <Link
                        to="/accounts/password_change/"
                        onClick={() => setShowLinks(false)}
                      >
                        change password
                      </Link>{" "}
                      <button
                        type="button"
                        className={styles.logout__btn}
                        onClick={handleLogout}
                        title="Log out"
                      >
                        <AiOutlineLogout className={styles.logout__icon} />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className={styles.user__info}>
                    <div className={styles.user__info_wrapper}>
                      <Link
                        to="accounts/login/"
                        onClick={() => setShowLinks(false)}
                      >
                        log in
                      </Link>{" "}
                      <Link
                        to="accounts/register/"
                        onClick={() => setShowLinks(false)}
                      >
                        register
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(Header);
