import LoginForm from "@/components/LoginForm";
import SignupForm from "@/components/SignupForm";

import { useLocation } from "react-router-dom";

export default function FormPage() {
  const pathname = useLocation().pathname;

  return (
    <section className="h-full flex flex-col items-center justify-center gap-5 bg-bg">
      {pathname === "/login" ? <LoginForm /> : <SignupForm />}
    </section>
  );
}
