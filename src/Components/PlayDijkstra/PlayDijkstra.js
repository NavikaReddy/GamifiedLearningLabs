import React from 'react';
import './PlayDijkstra.css'
import { Link } from 'react-router-dom';

const PlayDijkstra = () => {
  return (
    <div className="demo-container">
      <h2 className="demo-title">How Dijkstra Algorithm Works?</h2>
      <iframe width="560" 
      height="315" 
      src="https://www.youtube.com/embed/EFg3u_E6eHU?si=86274BqKXXsET55y"
      title="YouTube video player" 
      frameborder="0" 
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
      referrerpolicy="strict-origin-when-cross-origin" 
      allowfullscreen='true'>
      </iframe>
      <Link to="/Demodj">
        <button className="demo-play-button">Play Now!</button> 
      </Link>
    </div>
  );
};

export default PlayDijkstra;
