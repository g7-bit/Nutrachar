import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Home, Dashboard, DietForm, Diet, AuthLayout } from "./components";
import { Provider } from "react-redux";
import store from "./store/store.js";

import SignupPage from "./pages/SignupPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import FourZeroFour from "./pages/FourZeroFour.jsx";
import EditPage from "./pages/EditPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/dashboard",
        element: (
          <AuthLayout authentication>
            <Dashboard />
          </AuthLayout>
        ),
      },
      {
        path: "/dietForm",
        element:(
          <AuthLayout authentication>
            <DietForm />,
          </AuthLayout>
        )
        
      },
      {
        path: "/signup",
        element: (
          <AuthLayout authentication={false}>
            <SignupPage />,
          </AuthLayout>
        ),
      },
      {
        path: "/login",
        element: (
          <AuthLayout authentication={false}>
            <LoginPage />,
          </AuthLayout>
        ),
      },
      {
        path: "/diet/:dietId",
        element: <Diet />,
      },

      {
        path: "/edit-diet/:dietId",
        element: (
          <AuthLayout authentication>
            <EditPage />
          </AuthLayout>
        ),
      },
      {
        path: "*",
        element: <FourZeroFour />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
