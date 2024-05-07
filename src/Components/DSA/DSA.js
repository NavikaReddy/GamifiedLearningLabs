import React from 'react';
import { Link } from 'react-router-dom'; // Import Link component
import './DSA.css';

function DSA() {
  return (

   
    <div>
    <h2>DSA : Dynamic Skills Arena</h2>
    <h6>Learn and explore the concepts of Data Structures and Algorithms through fun and interactive online games!</h6>
    <div className="game-cards-container">
      
      <div className="game-card">
        <img src="https://images.playground.com/f909e432cf6340168a17419d4c0a218f.jpeg" alt="Game 1" />
        <h3>Dijkstra's Game</h3>
        <p>Race your way through the graph!</p>
        <Link to="/cargame">
          <button>Play Now!</button>
        </Link>
      </div>
      <div className="game-card">
        <img src="https://images.playground.com/3b9d508b13bc40b093b13b32897c0c64.jpeg" alt="Game 2" />
        <h3>DSA Baskets</h3>
        <p>To Catch or To Not?</p>
        <Link to="/basketgame">
          <button>Play Now!</button>
        </Link>
      </div>
    </div>
    <Link to="/main">
          <button className='Back'>Back to All Courses</button>
        </Link>
  </div>
  );
}

export default DSA;
