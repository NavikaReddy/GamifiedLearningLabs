import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Axios from 'axios';
import './Status.css'; // Add your CSS file for styling

const Status = () => {
    const [score, setScore] = useState(0);
    const location = useLocation();
    const { results } = location.state || { results: [] };

    useEffect(() => {
        const updateDScore = async () => {
            try {
                const queryParams = new URLSearchParams(location.search);
                const id = queryParams.get('id');

                if (!id) return;

                // Calculate the score based on the number of test cases passed
                const testCasesPassed = results.filter(result => result.status === 'accepted').length;
                const calculatedScore = testCasesPassed * 10;

                // Update the score in state
                setScore(calculatedScore);

                // Construct the request body based on the type of code
                let requestBody = {};

                if (id === 'dij') {
                    requestBody = { dijkstraCode: calculatedScore };
                } else if (id === 'bin') {
                    requestBody = { binarySearchCode: calculatedScore };
                } else if (id === 'pos') {
                    requestBody = { postfixCode: calculatedScore };
                }
                console.log(requestBody);
                // Make the API request
                await Axios.post('http://localhost:3500/user-api/updateDScore', requestBody);

                console.log('Score updated successfully');
            } catch (error) {
                console.error('Error updating score:', error);
            }
        };

        updateDScore();
    }, [location.search, results]);

    return (
        <div className="status-page">
            <h1>Test Case Results</h1>
            <div className="score-section">
                <h2>Calculated Score: {score}</h2>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Test Case</th>
                        <th>Status</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    {results.map((result, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>
                                {result.status === 'accepted' ? (
                                    <span className="status-tick">✔️</span>
                                ) : (
                                    <span className="status-cross">❌</span>
                                )}
                            </td>
                            <td>{result.description}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Status;
