import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";

import LandingPage from "./pages/LandingPage.tsx";
import PostPage from "./pages/PostPage.tsx";
import ErrorPage from "./pages/ErrorPage.tsx";
import LoginAndSignupPage from "./pages/LoginAndSignupPage.tsx";

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
        path: "signup",
        element: <LoginAndSignupPage />,
      },
      {
        path: "login",
        element: <LoginAndSignupPage />,
      },
      {
        path: "post",
        element: <PostPage />,
      },
      /* ADD MORE ROUTES */
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
