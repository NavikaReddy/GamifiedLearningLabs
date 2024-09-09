import React from 'react';
import './DemoDijkstra.css';
import { Link } from 'react-router-dom';

const DemoInstructions = () => {
  return (
    <div className="demo-container">
      <h2 className="demo-title">How to Play the Dijkstra's Algorithm Game</h2>

      <div className="demo-step">
        <h3>Step 1: Understand the Objective</h3>
        <p>Navigate a car from the source to the destination using the shortest path. The map will show various paths with distances.</p>
        <img src="images/objective.png" alt="Game Objective" className="demo-image" />
      </div>

      <div className="demo-step">
        <h3>Step 2: Choose the Path</h3>
        <p>Select the shortest path between nodes by clicking on the path lines. Each path is weighted, and your goal is to minimize the total distance.</p>
        <img src="images/path-selection.png" alt="Path Selection" className="demo-image" />
      </div>

      <div className="demo-step">
        <h3>Step 3: End Node Decision</h3>
        <p>Once you reach the destination node, if you’ve chosen the correct shortest path, you will be redirected to the next level. If the path is incorrect, you have failed this level and must retry.</p>
        <img src="images/end-node.png" alt="End Node" className="demo-image" />
      </div>

      <div className="demo-step">
        <h3>Step 4: Progress through Levels</h3>
        <p>As you progress, maps become more complex. Apply Dijkstra's Algorithm to find the optimal path in increasingly challenging levels. There are a total of 3 levels:</p>
        <div className="level-images">
          <img src="images/l1.png" alt="Level 1" className="level-image" />
          <img src="images/l2.png" alt="Level 2" className="level-image" />
          <img src="images/l3.png" alt="Level 3" className="level-image" />
        </div>
      </div>

      <Link to="/cargame">
        <button className="demo-play-button">Start the Game</button>
      </Link>
    </div>
  );
};

export default DemoInstructions;
