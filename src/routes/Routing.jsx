import {
  createBrowserRouter,
} from "react-router-dom";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Root from "../pages/Root";
import WorkoutPlans from "../pages/WorkoutPlans";
import Exercises from "../pages/Exercises";
import SignUp from "../pages/SignUp";
import Workout from "../pages/Workout";

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
        element: <SignUp />
      },
      {
        path: "/workout",
        element: <WorkoutPlans />
      },
      {
        path: "/workout/:id",
        element: <Workout />
      },
      {
        path: "/exercises",
        element: <Exercises />
      },
    ],
  },
]);

export default router;