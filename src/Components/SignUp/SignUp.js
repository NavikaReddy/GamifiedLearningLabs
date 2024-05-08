import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import './SignUp.css'

function Signup() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [err, setErr] = useState("");

  const addNewUser = (data) => {
    axios.post("http://localhost:3500/user-api/register", data)
      .then((response) => {
        if (response.status === 201) {
          // Navigate to the login page after successful registration
          navigate('/signin');
        } else {
          setErr(response.data.message);
        }
      })
      .catch((err) => {
        // Handle error responses
        if (err.response) {
          setErr(err.response.data.message);
        } else if (err.request) {
          setErr("Network error. Please try again.");
        } else {
          setErr("An unexpected error occurred. Please try again later.");
        }
      });
  }

  return (
    <div className='signup'>
      <h2>Sign Up</h2>
      {err && <p style={{ color: 'white' }}>{err}</p>}
      <form onSubmit={handleSubmit(addNewUser)} className='signup-form'>
        <div className='items'>
          <label>Username:</label>
          <input
            type="text"
            id="username"
            {...register('username', { required: true })}
          />
           {errors.username?.type==='required' && <p className='text-danger fw-bold'>*Username is required</p>}
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            id="email"
            {...register('email', { required: true })}
          />
           {errors.email?.type==='required' && <p className='text-danger fw-bold'>*Email is required</p>}
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            id="password"
            {...register('password', { required: true })}
          />
           {errors.password?.type==='required' && <p className='text-danger fw-bold'>*Password is required</p>}
        </div>

        <div>
          <label>Education Institution:</label>
          <input
            type="text"
            id="institute"
            {...register('institute', { required: true })}
          />
           {errors.institute?.type==='required' && <p className='text-danger fw-bold'>*Institution is required</p>}
        </div>
        <div>
          <label>Grade Studying In:</label>
          <input
            type="text"
            id="grade"
            {...register('grade', { required: true })}
          />
           {errors.grade?.type==='required' && <p className='text-danger fw-bold'>*Grade is required</p>}
        </div>
        <button type="submit" className='submit-button'>Register Me!</button>
      </form>
      <p>
        Already have an account? <Link to="/signin">Sign in</Link>
      </p>
    </div>
  )
}
export default Signup;

