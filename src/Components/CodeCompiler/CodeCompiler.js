import { useState } from 'react';
import './CodeCompiler.css';
import Editor from "@monaco-editor/react";
import Navbar from './Navbar/Navbar';
import Axios from 'axios';
import spinner from './spinner.svg';
import { useNavigate, useLocation } from 'react-router-dom';

// Utility function to create a delay
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

function CodeCompiler() {
    const [userCode, setUserCode] = useState('');
    const [userLang, setUserLang] = useState('python');
    const [userTheme, setUserTheme] = useState('vs-dark');
    const [fontSize, setFontSize] = useState(20);
    const [userInput, setUserInput] = useState('');
    const [userOutput, setUserOutput] = useState('');
    const [loading, setLoading] = useState(false);
    const [loadingMessage, setLoadingMessage] = useState(''); // New state for loading message
    const navigate = useNavigate();
    const location = useLocation();

    const options = {
        fontSize: fontSize
    };

    const hiddenTestCasesDIJ = [
        { input: '4\n0 10 15 20\n10 0 35 25\n15 35 0 30\n20 25 30 0\n0', expectedOutput: '0 10 15 20', description: 'Test Case 1' },
        { input: '3\n0 5 9\n5 0 2\n9 2 0\n1', expectedOutput: '5 0 2', description: 'Test Case 2' },
        { input: '5\n0 3 8 7 6\n3 0 4 2 1\n8 4 0 9 6\n7 2 9 0 5\n6 1 6 5 0\n0', expectedOutput: '0 3 7 5 4', description: 'Test Case 3' },
        { input: '2\n0 2\n2 0\n0', expectedOutput: '0 2', description: 'Test Case 4' },
        { input: '3\n0 1 2\n1 0 3\n2 3 0\n1', expectedOutput: '1 0 3', description: 'Test Case 5' },
        { input: '4\n0 6 8 5\n6 0 7 9\n8 7 0 4\n5 9 4 0\n0', expectedOutput: '0 6 8 5', description: 'Test Case 6' },
        { input: '4\n0 10 5 8\n10 0 7 12\n5 7 0 6\n8 12 6 0\n1', expectedOutput: '10 0 7 12', description: 'Test Case 7' },
        { input: '5\n0 2 9 10 7\n2 0 3 6 4\n9 3 0 5 8\n10 6 5 0 11\n7 4 8 11 0\n2', expectedOutput: '5 3 0 5 7', description: 'Test Case 8' },
        { input: '3\n0 1 4\n1 0 2\n4 2 0\n1', expectedOutput: '1 0 2', description: 'Test Case 9' },
        { input: '6\n0 3 6 1 9 4\n3 0 2 5 8 7\n6 2 0 6 7 3\n1 5 6 0 4 2\n9 8 7 4 0 9\n4 7 3 2 9 0\n0', expectedOutput: '0 3 5 1 5 3', description: 'Test Case 10' }
    ];

    const hiddenTestCasesBIN = [
        {
            input: `15\n1 2 3 4 5 6 7 8 9 10 11 12 13 14 15\n10`,
            expectedOutput: `Element found at index 9`,
            description: 'Test Case 1'
        },
        {
            input: `20\n1 3 5 7 9 11 13 15 17 19 21 23 25 27 29 31 33 35 37 39\n23`,
            expectedOutput: `Element found at index 11`,
            description: 'Test Case 2'
        },
        {
            input: `12\n2 4 6 8 10 12 14 16 18 20 22 24\n19`,
            expectedOutput: `Element not found`,
            description: 'Test Case 3'
        },
        {
            input: `8\n1 3 5 7 9 11 13 15\n3`,
            expectedOutput: `Element found at index 1`,
            description: 'Test Case 4'
        },
        {
            input: `7\n100 200 300 400 500 600 700\n350`,
            expectedOutput: `Element not found`,
            description: 'Test Case 5'
        },
        {
            input: `10\n5 10 15 20 25 30 35 40 45 50\n25`,
            expectedOutput: `Element found at index 4`,
            description: 'Test Case 6'
        },
        {
            input: `5\n10 20 30 40 50\n60`,
            expectedOutput: `Element not found`,
            description: 'Test Case 7'
        },
        {
            input: `6\n1 2 4 8 16 32\n16`,
            expectedOutput: `Element found at index 4`,
            description: 'Test Case 8'
        },
        {
            input: `9\n2 4 6 8 10 12 14 16 18\n14`,
            expectedOutput: `Element found at index 6`,
            description: 'Test Case 9'
        },
        {
            input: `11\n1 3 5 7 9 11 13 15 17 19 21\n20`,
            expectedOutput: `Element not found`,
            description: 'Test Case 10'
        }
    ];
    
    const hiddenTestCasesPOS = [
        {
            input: `23+`,
            expectedOutput: `5`,
            description: 'Test Case 1'
        },
        {
            input: `92-3*`,
            expectedOutput: `21`,
            description: 'Test Case 2'
        },
        {
            input: `345+*`,
            expectedOutput: `27`,
            description: 'Test Case 3'
        },
        {
            input: `23*42/+`,
            expectedOutput: `8`,
            description: 'Test Case 4'
        },
        {
            input: `34+56+*`,
            expectedOutput: `77`,
            description: 'Test Case 5'
        },
        {
            input: `78+32-/`,
            expectedOutput: `15`,
            description: 'Test Case 6'
        },
        {
            input: `89*7/`,
            expectedOutput: `10`,
            description: 'Test Case 7'
        },
        {
            input: `56+78-*`,
            expectedOutput: `-11`,
            description: 'Test Case 8'
        },
        {
            input: `92/4*`,
            expectedOutput: `16`,
            description: 'Test Case 9'
        },
        {
            input: `34*5/`,
            expectedOutput: `2`,
            description: 'Test Case 10'
        }
      ];



    function compile() {
        setLoading(true);
        if (userCode === '') {
            return;
        }

        Axios.post(`http://localhost:3500/code/compile`, {
            code: userCode,
            language: userLang,
            input: userInput
        }).then((res) => {
            setUserOutput(res.data.stdout || res.data.stderr);
        }).then(() => {
            setLoading(false);
        }).catch((err) => {
            console.error(err);
            setUserOutput("Error: " + (err.response ? err.response.data.error : err.message));
            setLoading(false);
        });
    }

    // The processTestCase function
    const processTestCase = async (testCase) => {
        try {
            const res = await Axios.post(`http://localhost:3500/code/compile`, {
                code: userCode,
                language: userLang,
                input: testCase.input
            });
            return {
                ...testCase,
                userOutput: res.data.stdout || res.data.stderr,
                status: (res.data.stdout || res.data.stderr).trim() === testCase.expectedOutput.trim() ? 'accepted' : 'wrong'
            };
        } catch (err) {
            console.error(err);
            return {
                ...testCase,
                userOutput: "Error: " + (err.response ? err.response.data.error : err.message),
                status: 'error'
            };
        }
    };

    // The compileHidden function with request delay
    async function compileHidden() {
        setLoading(true);
        setLoadingMessage('Please wait, compiling your program...'); // Set loading message

        const queryParams = new URLSearchParams(location.search);
        const id = queryParams.get('id');
        let hiddenTestCases = [];

        if (id === 'dij') 
        {
           hiddenTestCases=hiddenTestCasesDIJ
        } 
        else if(id=='bin') 
        {
            hiddenTestCases=hiddenTestCasesBIN 
        }
        else if(id=='pos')
        {
            hiddenTestCases=hiddenTestCasesPOS
        }
        const results = [];

        for (const testCase of hiddenTestCases) {
            const result = await processTestCase(testCase);
            results.push(result);

            // Wait for 500ms before proceeding to the next test case
            await delay(500);
        }

        console.log("Results from compilation", results);
        navigate(`/status?id=${id}`, { state: { results } });

        setLoading(false);
        setLoadingMessage(''); // Clear loading message
    }

    function clearOutput() {
        setUserOutput('');
    }

    return (
        <div className="App">
            <Navbar
                userLang={userLang} setUserLang={setUserLang}
                userTheme={userTheme} setUserTheme={setUserTheme}
                fontSize={fontSize} setFontSize={setFontSize}
            />
            <div className="main">
                <div className="left-container">
                    <Editor
                        options={options}
                        height="calc(100vh - 50px)"
                        width="100%"
                        theme={userTheme}
                        language={userLang}
                        defaultLanguage="python"
                        defaultValue="# Enter your code here"
                        onChange={(value) => { setUserCode(value) }}
                    />
                    <div className="button-container">
                        <button className="run-btn" onClick={() => compile()}>
                            Run
                        </button>
                        <button className="submit-btn" onClick={() => compileHidden()}>
                            Submit
                        </button>
                    </div>
                </div>
                <div className="right-container">
                    <h4>Input:</h4>
                    <div className="input-box">
                        <textarea id="code-inp" onChange={(e) => setUserInput(e.target.value)}>
                        </textarea>
                    </div>
                    <h4>Output:</h4>
                    {loading ? (
                        <div className="spinner-box">
                            <img src={spinner} alt="Loading..." />
                            <p>{loadingMessage}</p> {/* Display loading message */}
                        </div>
                    ) : (
                        <div className="output-box">
                            <pre>{userOutput}</pre>
                            <button onClick={() => { clearOutput() }} className="clear-btn">
                                Clear
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default CodeCompiler;
