import React, { useState } from "react";
import FormInput from "../../templates/form/FormInput";
import { useFormik } from "formik";
import * as Yup from "yup";

import "../../styles/Connection.css";

const Connection = ({ connectStatus, connect, disconnect }) => {
  const formik = useFormik({
    initialValues: {
      host: "",
      port: "",
      clientId: "",
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      host: Yup.string().required("Required"),
      port: Yup.string().required("Required"),
      clientId: Yup.string().required("Required"),
      username: Yup.string().required("Required"),
      password: Yup.string().required("Required"),
    }),
    onSubmit: (values, { resetForm }) => {
      const url = `ws://${values.host}:${values.port}/mqtt`;
      const options = {
        keepalive: 30,
        protocolId: "MQTT",
        protocolVersion: 4,
        clean: true,
        reconnectPeriod: 1000,
        connectTimeout: 30 * 1000,
        will: {
          topic: "WillMsg",
          payload: "Connection Closed abnormally..!",
          qos: 0,
          retain: false,
        },
        rejectUnauthorized: false,
        clientId: values.clientId,
        username: values.username,
        password: values.password,
      };
      connect(url, options);
      resetForm();
    },
  });

  const handleDisconnect = (e) => {
    e.preventDefault();
    disconnect();
  };

  return (
    <>
      <form className="connection-form" onSubmit={formik.handleSubmit}>
        <div className="connection-form-header">
          <h2>Connection</h2>
        </div>
        <div className="connection-form-body">
          <div className="connection-form-inputs">
            <FormInput
              name="host"
              type="text"
              label="Host"
              placeholder="Host"
              formik={{
                value: formik.values.host,
                onBlur: formik.handleBlur,
                onChange: formik.handleChange,
                touched: formik.touched.host,
                errors: formik.errors.host,
              }}
            />

            <FormInput
              name="port"
              type="text"
              label="Port"
              placeholder="Port"
              formik={{
                value: formik.values.port,
                onBlur: formik.handleBlur,
                onChange: formik.handleChange,
                touched: formik.touched.port,
                errors: formik.errors.port,
              }}
            />

            <FormInput
              name="clientId"
              type="text"
              label="Client Id"
              placeholder="Client Id"
              formik={{
                value: formik.values.clientId,
                onBlur: formik.handleBlur,
                onChange: formik.handleChange,
                touched: formik.touched.clientId,
                errors: formik.errors.clientId,
              }}
            />

            <FormInput
              name="username"
              type="text"
              label="Username"
              placeholder="Username"
              formik={{
                value: formik.values.username,
                onBlur: formik.handleBlur,
                onChange: formik.handleChange,
                touched: formik.touched.username,
                errors: formik.errors.username,
              }}
            />

            <FormInput
              name="password"
              type="password"
              label="Password"
              placeholder="Password"
              formik={{
                value: formik.values.password,
                onBlur: formik.handleBlur,
                onChange: formik.handleChange,
                touched: formik.touched.password,
                errors: formik.errors.password,
              }}
            />
          </div>
        </div>
        <div className="connection-form-footer">
          {connectStatus === "Connected" ? (
            <>
              <button className="inactive-button" disabled>
                Connected
              </button>
              <button className="active-button" onClick={handleDisconnect}>
                Disconnect
              </button>
            </>
          ) : (
            <div>
              <button className="active-button" type="submit">
                Connect
              </button>
            </div>
          )}
        </div>
      </form>
    </>
  );
};

export default Connection;
