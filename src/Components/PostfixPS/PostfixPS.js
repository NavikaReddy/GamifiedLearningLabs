import { Link } from "react-router-dom";
const PostfixPS = () => {
  return (
    <div className="postfix-evaluator">
      <h1>Postfix Expression Evaluator</h1>
      <p>In this problem, you are given a postfix expression, also known as Reverse Polish Notation (RPN). Your task is to evaluate the expression and return the result. A postfix expression is a mathematical notation in which every operator follows all of its operands. It does not need any parentheses as long as the operators have a fixed number of operands.</p>
      
      <h2>Input Format:</h2>
      <p>A single string containing the postfix expression. The expression contains single-digit operands (0-9) and operators (+, -, *, /).</p>
      
      <h2>Output Format:</h2>
      <p>A single integer, the result of evaluating the postfix expression.</p>
      
      <h2>Constraints:</h2>
      <ul>
        <li>The length of the postfix expression does not exceed 50.</li>
        <li>The digits will be from 0-9 only, no two-digit numbers.</li>
      </ul>

      <h2>Sample Input and Output:</h2>
      <div className="sample">
        <h3>Sample Input 1:</h3>
        <pre>23+</pre>
        <h3>Sample Output 1:</h3>
        <pre>5</pre>
        <p>Explanation 1: The expression "23+" evaluates to 2 + 3 = 5.</p>
      </div>
      
      <div className="sample">
        <h3>Sample Input 2:</h3>
        <pre>92-3*</pre>
        <h3>Sample Output 2:</h3>
        <pre>21</pre>
        <p>Explanation 2: The expression "92-3*" evaluates to (9 - 2) * 3 = 7 * 3 = 21.</p>
      </div>
      <Link to="/code?id=pos">
                <button className='ms-3 demo-play-button'>Code</button>
            </Link>
      </div>
      )
      }

      export default PostfixPS;