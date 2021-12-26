import React from "react";
//style
import styles from './Input.module.css'

const Input = ({
  type,
  name,
  placeholder,
  label,
  value,
  onChange,
  onBlur,
  hasError,
  errorMsg,
  className,
}) => {
  return (
    <div className={`${className}`}>
      <div className={styles.form__group}>
        <input
          type={type}
          placeholder={placeholder}
          id={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
        />
        <label htmlFor={name}>{label}</label>
      </div>
      {hasError && <p className={styles.error}>{errorMsg}</p>}
    </div>
  );
};

export default Input;
