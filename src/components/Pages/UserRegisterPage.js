import React from 'react'

import Register from '../Users/Register';
// style
import styles from './UserPage.module.css'


const UserRegisterPage = () => {
  document.title = 'Register | SafeKart'
    return (
      <section className={`section ${styles.user__page}`}>
        <div className="section__wrapper">
          <Register />
        </div>
      </section>
    );
}

export default UserRegisterPage;
