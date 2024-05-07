import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './SignIn.css';

function Signin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault(); // Prevent default form submission
    // Here you can add code to validate username and password
    // and send a request to your backend to verify the credentials

    // For now, let's assume the credentials are valid
    // Redirect to the login page
    navigate('/login');
  };

  return (
    <div className='signin-container'>
      <h2>Sign In</h2>
      <form onSubmit={handleLogin} className='signin-form'>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div><Link to="/main"><button type="submit">Let's Go!</button></Link>
        
      </form>
      <p>
        Don't have an account? <Link to="/signup" >Sign up</Link>
      </p>
    </div>
  );
}

export default Signin;
