import {
  createBrowserRouter,
} from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Root from "../pages/Root";
import WorkoutPlans from "../pages/WorkoutPlans";
import Exercises from "../pages/Exercises";
import Workout from "../pages/Workout";
import SignInPage from "../pages/SignInPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <WorkoutPlans />
      },
      {
        path: "/signin",
        element: <SignInPage />,
      },
      {
        path: "/workout/:id",
        element: <Workout />
      },
    ],
  },
]);

export default router;