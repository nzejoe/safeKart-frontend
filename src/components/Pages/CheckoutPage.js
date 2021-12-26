import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
// store
import { actions as orderActions } from "../../store/order-slice";
// custom hook
import useInput from "../../hooks/input-hook";
// ui
import Input from "../UI/Input";
// style
import styles from "./CheckoutPage.module.css";

const CheckoutPage = () => {
  document.title = "Checkout | SafeKart";
  const [gender, setGender] = useState("male");
  const [formHasError, setFormHasError] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validate = (value) => {
    return value.length > 0;
  };
  // email validator
  function validateEmail(email) {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  // first name
  const {
    value: firstName,
    isValid: firstNameIsValid,
    onChange: firstNameChange,
    onInputBlur: firstNameBlur,
    hasError: firstNameHasError,
  } = useInput(validate);

  // middle name
  const {
    value: middleName,
    isValid: middleNameIsValid,
    onChange: middleNameChange,
    onInputBlur: middleNameBlur,
    hasError: middleNameHasError,
  } = useInput(() => true);

  // last name
  const {
    value: lastName,
    isValid: lastNameIsValid,
    onChange: lastNameChange,
    onInputBlur: lastNameBlur,
    hasError: lastNameHasError,
  } = useInput(validate);

  // email
  const {
    value: email,
    isValid: emailIsValid,
    onChange: emailChange,
    onInputBlur: emailBlur,
    hasError: emailHasError,
  } = useInput(validateEmail);

  // phone
  const {
    value: phone,
    isValid: phoneIsValid,
    onChange: phoneChange,
    onInputBlur: phoneBlur,
    hasError: phoneHasError,
  } = useInput(validate);

  // address1
  const {
    value: address_1,
    isValid: address_1IsValid,
    onChange: address_1Change,
    onInputBlur: address_1Blur,
    hasError: address_1HasError,
  } = useInput(validate);

  // address1
  const {
    value: address_2,
    isValid: address_2IsValid,
    onChange: address_2Change,
    onInputBlur: address_2Blur,
    hasError: address_2HasError,
  } = useInput(() => true);

  // city
  const {
    value: city,
    isValid: cityIsValid,
    onChange: cityChange,
    onInputBlur: cityBlur,
    hasError: cityHasError,
  } = useInput(validate);

  // address1
  const {
    value: state,
    isValid: stateIsValid,
    onChange: stateChange,
    onInputBlur: stateBlur,
    hasError: stateHasError,
  } = useInput(validate);

  // address1
  const {
    value: country,
    isValid: countryIsValid,
    onChange: countryChange,
    onInputBlur: countryBlur,
    hasError: countryHasError,
  } = useInput(validate);

  const formIsValid =
    firstNameIsValid &&
    middleNameIsValid &&
    lastNameIsValid &&
    emailIsValid &&
    phoneIsValid &&
    address_1IsValid &&
    address_2IsValid &&
    cityIsValid &&
    stateIsValid &&
    countryIsValid;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formIsValid) {
      const data = {
        first_name: firstName,
        middle_name: middleName,
        last_name: lastName,
        gender,
        email: email.toLocaleLowerCase(),
        phone,
        address_1,
        address_2,
        city,
        state,
        country,
      };

      dispatch(orderActions.saveOrder(data));
      navigate("/place_order/");
    } else {
      setFormHasError(true);
    }
  };

  // when any of the input changes
  useEffect(() => {
    setFormHasError(false);
  }, [
    firstName,
    middleName,
    lastName,
    gender,
    email,
    phone,
    address_1,
    address_2,
    city,
    state,
    country,
  ]);

  return (
    <section className={`section `}>
      <div className="section__wrapper">
        <div className={styles.billing__address}>
          <h2>Billing Address</h2>
          <form onSubmit={handleSubmit}>
            {formHasError && (
              <div className="messages">
                <p>please fill form properly!</p>
              </div>
            )}
            <div className={`${styles.row} ${styles.col__2}`}>
              <Input
                type="text"
                value={firstName}
                name="first_name"
                placeholder="First name"
                label="First Name"
                onChange={firstNameChange}
                onBlur={firstNameBlur}
                hasError={firstNameHasError}
                errorMsg="This field is required"
              />
              <Input
                type="text"
                value={middleName}
                name="middle_name"
                placeholder="Middle name"
                label="Middle Name"
                onChange={middleNameChange}
                onBlur={middleNameBlur}
                hasError={middleNameHasError}
              />
            </div>
            <div className={`${styles.row} ${styles.col__2}`}>
              <Input
                type="text"
                name="last_name"
                value={lastName}
                placeholder="Last name"
                label="Last Name"
                onChange={lastNameChange}
                onBlur={lastNameBlur}
                hasError={lastNameHasError}
                errorMsg="This field is required"
              />
              <div className={styles.form__group}>
                <select
                  name="gender"
                  onChange={(e) => setGender(e.target.value)}
                  id="gender"
                >
                  <option value="male">male </option>
                  <option value="female">female</option>
                </select>
                <label htmlFor="gender">gender</label>
              </div>
            </div>
            <div className={`${styles.row} ${styles.col__2}`}>
              <Input
                type="email"
                name="email"
                value={email}
                label="Email address"
                placeholder="Email address"
                onChange={emailChange}
                onBlur={emailBlur}
                hasError={emailHasError}
                errorMsg={
                  email ? "not a valid email" : "This field is required"
                }
              />
              <Input
                type="text"
                name="phone"
                value={phone}
                placeholder="Phone number"
                label="Phone number"
                onChange={phoneChange}
                onBlur={phoneBlur}
                hasError={phoneHasError}
                errorMsg="This field is required"
              />
            </div>
            <div className={styles.row}>
              <Input
                type="text"
                name="address_1"
                value={address_1}
                label="Address 1"
                placeholder="Address 1"
                onChange={address_1Change}
                onBlur={address_1Blur}
                hasError={address_1HasError}
                errorMsg="This field is required"
              />
            </div>
            <div className={styles.row}>
              <Input
                type="text"
                name="address_2"
                value={address_2}
                label="Address 2"
                placeholder="Address 2"
                onChange={address_2Change}
                onBlur={address_2Blur}
                hasError={address_2HasError}
                errorMsg="This field is required"
              />
            </div>
            <div className={`${styles.row} ${styles.col_3}`}>
              <Input
                type="text"
                name="city"
                value={city}
                label="City"
                placeholder="City"
                onChange={cityChange}
                onBlur={cityBlur}
                hasError={cityHasError}
                errorMsg="This field is required"
                className="col__3"
              />
              <Input
                type="text"
                name="state"
                value={state}
                label="State"
                placeholder="State"
                onChange={stateChange}
                onBlur={stateBlur}
                hasError={stateHasError}
                errorMsg="This field is required"
                className="col__3"
              />
              <Input
                type="text"
                name="country"
                value={country}
                label="Country"
                placeholder="Country"
                onChange={countryChange}
                onBlur={countryBlur}
                hasError={countryHasError}
                errorMsg="This field is required"
                className="col__3"
              />
            </div>
            <div className={styles.btn__proceed}>
              <button type="submit">Proceed to payment</button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default CheckoutPage;
