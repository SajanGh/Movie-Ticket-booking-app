import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Login from "./pages/Login";
import RootLayout from "./layout/Rootlayout";

import Signup from "./pages/Signup";
import HomePage from "./pages/HomePage";

import MovieDetailPage from "./pages/MovieDetailPage";
import NotFoundPage from "./pages/NotFoundPage";
import { ProtectedRoute } from "./components/ProtectedRoute";
import SuccessPage from "./pages/SuccessPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <NotFoundPage />,

    children: [
      { path: "success", element: <SuccessPage /> },
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
        // element: (
        //   <ProtectedRoute>
        //     <HomePage />,
        //   </ProtectedRoute>
        // ),
      },
      {
        path: "home/:movieId",
        element: <MovieDetailPage />,
      },
    ],
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
