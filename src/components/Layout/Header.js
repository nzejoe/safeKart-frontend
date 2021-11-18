import React from 'react'
import { NavLink } from 'react-router-dom'

const Header = () => {
    return (
        <section>
            <div>
                <h5>SafeKart</h5>
            </div>
            <div>
                <ul>
                    <li><NavLink to="/">home</NavLink></li>
                    <li><NavLink to="store/">store</NavLink></li>
                </ul>
            </div>
        </section>
    )
}

export default Header
