import React from 'react';
import { Link } from 'react-router-dom'; // Import Link component

function Home() {
  return (
    <div>
        <div>Select Game</div>
        <Link to="/cargame">
        <button>Play Dijkstra's</button>
      </Link>
      <Link to="/basketgame">
        <button>Test DSA</button>
      </Link>
        </div>
  )
}

export default Home