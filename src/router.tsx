import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Login from "./pages/Login";
import RootLayout from "./routes/Rootlayout";

import Signup from "./pages/Signup";
import HomePage from "./pages/HomePage";
import ErrorPage from "./pages/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,

    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "home",
        element: <HomePage />,
        children: [
          {
            path: ":movieId",
            // element: < />,
          },
        ],
      },
    ],
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
