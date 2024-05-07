import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from './RootLayout';
import BasketGame from './BasketGame'
import Cargame from './Cargame'
import Home from './Home'
import './App.css';
import Signin from './SignIn';
import Signup from './SignUp';
import Main from './Main.js';

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
      element:<Main/>
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
