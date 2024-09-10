import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation, Outlet } from 'react-router-dom';
import { Tooltip, XAxis, YAxis, CartesianGrid, Cell, PieChart, Pie, BarChart, Bar, Legend } from 'recharts';
import axios from 'axios';
import CalendarHeatmap from 'react-calendar-heatmap';  // Import the heatmap
import 'react-calendar-heatmap/dist/styles.css';  // Import heatmap styles
import './Main.css';

function Main() {
  const [userData, setUserData] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [topUsers, setTopUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  // Fetch user data from location state
  useEffect(() => {
    const fetchData = async () => {
      if (location.state && location.state.userData) {
        console.log("User data received:", location.state.userData); // Debugging log
        setUserData(location.state.userData);
      }
      setLoading(false);  // <-- Set loading to false after data is fetched
    };

    const delayTimeout = setTimeout(() => {
      fetchData();
    }, 3000); // <-- Adjust the delay here (3000ms = 3 seconds)

    return () => clearTimeout(delayTimeout);  // Clean up the timeout
  }, [location.state]);


  // Fetch top users for the leaderboard
  useEffect(() => {
    const fetchTopUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3500/user-api/get-users');
        const users = response.data;
        setTopUsers(users.slice(0, 3)); // Limit to top 3 users
      } catch (error) {
        console.error("Error fetching top users:", error);
      }
    };

    fetchTopUsers();
  }, []);

  // Handle course selection change
  const handleCourseChange = (event) => {
    const selectedCourse = event.target.value;
    setSelectedCourse(selectedCourse);
    if (selectedCourse === 'DSA') navigate('/home');
    if (selectedCourse === 'Tests') navigate('/tests');
  };

  // Define color scheme for the heatmap
  const COLORS = ['#0e4429', '#006d32', '#27a641', '#3ad353'];

  // Determine heatmap color based on login count
  const getColor = (count) => {
    if (count === 0) return '#161b22'; // No logins
    if (count <= 5) return COLORS[0];
    if (count <= 10) return COLORS[1];
    if (count <= 20) return COLORS[2];
    return COLORS[3];
  };

  // Calculate total score from user data
  let totalScore = userData ? 
    parseInt(userData.dijkstraScore) +
    parseInt(userData.dsaTestScore) +
    parseInt(userData.binarySearchScore) +
    parseInt(userData.dijkstraCode) +
    parseInt(userData.binarySearchCode) +
    parseInt(userData.postfixCode) +
    parseInt(userData.dsaQuizScore) : 0;

  // Prepare data for the pie chart (scores by section)
  const scoresBySection = [
    { name: 'Learning Games', value: userData ? parseInt(userData.dijkstraScore) + parseInt(userData.binarySearchScore) : 0 },
    { name: 'Code Modules', value: userData ? parseInt(userData.dijkstraCode) + parseInt(userData.binarySearchCode) + parseInt(userData.postfixCode): 0 },
    { name: 'Quizzes', value: userData ? parseInt(userData.dsaQuizScore) + parseInt(userData.dsaTestScore) : 0 },
  ];

  // Prepare data for the pie chart (scores by algorithm)
  const scoresByAlgorithm = [
    { name: 'Dijkstra', value: userData ? parseInt(userData.dijkstraScore) + parseInt(userData.dijkstraCode) : 0 },
    { name: 'Binary Search', value: userData ? parseInt(userData.binarySearchScore) + parseInt(userData.binarySearchCode) : 0 },
    { name: 'Postfix', value: userData ? parseInt(userData.postfixCode) : 0 },
  ];

  // Convert login timestamps to date counts for the heatmap
  const getDateCounts = (loginDates) => {
    const dateCountMap = {};
    
    loginDates.forEach(date => {
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
      {loading ? (
        // Show preloader if loading
        <div id="preloader">
          <div id="ctn-preloader" className="ctn-preloader">
            <div className="animation-preloader">
              <div className="spinner"></div>
              <div className="txt-loading">
                <span data-text-preloader="G" className="letters-loading"> G </span>
                <span data-text-preloader="A" className="letters-loading"> A </span>
                <span data-text-preloader="M" className="letters-loading"> M </span>
                <span data-text-preloader="E" className="letters-loading"> E </span>
                <span data-text-preloader="1" className="letters-loading"> 1 </span>
                <span data-text-preloader="0" className="letters-loading"> 0 </span>
                <span data-text-preloader="1" className="letters-loading"> 1 </span>
              </div>
            </div>
            <div className="loader-section section-left"></div>
            <div className="loader-section section-right"></div>
          </div>
        </div>
      ) : (
        // Main content after loading
        <div>
          <ul className="nav justify-content-center">
            <li className="nav-item">
              <Link className="nav-link" to="/">SignOut</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/leaderboard">LeaderBoard</Link>
            </li>
          </ul>

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

          <div className="chart-container">
            <div className="chart-item">
              <h2>Percentage of Marks by Section</h2>
              <PieChart width={300} height={300}>
                <Pie data={scoresBySection} dataKey="value" nameKey="name" outerRadius={120} label>
                  {scoresBySection.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 0 ? '#82ca9d' : index === 1 ? '#8884d8' : '#ffc658'} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="top" align="right" />
              </PieChart>
            </div>
            <div className="chart-item">
              <h2>Percentage of Marks by Algorithm</h2>
              <PieChart width={300} height={300}>
                <Pie data={scoresByAlgorithm} dataKey="value" nameKey="name" innerRadius={80} outerRadius={120} label>
                  {scoresByAlgorithm.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 0 ? '#82ca9d' : index === 1 ? '#8884d8' : '#ffc658'} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="top" align="right" />
              </PieChart>
            </div>
          </div>

          <h2>Login Activity</h2>
          <CalendarHeatmap
            startDate={new Date('2023-03-01')}
            endDate={new Date()}
            values={loginData}
            styleForValue={(value) => {
              if (!value) return { fill: '#161b22' };
              return { fill: getColor(value.count) };
            }}
            tooltipDataAttrs={(value) => ({
              'data-tip': value.date ? `${value.date}: ${value.count} logins` : 'No data',
            })}
          />
          
          <h2 className='mt-4'>Top 3 Users by Total Score</h2>
          <BarChart width={600} height={400} data={topUsers}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="username" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="totalScore">
              {topUsers.map((user, index) => (
                <Cell key={`cell-${index}`} fill={index === 0 ? '#82ca9d' : index === 1 ? '#8884d8' : '#ffc658'} />
              ))}
            </Bar>
          </BarChart>
        </div>
      )}
    </div>
  );
}

export default Main;
