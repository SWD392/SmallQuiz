import React from 'react'
import { useForm } from 'react-hook-form';

export default function LoginForm() {
    

    const {username,setUsername} = useForm();
    const {password,setPassword} = useForm();
    
  
    const {register,handleSubmit,formState: {errors}} = useForm();
    const onSubmit = (data) => console.log(data);

    function loginclick(){
console.warn(username,password)
let item={username,password};
let result= fetch("http://localhost:8083/authenticate")
    }
  return (
    <>
    <form className="login100-form validate-form" onSubmit={handleSubmit(onSubmit)}>
        <span className="login100-form-title p-b-49">
          Login
        </span>
        <div className="wrap-input100 validate-input m-b-23">
          <span className="label-input100">Username</span>
          <input onChange={(e)=> setUsername(e.target.value)} className="input100" type="text" name="username" placeholder="Type your username" {...register("username")}/>
          <span className="focus-input100" data-symbol="" />
        </div>
        <div className="wrap-input100 validate-input" data-validate="Password is required">
          <span className="label-input100">Password</span>
          <input onChange={(e)=> setPassword(e.target.value)} className="input100" type="password" name="pass" placeholder="Type your password" {...register("password",{required: true,minLength: 6,maxLength: 16})} />
          <span className="focus-input100" data-symbol="" />
        </div> 
        <div className="text-right p-t-8 p-b-31">
          <a href="#">
            Forgot password?
          </a>
        </div>
        <div className="container-login100-form-btn">
          <div className="wrap-login100-form-btn">
            <div className="login100-form-bgbtn" />
            <button onClick={loginclick} className="login100-form-btn">
              Login
            </button>
         
          </div>
         
        </div>
        </form>
    
    
    </>
  )
}
