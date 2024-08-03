import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from './RootLayout';
import BasketGame from './BasketGame.js'
import BinarySearchGame from './BinarySearchGame.js'
import Cargame from './Cargame.js'
import Home from './Components/DSA/DSA'
import Tests from './Components/Tests/Tests'
import './App.css';
import Signin from './Components/SignIn/SignIn';
import Signup from './Components/SignUp/SignUp';
import Main from './Components/Main/Main.js';
import LeaderBoard from './Components/LeaderBoard/LeaderBoard.js';
import Postfix from './Components/Postfix/Postfix.js';
import CodeCompiler from './Components/CodeCompiler/CodeCompiler.js'

function App() {
  //create browser router object
  const router = createBrowserRouter([
    {
      path:"/",
      element:<RootLayout/>,
      children:[{
          path:"/",
          element:<Signin/>
      },
      {
        path:"/postfixeval",
        element:<Postfix/>
      },
      {
        path:"/code",
        element:<CodeCompiler />
      },
      {  path:"/home",
         element:<Home/>

      },
      {
        path:"/tests",
        element:<Tests/>
      },
      {
        path:"/basketgame",
        element:<BasketGame/>
    },
    {
      path:"/binarygame",
      element:<BinarySearchGame/>
    },
    {
      path:"/cargame",
      element:<Cargame/>
    },
    {
      path:"/signup",
      element:<Signup/>
    },
    {
      path:"/signin",
      element:<Signin/>
    },
    {
      path:"/main",
      element:<Main/>,
      children:[
        {
          path:"leaderboard",
          element:<LeaderBoard/>
        }
      ]
    }
    ]
    }
  ])
  return (
    <div>
        <RouterProvider router={router}/>
    </div>
  );
}

export default App;
