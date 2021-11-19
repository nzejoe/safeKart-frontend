import { useState } from "react";

const useInput = (validateValue) => {
  const [value, setValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  const isValid = validateValue(value);

  const hasError = !isValid && isTouched;

  const onChange = (e) => {
    const val = e.target.value;
    setValue(val);
  };

  const onInputBlur = () => {
      setIsTouched(true);
  }


  return {
    value,
    isValid,
    hasError,
    onChange,
    onInputBlur,
  };
};

export default useInput;