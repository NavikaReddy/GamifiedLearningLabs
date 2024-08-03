import React, { useState, useRef } from 'react';
import './Postfix.css';
import { evaluatePostfix } from './postfixEvaluator';

function Postfix() {
  const [infix, setInfix] = useState('');
  const canvasRef = useRef(null);

  const startEvaluation = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    evaluatePostfix(infix, context);
  };

  return (
    <div className="container">
      <h1>Postfix Evaluation Using Stacks</h1>
      <div>
        <input
          type="text"
          value={infix}
          onChange={(e) => setInfix(e.target.value)}
          placeholder="Enter infix expression"
            className='me-5'
        />
        <button onClick={startEvaluation} className='btn btn-success'>Evaluate</button>
      </div>
      <br></br>
      <canvas id="canvas" ref={canvasRef} width="800" height="400"></canvas>
    </div>
  );
}

export default Postfix;
