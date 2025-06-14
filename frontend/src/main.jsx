import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider,createBrowserRouter } from 'react-router-dom'
import { Home, Dashboard } from './components'
import { Provider } from 'react-redux'
import store from './store/store.js'

import SignupPage from './pages/SignupPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import FourZeroFour from './pages/FourZeroFour.jsx'


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
        path:"/signup",
        element: <SignupPage/>
      },
      {
        path:"/login",
        element: <LoginPage/>
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
