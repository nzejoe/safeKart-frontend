import axios from "axios";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";

import { useNavigate } from "react-router";

// hooks
import useInput from "../../hooks/input-hook";

// ui
import Input from "../UI/Input";

const csrftoken = Cookies.get('csrftoken')

const PasswordResetCompleteForm = () => {
  const [linkValid, setLinkValid] = useState(true);
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  // new password
  const validate = (password) => {
    return password.length > 5;
  };

  const {
    value: password,
    isValid: passwordIsValid,
    onChange: passwordChange,
    onInputBlur: passwordBlur,
    hasError: passwordHasError,
  } = useInput(validate);

  //confirm password
  const validatePassword2 = (password2) => {
    return password2 === password;
  };

  const {
    value: password2,
    isValid: password2IsValid,
    onChange: password2Change,
    onInputBlur: password2Blur,
    hasError: password2HasError,
  } = useInput(validatePassword2);

  const formIsValid = passwordIsValid && password2IsValid;

  // check if link is valid
  useEffect(()=>{
    const user_id = sessionStorage.getItem('user_id');
    if(!user_id){
      setLinkValid(false);
    }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formIsValid) {
        const data = {
            user_id: sessionStorage.getItem('user_id'),
            password,
            password2,
        }
        
        const response = await axios({
          url: "/accounts/password_reset_complete/",
          method: "POST",
          headers: {
            "Content-type": "application/json",
            'X-CSRFToken': csrftoken,
          },
          data: data,
        });

        if (response.data.done){
            setSuccess(true);
            sessionStorage.removeItem('user_id');
            setTimeout(()=>{
              navigate('/accounts/login/');
            }, 4000);
        }
      try {
      } catch (error) {
        // const err = { ...error };
        console.log(error);
        setLinkValid(false)
        setSuccess(false)
      }
    }
  };
  return (
    <div className="user__form">
      {linkValid && !success && (
        <React.Fragment>
          <h2>Set new password</h2>
          <form onSubmit={handleSubmit}>
            <Input
              type="password"
              name="password"
              value={password}
              label="New password"
              placeholder="New password"
              onChange={passwordChange}
              onBlur={passwordBlur}
              hasError={passwordHasError}
              errorMsg={
                password
                  ? "Password should not be less than 5 characters."
                  : "Field cannot be empty!"
              }
            />
            <Input
              type="password"
              name="password2"
              value={password2}
              label="confirm password"
              placeholder="confirm password"
              onChange={password2Change}
              onBlur={password2Blur}
              hasError={password2HasError}
              errorMsg={
                password2 ? "Password did not match!" : "Field cannot be empty!"
              }
            />
            <div className="form__actions">
              <button type="submit">Set password</button>
            </div>
          </form>
        </React.Fragment>
      )}
      {success && linkValid && (
        <p>
          Your new password was set successfully. <br />
          You will be redirect to login page. <br />
          <span>Please wait...</span>
        </p>
      )}
      {!success && !linkValid && <h3>invalid link</h3>}
    </div>
  );
};

export default PasswordResetCompleteForm;
