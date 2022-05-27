import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import "../../styles/Publisher.css";
import FormSelect from "../../templates/form/FormSelect";
import FormInput from "../../templates/form/FormInput";
import FormTextArea from "../../templates/form/FormTextArea";

const Publisher = ({ publish }) => {
  const formik = useFormik({
    initialValues: {
      topic: "",
      qos: "",
      payload: "",
    },
    validationSchema: Yup.object({
      topic: Yup.string().required("Required"),
      qos: Yup.string().required("Required"),
      payload: Yup.string().required("Required"),
    }),
    onSubmit: (values, { resetForm }) => {
      publish(values);
      resetForm();
    },
  });

  return (
    <>
      <form className="publisher-form" onSubmit={formik.handleSubmit}>
        <div className="publisher-form-header">
          <h2>Publisher</h2>
        </div>
        <div className="publisher-form-body">
          <div className="publisher-form-inputs">
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

            <FormTextArea
              name="payload"
              label="Payload"
              placeholder="Payload"
              formik={{
                value: formik.values.payload,
                onBlur: formik.handleBlur,
                onChange: formik.handleChange,
                touched: formik.touched.payload,
                errors: formik.errors.payload,
              }}
            />
          </div>
        </div>
        <div className="publisher-form-footer">
          <button className="active-button" type="submit">
            Publish
          </button>
        </div>
      </form>
    </>
  );
};

export default Publisher;
