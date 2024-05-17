import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from './RootLayout';
import BasketGame from './BasketGame.js'
import Cargame from './Cargame.js'
import Home from './Components/DSA/DSA'
import './App.css';
import Signin from './Components/SignIn/SignIn';
import Signup from './Components/SignUp/SignUp';
import Main from './Components/Main/Main.js';
import LeaderBoard from './Components/LeaderBoard/LeaderBoard.js';

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
      {  path:"/home",
         element:<Home/>

      },
      {
        path:"/basketgame",
        element:<BasketGame/>
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
