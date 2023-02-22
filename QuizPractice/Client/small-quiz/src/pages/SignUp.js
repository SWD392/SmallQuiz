import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
const SignUp = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('');
  const navigate = useNavigate()

  const handleSignUp = async (e) => {
	e.preventDefault()
	try {
		const response = await axios.post('http://localhost:8081/register', {
		  username,
		  password,
		  role,
		});
		const token = response.data.token;
		localStorage.setItem('token', token);
		toast("Register succesfully!");
	  } catch (error) {
		
	  }
  }

  return (
    <div>
      <div className="limiter">
        <div
          className="container-login100"
          style={{ backgroundImage: 'url("images/bg-01.jpg")' }}
        >
          <div className="wrap-login100 p-l-55 p-r-55 p-t-65 p-b-54">
            <form className="login100-form validate-form" onSubmit={handleSignUp}>
              <span className="login100-form-title p-b-49">Sign Up</span>

              <div
                className="wrap-input100 validate-input m-b-23"
                data-validate="email is required"
              >
                <span className="label-input100">Email</span>
                <input
                  className="input100"
                  type="text"
                  name="email"
				  value={username}
                  placeholder="Type your username"
                  onChange={(e) => setUsername(e.target.value)}
                />
                <span className="focus-input100" data-symbol="" />
              </div>
              <div
                className="wrap-input100 validate-input"
                data-validate="Password is required"
              >
                <span className="label-input100">Password</span>
                <input
                  className="input100"
                  type="password"
				  value={password}
                  name="password"
                  placeholder="Type your password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span className="focus-input100" data-symbol="" />
              </div>
              <div
                className="wrap-input100 validate-input"
                data-validate="Password is required"
              >
                <span className="label-input100">Password</span>
                <input
                  className="input100"
                  type="password"
				  value={confirmPassword}
                  name="password"
                  placeholder="Type your password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <span className="focus-input100" data-symbol="" />
              </div>
              <div
                className="wrap-input100 validate-input"
                data-validate="Password is required"
              >
                <span className="label-input100">Role</span>
                <select
                  id="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="">Select a role</option>
                  <option value="ROLE_USER">User</option>
                  <option value="ROLE_ADMIN">Admin</option>
                </select>
                <span className="focus-input100" data-symbol="" />
              </div>
              <div
                className="container-login100-form-btn"
                style={{ paddingTop: "20px" }}
              >
                <div className="wrap-login100-form-btn">
                  <div className="login100-form-bgbtn" />
                  <button className="login100-form-btn">Sign Up</button>
                </div>
              </div>
              <div className="txt1 text-center p-t-54 p-b-20">
                <span>Or Sign Up Using</span>
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
		<ToastContainer />
      </div>
      <div id="dropDownSelect1" />
    </div>
  );
};

export default SignUp;
