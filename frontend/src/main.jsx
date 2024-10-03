import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import Edit from "./Edit.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

let router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/app",
    element: <App />,
  },
  {
    path: "/edit/:id",
    element: <Edit />,
  },
  
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>
);
