import React, { memo } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Header = () => {
    const { authUser } = useSelector(state => state.users);
    
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
          <div>{authUser ? <p>Welcome, {authUser.username}</p> : <Link to="accounts/login">log in</Link>}</div>
        </div>
      </section>
    );
}

export default memo(Header);
