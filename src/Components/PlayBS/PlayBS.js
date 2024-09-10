import React from 'react';
import './PlayBS.css'
import { Link } from 'react-router-dom';

const PlayBS = () => {
  return (
    <div className="demo-container">
      <h2 className="demo-title">How Binary Search Works?</h2>
      <iframe 
      width="560" 
      height="315"
       src="https://www.youtube.com/embed/DRsJ8sA9xzc?si=NTfUCqrP1Sk37ihE"
        title="YouTube video player" 
        frameborder="0"
         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
         referrerpolicy="strict-origin-when-cross-origin" 
         allowfullscreen='true'></iframe>
  <Link to="/demo-bs">
        <button className="demo-play-button">See Demo</button>
      </Link>
  </div>
  );
};

export default PlayBS;
