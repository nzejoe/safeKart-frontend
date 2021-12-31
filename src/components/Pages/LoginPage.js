import React from 'react'

import Login from '../Users/Login'
// style
import styles from './UserPage.module.css'

const LoginPage = () => {
  document.title = "Login | SafeKart";
    return (
      <section className={`section ${styles.user__page}`}>
        <div className="section__wrapper">
          <Login />
        </div>
      </section>
    );
}

export default LoginPage
