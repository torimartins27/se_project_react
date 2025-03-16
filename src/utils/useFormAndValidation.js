import { useState } from "react";

const useFormAndValidation = () => {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setValues((prevValues) => ({ ...prevValues, [name]: value }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: event.target.validationMessage,
    }));

    const form = event.target.closest("form");
    if (form) {
      setIsValid(form.checkValidity());
    }
  };

  const resetForm = (newValues = {}, newErrors = {}, newIsValid = false) => {
    setValues(newValues);
    setErrors(newErrors);
    setIsValid(newIsValid);
  };

  return { values, handleChange, errors, isValid, resetForm };
};

export default useFormAndValidation;
