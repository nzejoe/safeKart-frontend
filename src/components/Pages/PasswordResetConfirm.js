import React, { useCallback, useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios';
import Cookies from 'js-cookie';
// style
import styles from './UserPage.module.css'


const PasswordResetConfirm = () => {
  document.title = "Password reset confirm | SafeKart"
    const [ linkValid, setLinkValid ] = useState(true);

    const { uidb64, token } = useParams()
    const navigate = useNavigate()

    const sendRequest = useCallback( async()=>{
         try {
           const response = await axios({
             url: `/accounts/password_reset_confirm/${uidb64}/${token}/`,
             method: "POST",
             headers: {
               "X-CSRFToken": Cookies.get('csrftoken'),
             }
           });
           
           if (response.data.done){
              sessionStorage.setItem('user_id', response.data.user_id)
               navigate("/accounts/password_reset_complete/");
           }
         } catch (err) {
             console.log(err)
             setLinkValid(false);
         }
    },[uidb64, token, navigate]);
    
    useEffect(()=>{
       sendRequest()
    },[sendRequest]);

    return (
      <section className={`section ${styles.user__page}`}>
        <div className="section__wrapper">
            {linkValid?  <h3>please wait...</h3> : <h3 className={styles.invalid__link}>Invalid link</h3> }
        </div>
      </section>
    );
}

export default PasswordResetConfirm;
