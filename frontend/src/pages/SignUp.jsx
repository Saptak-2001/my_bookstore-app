import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignUp = () => {
  const [values, setValues] = useState({
    username: '',
    email: '',
    phone: '',
    password: '',
    address: ''
  });
  const navigate = useNavigate();

  const change = (e) => {
    const {name, value} = e.target;
    setValues({...values, [name]: value});
  }

  const handleSubmit = async () => {
    try {
      if(values.username === "" || values.email === "" || values.phone === "" || values.password === "" || values.address === ""){
        alert("All fields are required!");
      } else {
        const response = await axios.post("http://localhost:1000/api/auth/sign-up", values);
      alert(response.data.message);
      navigate("/sign-in");
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  }

  return (
    <div className='h-auto bg-zinc-900 px-12 py-8 flex items-center justify-center'>
      <div className='bg-zinc-800 rounded-lg px-8 py-5 w-full md:w-3/6 lg:w-2/6'>
      <p className='text-zinc-200 text-xl text-center'>Sign Up</p>
      <div className='mt-4'>
          <label htmlFor="" className='text-zinc-400'>
            Name
          </label>
          <input type="text" className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none' placeholder='Enter your name' name='username' required value={values.username} onChange={change}/>
      </div>
      <div className='mt-4'>
          <label htmlFor="" className='text-zinc-400'>
            Email
          </label>
          <input type="email" className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none' placeholder='Enter your email (xyz@example.com)' name='email' required value={values.email} onChange={change}/>
      </div>
      <div className='mt-4'>
          <label htmlFor="" className='text-zinc-400'>
            Phone
          </label>
          <input type="phone" className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none' placeholder='Enter your phone' name='phone' required value={values.phone} onChange={change}/>
      </div>
      <div className='mt-4'>
          <label htmlFor="" className='text-zinc-400'>
            Password
          </label>
          <input type="password" className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none' placeholder='Enter a password' name='password' required value={values.password} onChange={change}/>
      </div>
      <div className='mt-4'>
          <label htmlFor="" className='text-zinc-400'>
            Address
          </label>
          <textarea className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none' rows="4" placeholder='Enter your address' name='address' required value={values.address} onChange={change}/>
      </div>
      <div className='mt-4'>
        <button className='w-full bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600 transition-all duration-300' onClick={handleSubmit}>
          Sign Up
        </button>
      </div>
      <p className='flex mt-4 items-center justify-center text-zinc-200 font-semibold'>
        Or
      </p>
      <p className='flex mt-4 items-center justify-center text-zinc-500 font-semibold'>
        Already Have an Account? &nbsp;
        <Link to="/sign-in" className='hover:text-blue-500'>
        <u>Login</u>
        </Link>
      </p>
      </div>
    </div>
  )
}

export default SignUp
