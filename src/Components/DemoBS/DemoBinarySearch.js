import React from 'react';
import './DemoBinarySearch.css';
import { Link } from 'react-router-dom';

const DemoBinarySearch = () => {
  return (
    <div className="demo-container">
      <h2 className="demo-title">How to Play the Binary Search Game</h2>

      <div className="demo-step">
        <h3>Step 1: Understand the Objective</h3>
        <p>Find the target number within the sorted array of eggs by using binary search techniques. The array's sorting may vary across levels.</p>
        <img src="images/bsobj.png" alt="Game Objective" className="demo-image" />
      </div>

      <div className="demo-step">
        <h3>Step 2: Select the Correct Direction</h3>
        <p>For each level, you need to decide whether to move left or right based on the target number and the current egg's number. Follow binary search rules to narrow down the search.</p>
        <img src="images/bsdir.png" alt="Direction Selection" className="demo-image" />
      </div>

      <div className="demo-step">
        <h3>Step 3: Handling Different Levels</h3>
        <p>Navigate through three levels with different sorting configurations:</p>
        <ul>
          <li><strong>Level 1:</strong> Ascending Order</li>
          <li><strong>Level 2:</strong> Descending Order</li>
          <li><strong>Level 3:</strong> Rotated Sorted Array</li>
        </ul>
        <div className="level-images">
          <img src="images/bl1.png" alt="Ascending Order" className="level-image" />
          <img src="images/bl2.png" alt="Descending Order" className="level-image" />
          <img src="images/bl3.png" alt="Rotated Sorted Array" className="level-image" />
        </div>
      </div>

      <div className="demo-step">
        <h3>Step 4: Progress Through Levels</h3>
        <p>As you complete each level, you’ll be challenged with different sorting configurations. Apply binary search techniques accordingly. If you fail, you will need to restart the level.</p>
        <img src="images/b3.png" alt="Game Progress" className="demo-image" />
      </div>

      <Link to="/binarygame">
        <button className="demo-play-button">Start the Game</button>
      </Link>
    </div>
  );
};

export default DemoBinarySearch;
