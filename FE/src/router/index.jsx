import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

const Home = lazy(() => import("../views/Home"));
const AddField = lazy(() => import("../views/AddField"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/addfield",
    element: <AddField />,
  },
]);

export default router;
