import LoginForm from "@/components/LoginForm";

export default function LoginPage() {
  return (
    <section className="grid items-center place-items-center gap-5">
      <h1 className="font-bold text-2xl">login</h1>
      <LoginForm />
    </section>
  );
}
