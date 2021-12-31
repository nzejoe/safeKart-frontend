import React from "react";

import PasswordResetCompleteForm from "../Users/PasswordResetCompleteForm";
// style
import styles from './UserPage.module.css'


const PasswordResetComplete = () => {
  document.title = "Password reset complete | SafeKart";
  
  return (
    <section className={`section ${styles.user__page}`}>
      <div className="section__wrapper">
        <PasswordResetCompleteForm />
      </div>
    </section>
  );
};

export default PasswordResetComplete;
