import CodeForm from "../components/CodeForm";
import Auth from "../utils/auth";
export default function DashboardPage() {
  return (
    <section className="h-[70%] w-full flex justify-center items-center">
      {Auth.loggedIn() ? (
        <CodeForm />
      ) : (
        <a href="/" className="relative w-full">
          <span className="brutalButtonMiddle">Login to view</span>
        </a>
      )}
    </section>
  );
}
