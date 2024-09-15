import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";

import LandingPage from "./pages/LandingPage.tsx";
import CreatePage from "./pages/CreatePage.tsx";
import ErrorPage from "./pages/ErrorPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
      {
        path: "create",
        element: <CreatePage />,
      },
      /* ADD MORE ROUTES */
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
