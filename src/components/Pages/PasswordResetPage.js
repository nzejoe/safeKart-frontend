import React from 'react';

import PasswordResetForm from '../Users/PasswordResetForm';
// style
import styles from './UserPage.module.css'

const PasswordResetPage = () => {
  document.title = "Password reset | SafeKart";
    return (
      <section className={`section ${styles.user__page}`}>
        <div className="section__wrapper">
          <PasswordResetForm />
        </div>
      </section>
    );
}

export default PasswordResetPage;
