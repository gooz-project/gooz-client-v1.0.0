import React from "react";

import "../../styles/FormTextArea.css";

export default function FormTextArea({ label, name, placeholder, formik }) {
  return (
    <div className="textarea-container">
      <label className="textarea-label" htmlFor={name}>
        {label}
      </label>
      <textarea
        name={name}
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
