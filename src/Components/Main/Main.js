import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Main.css'; // Import your CSS file for Main component

function Main() {
  const [userData, setUserData] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Fetch user data from the location state passed from Signin component
    if (location.state && location.state.userData) {
      setUserData(location.state.userData);
    } else {
      // Handle case where user data is not available in location state
    }
  }, [location.state]);

  const handleCourseChange = (event) => {
    const selectedCourse = event.target.value;
    setSelectedCourse(selectedCourse);
    // Redirect to the home page when the "DSA" option is selected
    if (selectedCourse === 'DSA') {
      navigate('/home');
    }
    // Add additional conditions to redirect to other components based on selected course
  };

  // Dummy data for recommended courses (replace with actual data from your backend)
  const recommendedCourses = [
    {
      id: 1,
      title: 'Course 1',
      imageUrl: 'https://via.placeholder.com/150', // Sample image URL
    },
    {
      id: 2,
      title: 'Course 2',
      imageUrl: 'https://via.placeholder.com/150', // Sample image URL
    },
    // Add more courses as needed
  ];

  return (
    <div>
      <nav>
        <ul>
          <li><Link to="/">Sign Out</Link></li>
          <li><Link to="/courses">Courses</Link></li>
          {/* Add more navigation links as needed */}
        </ul>
      </nav>
      <div className="user-details">
        <h2>Welcome {userData ? userData.username : 'User'}!</h2>
        <p>Scores: {userData ? userData.scores : 'N/A'}</p>
        <p>Points: {userData ? userData.points : 'N/A'}</p>
      </div>
      <div className="search-bar">
        <h3>Search Courses</h3>
        <select value={selectedCourse} onChange={handleCourseChange}>
          <option value="">Select a course</option>
          <option value="DSA">DSA</option>
          <option value="OOPs">OOPs</option>
          <option value="OS">OS</option>
          {/* Add more options as needed */}
        </select>
      </div>
    </div>
  );
}

export default Main;
