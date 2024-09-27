import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Suspense, lazy } from "react";
import App from "./App.tsx";
import "./index.css";

import LazyLoader from "./components/SuspenseLoading.tsx";

const LandingPage = lazy(() => import("./pages/LandingPage.tsx"));
const PostPage = lazy(() => import("./pages/PostPage.tsx"));
const ErrorPage = lazy(() => import("./pages/ErrorPage.tsx"));
const LoginAndSignupPage = lazy(() => import("./pages/LoginAndSignupPage.tsx"));

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
  <Suspense fallback={<LazyLoader delay={300} />}>
    <RouterProvider router={router} />
  </Suspense>
);
