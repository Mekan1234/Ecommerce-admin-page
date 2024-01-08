import React from "react";
import styles from "./CustomInput.module.css";
const CustomInput = (props) => {
  const { type, label, id, iClass, name, value, onChange } = props;
  return (
    <div className="form-floating mt-3">
      <input
        type={type}
        className={`form-control ${styles.iClass}`}
        id={id}
        placeholder={label}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onChange}
      />
      <label htmlFor={label}>{label}</label>
    </div>
  );
};

export default CustomInput;
