import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/homePage.jsx";
import "./index.css";
import ErrorPage from "./pages/404.jsx";
import DetailPage from "./pages/detailPage.jsx";
import { Skeleton } from "./components/ui/skeleton.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/movie/:id",
    element: <DetailPage />,
  },
  {
    path: "/about",
    element: (
      <div className="min-h-screen bg-red-200">
        hello
        <Skeleton className='h-screen' />
      </div>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
