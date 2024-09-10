import React from 'react';
import { useNavigate } from 'react-router-dom';
import './BSPS.css';
import { Link } from 'react-router-dom';

const BSPS = () => {
    return (
        <div className="problem-statement-container">
            <h1>Bunny's Egg Hunt: Finding the Hidden Number</h1>
            <p>
                The Easter Bunny is on a quest to find a hidden number among a series of eggs. Each egg is marked with a number, and these numbers are arranged in increasing order. The Bunny wants to find the hidden number in the most optimal way possible. Your task is to help the Bunny by implementing a search algorithm to locate the hidden number within the sorted list of eggs.
            </p>
            <h2>Input Format</h2>
            <ul>
                <li>The first line contains an integer <code>n</code>, the number of elements in the array.</li>
                <li>The second line contains <code>n</code> space-separated integers representing the sorted array elements.</li>
                <li>The third line contains a single integer representing the number the Bunny is searching for.</li>
            </ul>
            <h2>Output Format</h2>
            <ul>
                <li>Print "Element found at index <code>i</code>" where <code>i</code> is the 0-based index of the element if it is found.</li>
                <li>Print "Element not found" if the element is not present in the array.</li>
            </ul>
            <h2>Constraints</h2>
            <ul>
                <li><code>1 ≤ n ≤ 10^4</code></li>
                <li><code>1 ≤ A[i] ≤ 10^4</code></li>
            </ul>
            <h2>Sample Input and Output</h2>
            <h3>Sample Input 1</h3>
            <pre>
                10
                1 2 3 4 5 6 7 8 9 10
                5
            </pre>
            <h3>Sample Output 1</h3>
            <pre>
                Element found at index 4
            </pre>
            <p>Explanation: The array contains numbers from 1 to 10. The Bunny is searching for the number 5, which is located at index 4 (0-based index).</p>
            <h3>Sample Input 2</h3>
            <pre>
                7
                2 4 6 8 10 12 14
                5
            </pre>
            <h3>Sample Output 2</h3>
            <pre>
                Element not found
            </pre>
            <p>Explanation: The array contains the numbers 2, 4, 6, 8, 10, 12, and 14. The Bunny is searching for the number 5, which is not present in the array. Hence, the output is "Element not found".</p>
            <Link to="/code?id=bin">
                <button className='ms-3 demo-play-button'>Code</button>
            </Link>
        </div>
    );
};

export default BSPS;
