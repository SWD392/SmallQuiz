import React from 'react';
import { emailValidator,passwordValidator } from '../components/regexValidator';
import {Navigate, useNavigate} from "react-router-dom"
import { useState } from 'react';
import axios from 'axios';

const Login = () => {
	const nagative = useNavigate()

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleEmailChange = (event) => {
		setEmail(event.target.value);
	};

	const handlePasswordChange = (event) => {
		setPassword(event.target.value);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		const data = {
			username: email,
			password: password,
		};
		axios.post("http://localhost:8080/authenticate", data).then((response) => {
			const token = response.data.token;
			localStorage.setItem("token", token);
			// Redirect to dashboard or any page
			console.log(response.data);
		});
	};
	//email:thinhxom1109
	//password:Thinhhuyen1120009@
	return (
		<div>
			<div className="limiter">
				<div className="container-login100" style={{ backgroundImage: 'url("images/bg-01.jpg")' }}>
					<div className="wrap-login100 p-l-55 p-r-55 p-t-65 p-b-54">
						<form className="login100-form validate-form" onSubmit={handleSubmit}>
							<span className="login100-form-title p-b-49">Login</span>
							
							
							<div className="wrap-input100 validate-input m-b-23" data-validate="email is required">
								<span className="label-input100">Email</span>
								<input
									className="input100"
									type="text"
									name="email"
									placeholder="Type your username"
									onChange={handleEmailChange}
								/>
								<span className="focus-input100" data-symbol="" />
							</div>
							<div className="wrap-input100 validate-input" data-validate="Password is required">
								<span className="label-input100">Password</span>
								<input
									className="input100"
									type="password"
									name="password"
									placeholder="Type your password"
									onChange={handlePasswordChange}
								/>
								<span className="focus-input100" data-symbol="" />
							</div>
							<div className="text-right p-t-8 p-b-31">
								<a href="#">Forgot password?</a>
							</div>
							<div className="container-login100-form-btn">
								<div className="wrap-login100-form-btn">
									<div className="login100-form-bgbtn" />
									<button className="login100-form-btn">Login</button>
								</div>
							</div>
							<div className="txt1 text-center p-t-54 p-b-20">
								<span>Or Sign Up Using</span>
							</div>
							<div className="flex-c-m">
								<a href="#" className="login100-social-item bg1">
									<i className="fa fa-facebook" />
								</a>
								<a href="#" className="login100-social-item bg2">
									<i className="fa fa-twitter" />
								</a>
								<a href="#" className="login100-social-item bg3">
									<i className="fa fa-google" />
								</a>
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
