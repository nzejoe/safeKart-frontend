import React, { memo } from "react";
import { NavLink, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

// redux
import { userLogout } from "../../store/user-slice";

const Header = () => {
  const { authUser } = useSelector((state) => state.users);

  const dispatch = useDispatch();

  const token = authUser && authUser.token;

  const handleLogout = (e) => {
    dispatch(userLogout(token));
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
            <NavLink to="store/">store</NavLink>
          </li>
        </ul>
        <div>
          {authUser ? (
            <div className="userInfor">
              <p>Welcome, {authUser.username} </p>
              <Link to="/accounts/password_change/">change password</Link> <br/>
              <button type="button" onClick={handleLogout}>Log out</button>
            </div>
          ) : (
            <div className="anonUser">
              {" "}
              <Link to="accounts/login/">log in</Link>{" "}
              <Link to="accounts/register/">register</Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default memo(Header);
