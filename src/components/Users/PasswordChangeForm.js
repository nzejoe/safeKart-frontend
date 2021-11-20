import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
// redux
import { userPasswordChange, userLogout } from "../../store/user-slice";
// hooks
import useInput from "../../hooks/input-hook";
//ui
import Input from "../UI/Input";

const PasswordChangeForm = () => {
    const { error, authUser } = useSelector(state => state.users);
    const [formHasError, setFormHasError] = useState(false);
    const [success, setSuccess] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = authUser && authUser.token;

  const validatePassword = (password) => {
    return password.length > 5;
  };
  
  // current password
  const {
    value: currentPassword,
    isValid: currentPasswordIsValid,
    onChange: currentPasswordChange,
    onInputBlur: currentPasswordBlur,
    hasError: currentPasswordHasError,
  } = useInput(validatePassword);
  // new password
  const {
    value: newPassword,
    isValid: newPasswordIsValid,
    onChange: newPasswordChange,
    onInputBlur: newPasswordBlur,
    hasError: newPasswordHasError,
  } = useInput(validatePassword);
  // new password confirm
  const validatePassword2 = (password2) => {
    return password2 === newPassword;
  };
  const {
    value: newPassword2,
    isValid: newPassword2IsValid,
    onChange: newPassword2Change,
    onInputBlur: newPassword2Blur,
    hasError: newPassword2HasError,
  } = useInput(validatePassword2);

  const formIsValid = currentPasswordIsValid && newPasswordIsValid && newPassword2IsValid;

  const handleSubmit = async(e) => {
      e.preventDefault()
      if(formIsValid){
          const data = {
              password: currentPassword,
              new_password: newPassword,
              new_password2: newPassword2,
          }
          const requestPromise = await dispatch(userPasswordChange(data));
          if(userPasswordChange.fulfilled.match(requestPromise)){
            setSuccess(true);
            dispatch(userLogout(token));
            setTimeout(()=>{
              navigate('/accounts/login/')
            }, 5000)
          }
      }else{
        setFormHasError(true)
      }
  }

  useEffect(()=>{
    setFormHasError(false)
  },[currentPassword, newPassword, newPassword2])
  

  return (
    <div>
      {
        // while still editing
        !success && (
          <form onSubmit={handleSubmit}>
            <div className="messages">
              {formHasError && <p>Please fill form properly.</p>}
              {error && error.current_password && (
                <p>{error.current_password}</p>
              )}
            </div>
            <Input
              type="password"
              name="current_password"
              placeholder="Enter current password"
              value={currentPassword}
              onChange={currentPasswordChange}
              onBlur={currentPasswordBlur}
              hasError={currentPasswordHasError}
              errorMsg={"Current password is required!"}
            />
            <Input
              type="password"
              name="new_password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={newPasswordChange}
              onBlur={newPasswordBlur}
              hasError={newPasswordHasError}
              errorMsg={
                newPassword
                  ? "Password should be more than 5 characters."
                  : "New password cannot be empty!"
              }
            />
            <Input
              type="password"
              name="new_password2"
              placeholder="Confirm password"
              value={newPassword2}
              onChange={newPassword2Change}
              onBlur={newPassword2Blur}
              hasError={newPassword2HasError}
              errorMsg={"The new password did not match!"}
            />
            <div className="form__actions">
              <button type="submit">Change password</button>
            </div>
          </form>
        )
      }
      {success && (
        <p>
          Your new password has been saved successfully. <br />
          We are going to log you out, so you can test your new password. <br />
          <span>Please wait...</span>
        </p>
      )}
    </div>
  );
};

export default PasswordChangeForm;
