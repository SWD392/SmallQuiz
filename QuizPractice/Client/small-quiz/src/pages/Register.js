import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function () {
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
	};
  return (
    <div>
    <div className="limiter">
        <div className="container-login100" style={{ backgroundImage: 'url("images/bg-01.jpg")' }}>
            <div className="wrap-login100 p-l-55 p-r-55 p-t-65 p-b-54">
                <form className="login100-form validate-form" onSubmit={handleSubmit}>
                    <span className="login100-form-title p-b-49">Sign up</span>
                    
                    
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
                    <div className="wrap-input100 validate-input" data-validate="Password is required">
                        <span className="label-input100">rePassword</span>
                        <input
                            className="input100"
                            type="repassword"
                            name="repassword"
                            placeholder="Type your repassword"
                            onChange={handlePasswordChange}
                        />
                        <span className="focus-input100" data-symbol="" />
                    </div>
                    <div className="container-login100-form-btn">
                        <div className="wrap-login100-form-btn">
                            <div className="login100-form-bgbtn" />
                            <button className="login100-form-btn">Sign Up</button>
                        </div>
                    </div>
                    <div className="txt1 text-center p-t-54 p-b-20">
                        <span>Already have acount ?</span>
                        <a href="">Click Here</a>
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
  )
}
