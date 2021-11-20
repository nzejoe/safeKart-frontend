import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// redux
import { userPasswordReset } from '../../store/user-slice';

// hooks
import useInput from '../../hooks/input-hook';

// ui
import Input from '../UI/Input';

const PasswordResetForm = () => {
    const { error } = useSelector(state => state.users);
    const [formHasError, setFormHasError] = useState(false);
    const [success, setSuccess] = useState(false);

    const dispatch = useDispatch()

     function validateEmail(email) {
       const re =
         /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
       return re.test(String(email).toLowerCase());
     }

     const { value, isValid, onChange, onInputBlur, hasError } = useInput(validateEmail);

     const formIsValid = isValid;

     const handleSubmit = async(e) => {
         e.preventDefault();

         if(formIsValid){
             const data = {
               email: value.toLowerCase(),
             };
             const resultPromise = await dispatch(userPasswordReset(data));
             if(userPasswordReset.fulfilled.match(resultPromise)){
                 setSuccess(true)
             }
         }
     };

     useEffect(()=>{
         if(error){
            setFormHasError(true);
         }
     },[error])

    return (
      <React.Fragment>
        {!success &&

        <div>
          <h3>Password reset</h3>
          <p>Please enter email address linked to your account.</p>
          <form onSubmit={handleSubmit}>
            <div className="message">
              <p>
                {
                  formHasError &&
                    error &&
                    error.email[0] /* error msg from database */
                }
              </p>
            </div>
            <Input
              type="email"
              name="email"
              value={value}
              placeholder="Enter your email address"
              onChange={onChange}
              onBlur={onInputBlur}
              hasError={hasError}
              errorMsg={
                value ? "Email is not valid!" : "Email cannot be empty!"
              }
            />
            <div className="form__actions">
              <button type="submit">reset password</button>
            </div>
          </form>
        </div>
        }
        {
            success &&
            <div>
                <h3>Password reset done.</h3>
                <p>
                    A link on how to set new password has been sent to your email address. <br/>
                    Please endeavour to check your spam folder if you haven't seen the message. 
                </p>
            </div>
        }
      </React.Fragment>
    );
}

export default PasswordResetForm;
