import React, { useState } from "react";
import styles from "./Signup.module.scss";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { signup } from "../../services/userServices";
import Layout from "../Layout/Layout";
const Signup = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();
  const [errMsg, setErrMsg] = useState();
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required("This field is require")
      .min(3, "Must be 4 character or more".trim()),
    email: Yup.string()
      .required("This field is require")
      .matches(
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a validate"
      )
      .trim(),
    password: Yup.string()
      .required("This field is require")
      .min(6, "Please must be at 6 character")
      .trim(),
    phone: Yup.string()
      .required("This field is require")
      .matches(
        /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/,
        "Must be a valid phone number"
      )
      .trim(),
  });
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      phone: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (e) => {
      try {
        const data = await signup({
          email: e.email,
          password: e.password,
          name: e.name,
          phone: e.phone,
        });
        navigate("/login");
      } catch (error) {
        setErrMsg(error.response?.data.message);
      }
    },
  });

  return (
    <Layout>
      <div className={styles.cointainer}>
        <div className={styles.wrapper}>
          <h1>CREATE ACCOUNT</h1>
          <form onSubmit={formik.handleSubmit}>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="UserName"
              onChange={formik.handleChange}
              value={formik.values.name}
            />
            {formik.touched.name && formik.errors.name && (
              <p className={styles.error}>{formik.errors.name}</p>
            )}
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Email"
              onChange={formik.handleChange}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email && (
              <p className={styles.error}>{formik.errors.email}</p>
            )}
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              onChange={formik.handleChange}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password && (
              <p className={styles.error}>{formik.errors.password}</p>
            )}
            <input
              id="phone"
              name="phone"
              type="phone"
              placeholder="Phone"
              onChange={formik.handleChange}
              value={formik.values.phone}
            />
            {formik.touched.phone && formik.errors.phone && (
              <p className={styles.error}>{formik.errors.phone}</p>
            )}
            <p className={styles.policy}>
              This site is protected by reCAPTCHA and the Google Privacy Policy
              and Terms of Service apply.
            </p>
            <div>
              You have a account <Link to={"/login"}>Login</Link>{" "}
            </div>

            <button type="submit">Submit</button>
          </form>
          {errMsg && <span>{errMsg}</span>}
        </div>
      </div>
    </Layout>
  );
};

export default Signup;
