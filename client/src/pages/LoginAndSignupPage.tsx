import { Suspense, lazy } from "react";
import { useLocation } from "react-router-dom";

import SuspenseLoading from "@/components/SuspenseLoading";

const LoginForm = lazy(() => import("@/components/LoginForm"));
const SignupForm = lazy(() => import("@/components/SignupForm"));

export default function FormPage() {
  const pathname = useLocation().pathname;

  return (
    <section className="h-full flex flex-col items-center justify-center gap-5 bg-bg">
      <Suspense fallback={<SuspenseLoading />}>
        {pathname === "/login" ? <LoginForm /> : <SignupForm />}
      </Suspense>
    </section>
  );
}
