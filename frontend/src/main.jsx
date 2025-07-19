import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider,createBrowserRouter } from 'react-router-dom'
import { Home, Dashboard, DietForm,Diet } from './components'
import { Provider } from 'react-redux'
import store from './store/store.js'

import SignupPage from './pages/SignupPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import FourZeroFour from './pages/FourZeroFour.jsx'
import EditPage from './pages/EditPage.jsx'


const router = createBrowserRouter([
  {
    path:"/",
    element: <App/>,
    children: [
      {
        path:"/",
        element: <Home/>
      },
      {
        path: "/dashboard",
        element: <Dashboard/>
      },
      {
        path:"/dietForm",
        element: <DietForm/>
      },
      {
        path:"/signup",
        element: <SignupPage/>
      },
      {
        path:"/login",
        element: <LoginPage/>
      },
      {
        path:"/diet/:dietId",
        element:<Diet/>
      },
      {
        path:"/edit-diet/:dietId",
        element:<EditPage/>
      },
      {
        path:"*",
        element: <FourZeroFour/>
      }

    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store = {store}>
    <RouterProvider router={router}/>
    </Provider>
  </StrictMode>
)
