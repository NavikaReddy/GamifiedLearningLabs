import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'react-bootstrap'
import './SignUp.css';

function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [educationInstitution, setEducationInstitution] = useState('');
  const [grade, setGrade] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = (event) => {
    event.preventDefault();
    // Validate password match
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    // Here you can add code to register the user
    // and send a request to your backend to create a new account

    // For now, let's assume the account is created successfully
    // Redirect to the login page
    navigate('/signin');
  };

  return (
    <div className='signup-container'>
    <h2>Sign Up</h2>
    {error && <p style={{ color: 'red' }}>{error}</p>}
    <form onSubmit={handleSignup} className='signup-form'>
      <div className='items'>
        <label>Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
      </div>
      <div>
        <label>Confirm Password:</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Education Institution:</label>
        <input
          type="text"
          value={educationInstitution}
          onChange={(e) => setEducationInstitution(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Grade Studying In:</label>
        <input
          type="text"
          value={grade}
          onChange={(e) => setGrade(e.target.value)}
          required
        />
      </div>
      <button type="submit" className='submit-button'>Register Me!</button>
    </form>
    <p>
      Already have an account? <Link to="/signin">Sign in</Link>
    </p>
  </div>
  
  );
}

export default Signup;
