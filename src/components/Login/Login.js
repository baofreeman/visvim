import React, { useState } from "react";
import styles from "./Login.module.scss";
import { useFormik } from "formik";
// import axios from "axios";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "universal-cookie";
import { Link, useLocation, useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { setToken, setUser } from "../../redux/actions/user";
import Layout from "../Layout/Layout";
import { getUser, login } from "../../services/userServices";
import useRefreshToken from "../../hooks/useRefreshToken";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const Login = () => {
  const dispatch = useDispatch();
  const User = useSelector((state) => state.userReducer.user);
  const Token = useSelector((state) => state.userReducer.token);
  console.log(User);
  const [errMsg, setErrMsg] = useState(false);
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();
  const [isError, setIsError] = useState();
  const validationSchema = Yup.object().shape({
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
  });
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (e) => {
      try {
        const res = await login({ email: e.email, password: e.password });
        const accessToken = res?.accessToken;
        const decode = jwt_decode(accessToken);
        localStorage.setItem("userId", decode?.userId);
        dispatch(setToken({ token: accessToken }));
        getUserDetail();
        if (location.state) {
          navigate(location?.state);
        } else {
          navigate("/");
        }
        console.log(Token);
      } catch (error) {
        if (!error?.response) {
          setErrMsg("No Server Response");
        } else if (error.response?.status === 400) {
          setErrMsg("Missing Username or Password");
        } else if (error.response?.status === 401) {
          setErrMsg("Email not registered");
        } else {
          setErrMsg("Login Failed");
        }
      }
    },
  });

  const getUserDetail = async () => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      const res = await axiosPrivate.get(`/user/get-detail-user/${userId}`);
      console.log(res[0]);
      dispatch(setUser({ user: res[0] }));
    }
  };

  const logout = () => {
    navigate("/");
  };
  return (
    <Layout>
      <div className={styles.cointainer}>
        <div className={styles.wrapper}>
          <h1>LOGIN</h1>
          <form onSubmit={formik.handleSubmit}>
            <input
              id="email"
              name="email"
              type="email"
              onChange={formik.handleChange}
              value={formik.values.email}
              placeholder="Email"
            />
            {formik.errors.email && formik.touched.email && (
              <p>{formik.errors.email}</p>
            )}
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              onChange={formik.handleChange}
              value={formik.values.password}
            />
            {formik.errors.password && formik.touched.password && (
              <p>{formik.errors.password}</p>
            )}
            {isError && <span>{isError}</span>}

            <button type="submit">Submit</button>
            {errMsg && <span>{errMsg}</span>}
          </form>
          <div className={styles.pass}>
            <Link to={"/login"}>Forgot password</Link>
            <br />
            or <Link to={"/signup"}>REGISTER</Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
