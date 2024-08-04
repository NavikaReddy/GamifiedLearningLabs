import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation, Outlet } from 'react-router-dom';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ScatterChart, Scatter } from 'recharts';
import axios from 'axios'; // Make sure you have axios installed
import './Main.css'; // Import your CSS file for Main component

function Main() {
  const [userData, setUserData] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [topUsers, setTopUsers] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Fetch user data from the location state passed from Signin component
    if (location.state && location.state.userData) {
      setUserData(location.state.userData);
    }
  }, [location.state]);

  useEffect(() => {
    // Fetch top users data from the API
    const fetchTopUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3500/user-api/get-users');
        const users = response.data;

        // Limit to top 3 users
        setTopUsers(users.slice(0, 3));
      } catch (error) {
        console.error("Error fetching top users:", error);
      }
    };

    fetchTopUsers();
  }, []);

  const handleCourseChange = (event) => {
    const selectedCourse = event.target.value;
    setSelectedCourse(selectedCourse);
    // Redirect to the home page when the "DSA" option is selected
    if (selectedCourse === 'DSA') {
      navigate('/home');
    }
    if (selectedCourse === 'Tests') {
      navigate('/tests');
    }
  };

  // Prepare data for charts
  const totalScore = userData ? 
    parseInt(userData.dijkstraScore) +
    parseInt(userData.dsaTestScore) +
    parseInt(userData.binarySearchScore) +
    parseInt(userData.dijkstraCode) +
    parseInt(userData.binarySearchCode) +
    parseInt(userData.postfixCode) +
    parseInt(userData.dsaQuizScore) : 0;

  const scoresBySection = [
    { name: 'Learning Games', value: userData ? parseInt(userData.dijkstraScore) + parseInt(userData.binarySearchScore) : 0 },
    { name: 'Code Modules', value: userData ? parseInt(userData.dijkstraCode) + parseInt(userData.binarySearchCode) + parseInt(userData.postfixCode): 0 },
    { name: 'Quizzes', value: userData ? parseInt(userData.dsaQuizScore) + parseInt(userData.dsaTestScore) : 0 },
  ];

  const scoresByAlgorithm = [
    { name: 'Dijkstra', value: userData ? parseInt(userData.dijkstraScore) + parseInt(userData.dijkstraCode) : 0 },
    { name: 'Binary Search', value: userData ? parseInt(userData.binarySearchScore) + parseInt(userData.binarySearchCode) : 0 },
    { name: 'Postfix', value: userData ? parseInt(userData.postfixCode) : 0 },
  ];

  // Convert login timestamps to date counts for heatmap
  const getDateCounts = (loginDates) => {
    const dateCountMap = {};
    
    // Ensure each loginDate is a Date object
    loginDates.forEach(date => {
      // If date is a string, convert it to a Date object
      const dateObj = typeof date === 'string' ? new Date(date) : date;
      
      if (dateObj instanceof Date && !isNaN(dateObj)) {
        const dateString = dateObj.toISOString().split('T')[0]; // YYYY-MM-DD
        if (dateCountMap[dateString]) {
          dateCountMap[dateString]++;
        } else {
          dateCountMap[dateString] = 1;
        }
      }
    });
    
    return Object.keys(dateCountMap).map(date => ({ date, count: dateCountMap[date] }));
  };

  const loginData = userData ? getDateCounts(userData.login) : [];

  return (
    <div>
      <ul className="nav justify-content-center">
        <li className="nav-item">
          <Link className="nav-link" to="/">SignOut</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="leaderboard">LeaderBoard</Link>
        </li>
      </ul>
      {/* Conditionally render user details and search bar based on the route */}
      {location.pathname !== '/main/leaderboard' && (
        <div>
          <div className="user-details">
            <h2>Welcome {userData ? userData.username : 'User'}!</h2>
            <p>Scores: {userData ? totalScore : '-'}</p>
          </div>
          <div className="search-bar">
            <h3>Search Courses</h3>
            <select value={selectedCourse} onChange={handleCourseChange}>
              <option value="">Select a course</option>
              <option value="DSA">DSA</option>
              <option value="Tests">Tests</option>
            </select>
          </div>
        </div>
      )}


      {/* Pie Chart for Percentage of Marks in Various Sections */}
      <div className="chart-container">
        <div className="chart-item">
          <h2>Percentage of Marks by Section</h2>
          <PieChart width={300} height={300}>
            <Pie
              data={scoresBySection}
              dataKey="value"
              nameKey="name"
              outerRadius={120}
              fill="#8884d8"
              label
            >
              {scoresBySection.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={index === 0 ? '#82ca9d' : '#8884d8'} />
              ))}
            </Pie>
            <Tooltip />
            <Legend verticalAlign="top" align="right" />
          </PieChart>
        </div>

        {/* Donut Chart for Percentage of Marks in Various Algorithms */}
        <div className="chart-item">
          <h2>Percentage of Marks by Algorithm</h2>
          <PieChart width={300} height={300}>
            <Pie
              data={scoresByAlgorithm}
              dataKey="value"
              nameKey="name"
              innerRadius={80}
              outerRadius={120}
              fill="#8884d8"
              label
            >
              {scoresByAlgorithm.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={index === 0 ? '#82ca9d' : '#8884d8'} />
              ))}
            </Pie>
            <Tooltip />
            <Legend verticalAlign="top" align="right" />
          </PieChart>
        </div>
      </div>
      {/* Heatmap (Login Activity) */}
      <h2>Login Heatmap</h2>
      <ScatterChart width={600} height={400}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis type="category" dataKey="date" name="Date" />
        <YAxis type="number" dataKey="count" name="Login Count" />
        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
        <Scatter name="Login Activity" data={loginData} fill="#8884d8" />
      </ScatterChart>

      {/* Top 3 Users by Total Score */}
      <h2>Top 3 Users by Total Score</h2>
      <BarChart width={600} height={400} data={topUsers}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="username" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="totalScore" fill="#8884d8">
          {topUsers.map((user, index) => (
            <Cell key={`cell-${index}`} fill={index === 0 ? '#82ca9d' : '#8884d8'} />
          ))}
        </Bar>
      </BarChart>

      <Outlet />
    </div>
  );
}

export default Main;