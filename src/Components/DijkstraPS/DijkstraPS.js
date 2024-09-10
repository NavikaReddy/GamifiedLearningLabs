import React from 'react';
import { Link } from 'react-router-dom';
import './DijkstraPS.css'

const DijkstraPS = () => {
    return (
        <div className="problem-statement-container">
            <h1>Optimal Route Finder: The Minimal Cost Path</h1>
            <p>
                <strong>Problem Explanation:</strong><br />
                In a world with <code>n</code> cities, you are tasked with driving from a given source city to a specified destination city. Your goal is to determine the minimal cost, measured by the distance, required to travel from the source city to each of the <code>n</code> cities. The cities and the distances between them are represented by an <code>n x n</code> adjacency matrix. Each element <code>A[i][j]</code> in the matrix denotes the distance from city <code>i</code> to city <code>j</code>. Your task is to find the minimal distance from the source city to every other city, including the destination city.
            </p>
            <p>
                <strong>Input Format:</strong><br />
                The first line contains an integer <code>n</code>, denoting the number of cities.<br />
                The next <code>n</code> lines each contain <code>n</code> space-separated integers, representing the adjacency matrix <code>A</code> where <code>A[i][j]</code> is the distance from city <code>i</code> to city <code>j</code>.<br />
                The next line contains an integer, the source city number.<br />
                The final line contains an integer, the destination city number.
            </p>
            <p>
                <strong>Output Format:</strong><br />
                Output <code>n</code> space-separated integers where the <code>i-th</code> integer represents the minimum cost (distance) to reach city <code>i</code> from the source city.
            </p>
            <p>
                <strong>Constraints:</strong><br />
                <code>1 &lt;= n &lt;= 10^4</code><br />
                <code>1 &lt;= A[i][j] &lt;= 10^4</code>
            </p>
            <p>
                <strong>Sample Input 1:</strong><br />
                <pre>{`4
0 10 15 20
10 0 35 25
15 35 0 30
20 25 30 0
0
3`}</pre>
            </p>
            <p>
                <strong>Sample Output 1:</strong><br />
                <pre>{`0 10 15 20`}</pre>
            </p>
            <p>
                <strong>Explanation 1:</strong><br />
                There are 4 cities.<br />
                The adjacency matrix indicates the distances between cities.<br />
                The source city is city 0.<br />
                The minimal distances from city 0 to cities 0, 1, 2, and 3 are 0, 10, 15, and 20, respectively.
            </p>
            <p>
                <strong>Sample Input 2:</strong><br />
                <pre>{`3
0 5 9
5 0 2
9 2 0
1
2`}</pre>
            </p>
            <p>
                <strong>Sample Output 2:</strong><br />
                <pre>{`5 0 2`}</pre>
            </p>
            <p>
                <strong>Explanation 2:</strong><br />
                There are 3 cities.<br />
                The adjacency matrix indicates the distances between cities.<br />
                The source city is city 1.<br />
                The minimal distances from city 1 to cities 0, 1, and 2 are 5, 0, and 2, respectively.
            </p>
            <Link to="/code?id=dij">
                <button className='ms-3 demo-play-button'>Code</button>
            </Link>
        </div>
    );
};

export default DijkstraPS;
