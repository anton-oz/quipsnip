import CodeForm from "../components/CodeForm";
import { useAuthContext } from "@/Context/AuthContext";
export default function PostPage() {
  const Auth = useAuthContext();
  return (
    <section className="h-full w-full flex justify-center items-center bg-bg">
      {Auth?.loggedIn() ? (
        <CodeForm />
      ) : (
        <a href="/" className="relative w-full">
          <span className="brutalButtonMiddle">Login to view</span>
        </a>
      )}
    </section>
  );
}
