import {
    createBrowserRouter,
  } from "react-router-dom";
  import Login from "../pages/Login";
  import Dashboard from "../pages/Dashboard";
import Root from "../pages/Root";
import WorkoutPlans from "../pages/WorkoutPlans";
import Exercises from "../pages/Exercises";
import Signup from "../pages/Signup";

  export const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        {
          path: "/",
          element: <Dashboard />
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/signup",
          element: <Signup />
        },
        {
          path: "/workout",
          element: <WorkoutPlans />
        },
        {
          path: "/exercises",
          element: <Exercises />
        },
      ],
    },
  ]);
  
  export default router;