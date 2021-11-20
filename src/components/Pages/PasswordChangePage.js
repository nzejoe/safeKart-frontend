import React from 'react'

import PasswordChangeForm from '../Users/PasswordChangeForm'

const PasswordChangePage = () => {
    document.title = "Password change | SafeKart"
    return (
      <section className={`section `}>
        <div className="section__wrapper">
          <PasswordChangeForm />
        </div>
      </section>
    );
}

export default PasswordChangePage
