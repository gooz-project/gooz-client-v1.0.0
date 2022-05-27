import React from "react";

import "../../styles/FormInput.css";

export default function FormInput({ label, name, type, placeholder, formik }) {
  return (
    <div className="input-container">
      <label className="input-label" htmlFor={name}>
        {label}
      </label>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        value={formik.value}
        onBlur={formik.onBlur}
        onChange={formik.onChange}
      />
      {formik.touched && formik.errors ? (
        <div className="yup-message">
          <label className="yup-label">
            <p>{formik.errors}</p>
          </label>
          <div className="arrow" />
        </div>
      ) : null}
    </div>
  );
}
