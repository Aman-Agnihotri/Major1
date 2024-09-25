import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from './routes/homepage/Homepage';
import Dashboardpage from "./routes/dashboardpage/Dashboardpage";
import RootLayout from "./layouts/RootLayout";
import SignInPage from "./routes/signInPage/SignInPage";
import SignUpPage from "./routes/signUpPage/SignUpPage";
import Subscription from "./routes/subscription/Subscription";

const router = createBrowserRouter([
  {
   element: <RootLayout/>,
   children:[
      {
        path:"/",
        element:<HomePage/>
      },{
        path:"/dashboard",
        element:<Dashboardpage/>
      },
      {
        path:"/sign-in/*",
        element:<SignInPage/>
      },
      {
        path:"/sign-up/*",
        element:<SignUpPage/>
      },{
        path:"/subscription",
        element:<Subscription/>
      }
      
   ]
  },
]);


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);