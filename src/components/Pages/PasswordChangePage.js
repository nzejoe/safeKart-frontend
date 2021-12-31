import React from 'react'

import PasswordChangeForm from '../Users/PasswordChangeForm'
// style
import styles from './UserPage.module.css'

const PasswordChangePage = () => {
  document.title = "Password change | SafeKart";
  
    document.title = "Password change | SafeKart"
    return (
      <section className={`section ${styles.user__page}`}>
        <div className="section__wrapper">
          <PasswordChangeForm />
        </div>
      </section>
    );
}

export default PasswordChangePage
