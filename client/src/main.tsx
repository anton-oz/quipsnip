import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Suspense, lazy } from "react";
import App from "./App.tsx";
import "./index.css";
import { LoaderCircle } from "lucide-react";

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
  <Suspense
    fallback={
      <div className="h-full w-full flex flex-col justify-center items-center">
        <LoaderCircle size={40} className="animate-spin" />
        <p>loading...</p>
      </div>
    }
  >
    <RouterProvider router={router} />
  </Suspense>
);
