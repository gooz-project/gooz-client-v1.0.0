import React from "react";

import "../../styles/FormSelect.css";

export default function FormSelect({ label, name, options, formik }) {
  return (
    <div className="select-container">
      <label className="select-label" htmlFor={name}>
        {label}
      </label>
      <select
        name={name}
        value={formik.value}
        onBlur={formik.onBlur}
        onChange={formik.onChange}
      >
        {options.map((option, idx) => (
          <React.Fragment key={idx}>{option}</React.Fragment>
        ))}
      </select>
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
