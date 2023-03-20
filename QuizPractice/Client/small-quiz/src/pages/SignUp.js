import axios from "axios";
import { useFormik } from "formik";
import React from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import "./signup.scss";
const SignUp = () => {

  <Helmet>
        <meta charSet="utf-8" />
        <title>Sign Up</title>
        <link rel="canonical" href="http://mysite.com/example" />
  </Helmet>

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
      role: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .required("Required")
        .matches(
          /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/,
          "Please enter a valid email address"
        ),
      password: Yup.string()
        .required("Required")
        .matches(
          /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
          "Password must be minimum eight characters, at least one letter and one number"
        ),
      confirmPassword: Yup.string()
        .required("Required")
        .oneOf([Yup.ref("password"), null], "Password must match"),
      firstName: Yup.string()
        .required("Required")
        .matches(/^[a-zA-Z]{2,}$/, "First Name is not valid"),
      lastName: Yup.string()
        .required("Required")
        .matches(/^[a-zA-Z]{2,}$/, "Last Name is not valid"),
      role: Yup.string().required("Required"),
    }),
    onSubmit: async (values) => {
      console.log(values.firstName);
      try {
        const response = await axios.post("http://localhost:8081/register", {
          username: values.username,
          password: values.password,
          firstName: values.firstName,
          lastName: values.lastName,
          role: values.role,
        });
        const token = response.data.token;
        localStorage.setItem("token", token);
        toast.success("Register succesfully!");
        navigate("/login");
      } catch (error) {
        toast.error('Register Unsuccesfully!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
      }
    },
  });


  return (
    <div className="signup-container">
      <div className="limiter" style={{ height: "100%" }}>
        <div className="form_wrapper">
          <div className="form_container">
            <div className="title_container">
              <h2> Registration </h2>
            </div>
            <div className="row clearfix">
              <div className>
                <form onSubmit={formik.handleSubmit}>
                  <div className="input_field">
                    <span>
                      <i aria-hidden="true" className="fa fa-envelope" />
                    </span>
                    <input
                      type="email"
                      name="username"
                      value={formik.values.username}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      placeholder="Email"
                    />
                  </div>
                  {formik.touched.username && formik.errors.username ? (
                    <p className="text-danger">{formik.errors.username}</p>
                  ) : null}
                  <div className="input_field">
                    <span>
                      <i aria-hidden="true" className="fa fa-lock" />
                    </span>
                    <input
                      type="password"
                      name="password"
                      value={formik.values.password}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      placeholder="Password"
                    />
                  </div>
                  {formik.touched.password && formik.errors.password ? (
                    <p className="text-danger">{formik.errors.password}</p>
                  ) : null}
                  <div className="input_field">
                    <span>
                      <i aria-hidden="true" className="fa fa-lock" />
                    </span>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formik.values.confirmPassword}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      placeholder="Re-type Password"
                    />
                  </div>
                  {formik.touched.confirmPassword &&
                  formik.errors.confirmPassword ? (
                    <p className="text-danger">
                      {formik.errors.confirmPassword}
                    </p>
                  ) : null}
                  <div className="row clearfix">
                    <div className="col_half">
                      <div className="input_field">
                        <span>
                          <i aria-hidden="true" className="fa fa-user" />
                        </span>
                        <input
                          type="text"
                          name="firstName"
                          value={formik.values.firstName}
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          placeholder="First Name"
                        />
                      </div>
                    </div>
                    {formik.touched.firstName && formik.errors.firstName ? (
                      <p className="text-danger">{formik.errors.firstName}</p>
                    ) : null}
                    <div className="col_half">
                      <div className="input_field">
                        <span>
                          <i aria-hidden="true" className="fa fa-user" />
                        </span>
                        <input
                          type="text"
                          name="lastName"
                          value={formik.values.lastName}
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          placeholder="Last Name"
                        />
                      </div>
                    </div>
                    {formik.touched.lastName && formik.errors.lastName ? (
                      <p className="text-danger">{formik.errors.lastName}</p>
                    ) : null}
                  </div>
                  <div className="input_field select_option">
                    <select
                      name="role"
                      value={formik.values.role}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    >
                      <option value="">Select a role</option>
                      <option value="ROLE_USER">Student</option>
                      <option value="ROLE_ADMIN">Teacher</option>
                    </select>
                    <div className="select_arrow" />
                  </div>
                  {formik.touched.role && formik.errors.role ? (
                    <p className="text-danger">{formik.errors.role}</p>
                  ) : null}
                  <input
                    className="button"
                    type="submit"
                    defaultValue="Register"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
