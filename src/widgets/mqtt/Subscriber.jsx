import React from "react";
import FormInput from "../../templates/form/FormInput";
import FormSelect from "../../templates/form/FormSelect";
import { useFormik } from "formik";
import * as Yup from "yup";

import "../../styles/Subscriber.css";

const Subscriber = ({ sub, unSub, isSubed }) => {
  const formik = useFormik({
    initialValues: {
      topic: "",
      qos: "",
    },
    validationSchema: Yup.object({
      topic: Yup.string().required("Required"),
      qos: Yup.number().required("Required"),
    }),
    onSubmit: (values, { resetForm }) => {
      sub(values);
      resetForm();
    },
  });

  return (
    <>
      <form className="subscriber-form" onSubmit={formik.handleSubmit}>
        <div className="subscriber-form-header">
          <h2>Subscriber</h2>
        </div>
        <div className="subscriber-form-body">
          <div className="subscriber-form-inputs">
            <FormInput
              name="topic"
              type="text"
              label="Topic"
              placeholder="Topic"
              formik={{
                value: formik.values.topic,
                onBlur: formik.handleBlur,
                onChange: formik.handleChange,
                touched: formik.touched.topic,
                errors: formik.errors.topic,
              }}
            />

            <FormSelect
              name="qos"
              type="text"
              label="QoS"
              options={[
                <option value="" disabled hidden>
                  QoS
                </option>,
                <option value="0">0</option>,
                <option value="1">1</option>,
                <option value="2">2</option>,
              ]}
              formik={{
                value: formik.values.qos,
                onBlur: formik.handleBlur,
                onChange: formik.handleChange,
                touched: formik.touched.qos,
                errors: formik.errors.qos,
              }}
            />
          </div>
        </div>
        <div className="subscriber-form-footer">
          {isSubed ? (
            <>
              <button className="inactive-button">Subscribe</button>
              <button className="active-button">Unsubscribe</button>
            </>
          ) : (
            <>
              <button className="active-button" type="submit">
                Subscribe
              </button>
            </>
          )}
        </div>
      </form>
    </>
  );
};

export default Subscriber;
