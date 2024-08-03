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
        <Link to="/code">
          <button className='ms-3'>Build Algo</button>
        </Link>
      </div>

      <div className="game-card">
        <img src="https://img.freepik.com/premium-photo/hd-8k-wallpaper-stock-photographic_1064748-41419.jpg" alt="Game 2" />
        <h3>Binary Search Game</h3>
        <p>Find it or Not?</p>
        <Link to="/binarygame">
          <button>Play Now!</button>
        </Link>
        <Link to="/code">
          <button className='ms-3'>Build Algo</button>
        </Link>
      </div>
      <div className="game-card">
        <img src="https://www.ebuyer.com/blog/wp-content/uploads/2014/07/buttons-on-a-calculator-header1.jpg" alt="Game 2" />
        <h3>Calculator - backend Visualization </h3>
        <p>Lets calculate!</p>
        <Link to="/postfixeval">
          <button>View Now!</button>
        </Link>
        <Link to="/code">
          <button className='ms-3'>Build Algo</button>
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
