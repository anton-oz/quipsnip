import CodeForm from "../components/CodeForm";
import Auth from "../utils/auth";
export default function PostPage() {
  return (
    <section className="h-full w-full flex justify-center items-center">
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
