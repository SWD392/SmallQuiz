import React from 'react'
import { useForm } from 'react-hook-form'

import LoginForm from '../components/Login/LoginForm'



export default function Login() {
  return (
    <>
   
  <div className="limiter">
  <div className="container-login100" style={{backgroundImage: 'url("images/bg-01.jpg")'}}>
    <div className="wrap-login100 p-l-55 p-r-55 p-t-65 p-b-54">
      <LoginForm ></LoginForm>
        <div className="txt1 text-center p-t-54 p-b-20">
          <span>
            Or Sign Up Using
          </span>
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
        <div className="flex-col-c p-t-155">
          <span className="txt1 p-b-17">
            Or Sign Up Using
          </span>
          <a href="#" className="txt2">
            Sign Up
          </a>
        </div>

    </div>
  </div>
</div>

  <div id="dropDownSelect1" />

    </>
  )
}
