import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import './SignIn.css';

function Signin() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [err, setErr] = useState("");

  const handleLogin = async (data) => {
    try {
      const response = await axios.post("http://localhost:3500/user-api/signin", data);
      if (response.status === 200) {
        // Authentication successful, navigate to the main page
        navigate('/main',{state:{userData:response.data.user}});
      } else {
        // Authentication failed, display error message
        setErr(response.data.message);
      }
    } catch (error) {
      // Handle network errors or unexpected errors
      console.error('Error occurred while signing in:', error);
      setErr("The username or password entered is incorrect!");
    }
  };
  

  return (
    <div className='signin'>
      <h2>Sign In</h2>
      {err && <p style={{ color: 'red' }}>{err}</p>}
      <form onSubmit={handleSubmit(handleLogin)} className='signin-form' >
        <div>
          <label>Username:</label>
          <input
            type="text"
            id="username"
            {...register('username', { required: true })}
          />
          {errors.username?.type === 'required' && <p className='text-danger fw-bold'>*Username is required</p>}
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            id="password"
            {...register('password', { required: true })}
          />
          {errors.password?.type === 'required' && <p className='text-danger fw-bold'>*Password is required</p>}
        </div>
        <button type="submit">Sign In</button>
      </form>
      <p>
        Don't have an account? <Link to="/signup">Sign up</Link>
      </p>
    </div>
  );
}

export default Signin;

