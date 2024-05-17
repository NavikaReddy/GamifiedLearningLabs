import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './LeaderBoard.css';

function LeaderBoard() {
  let [users, setUsers] = useState([]);
  let [err, setErr] = useState("");

  let getUsers = () => {
    axios.get("http://localhost:3500/user-api/get-users")
      .then(response => {
        if (response.status === 200) {
          setUsers(response.data);
        }
      })
      .catch(err => {
        if (err.response) {
          setErr(err.response.data.message); // Assuming the error message is returned from the server
        } else if (err.request) {
          setErr("Request error: " + err.message);
        } else {
          setErr("Other error: " + err.message);
        }
      });
  }

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div>
      <h1>LeaderBoard</h1>
      {err && <div className="error">{err}</div>}
      <div className='table-responsive'>
        <table className='table table-striped'>
          <thead>
            <tr>
              <th scope='col'>Username</th>
              <th scope='col'>Email</th>
              <th scope='col'>Total Score</th>
              <th scope='col'>Dijkstra</th>
              <th scope='col'>DSA Test</th>
            </tr>
          </thead>
          <tbody>
            {users.map((userObj) => (
              <tr key={userObj.id}>
                <td>{userObj.username}</td>
                <td>{userObj.email}</td>
                <td>{parseInt(userObj.dijkstraScore) + parseInt(userObj.dsaTestScore)}</td>
                <td>{userObj.dijkstraScore}</td>
                <td>{userObj.dsaTestScore}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default LeaderBoard;
