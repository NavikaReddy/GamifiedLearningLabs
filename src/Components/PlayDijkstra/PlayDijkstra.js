import React from 'react';
import './PlayDijkstra.css'
import { Link } from 'react-router-dom';

const PlayDijkstra = () => {
  return (
    <div>
      <h2>How Dijkstra Algorithm Works?</h2>
      <iframe width="560" 
      height="315" 
      src="https://www.youtube.com/embed/wtdtkJgcYUM?si=2kYkJ8nFa7H2pYOr" 
      title="YouTube video player" 
      frameborder="0" 
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
      referrerpolicy="strict-origin-when-cross-origin" 
      allowfullscreen='true'>
      </iframe>
      <Link to="/cargame">
    <button>Play Now!</button>
  </Link>
    </div>
  );
};

export default PlayDijkstra;
