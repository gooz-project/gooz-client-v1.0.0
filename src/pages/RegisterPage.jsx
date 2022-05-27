import { register } from "../database/index";
import { read } from "../database/index";
import { useNavigate } from "react-router";
import { useFormik } from "formik";
import * as Yup from "yup";
import { motion } from "framer-motion";

import "../styles/RegisterPage.css";
import FormInput from "../templates/form/FormInput";
import FormSelect from "../templates/form/FormSelect";

export default function RegisterPage({ setWorkspaces }) {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      workspaceName: "",
      cardName: "",
      cardType: "",
      connectionType: "",
      connectionAddress: "",
      widgets: [],
    },
    validationSchema: Yup.object({
      workspaceName: Yup.string().required("Required"),
      cardName: Yup.string().required("Required"),
      cardType: Yup.string().required("Required"),
      connectionType: Yup.string().required("Required"),
      connectionAddress: Yup.string().required("Required"),
    }),
    onSubmit: (values, { resetForm }) => {
      register(values);
      setWorkspaces();

      resetForm();

      navigate(`/workspace/${read().length - 1}`);
    },
  });

  return (
    <div className="register-container">
      <motion.div
        animate={{ x: 0 }}
        initial={{ x: -300 }}
        className="gooz-info"
      >
        <span>GOOZ</span> Client
      </motion.div>
      <div className="gooz-register">
        <motion.form
          animate={{ scale: 1 }}
          initial={{ scale: 0.7 }}
          className="register-form"
          onSubmit={formik.handleSubmit}
        >
          <div className="register-form-inputs">
            <FormInput
              name="workspaceName"
              type="text"
              label="Workspace Name"
              placeholder="Workspace Name"
              formik={{
                value: formik.values.workspaceName,
                onBlur: formik.handleBlur,
                onChange: formik.handleChange,
                touched: formik.touched.workspaceName,
                errors: formik.errors.workspaceName,
              }}
            />

            <FormInput
              name="cardName"
              type="text"
              label="Card Name"
              placeholder="Card Name"
              formik={{
                value: formik.values.cardName,
                onBlur: formik.handleBlur,
                onChange: formik.handleChange,
                touched: formik.touched.cardName,
                errors: formik.errors.cardName,
              }}
            />

            <FormSelect
              name="cardType"
              type="text"
              label="Card Type"
              options={[
                <option value="" disabled hidden>
                  Card Type
                </option>,
                <option value="esp32">ESP32</option>,
                <option value="esp8266">ESP8266</option>,
                <option value="raspberry-pi-pico">Raspberry Pi Pico</option>,
              ]}
              formik={{
                value: formik.values.cardType,
                onBlur: formik.handleBlur,
                onChange: formik.handleChange,
                touched: formik.touched.cardType,
                errors: formik.errors.cardType,
              }}
            />

            <FormSelect
              name="connectionType"
              type="text"
              label="Connection Type"
              options={[
                <option value="" disabled hidden>
                  Connection Type
                </option>,
                <option value="com-port">COM PORT</option>,
                <option value="tcp-ip">TCP/IP</option>,
              ]}
              formik={{
                value: formik.values.connectionType,
                onBlur: formik.handleBlur,
                onChange: formik.handleChange,
                touched: formik.touched.connectionType,
                errors: formik.errors.connectionType,
              }}
            />

            <FormInput
              name="connectionAddress"
              type="text"
              label="Connection Address"
              placeholder="Connection Address"
              formik={{
                value: formik.values.connectionAddress,
                onBlur: formik.handleBlur,
                onChange: formik.handleChange,
                touched: formik.touched.connectionAddress,
                errors: formik.errors.connectionAddress,
              }}
            />
          </div>
          <button className="register-form-button" type="submit">
            Add New Workpace
          </button>
        </motion.form>
      </div>
    </div>
  );
}
