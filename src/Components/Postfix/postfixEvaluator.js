function precedence(op) {
    if (op === '+' || op === '-') return 1;
    if (op === '*' || op === '/') return 2;
    return 0;
  }
  
  function infixToPostfix(infix) {
    let st = [];
    let postfix = [];
    for (let i = 0; i < infix.length; i++) {
      let char = infix[i];
      if (!isNaN(char)) {
        postfix.push(char);
      } else if (char === '(') {
        st.push(char);
      } else if (char === ')') {
        while (st.length && st[st.length - 1] !== '(') {
          postfix.push(st.pop());
        }
        st.pop();
      } else {
        while (st.length && precedence(st[st.length - 1]) >= precedence(char)) {
          postfix.push(st.pop());
        }
        st.push(char);
      }
    }
    while (st.length) {
      postfix.push(st.pop());
    }
    return postfix.join('');
  }
  
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  export async function evaluatePostfix(infix, context) {
    const postfix = infixToPostfix(infix);
    const stack = [];
    const delayTime = 3000;
  
    const drawStack = async () => {
      context.clearRect(390, 100, 100, 200); // Clear only the stack rectangle area
      context.strokeStyle = 'white';
      context.strokeRect(390, 100, 100, 200); // Rectangle to display the stack
      context.fillStyle = 'white';
      context.font = '20px Arial';
      stack.forEach((val, index) => {
        context.fillText(val, 420, 290 -index * 30); // Vertical alignment with spacing
      });
    };
  
    const drawText = async (text, x, y) => {
      context.fillStyle = 'white';
      context.font = '20px Arial';
      context.clearRect(x, y - 20, 300, 40); // Clear the specific area for text
      context.fillText(text, x, y);
      await sleep(delayTime);
    };
  
    const drawPostfix = async () => {
      context.fillStyle = 'white';
      context.font = '20px Arial';
      context.clearRect(50, 80, 300, 30); // Clear the specific area for postfix
      context.fillText(`Postfix: ${postfix}`, 50, 80);
    };
  
    const drawCalculation = async (calculation, result) => {
      context.fillStyle = 'white';
      context.font = '20px Arial';
      context.clearRect(600, 100, 200, 100); // Clear area for calculations
      context.fillText(calculation, 600, 120);
      context.fillText(`= ${result}`, 600, 140);
      await sleep(delayTime);
    };
  
    // Initial clearing and setup
    context.fillStyle = 'white';
    context.font = '20px Arial';
  
    // Display infix expression
    await drawText(`Infix: ${infix}`, 50, 50);
  
    // Display postfix expression
    await drawPostfix();
  
    // Draw initial stack state
    await drawStack();
  
    // Evaluate postfix expression
    for (let i = 0; i < postfix.length; i++) {
      const char = postfix[i];
      if (!isNaN(char)) {
        stack.push(char);
        await drawStack(); // Draw updated stack
        await drawText(`Input Scanned: ${char}`, 50, 120);
      } else {
        await drawText(`Operator: ${char}`, 50, 120);
        const b = parseInt(stack.pop(), 10);
        await drawStack();
        const a = parseInt(stack.pop(), 10);
        await drawStack();
        let result;
        switch (char) {
          case '+':
            result = a + b;
            break;
          case '-':
            result = a - b;
            break;
          case '*':
            result = a * b;
            break;
          case '/':
            result = a / b;
            break;
          default:
            break;
        }
        await drawCalculation(`${a} ${char} ${b}`, result);
        stack.push(result);
        await drawStack();
      }
    }
  
    // Final result
    await drawText(`Result: ${stack.pop()}`, 50, 200);
  }
  