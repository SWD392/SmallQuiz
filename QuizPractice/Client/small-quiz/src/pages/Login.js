import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFormik } from "formik";
import { useState } from "react";
const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(false)
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
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
    }),
    onSubmit: async (values) => {
      try {
        const response = await axios.post("http://localhost:8081/authenticate", {
          username: values.email,
          password: values.password,
        });
        const token = response.data.jwttoken;
        const role = response.data.role;
        const userid = response.data.userId;
        localStorage.setItem("token", token);
        localStorage.setItem("role", role);
        localStorage.setItem("userid", userid);
        console.log(response.data);
        // Redirect to dashboard or any page
        if(token === null){
          toast.error("Username or Password is incorrect")
        }else{
          if (role === "ROLE_ADMIN") {
            navigate("/list_question");
            toast.success("Login succesfully")
          } else {
            navigate("/home");
            toast.success("Login succesfully")
          }
        }       
      } catch (error) {
        console.error(error);
        formik.setErrors({ email: "Username or password is incorrect" });
      }
    },  
  });

  return (
    <div>
      <div className="limiter">
        <div
          className="container-login100"
          style={{ backgroundImage: 'url("images/bg-01.jpg")' }}
        >
          <div className="wrap-login100 p-l-55 p-r-55 p-t-65 p-b-54">
            <form
              className="login100-form validate-form"
              onSubmit={formik.handleSubmit}
            >
              <span className="login100-form-title p-b-49">Login</span>

              <div
                className="wrap-input100 validate-input m-b-23"
                data-validate="email is required"
              >
                <span className="label-input100">Email</span>
                <input
                  className="input100"
                  type="text"
                  name="email"
                  placeholder="Type your username"
                  value={formik.values.email}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                />
                <span className="focus-input100" data-symbol="" />
              </div>
              {formik.touched.email && formik.errors.email ? (
                <p className="text-danger">{formik.errors.email}</p>
              ) : null}
              <div
                className="wrap-input100 validate-input"
                data-validate="Password is required"
              >
                <span className="label-input100">Password</span>
                <input
                  className="input100"
                  type="password"
                  name="password"
                  placeholder="Type your password"
                  value={formik.values.password}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                />
                <span className="focus-input100" data-symbol="" />
              </div>
              {formik.touched.password && formik.errors.password ? (
                <p className="text-danger">{formik.errors.password}</p>
              ) : null}
              {error && <p className="text-danger">Incorrect Username or Password</p>}
              <div className="text-right p-t-8 p-b-31">
                <a href="#">Forgot password?</a>
              </div>
              {error && (
                <p className="text-danger">Username or password are wrong</p>
              )}
              <div className="container-login100-form-btn">
                <div className="wrap-login100-form-btn">
                  <div className="login100-form-bgbtn" />
                  <button className="login100-form-btn">Login</button>
                </div>
              </div>
              <div className="txt1 text-center p-t-54 p-b-20">
                <span>
                  Or{" "}
                  <Link
                    style={{
                      textDecoration: "none",
                      fontWeight: "bold",
                      color: "#333",
                    }}
                    to="/signup"
                  >
                    Sign up
                  </Link>{" "}
                  Using
                </span>
              </div>
              {/* <div className="flex-col-c p-t-155">
                <span className="txt1 p-b-17">Or Sign Up Using</span>
                <a href="#" className="txt2">
                  Sign Up
                </a>
              </div> */}
            </form>
          </div>
        </div>
      </div>
      
      <div id="dropDownSelect1" />
    </div>
  );
};

export default Login;
