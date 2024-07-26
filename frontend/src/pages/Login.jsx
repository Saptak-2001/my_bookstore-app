import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authActions } from "../store/auth";
import { useDispatch } from 'react-redux';

const Login = () => {

  const [values, setValues] = useState({
    email: '',
    password: ''
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const change = (e) => {
    const {name, value} = e.target;
    setValues({...values, [name]: value});
  }

  const handleSubmit = async () => {
    try {
      if(values.email === "" || values.password === ""){
        alert("All fields are required!");
      } else {
        const response = await axios.post("http://localhost:1000/api/auth/sign-in", values);
        dispatch(authActions.login());
        dispatch(authActions.changeRole(response.data.role));
        localStorage.setItem("id", response.data.id);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", response.data.role);
        navigate("/");
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  }

  return (
    <div className='h-screen bg-zinc-900 px-12 py-8 flex items-center justify-center'>
      <div className='bg-zinc-800 rounded-lg px-8 py-5 w-full md:w-3/6 lg:w-2/6'>
      <p className='text-zinc-200 text-xl text-center'>Sign In</p>
      <div className='mt-4'>
          <label htmlFor="" className='text-zinc-400'>
            Email
          </label>
          <input type="email" className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none' placeholder='Enter your email' name='email' required value={values.email} onChange={change}/>
      </div>
      <div className='mt-4'>
          <label htmlFor="" className='text-zinc-400'>
            Password
          </label>
          <input type="password" className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none' placeholder='Enter a password' name='password' required value={values.password} onChange={change}/>
      </div>
      <div className='mt-4'>
        <button className='w-full bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600 transition-all duration-300' onClick={handleSubmit}>
          Login
        </button>
      </div>
      <p className='flex mt-4 items-center justify-center text-zinc-200 font-semibold'>
        Or
      </p>
      <p className='flex mt-4 items-center justify-center text-zinc-500 font-semibold'>
        Don't Have an Account? &nbsp;
        <Link to="/sign-up" className='hover:text-blue-500'>
        <u>Sign Up</u>
        </Link>
      </p>
      </div>
    </div>
  )
}

export default Login
