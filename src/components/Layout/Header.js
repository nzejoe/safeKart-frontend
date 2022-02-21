import React, { memo, useEffect, useState, useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
// icons
import { BsCart4, BsSearch } from "react-icons/bs";
import { AiOutlineLogout, AiOutlineCloseCircle } from "react-icons/ai";
import { FaRegUser } from "react-icons/fa";

// redux
import { userLogout, actions as userActions } from "../../store/user-slice";
import { getCartList, actions as cartActions } from "../../store/cart-slice";
// utils
import { getTotalCart } from "../../utils";
// style
import styles from "./Header.module.css";
//ui
import ModalSearch from "../UI/ModalSearch";
import { useRef } from "react";
// context
import { NavContext } from "../../context/nav-context";

const Header = () => {
  const { authUser } = useSelector((state) => state.users);
  const { cartList, refresh } = useSelector((state) => state.carts);

  // search
  const [isSearching, setIsSearching] = useState(false);
  const [closeSearch, setCloseSearch] = useState(false);
  const [query, setQuery] = useState("");

  // navbar navlinks toggler
  const [showLinks, setShowLinks] = useState(false);

  // get user token
  const token = authUser && authUser.token;
  const totalCartItems = getTotalCart(cartList);

  // nanbar top fixing
  const [fixedNav, setFixedNav] = useState(false);
  const navbarRef = useRef();

  // navbar context usage
  const { getNavRef } = useContext(NavContext);

  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      dispatch(getCartList(token));
      return;
    } else {
      dispatch(cartActions.getGuestCartList());
    }
  }, [dispatch, token, refresh, cartList]);

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

  // SEARCH HANDLER FUNCTION
  const handleSearch = (e) => {
    setQuery(e.target.value);
  };

  const closeSearchHandler = () => {
    setQuery("");
    setCloseSearch(true);
    let timer = null;
    // wait for transition to finish before removing search model
    clearTimeout(timer); // clear existing timer
    timer = setTimeout(() => {
      setIsSearching(false);
    }, 300);
  };

  // WINDOW SCROLL HANDLER
  useEffect(() => {
    window.addEventListener("scroll", (e) => {
      // set navbar height
      const navHeight = navbarRef.current && navbarRef.current.clientHeight;
      // check if window scroll top is greater than the height of navbar
      if (window.pageYOffset > navHeight) {
        setFixedNav(true);
      } else {
        setFixedNav(false);
      }
    });
  }, []);

  // context handler that get the navbar ref each time this component renders
  useEffect(() => {
    getNavRef(navbarRef);
    // eslint-disable-next-line
  }, []);

  return (
    <section className={`${styles.navbar} ${fixedNav && styles.fixed__nav}`}>
      {/* SEARCH */}
      <div
        className={`${styles.search__modal} ${
          isSearching && styles.show__search
        }`}
      >
        <div
          className={styles.search__modal_overlay}
          onClick={closeSearchHandler}
        ></div>
        <div className={`${styles.search__container}`}>
          <div
            className={`${styles.form__container} ${
              closeSearch && styles.search__modal_close
            }`}
          >
            <form onSubmit={(e) => e.preventDefault()}>
              <AiOutlineCloseCircle
                className={styles.close__btn}
                onClick={closeSearchHandler}
                title="Close search"
              />
              <p>Search products</p>
              <div className={styles.form__group}>
                <input
                  type="search"
                  name=""
                  id=""
                  placeholder="Live search"
                  value={query}
                  onChange={handleSearch}
                />
              </div>
            </form>
          </div>
          <ModalSearch
            query={query}
            setIsSearching={setIsSearching}
            setQuery={setQuery}
            closeSearch={closeSearch}
          />
        </div>
        <div className="search__results"></div>
      </div>
      {/* NAVBAR */}
      <div className={`section__wrapper`} ref={navbarRef}>
        <div className={styles.logo}>
          <h5>SafeKart</h5>
        </div>
        <div className={`${styles.navbar__navigation}`}>
          {/* TOGGLE BUTTON */}
          <div
            className={`${styles.navbar__nav_toggler} ${
              showLinks && styles.nav__links_active
            }`}
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
                <li className={styles.search}>
                  <BsSearch
                    onClick={() => {
                      setIsSearching(true);
                      setShowLinks(false);
                      setCloseSearch(false);
                    }}
                    title="Search products"
                  />
                </li>
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
                <li>
                  <NavLink to="/dashboard/" onClick={() => setShowLinks(false)}>
                    dashboard
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
