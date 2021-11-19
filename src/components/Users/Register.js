import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

// hooks
import useInput from "../../hooks/input-hook";

// redux
import { userRegister } from "../../store/user-slice";

import Input from "../UI/Input";

const Register = () => {
    const [formHasError, setFormHasError] = useState(false);
    const { error } = useSelector(state => state.users);
    const [success, setSuccess] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate()

    // destructure error message
    let errorMsg = ''
    if(error){
      const { username, email } = error;
      if (username && !email){
        errorMsg = username[0];
      }else if(email && !username){
        errorMsg = email && email[0];
      }else if(username && email){
        errorMsg = username && email && 'Username and Email already exists!'
      }
    }

  
  // username
  const validateUsername = (username) => {
    return username.length > 2;
  };

  const {
    value: username,
    isValid: usernameIsValid,
    onChange: usernameChange,
    onInputBlur: usernameBlur,
    hasError: usernameHasError,
  } = useInput(validateUsername);

  // email

  function validateEmail(email) {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

   const {
     value: email,
     isValid: emailIsValid,
     onChange: emailChange,
     onInputBlur: emailBlur,
     hasError: emailHasError,
   } = useInput(validateEmail);

   //password
   const validatePassword = (password) => {
       return password.length > 5
   }
   const {
     value: password,
     isValid: passwordIsValid,
     onChange: passwordChange,
     onInputBlur: passwordBlur,
     hasError: passwordHasError,
   } = useInput(validatePassword);

   //password2
   const validatePassword2 = (password2) => {
       return password2 === password
   }
   const {
     value: password2,
     isValid: password2IsValid,
     onChange: password2Change,
     onInputBlur: password2Blur,
     hasError: password2HasError,
   } = useInput(validatePassword2);

   const formIsValid = usernameIsValid && emailIsValid && passwordIsValid && password2IsValid

   const handleSubmit = async (e) => {
       e.preventDefault();
       if(formIsValid){
           const data = {
             username,
             email: email.toLowerCase(),
             password,
             password2,
           };
           const resultPromice = await dispatch(userRegister(data)) // last result from database
           if(userRegister.fulfilled.match(resultPromice)){ // if successful registartion
             setSuccess(true);
             setTimeout(()=>{
               navigate('/accounts/login/')
             }, 5000);
           }
       }else{
           setFormHasError(true)
       }
   };

   useEffect(()=>{
     if(error){
       setFormHasError(true)
     }
   },[error])

   // if any of the field changes
   useEffect(()=>{
       setFormHasError(false) // remove error msg
   },[username, email, password, password2])

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="message">
            {
              error
                ? errorMsg
                : formHasError && (
                    <p>'Please fill form properly!'</p>
                  ) /* error msg from database */
            }
            {success && <p>Account created successfully! You can now log in. {" "} <span>Plase wait...</span></p>}
        </div>
        <Input
          type="text"
          name="username"
          value={username}
          placeholder="Enter username"
          onChange={usernameChange}
          onBlur={usernameBlur}
          hasError={usernameHasError}
          errorMsg={
            username
              ? "Username should more than 3 characters!"
              : "Username cannot be empty!"
          }
        />
        <Input
          type="email"
          name="email"
          value={email}
          placeholder="Enter email Address"
          onChange={emailChange}
          onBlur={emailBlur}
          hasError={emailHasError}
          errorMsg={
            email ? "Not a valid email adderss!" : "Email cannot be empty!"
          }
        />
        <Input
          type="password"
          name="password"
          value={password}
          placeholder="Enter a password"
          onChange={passwordChange}
          onBlur={passwordBlur}
          hasError={passwordHasError}
          errorMsg={
            password
              ? "Should be more than 5 characters!"
              : "Password is required!"
          }
        />
        <Input
          type="password"
          name="password2"
          value={password2}
          placeholder="Confirm password"
          onChange={password2Change}
          onBlur={password2Blur}
          hasError={password2HasError}
          errorMsg={
            password2
              ? "Password did not match!"
              : "Please confirm your password."
          }
        />
        <div className="form__actions">
          <button type="submit">register</button>
        </div>
      </form>
    </div>
  );
};

export default Register;
