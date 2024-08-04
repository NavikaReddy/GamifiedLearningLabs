import React from 'react'
import { Link } from 'react-router-dom'; // Import Link component
import './Tests.css';

function Tests() {
  return (
    <div>
    <h2>DSA : Dynamic Skills Arena</h2>
    <h6>Test your concepts of Data Structures and Algorithms through fun and interactive online games!</h6>
    <div className="game-cards-container">
      
      <div className="game-card">
        <img src="https://images.playground.com/3b9d508b13bc40b093b13b32897c0c64.jpeg" alt="Game 1" />
        <h3>DSA Baskets</h3>
        <p>To Catch or To Not?</p>
        <Link to="/basketgame">
          <button>Play Now!</button>
        </Link>
      </div>
      <div className="game-card">
        <img src="https://images.playground.com/3b9d508b13bc40b093b13b32897c0c64.jpeg" alt="Game 1" />
        <h3>DSA Quiz😎</h3>
        <p>Brain Teaser Triumph</p>
        <Link to="/dsaQuiz">
          <button>Play Now!</button>
        </Link>
      </div>
    </div>
    <Link to="/main">
          <button className='Back'>Back to All Courses</button>
        </Link>
  </div>
  )
}

export default Tests