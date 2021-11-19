import React from "react";

const Input = ({
  type,
  name,
  placeholder,
  label,
  value,
  onChange,
  onBlur,
  hasError,
  errorMsg
}) => {
  return (
    <div className="form__group">
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        id={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
      {hasError && <p className="error">{errorMsg}</p>}
    </div>
  );
};

export default Input;
