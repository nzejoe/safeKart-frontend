import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from 'react-router-dom'

// redux
import { userLogin } from "../../store/user-slice";

import Input from "../UI/Input";
import useInput from "../../hooks/input-hook";

const Login = () => {
  const { error, loginRedirect } = useSelector((state) => state.users);


  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [newError, setNewError] = useState(false);

  const validate = (value) => {
    return value.length !== 0;
  };

  const {
    value: email,
    isValid: emailIsValid,
    onChange: emailChange,
    onInputBlur: emailBlur,
    hasError: emailHasError,
  } = useInput(validate);
  const {
    value: password,
    isValid: passordIsValid,
    onChange: passwordChange,
    onInputBlur: passwordBlur,
    hasError: passwordHasError,
  } = useInput(validate);

  const formIsValid = emailIsValid && passordIsValid

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(formIsValid){
        const cartItems = JSON.parse(localStorage.getItem("safekart_cartItem"));
        const data = {
          username: email,
          password: password,
          cartItems: JSON.stringify(cartItems),
        };

        const resultPromise = await dispatch(userLogin(data));
        if(userLogin.fulfilled.match(resultPromise)){
          if(loginRedirect){
            navigate(loginRedirect)
          }else{
            navigate('/');
          }
        }
    }
  };

  useEffect(() => {
    if (error) {
      setNewError(true);
    }
  }, [error]);

  // remove error message whenever email or password value changes
  useEffect(() => {
    setNewError(false);
  }, [email, password]);


  return (
    <div className="user__form">
      <h2>User login</h2>
      <form onSubmit={handleSubmit}>
        <div className="message">
          {newError && (
            <p className="form__error">
             { error.non_field_errors[0]} {/* error msg from database */}
            </p>
          )}
        </div>
        <Input
          type="email"
          name="email"
          label="Email"
          placeholder="Enter email address"
          value={email}
          onChange={emailChange}
          onBlur={emailBlur}
          hasError={emailHasError}
          errorMsg="Email cannot be empty!"
        />
        <Input
          type="password"
          name="password"
          label="Password"
          placeholder="Enter your password"
          value={password}
          onChange={passwordChange}
          onBlur={passwordBlur}
          hasError={passwordHasError}
          errorMsg="Please enter a password!"
        />
        <div className="form__actions">
          <button type="submit">Log in</button>
          <p>
            Need an account? <Link to="/accounts/register/">Register</Link>
          </p>
          <p>
            Forgot password?{" "}
            <Link to="/accounts/password_reset/">Reset password</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
