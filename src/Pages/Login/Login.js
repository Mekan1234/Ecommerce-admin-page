import React, { useEffect } from "react";
import styles from "./Login.module.css";
import CustomInput from "../../Components/CustomInput/CustomInput";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../features/auth/authSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let userSchema = Yup.object({
    email: Yup.string()
      .email("Email Should be valid")
      .required("Email is Required"),
    password: Yup.string().required("Password is Required"),
  });
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: userSchema,
    onSubmit: (values) => {
      dispatch(login(values));
    },
  });
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  useEffect(() => {
    if (!user == null || isSuccess) {
      navigate("admin");
    } else {
    }
  }, [user, isLoading, isError, isSuccess, message]);
  return (
    <div className={styles.loginWrapper}>
      <div className={styles.loginBody}>
        <h3 className="text-center title">Login</h3>
        <p className="text-center">Login to your account to continue.</p>
        <div className="error text-center">
          {message.message == "Rejected" ? "You are not an admin" : ""}
        </div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            name="email"
            label="Email Address"
            id="email"
            value={formik.values.email}
            onChange={formik.handleChange("email")}
          />
          <div className={styles.error}>
            {formik.touched.email && formik.errors.email ? (
              <div>{formik.errors.email}</div>
            ) : null}
          </div>
          <CustomInput
            type="password"
            name="password"
            label="Password"
            id="pass"
            value={formik.values.password}
            onChange={formik.handleChange("password")}
          />
          <div className={styles.error}>
            {formik.touched.password && formik.errors.password ? (
              <div>{formik.errors.password}</div>
            ) : null}
          </div>
          <button className={styles.loginButton} type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
